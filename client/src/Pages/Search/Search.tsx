import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
  Button,
  CircularProgress
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { getBooks } from "./SearchSlice";
import type { BookDTO } from "../../types/book";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const books = useSelector((state: RootState) => state.allBooks.items);
  const status = useSelector((state: RootState) => state.allBooks.status);

  const [searchTerm, setSearchTerm] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  // קריאה לשרת
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const safeBooks = Array.isArray(books) ? books : [];
  const results = safeBooks.filter((b) =>
    (b?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // עמודות לטבלה
  const columns: GridColDef[] = [
    { field: "name", headerName: "שם הספר", flex: 1 },
    { field: "category", headerName: "קטגוריה", flex: 1 },
    { field: "audienceId", headerName: "קהל יעד", flex: 1 },
    { field: "authorId", headerName: "מחבר", flex: 1 },
    {
      field: "select",
      headerName: "בחר",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/borrow/${params.row.id}`)}
        >
          בחר ספר
        </Button>
      ),
    },
  ];

  const rows = results.map((book, index) => ({
    id: index,
    ...book
  }));

  return (
    <Container maxWidth="md" sx={{ mt: 8, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        חיפוש ספרים
      </Typography>

      {/* 🔍 TextField */}
      <TextField
        fullWidth
        label="חפש ספר..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={status === "loading"}
        sx={{
          mb: 3,
          "& input": {
            textAlign: "right"
          }
        }}
      />

      {/* 🔄 LOADING */}
      {status === "loading" && <CircularProgress sx={{ mb: 3 }} />}

      {/* 🔀 Toggle View */}
      <Button
        variant="contained"
        onClick={() => setIsTableView(!isTableView)}
        sx={{ mb: 3 }}
        disabled={status === "loading"}
      >
        {isTableView ? "תצוגת כרטיסים" : "תצוגת טבלה"}
      </Button>

      {/* 📊 Table / Cards */}
      {isTableView ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            sx={{
              direction: "rtl",
              "& .MuiDataGrid-cell": { textAlign: "right" },
              "& .MuiDataGrid-columnHeaders": { textAlign: "right" },
            }}
          />
        </div>
      ) : (
        <Stack spacing={2} alignItems="flex-end">
          {results.length === 0 && status !== "loading" ? (
            <Typography>לא נמצאו תוצאות</Typography>
          ) : (
            results.map((book, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6">{book.name}</Typography>
                  <Typography color="text.secondary">
                    מחבר: {book.authorId}
                  </Typography>
                  <Typography color="text.secondary">
                    קטגוריה: {book.category} | קהל יעד: {book.audienceId}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => navigate(`/borrow/${index}`)}
                  >
                    בחר ספר
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Search;