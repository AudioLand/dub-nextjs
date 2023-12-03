import { LANGUAGES_AND_VOICES_CONFIG } from "./languages-and-voices-config";
import { TargetVoice } from "./types/target-voice";

export const filterVoicesByLanguage = (lang: string) => {
  const availableVoices: TargetVoice[] = LANGUAGES_AND_VOICES_CONFIG.filter((voice) =>
    voice.languages.includes(lang.toLowerCase()),
  );

  return availableVoices;
};
