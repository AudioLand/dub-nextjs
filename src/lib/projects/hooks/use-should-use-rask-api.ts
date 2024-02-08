// flagsmith
import flagsmith from "flagsmith";

// constants
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

const useshouldUseAlexAPI = () => {
  const shouldUseAlexAPI: boolean = flagsmith.hasFeature(FEATURES_IDS_LIST.use_rask_api);
  return shouldUseAlexAPI;
};

export default useshouldUseAlexAPI;
