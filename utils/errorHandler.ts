import logger from "@/utils/logger";

export const logError = (error: any): void => {
  logger.error(`Error: ${error}`);

  if (error.response) {
    logger.error(`Response data: ${error.response.data}`);
    logger.error(`Response status: ${error.response.status}`);
    logger.error(`Response headers: ${error.response.headers}`);
  } else if (error.request) {
    logger.error(`No response received: ${error.request}`);
  } else {
    logger.error(`Error message: ${error.message}`);
  }
};

export const handleError = (
  error: any,
  defaultMessage: string,
  setError: (message: string) => void,
) => {
  if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError(defaultMessage);
  }
};
