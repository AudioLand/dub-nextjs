import React from "react";
import { getVideoDurationByUrl } from "../video";

const useVideoUrlDuration = (url: string | undefined) => {
  const [duration, setDuration] = React.useState<number>();

  React.useEffect(() => {
    if (!url) return;

    getVideoDurationByUrl(url).then((x) => setDuration(x));
  }, [url]);

  return duration;
};

export default useVideoUrlDuration;
