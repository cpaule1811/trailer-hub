import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/system";
import { Card, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useUser, useUpdateUser } from "../hooks/UserContext";
import { useAddToWatchlist, useRemoveFromWatchlist } from "../hooks/watchlist";
import { useInWatchlist } from "../hooks/useInWatchlist";

export default function MovieCard({ movie }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { poster_path, id, title, overview } = movie;
  const user = useUser();
  const { userId, isSignedIn, watchlist } = user;
  const add = useAddToWatchlist(setLoading, movie, setError);
  const remove = useRemoveFromWatchlist(setLoading, movie, setError);
  const inWatchlist = useInWatchlist(id);
  const url = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const desc = overview.includes(".")
    ? overview.substring(0, overview.indexOf(".") + 1)
    : overview;

  return (
    <Box p={"22px 8px"}>
      <Card
        variant="basic"
        sx={{
          minWidth: 250,
          height: 375,
          position: "relative",
          "&:hover": {
            "& .fade": {
              display: "block",
              backgroundImage:
                "linear-gradient(to bottom, #00000000, #000000 75%)",
            },
          },
        }}
      >
        <Image src={url} layout="fill" alt={`Poster for ${title}`} />
        <Box
          className="fade"
          height="100%"
          width="100%"
          p={"10px"}
          top={0}
          position="absolute"
          display="none"
        >
          <Link href={`/movie/${id}`} passHref>
            <Box
              height={isSignedIn ? "89%" : "100%"}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              component="a"
            >
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {desc}
              </Typography>
            </Box>
          </Link>
          {isSignedIn && (error ? (
            <LoadingButton
              color="third"
              onClick={() => add()}
              loading={loading}
              loadingPosition="center"
              startIcon={<ReplayIcon />}
              loadingIndicator={<CircularProgress color="third" size={20} />}
              variant="outlined"
              sx={{ width: "100%", zIndex: 9000 }}
            >
              Retry
            </LoadingButton>
          ) : !inWatchlist ? (
            <LoadingButton
              color="third"
              onClick={() => add()}
              loading={loading}
              loadingPosition="center"
              startIcon={<AddIcon />}
              loadingIndicator={<CircularProgress color="third" size={20} />}
              variant="outlined"
              sx={{ width: "100%", zIndex: 9000 }}
            >
              Add to List
            </LoadingButton>
          ) : (
            <LoadingButton
              color="third"
              onClick={() => remove()}
              loading={loading}
              loadingPosition="center"
              startIcon={<RemoveIcon />}
              loadingIndicator={<CircularProgress color="third" size={20} />}
              variant="outlined"
              sx={{ width: "100%", zIndex: 9000 }}
            >
              Remove from List
            </LoadingButton>)
          )}
        </Box>
      </Card>
    </Box>
  );
}
