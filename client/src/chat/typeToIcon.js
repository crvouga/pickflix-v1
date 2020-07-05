import * as R from "ramda";
import React from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SortIcon from "@material-ui/icons/Sort";

const iconByType = {
  person: <PersonIcon />,
  company: <BusinessIcon />,
  keyword: <LocalOfferIcon />,
  genre: <MovieIcon />,
  dateRange: <DateRangeIcon />, //<AccessTimeIcon />,
  money: <AttachMoneyIcon />,
  sortBy: <SortIcon />,
  movie: <MovieIcon />,
};

export default R.prop(R.__, iconByType);
