import { Dialog, DialogProps } from "@material-ui/core";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import { PersonImagesResponse } from "../tmdb/types";

type Props = DialogProps & {
  images: PersonImagesResponse;
};

export default (props: Props) => {
  const { images, ...DialogProps } = props;
  const makeImageUrl = useMakeImageUrl();
  return (
    <Dialog
      PaperProps={{ style: { background: "transparent" } }}
      {...DialogProps}
    >
      <SwipeableViews>
        {images.profiles.map((profile) => (
          <img
            key={profile.filePath}
            alt=""
            width="100%"
            src={makeImageUrl(Infinity, { profilePath: profile.filePath })}
          />
        ))}
      </SwipeableViews>
    </Dialog>
  );
};
