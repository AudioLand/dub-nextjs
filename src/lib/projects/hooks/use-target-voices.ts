import { LANGUAGES_AND_VOICES_CONFIG } from "../languages-and-voices-config";
import { TargetVoice } from "../types/target-voice";

const useTargetVoices = (currentLanguage: string) => {
  const availableVoices: TargetVoice[] = LANGUAGES_AND_VOICES_CONFIG.filter((voice) =>
    voice.languages.includes(currentLanguage.toLocaleLowerCase()),
  );

  return availableVoices;
};

export default useTargetVoices;
