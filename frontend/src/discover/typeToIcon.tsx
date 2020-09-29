// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BusinessIcon from "@material-ui/icons/Business";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LanguageIcon from "@material-ui/icons/Language";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SortIcon from "@material-ui/icons/Sort";
import * as R from "ramda";
import React from "react";

const iconByType = {
  person: <PersonIcon />,
  company: <BusinessIcon />,
  keyword: <LocalOfferIcon />,
  //genre: <PlayArrowIcon />,
  dateRange: <DateRangeIcon />, //<AccessTimeIcon />,
  money: <AttachMoneyIcon />,
  sortBy: <SortIcon />,
  movie: <PlayArrowIcon />,
  country: <LanguageIcon />,
};

export default R.propOr(null, R.__, iconByType);
