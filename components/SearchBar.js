import { Paper, Divider, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar() {
  const [searchfield, setSearchField] = useState("");
  const router = useRouter();

  const handleSearchForm = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: { search: searchfield || "a" },
    });
  };

  return (
    <Paper
      color="primary"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        zIndex: 1000,
      }}
      onSubmit={(e) => handleSearchForm(e)}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, pt: "3px" }}
        placeholder="Search movie trailers"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchfield}
        onChange={(e) => setSearchField(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
