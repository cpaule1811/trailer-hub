import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "../hooks/UserContext";
import { CacheProvider } from "@emotion/react";
import theme from "../styles/theme";

export default function Providers({ children, emotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
