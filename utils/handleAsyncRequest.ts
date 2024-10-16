// * Utility function to handle asynchronous requests
import logger from "@/utils/logger";

/** params:
setIsLoading: function to set loading state
setError: function to set error state
requestFn: optional function that returns a promise
successAlert: optional function to show success alert
errorAlert: optional function to show error alert

 can a promise of type T or void
**/

export const handleAsyncRequest = async <T>(
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
  requestFn: () => Promise<T>,
  successAlert?: () => void,
  errorAlert?: (err: any) => void,
): Promise<T | void> => {
  setIsLoading(true);
  setError(null);
  try {
    const result = await requestFn();
    if (successAlert) {
      successAlert();
    }
    return result;
  } catch (err: any) {
    logger.error(err);
    setError(err.message);
    if (errorAlert) {
      errorAlert(err);
    }
  } finally {
    setIsLoading(false);
  }
};
