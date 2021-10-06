import MovieCard from "./MovieCard";
import { useRef, useState } from "react";
import { Divider, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function MovieCardCarousel({ genre, movies }) {
  const contentWrapper = useRef(null);
  const [rightArrowOn, setRightArrowOn] = useState(true);
  const [leftArrowOn, setLeftArrowOn] = useState(false);

  const sideScroll = (speed, distance, step) => {
    contentWrapper.current.scrollLeft += step;
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      contentWrapper.current.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      arrowOn(contentWrapper.current);
    }, speed);
  };

  const arrowOn = (current) => {
    setLeftArrowOn(current.scrollLeft > 0);
    setRightArrowOn(
      current.scrollLeft + 1 <= current.scrollWidth - current.clientWidth
    );
  };

  return (
    <Box position="relative">
      <Box pl={2} pr={2}>
        <Typography variant="h5" color="primary">
          {genre}
        </Typography>
        <Divider />
      </Box>
      <Box display="flex" ref={contentWrapper} className="touch-scroll">
        {movies.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </Box>
      {leftArrowOn && (
        <IconButton
          onClick={() => sideScroll(5, window.innerWidth, -5)}
          variant="carousel"
          color="neutral"
          sx={{ position: "absolute", top: 210 }}
        >
          <ChevronLeftIcon fontSize="inherit" />
        </IconButton>
      )}
      {rightArrowOn && (
        <IconButton
          onClick={() => sideScroll(5, window.innerWidth, 5)}
          variant="carousel"
          color="neutral"
          sx={{
            position: "absolute",
            right: 0,
            top: 210,
          }}
        >
          <ChevronRightIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
}
