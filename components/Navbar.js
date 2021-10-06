import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
  Menu,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "../img/logo.svg";
import Image from "next/image";
import { useUser, useUpdateUser } from "../hooks/UserContext";

const hidden = {
  display: "none",
  "@media (max-width: 600px)": {
    display: "block",
  },
};

export default function NavBar() {
  const user = useUser();
  const { isSignedIn } = user;
  const updateUser = useUpdateUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Box display="flex" alignItems="center" height="100%">
        <Link href="/" passHref>
          <Box
            position="relative"
            minHeight={55}
            minWidth={270}
            sx={{
              cursor: "pointer",
              "@media (max-width: 370px)": { minWidth: 190 },
            }}
          >
            <Image src={logo} layout="fill" alt="Trailer Hub Logo" />
          </Box>
        </Link>
        <Toolbar sx={{ width: "100%", justifyContent: "flex-end", height: 64 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Box
              mr={2}
              sx={{
                "@media (max-width: 600px)": { display: "none" },
              }}
            >
              <Link href="/whats_new" passHref>
                <Typography variant="link" sx={{ p: 1 }} component="a">
                  What&apos;s New
                </Typography>
              </Link>
              <Link href="/genres" passHref>
                <Typography variant="link" sx={{ p: 1 }} component="a">
                  Genres
                </Typography>
              </Link>
            </Box>
            <IconButton onClick={handleClick} size="small">
              {isSignedIn ? (
                <Avatar sx={{ width: 45, height: 45 }}>ce</Avatar>
              ) : (
                <Avatar sx={{ width: 45, height: 45 }} />
              )}
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            name="signin menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            disableScrollLock
          >
            <Link href="/whats_new" passHref>
              <MenuItem component="a" sx={hidden}>
                {" "}
                What&apos;s New
              </MenuItem>
            </Link>
            <Link href="/genres" passHref>
              <MenuItem component="a" sx={hidden} divider>
                Genres
              </MenuItem>
            </Link>
            {isSignedIn ? (
              <Box>
                <Link href="/list" passHref>
                <MenuItem component="a">
                  My List
                </MenuItem>
                </Link>
                <MenuItem
                  onClick={() =>
                    updateUser({ isSignedIn: false, userId: null, watchlist: [] })
                  }
                >
                  Signout
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <Link href="/signin" passHref>
                  <MenuItem component="a">Sign in</MenuItem>
                </Link>
                <Link href="/register" passHref>
                  <MenuItem component="a">Register</MenuItem>
                </Link>
              </Box>
            )}
          </Menu>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
