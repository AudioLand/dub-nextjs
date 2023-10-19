import flagsmith from "flagsmith";
import FEATURES_IDS_LIST from "../features-ids-list";

const useTargetLanguages = () => {
	const valueString: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
	const targetLanguages: string[] = JSON.parse(valueString);

	return targetLanguages;
};

export default useTargetLanguages;
