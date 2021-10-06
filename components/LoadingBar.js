import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

export default function LoadingBar({ loadComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = loadComplete ? 50 : 500;
    if (!loadComplete) {
      setProgress(1);
    }
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        if (oldProgress === 100 && loadComplete) {
          return 0;
        }
        if (oldProgress > 0) {
          return Math.min(oldProgress + diff, 100);
        }
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [loadComplete]);

  return (
    <>
      {progress > 0 && (
        <Box width="100vw" zIndex={10000} position="fixed">
          <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
          />
        </Box>
      )}
    </>
  );
}
