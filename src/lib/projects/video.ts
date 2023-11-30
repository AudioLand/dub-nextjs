import configuration from "~/configuration";

export function getVideoDurationByUrl(videoUrl: string): Promise<number> {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      var video = document.createElement("video");
      video.src = URL.createObjectURL(blob);

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.load();
    } catch (error) {
      reject(error);
    }
  });
}

export function estimateProjectDuration(duration: number) {
  return duration * configuration.magic.projectDurationMultiplicator;
}

export function estimateProjectEndDate(videoDurationInSeconds: number, startDate: Date): Date {
  const projectDurationInSeconds = estimateProjectDuration(videoDurationInSeconds);
  const projectDurationInMillis = projectDurationInSeconds * 1000;
  return new Date(startDate.getTime() + projectDurationInMillis);
}
