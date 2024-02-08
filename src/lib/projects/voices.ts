import { LANGUAGES_AND_VOICES_CONFIG } from "./languages-and-voices-config";
import { TargetVoice } from "./types/target-voice";

export const filterVoicesByLanguage = (lang: string, shouldUseAlexAPI?: boolean) => {
  const availableVoices: TargetVoice[] = LANGUAGES_AND_VOICES_CONFIG.filter(
    (voice) =>
      voice.languages.includes(lang.toLowerCase()) &&
      (shouldUseAlexAPI ? voice.provider === "eleven_labs" : true),
  );

  return availableVoices;
};
