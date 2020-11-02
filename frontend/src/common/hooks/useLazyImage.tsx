import { once } from "ramda";
import { useEffect, useState, ImgHTMLAttributes } from "react";
import { useInView } from "react-intersection-observer";

export const useLazyImage = ({
  highQuality,
  lowQuality,
}: {
  highQuality: string;
  lowQuality: string;
}) => {
  const { ref, inView } = useInView();
  const [src, setSrc] = useState<string | undefined>(undefined);

  const loadHighQuality = once(() => {
    const image = new Image();
    image.onload = () => {
      setSrc(highQuality);
    };
    image.src = highQuality;
  });

  const loadLowQuality = once(() => {
    setSrc(lowQuality);
  });

  useEffect(() => {
    loadLowQuality();
    if (inView) {
      loadHighQuality();
    }
  }, [inView]);

  return {
    ref,
    src,
  };
};
