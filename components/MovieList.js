import Head from "next/head";
import { Container, Typography, Divider } from "@mui/material";

export default function MovieList({ children, title }) {
  return (
    <Container sx={{ pt: 3 }}>
      <Typography variant="h4" color="primary">{title}</Typography>
      <Divider />
      {children}
    </Container>
  );
}
