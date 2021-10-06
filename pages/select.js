import { useState } from "react";
import { useRouter } from "next/router";
import { genres } from "../data/genreData"
import { Divider, Typography, Container, Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "../hooks/UserContext";

export default function TagSelect() {
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);
  const [error, setError] = useState("");
  const { userId } = useUser();
  const router = useRouter();

  const handleSelected = (genre) => {
    if (selected1 === genre) return setSelected1(null);
    if (selected2 === genre) return setSelected2(null);
    if (selected3 === genre) return setSelected3(null);
    if (!selected1) return setSelected1(genre);
    if (!selected2) return setSelected2(genre);
    if (!selected3) return setSelected3(genre);
  };

  const countSelected = () => {
    return [selected1, selected2, selected3].filter((item) => item).length;
  };

  const isSelected = (genre) => {
    if (genre === selected1 || genre === selected2 || genre === selected3) {
      return false;
    }
    return true;
  };

  const submitTags = async (e) => {
    e.preventDefault();
    const tags = genres
      .filter(
        (item) =>
          item.genre === selected1 ||
          item.genre === selected2 ||
          item.genre === selected3
      )
      .map((item) => {
        return {
          genre: item.genre,
          user_id: userId,
          genre_id: item.genre_id,
        };
      });
    try {
      const resp = await fetch("/api/tags", {
        method: "POST",
        body: JSON.stringify({ tags: tags }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.success) {
        return router.push("/");
      }
      setError(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Typography variant="h4" align="center"  gutterBottom>
        Please select your 3 favourite genres
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        You have selected {countSelected()}/3
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
        {genres.map((item) => {
          return (
            <Paper
              onClick={() => handleSelected(item.genre)}
              key={item.genre_id}
              elevation={5}
              sx={{
                width: 255,
                height: 255,
                cursor: "pointer",
                backgroundImage: `url(${item.genrePath})`,
                backgroundSize: "cover",
                borderRadius: "5px",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "1s"
                }
              }}
            >
              <Box
              height="100%"
              width="100%"
              display="flex"
              bgcolor= {isSelected(item.genre) ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.174)" }
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              >
                <Typography variant="h6" align="center" color="white" className="tvc">{item.genre}</Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        {error && <div className="tc red">{error}</div>}
        {countSelected() === 3 && (
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => submitTags(e)}
            color="secondary"
          >
            SUBMIT
          </Button>
        )}
      </Box>
    </Container>
  );
}

