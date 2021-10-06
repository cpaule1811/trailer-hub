import Image from "next/image";
import { Divider, Typography, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAddToWatchlist, useRemoveFromWatchlist } from "../hooks/watchlist";
import { useInWatchlist } from "../hooks/useInWatchlist";
import { useUser } from "../hooks/UserContext";

export default function MovieInfo({ movie }) {
  const { poster_path, title, overview, release_date, casts, runtime, id } =
    movie;
  const url = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const { cast } = casts;
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { isSignedIn } = useUser();
  const add = useAddToWatchlist(setLoading, movie, setError);
  const remove = useRemoveFromWatchlist(setLoading, movie, setError);
  const inWatchlist = useInWatchlist(id);
  return (
    <Box
      width={320}
      boxShadow="1px -0px 3px rgba(0,0,0,0.3)"
      sx={{
        "@media screen and (max-width: 700px)": {
          minWidth: "100%",
          height: "100%",
        },
      }}
    >
      <Box
        width={300}
        height={480}
        position="relative"
        sx={{
          "@media screen and (max-width: 700px)": {
            minWidth: "100%",
            height: "auto",
          },
        }}
      >
        <Image key="id" src={url} layout="fill" alt={`${title} poster`} />
      </Box>
      <Box p="15px" width="100%">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">Release: {release_date}</Typography>
        <Typography variant="body1">Run time: {runtime}min</Typography>
        <Typography variant="body1" color="#000" sx={{ mb: 1 }}>
          Cast: {`${cast[0].name}, ${cast[1].name} & ${cast[2].name}`}
        </Typography>
        <Divider />
        {isSignedIn &&
          (error ? (
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
            </LoadingButton>
          ))}
      </Box>
    </Box>
  );
}
