// flagsmith
import flagsmith from "flagsmith";

// constants
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

const useTargetLanguages = () => {
  const valueString: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  const targetLanguages: string[] = JSON.parse(valueString);

  return targetLanguages;
};

export default useTargetLanguages;
