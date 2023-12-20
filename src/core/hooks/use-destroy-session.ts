import { useApiRequest } from "~/core/hooks/use-api";
import useSWRMutation from "swr/mutation";
import configuration from "~/configuration";

/**
 * @name useDestroySession
 * @description A hook to destroy the current Firebase session cookie. This
 * needs to be called when the user signs out.
 */
export function useDestroySession() {
  const endpoint = configuration.paths.api.sessionSignOut;
  const fetcher = useApiRequest();

  return useSWRMutation(endpoint, (path) => {
    return fetcher({ path });
  });
}
