// flagsmith
import flagsmith from "flagsmith";

// constants
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

const useShouldUseRaskAPI = () => {
  const shouldUseRaskAPI: boolean = flagsmith.hasFeature(FEATURES_IDS_LIST.use_rask_api);
  return shouldUseRaskAPI;
};

export default useShouldUseRaskAPI;
