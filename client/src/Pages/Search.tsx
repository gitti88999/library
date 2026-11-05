import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import type { Audience, Author, BookDTO, Category } from "../types/book";

import { getBooks } from "../slices/SearchSlice";
import { getAudiences } from "../slices/AudienceSlice";
import { getAuthors } from "../slices/AuthorSlice";
import { getCategories } from "../slices/CategorySlice";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const books = useSelector((state: RootState) => state.allBooks.items);
  const status = useSelector((state: RootState) => state.allBooks.status);

  const audiences = useSelector((state: RootState) => state.audiences.items);
  const authors = useSelector((state: RootState) => state.authors.items);
  const categories = useSelector((state: RootState) => state.categories.items);

  const [searchTerm, setSearchTerm] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getAudiences());
    dispatch(getAuthors());
    dispatch(getCategories());
  }, [dispatch]);

  const safeBooks = Array.isArray(books) ? books : [];

  const audienceMap = useMemo(() => {
    const m: Record<string, string> = {};
    audiences.forEach((audience: Audience) => (m[audience.id] = audience.name));
    return m;
  }, [audiences]);

  const categoryMap = useMemo(() => {
    const m: Record<string, string> = {};
    categories.forEach((category: Category) => (m[category.id] = category.name));
    return m;
  }, [categories]);

  const authorMap = useMemo(() => {
    const m: Record<string, string> = {};
    authors.forEach((author: Author) => (m[author.id] = author.name));
    return m;
  }, [authors]);

  const results = safeBooks.filter((book: BookDTO) => {
    const matchesSearch = (book.name ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (!selectedAudience || book.audienceId === selectedAudience) &&
      (!selectedCategory || book.categoryId === selectedCategory) &&
      (!selectedAuthor || book.authorId === selectedAuthor)
    );
  });

  const rows = results.map((book) => ({
    id: book.id,
    name: book.name,
    category: categoryMap[book.categoryId] || "",
    audience: audienceMap[book.audienceId] || "",
    author: authorMap[book.authorId] || "",
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "שם הספר", flex: 1 },
    { field: "category", headerName: "קטגוריה", flex: 1 },
    { field: "audience", headerName: "קהל יעד", flex: 1 },
    { field: "author", headerName: "מחבר", flex: 1 },
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
          בחר
        </Button>
      ),
    },
  ];
  return (
    <Container maxWidth="md" sx={{ mt: 8, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        חיפוש ספרים
      </Typography>

      <TextField
        fullWidth
        label="חפש ספר..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          select
          label="קהל יעד"
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
        >
          <MenuItem value="">הכל</MenuItem>
          {audiences.map((audience: Audience) => (
            <MenuItem key={audience.id} value={audience.id}>
              {audience.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="קטגוריה"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">הכל</MenuItem>
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="מחבר"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <MenuItem value="">הכל</MenuItem>
          {authors.map((author: Author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {status === "loading" && <CircularProgress />}

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setIsTableView(!isTableView)}
      >
        {isTableView ? "כרטיסים" : "טבלה"}
      </Button>

      {isTableView ? (
        <div style={{ height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 20]}
          />
        </div>
      ) : (
        <Stack spacing={2}>
          {results
            .filter(b => b.id != null)
            .map((book) => (
              <Card key={book.id}>
                <CardContent>
                  <Typography variant="h6">{book.name}</Typography>

                  <Typography>
                    מחבר: {authorMap[book.authorId]}
                  </Typography>

                  <Typography>
                    קטגוריה: {categoryMap[book.categoryId]} | קהל יעד:{" "}
                    {audienceMap[book.audienceId]}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      navigate(`/book-map/${book.id}`, { state: { book } });
                    }}
                  >
                    בחר
                  </Button>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
    </Container>
  );
};
export default Search;
