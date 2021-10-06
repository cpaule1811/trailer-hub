import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <CssBaseline/>
      <NavBar  />
      <Box marginTop="84px">{children}</Box>
      <Footer />
    </>
  );
}
