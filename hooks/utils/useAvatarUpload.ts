import { useProfile } from "@/context/ProfileContext";
import { useEffect, useState } from "react";
import logger from "@/utils/logger";

export const useAvatarUpload = (isOpen: boolean, onClose: () => void) => {
  const { profile, uploadAvatar, removeAvatar } = useProfile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    profile?.avatarUrl,
  );
  const [isUploading, setIsUploading] = useState(false);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(profile?.avatarUrl);
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(undefined);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await uploadAvatar(selectedFile);
      onClose();
    } catch (error) {
      logger.error("Error uploading avatar:", { error });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsUploading(true);
    try {
      await removeAvatar();
      setPreviewUrl(undefined);
      onClose();
    } catch (error) {
      logger.error("Error removing avatar:", { error });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedFile,
    previewUrl,
    isUploading,
    handleFileChange,
    handleUpload,
    handleRemove,
  };
};
