import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#292929",
    },
    secondary: {
      main: "#3AB09E",
    },
    third: {
      main: "#EFEFEF",
    },
    neutral: {
      main: "#fff",
    },
  },
  shape: {},
  typography: {
    link: {
      color: "#fff",
      cursor: "pointer",
      "&:hover": {
        color: "#3AB09E",
        textDecoration: "underline",
      },
    },
    link2: {
      color: "#292929",
      cursor: "pointer",
      lineHeight: 1.5,
      "&:hover": {
        color: "#fff",
        textDecoration: "underline",
      },
    },
    subtitle2: {
      color: "#fff",
      textAlign: "center",
      lineHeight: 1,
      paddingBottom: 10,
    },
    body2: {
      color: "#fff",
      fontWeight: 100,
      lineHeight: 1,
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "link" },
          defaultProps: { component: "a" },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          overflow: "hidden",
          padding: "10px 15px",
          minHeight: "84px",
          boxSizing: 'border-box',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 40,
          marginTop: 10,
          marginBottom: 10,
        },
      },
      defaultProps: {
        InputProps: {
          sx: {
            height: 40,
            bgcolor: "#efefef",
          },
        },
        InputLabelProps: {
          sx: {
            bgColor: "#fff",
          },
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "form" },
          style: {
            textAlign: "center",
            padding: "50px 20px",
            boxShadow: "5px 5px 10px 2px rgba(0,0,0, 0.5)",
            width: 280,
            height: 400,
            backgroundColor: "#292929",
          },
        },
        {
          props: { variant: "basic" },
          style: {
            pointer: "cursor",
            boxShadow: "1px 5px 10px rgba(0,0,0,0.3)",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "2px 6px 10px 2px rgba(0,0,0,0.6)",
              transform: "translateY(-5px)",
              transition: "1s",
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "focused" },
          style: {
            "&:focus": {
              outline: "3px solid #315662",
            },
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "carousel" },
          style: {
            zIndex: 300,
            opacity: 0.5,
            fontSize: 50,
            "&:hover": {
              opacity: 1,
            },
          },
        },
      ],
    },
    MuiContainer: {
      variants: [
        {
          props: { variant: "footer" },
          style: {
            display: "flex",
            justifyContent: "space-around",
            background: "#3AB09E",
            height: 250,
            width: "100%",           
            gap: 10,
            alignItems: "center",
            "@media (max-width: 600px)": {
                flexDirection: "column",
                height: "100%",
                textAlign: "center",
                paddingBottom: 40,
                
            }
          },
        },
      ],
    },
  },
});

export default theme;
