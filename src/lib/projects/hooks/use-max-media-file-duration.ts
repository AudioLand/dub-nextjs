import flagsmith from "flagsmith";
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";
import useIsSubscriptionActive from "~/lib/organizations/hooks/use-is-subscription-active";

const useMaxMediaFileDuration = () => {
  const isSubscriptionActive = useIsSubscriptionActive();

  if (!isSubscriptionActive) {
    return {
      inMinutes: 1,
      inSeconds: 60,
    };
  }

  const valueString: string = flagsmith.getValue(
    FEATURES_IDS_LIST.max_media_file_duration_in_minutes,
  );
  const maxMediaFileDurationInMinutes = Number(valueString);

  const MAX_MEDIA_FILE_DURATION = {
    inMinutes: maxMediaFileDurationInMinutes,
    inSeconds: maxMediaFileDurationInMinutes * 60,
  };

  return MAX_MEDIA_FILE_DURATION;
};

export default useMaxMediaFileDuration;
