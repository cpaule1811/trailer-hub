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
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "../img/logo.svg";
import Image from "next/image";

export default function NavBar({ user, setUser }) {
  const { isSignedIn } = user;
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
      <Box display="flex">
        <Link href="/" passHref>
          <Box
            position="relative"
            minHeight={55}
            minWidth={270}
            sx={{ cursor: "pointer" }}
          >
            <Image src={logo} layout="fill" alt="Trailer Hub Logo" />
          </Box>
        </Link>
        <Toolbar sx={{ width: "100%", justifyContent: "flex-end" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
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
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              {isSignedIn ? (
                <Avatar sx={{ width: 45, height: 45 }}>ce</Avatar>
              ) : (
                <Avatar sx={{ width: 45, height: 45 }} />
              )}
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
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
          >
            {isSignedIn ? (
              <>
                <MenuItem component="a">Profile</MenuItem>
                <MenuItem component="a">My List</MenuItem>
                <Divider />
                <MenuItem>Signout</MenuItem>
              </>
            ) : (
              <>
                <Link href="/signin" passHref>
                  <MenuItem component="a">Signin</MenuItem>
                </Link>
                <Link href="/register" passHref>
                  <MenuItem component="a">Register</MenuItem>
                </Link>
              </>
            )}
          </Menu>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
