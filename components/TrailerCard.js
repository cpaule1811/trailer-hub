import Image from "next/image";
import play from "../img/play.svg";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";

export default function TrailerCard({ name, ytKey, setVideoIndex, index }) {
  const url = `https://img.youtube.com/vi/${ytKey}/0.jpg`;
  return (
    <Paper
      elevation={5}
      sx={{
        width: 250,
        height: 200,
        position: "relative",
        "&:hover": {
          "& .child": {
            display: "block",
          },
        },
      }}
    >
      <Image src={url} layout="fill" alt={name} />
      <Box
        position="absolute"
        top={0}
        height="100%"
        width="100%"
        bgcolor="rgba(0,0,0,0.6)"
        className="child"
      >
        <Typography variant="caption" color="white" sx={{ m: "5px" }}>
          {name}
        </Typography>
        <Box
          display="flex"
          top={0}
          position="absolute"
          width="100%"
          height="100%"
          justifyContent="center"
          sx={{ "& img": { cursor: "pointer", "&:hover": { transform: "scale(1.1)", transition: "ease-in-out 500ms" } } }}
        >
          <Image onClick={() => setVideoIndex(index)} src={play} alt={name} />
        </Box>
      </Box>
    </Paper>
  );
}
