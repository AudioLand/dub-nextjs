import flagsmith from "flagsmith";
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

interface IInfoTooltipTexts {
  supported_languages: {
    title: string;
    for_source_file: {
      title: string;
      languages_list: string[];
    };
    for_export_file: {
      title: string;
      languages_list: string[];
    };
  };
  recommendations: {
    title: string;
    recommendations_list: string[];
  };
}

const useRequirementsInfoTooltipText = () => {
  const valueString: string = flagsmith.getValue(FEATURES_IDS_LIST.requirements_info_tooltip);
  const isInfoTooltipEnabled = flagsmith.hasFeature(FEATURES_IDS_LIST.requirements_info_tooltip);
  const infoTooltipTexts: IInfoTooltipTexts = JSON.parse(valueString);

  return {
    isInfoTooltipEnabled,
    infoTooltipTexts,
  };
};

export default useRequirementsInfoTooltipText;
