import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useLazyImage = ({
  highQuality,
  lowQuality,
}: {
  highQuality: string;
  lowQuality: string;
}) => {
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView && !loaded) {
      setLoaded(true);
      setSrc(lowQuality);

      const highQualityImage = new Image();
      highQualityImage.onload = () => {
        setSrc(highQuality);
      };
      highQualityImage.src = highQuality;
    }
  }, [inView]);

  return {
    ref,
    src,
  };
};
