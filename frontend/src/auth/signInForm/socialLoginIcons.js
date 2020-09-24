import React from "react";

const googleIconURL =
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

// const facebookIconURL =
//   "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512";

// const twitterIconURL =
//   "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/600px-Twitter_Bird.svg.png";

export const GoogleIcon = () => (
  <img
    alt="google icon"
    style={{ width: 24, height: 24 }}
    src={googleIconURL}
  />
);
