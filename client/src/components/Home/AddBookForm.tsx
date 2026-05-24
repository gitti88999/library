// components/AddBookForm.tsx
import React, { useState } from "react";

interface AddBookFormProps {
  addBook: (title: string, author: string, category: string, audience: string) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author && category && audience) {
      addBook(title, author, category, audience);
      setTitle("");
      setAuthor("");
      setCategory("");
      setAudience("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input type="text" placeholder="שם הספר" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="מחבר" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="קטגוריה" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="קהל יעד" value={audience} onChange={(e) => setAudience(e.target.value)} style={inputStyle} />
      <button type="submit" style={submitButtonStyle}>הוסף ספר</button>
    </form>
  );
};

const inputStyle: React.CSSProperties = { padding: "8px", marginRight: "10px", marginBottom: "10px" };
const submitButtonStyle: React.CSSProperties = { padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };

export default AddBookForm;