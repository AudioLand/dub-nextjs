// hooks
import useUserSubscriptionPlan from "~/lib/user/hooks/use-user-subscription-plan";

const useMaxMediaFileDuration = () => {
  const { userSubscriptionPlan } = useUserSubscriptionPlan();

  return {
    inMinutes: userSubscriptionPlan.maxFileDurationInMinutes,
    inSeconds: userSubscriptionPlan.maxFileDurationInMinutes * 60,
  };
};

export default useMaxMediaFileDuration;
