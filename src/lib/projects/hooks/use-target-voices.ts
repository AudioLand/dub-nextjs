// hooks
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useApiRequest } from "~/core/hooks/use-api";
import { TargetVoice } from "../types/target-voice";

const VOICES_11LABS_API_URL = "https://api.elevenlabs.io/v1/voices";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

const useTargetVoices = () => {
  const fetcher = useApiRequest<{ voices: TargetVoice[] }>();

  if (!ELEVENLABS_API_KEY) {
    throw new Error("ElevenLabs api key is not defined");
  }

  const { trigger: fetchVoices, ...mutationState } = useSWRMutation(
    VOICES_11LABS_API_URL,
    (path) => {
      return fetcher({
        path,
        method: "GET",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      });
    },
  );

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  return {
    targetVoices: mutationState.data?.voices || [],
    fetchTargetVoicesStatus: mutationState,
  };
};

export default useTargetVoices;
