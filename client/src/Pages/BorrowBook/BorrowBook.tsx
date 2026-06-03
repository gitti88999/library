import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import { useState } from "react";

const BorrowBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCopy, setSelectedCopy] = useState<number | null>(null);

  const handleSelectCopy = (copy: number) => {
    setSelectedCopy(copy);
    // כאן אפשר לקרוא API או לשמור state מקומי/גלובלי
    // לדוגמה: markBookAsBorrowed(id, copy);
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        בחירת עותק לספר
      </Typography>

      <Typography sx={{ mb: 3 }}>
        ספר נבחר: {id}
      </Typography>

      <Stack spacing={2}>
        {[1, 2, 3].map((copy) => (
          <Card key={copy}>
            <CardContent>
              <Typography>עותק #{copy}</Typography>
              <Typography color="text.secondary">
                מרחק: {copy * 2} ק״מ
              </Typography>

              <Button
                variant={selectedCopy === copy ? "contained" : "outlined"}
                color={selectedCopy === copy ? "success" : "primary"}
                sx={{ mt: 1 }}
                onClick={() => handleSelectCopy(copy)}
              >
                {selectedCopy === copy ? "נבחר" : "בחר עותק"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Button sx={{ mt: 3 }} onClick={() => navigate(-1)}>
        חזור
      </Button>
    </Container>
  );
};

export default BorrowBook;