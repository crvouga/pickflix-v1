import ExploreIcon from "@material-ui/icons/Explore";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import React from "react";
import { useLocation } from "react-router";

export const DiscoverPageIcon = () => {
  const location = useLocation();
  return location.pathname === "/" ? <ExploreIcon /> : <ExploreOutlinedIcon />;
};

export const ProfilePageIcon = () => {
  const location = useLocation();
  return location.pathname === `/current-user` ? (
    <PersonIcon />
  ) : (
    <PersonOutlinedIcon />
  );
};

export const HomePageIcon = () => {
  const location = useLocation();
  return location.pathname === "/home" ? <HomeIcon /> : <HomeOutlinedIcon />;
};

export const SearchPageIcon = () => {
  const location = useLocation();
  return location.pathname === "/search" ? (
    <SearchIcon />
  ) : (
    <SearchOutlinedIcon />
  );
};
