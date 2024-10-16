import { useCallback, useState } from "react";
import propertyService from "@/services/propertyService";
import { profileService } from "@/services/profileService";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";

type ImageUploaderType = "profile" | "property";
export const useImageUpload = (type: ImageUploaderType) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const handleImageUpload = useCallback(
    async (
      file: File,
      fieldName: string,
      setFieldValue: (field: string, value: any) => void,
    ): Promise<string> => {
      setIsLoading(true);
      setError(null);
      try {
        const uploadFunction =
          type === "profile"
            ? profileService.uploadAvatar
            : propertyService.uploadImage;
        const imageUrl = await uploadFunction(file);
        setFieldValue(fieldName, imageUrl);
        showAlert("success", "Image uploaded successfully");
        return imageUrl;
      } catch (error) {
        logger.error("Error uploading image: ", { error });
        setError("Failed to upload image");
        showAlert("error", "Failed to upload image");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert, type],
  );

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      rejectedFiles: any[],
      maxFileSize: number,
      setFieldValue: (field: string, value: any) => void,
      fieldName: string,
    ) => {
      if (rejectedFiles.length > 0) {
        if (rejectedFiles[0].file.size > maxFileSize) {
          setError(
            `File is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB.`,
          );
          showAlert(
            "error",
            error?.toString() || "File is too large. Maximum size is 1MB.",
          );
        } else {
          setError("Please upload only accepted file types.");
          showAlert(
            "error",
            error?.toString() || "Please upload only accepted file types.",
          );
        }
      } else if (acceptedFiles.length > 0) {
        await handleImageUpload(acceptedFiles[0], fieldName, setFieldValue);
        setFile(acceptedFiles[0]);
        setError(null);
      }
    },
    [handleImageUpload, showAlert, error],
  );

  return { handleImageUpload, onDrop, file, isLoading, error };
};
