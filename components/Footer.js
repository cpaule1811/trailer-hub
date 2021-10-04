import { Container, IconButton, Typography } from "@mui/material";
import Image from "next/dist/client/image";
import { Box } from "@mui/system";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/Github";
import tmdbLogo from "../img/tmdb.svg";

export default function Footer() {
  return (
    <Container maxWidth={false} variant="footer" disableGutters>
      <Box>
        <Link href="https://github.com/cpaule1811/trailer-hub" passHref>
          <Typography variant="link2" component="a" target="_blank">
            Source Code
          </Typography>
        </Link>
        <br />
        <Link href="https://www.charlieedwards.dev/" passHref>
          <Typography variant="link2" component="a" target="_blank">
            Portfolio
          </Typography>
        </Link>
      </Box>
      <Box>
        <Typography align="center" color="primary" sx={{ pt: 5, pb: 3 }}>
          Developed by Charlie Edwards
        </Typography>
        <Box display="flex" justifyContent="center" gap="1px" height="50px">
         <Link href="https://github.com/cpaule1811" passHref>
          <IconButton component="a" target="_blank">
            <GithubIcon sx={{ color: "#211F1F", fontSize: 32 }} />
          </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/charlie-edwards-52025b188/" passHref>
          <IconButton componet="a" target="_blank">
            <LinkedInIcon sx={{ color: "#1877F2", fontSize: 32 }} />
          </IconButton>
          </Link>
        </Box>
      </Box>
      <Box width={150}>
        <Typography variant="body2" color="primary" align="center" gutterBottom>
          All data used for Trailer Hub is from The Movie Database API.
        </Typography>
        <Box bgcolor="white" padding={1}>
          <Image src={tmdbLogo} alt="the movie database logo" />
        </Box>
      </Box>
    </Container>
  );
}
