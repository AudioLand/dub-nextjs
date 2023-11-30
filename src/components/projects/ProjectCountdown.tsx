import React from "react";
import useVideoUrlDuration from "~/lib/projects/hooks/use-video-url-duration";
import { estimateProjectEndDate } from "~/lib/projects/video";

const formatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});
const f = (num: number) => {
  return formatter.format(num);
};

type ProjectCountdownProps = {
  originalFileLink: string;
  createdAt: Date;
};

const ProjectCountdown = (props: ProjectCountdownProps) => {
  const duration = useVideoUrlDuration(props.originalFileLink);
  const estimatedEnd = React.useMemo(() => {
    if (!duration) return undefined;
    return estimateProjectEndDate(duration, props.createdAt);
  }, [duration, props.createdAt]);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    if (!estimatedEnd) return;
    if (estimatedEnd.getTime() - new Date().getTime() <= 0) return;

    const updateCountdown = () => {
      const targetTime = estimatedEnd.getTime();
      const currentTime = new Date().getTime();
      const timeRemaining = targetTime - currentTime;

      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        setTime(`~${f(hours)}:${f(minutes)}:${f(seconds)}`);
      } else {
        clearInterval(countdownInterval);
        setTime("");
      }
    };

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial update
    updateCountdown();

    return () => clearInterval(countdownInterval);
  }, [estimatedEnd]);

  if (time === "") return <></>;
  return <span className="text-gray-500 dark:text-gray-400 font-monospace">{time}</span>;
};

export default ProjectCountdown;
