import Image from "next/image";
import { Box } from "@mui/system";
import bannerImage from "../img/front_banner.jpg";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Banner() {
  return (
    <Box height={550} position="relative">
      <Box position="relative" height="100%" minHeight={400} width="auto">
        <Image src={bannerImage} alt="" layout="fill" objectFit="cover" />
      </Box>
      <Box
        position="absolute"
        top={0}
        height={550}
        width={"100%"}
        bgcolor="rgba(0,0,0,0.65)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="relative"
          overflow="hidden"
          display="flex"
          flexWrap="wrap"
          width={400}
          pl={2}
          pr={2}
        >
          <Typography
            gutterBottom
            variant="h4"
            color="white"
            align="center"
            sx={{ mb: 3 }}
          >
            One place for all your favourite film trailers!
          </Typography>
          <SearchBar />
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            mt={2}
            gap={1}
          >
            <Link href="/signin" passHref>
              <Typography variant="link" component="a">
                Signin
              </Typography>
            </Link>
            <Link href="/register" passHref>
              <Typography variant="link" component="a">
                Register
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
