import Image from "next/image";
import { Box } from "@mui/system";
import bannerImage from "../img/front_banner.jpg";
import SearchBar from "./Searchbar";
import { Typography } from "@mui/material";

export default function Banner() {
  return (
    <Box height={550} marginTop="" position="relative">
      <Box position="relative" height="100%" minHeight={400} width="auto">
        <Image src={bannerImage} alt="" layout="fill" objectFit="cover" />
      </Box>
      <Box
        position="absolute"
        top={0}
        height={550}
        width={"100%"}
        bgcolor="rgba(0,0,0,0.7)"
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
          <Typography gutterBottom variant="h4" color="white">
            Find all your favourite film trailers!
          </Typography><Typography gutterBottom variant="h4" color="white">
            All in One place
          </Typography>
          <SearchBar />
        </Box>
      </Box>
    </Box>
  );
}
