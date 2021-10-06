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
      <Box alignSelf="start" mt={6} sx={{
        "@media (max-width:600px)": {
          alignSelf:"center"
        }
      }}>
        <Link href="https://github.com/cpaule1811/trailer-hub" passHref>
          <Typography variant="link2" component="a" target="_blank" rel="nofollow noopener">
            Source Code
          </Typography>
        </Link>
        <br />
        <Link href="https://www.charlieedwards.dev/" passHref>
          <Typography variant="link2" component="a" target="_blank" rel="nofollow noopener">
            Portfolio
          </Typography>
        </Link>
      </Box>
      <Box >
        <Typography align="center" color="primary" >
          Developed by Charlie Edwards
        </Typography>
        <Box display="flex" justifyContent="center" gap="1px" height="50px">
         <Link href="https://github.com/cpaule1811" passHref>
          <IconButton component="a" target="_blank" rel="nofollow noopener">
            <GithubIcon sx={{ color: "#211F1F", fontSize: 32 }} />
          </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/charlie-edwards-52025b188/" passHref>
          <IconButton componet="a" target="_blank" rel="nofollow noopener">
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
