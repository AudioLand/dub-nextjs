// flagsmith
import flagsmith from "flagsmith";

// constants
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

const useTargetLanguages = () => {
  const valueString: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  let targetLanguages: string[];
  try {
    targetLanguages = JSON.parse(valueString);
  } catch (error) {
    console.error("Failed to parse json of target languages:", error);
    targetLanguages = [];
  }

  return targetLanguages;
};

export default useTargetLanguages;
