import { genres } from "../../data/genreData";
import { Box } from "@mui/system";
import { Paper, Typography, Container, Divider } from "@mui/material";
import Link from "next/link";

export default function genresPage() {
  return (
    <Container maxWidth="md" sx={{ pt: 3 }}>
      <Typography variant="h4">Genres</Typography>
      <Divider sx={{ mb: 4 }} />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={1}
        mb={4}
      >
        {genres.map((item) => {
          return (
            <Paper
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
                  transition: "1s",
                },
              }}
            >
              <Link href={`genres/${item.genre_id}`} passHref>
                <Box
                  component="a"
                  height="100%"
                  width="100%"
                  display="flex"
                  bgcolor="rgba(0, 0, 0, 0.174)"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="5px"
                >
                  <Typography
                    variant="h6"
                    align="center"
                    color="white"
                    className="tvc"
                  >
                    {item.genre}
                  </Typography>
                </Box>
              </Link>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
}
