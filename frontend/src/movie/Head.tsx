import {
  Box,
  makeStyles,
  Typography,
  ButtonBase,
  Collapse,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "moment-duration-format";
import React, { useState, useEffect, useRef } from "react";
import AspectRatio from "../common/components/AspectRatio";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { MovieDetails, MovieReleaseDates } from "../tmdb/types";
import Ticker from "react-ticker";
import useBoolean from "../common/hooks/useBoolean";
import CollapsableWrapTypography from "../common/components/CollapsableWrapTypography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import * as utils from "./utils";
type Props = {
  details: MovieDetails;
  releaseDates: MovieReleaseDates;
};

type Variant = "h3" | "h4" | "h5" | "subtitle1";

const variant = ({ title }: { title: string }): Variant => {
  if (title.length < 24) {
    return "h3";
  }

  if (title.length < 36) {
    return "h4";
  }

  return "h5";
};

const variantToCollapsedHeight = (variant: Variant): string =>
  ({
    h3: "3.5em",
    h4: "3em",
    h5: "2.5em",
    subtitle1: "2em",
  }[variant]);

const gradientStep = (color: string, steps: number[]) =>
  steps.map((step) => fade(color, step)).join(", ");

const useStyles = makeStyles((theme) => {
  const backgroundGradient = `linear-gradient(
    0deg,
    ${gradientStep(theme.palette.background.default, [1, 0.8, 0.4, 0])}
  )`;

  return {
    backgroundGradient: {
      background: backgroundGradient,
    },
    backgroundPicture: {
      position: "fixed",
      zIndex: -1,
      top: 0,
      left: 0,
      width: "100%",

      backgroundImage: ({ details }: Props) =>
        `url(${makeTMDbImageURL(
          4,
          details.backdropPath
            ? { backdropPath: details.backdropPath }
            : { posterPath: details.posterPath }
        )})`,

      backgroundSize: "cover",
      //https://www.w3schools.com/cssref/playit.asp?filename=playcss_background-position
      backgroundPosition: ({ details }: Props) =>
        details.backdropPath ? "center center" : "center center",
    },
  };
});

const ratio: [number, number] = [4, 3];

export default (props: Props) => {
  const { details } = props;

  const isWrapped = useBoolean(true);
  const classes = useStyles(props);

  return (
    <React.Fragment>
      <AspectRatio
        ratio={ratio}
        ContainerProps={{ className: classes.backgroundPicture }}
      />

      <AspectRatio
        ratio={ratio}
        ContentProps={{
          className: classes.backgroundGradient,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box flex={1}></Box>
        <Box textAlign="center" paddingX={2}>
          <Typography style={{ fontWeight: "bold" }} variant={variant(details)}>
            {details.title}
          </Typography>
          <Typography
            gutterBottom
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            color="textSecondary"
          >
            {[
              utils.rated(props),
              utils.releaseYear(props),
              utils.runtime(props),
            ].join(` ${utils.SMALL_DOT} `)}
          </Typography>
        </Box>

        {/* <Box>
          <Box paddingX={4} onClick={isWrapped.toggle}>
            <CollapsableWrapTypography
              collapsedHeight={variantToCollapsedHeight(
                titleLengthToVariant(details.title)
              )}
              isWrapped={isWrapped.value}
              variant={titleLengthToVariant(details.title)}
              style={{ fontWeight: "bold" }}
              align="center"
            >
              {details.title}
            </CollapsableWrapTypography>
          </Box>
          <Box paddingX={2}>
            <CollapsableWrapTypography
              isWrapped={isWrapped.value}
              variant="subtitle1"
              style={{ fontWeight: "bold" }}
              align="center"
              collapsedHeight={variantToCollapsedHeight("subtitle1")}
            >
              {details.tagline}
            </CollapsableWrapTypography>
          </Box>
        </Box> */}
      </AspectRatio>
    </React.Fragment>
  );
};
