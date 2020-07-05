import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const frameStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "none",
  background: "#101010",
  zIndex: 10000,
  transform: "translateZ(0)",
};

const frameVariants = {
  init: {
    transitionEnd: { display: "none" },
    opacity: 0,
  },
  zoom: {
    display: "block",
    opacity: 1,
  },
};

const imageStyle = {
  zIndex: 10000,
  cursor: "zoom-in",
  display: "block",
  maxWidth: "100%",
  margin: "auto",
};

const transition = {
  duration: 1,
  ease: [0.08, 0.69, 0.2, 0.99],
};

const imageVariants = {
  init: {
    position: "static",
    width: "auto",
    height: "auto",
    transition,
    flip: true,
  },
  zoom: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true,
  },
};

export default ({ imageWidth, imageHeight, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomOut = () => {
    setIsZoomed(false);
  };
  const zoomIn = () => {
    setIsZoomed(true);
  };
  const toggleZoom = () => {
    setIsZoomed((isZoomed) => !isZoomed);
  };

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener("scroll", zoomOut);
    } else {
      window.removeEventListener("scroll", zoomOut);
    }
  }, [isZoomed]);

  const animate = isZoomed ? "zoom" : "init";

  const rootStyle = {
    width: imageWidth,
    height: imageHeight,
  };
  return (
    <div style={rootStyle} onClick={toggleZoom}>
      <motion.div
        style={frameStyle}
        variants={frameVariants}
        animate={animate}
      />
      <motion.img
        style={imageStyle}
        variants={imageVariants}
        animate={animate}
        {...props}
      />
    </div>
  );
};
