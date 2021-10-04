import Image from "next/image";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function MovieInfo({
  poster_path,
  title,
  overview,
  release_date,
  casts,
  runtime,
}) {
  const url = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const { cast } = casts;
  return (
    <Box
      minWidth={320}
      width={320}
      height={"100%"}
      boxShadow="1px -0px 3px rgba(0,0,0,0.3)"
      sx={{
        "@media screen and (max-width: 700px)": {
          minWidth: "100%",
        },
      }}
    >
      <Image
        key="id"
        src={url}
        width={320}
        height={480}
        layout="responsive"
        alt={`${title} poster`}
      />
      <Box p="15px">
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1">Release: {release_date}</Typography>
        <Typography variant="body1">Run time: {runtime}min</Typography>
        <Typography variant="body1" color="#000" sx={{mb: 1}}>
          Cast: {`${cast[0].name}, ${cast[1].name} & ${cast[2].name}`}
        </Typography>
        <Divider />
        <Typography variant="body2" color="black" sx={{ mt: 2 }}>{overview}</Typography>
      </Box>
    </Box>
  );
}
