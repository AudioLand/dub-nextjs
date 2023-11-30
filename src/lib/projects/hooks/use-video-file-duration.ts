import React from "react";

const useVideoFileDuration = (file: File | undefined) => {
  const [duration, setDuration] = React.useState<number>();

  React.useEffect(() => {
    if (!file) return;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      setDuration(video.duration);
    };

    video.src = URL.createObjectURL(file);
  }, [file]);

  return duration;
};

export default useVideoFileDuration;
