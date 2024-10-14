import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Image from "next/image";
import { useImageUpload } from "@/hooks/utils/useImageUpload";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 1024 * 1024;

interface ImageUploadProps {
  fieldName: string;
  uploadType: "profile" | "property";
  acceptedFileTypes?: Record<string, string[]>;
  maxFileSize?: number;
  multiple?: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  fieldName,
  uploadType,
  acceptedFileTypes = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  },
  maxFileSize = MAX_FILE_SIZE,
  multiple = false,
}) => {
  const [field] = useField(fieldName);
  const { setFieldValue } = useFormikContext();
  const { onDrop, isLoading, error, file } = useImageUpload(uploadType);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      onDrop(
        acceptedFiles,
        rejectedFiles,
        maxFileSize,
        setFieldValue,
        fieldName,
      );
    },
    [onDrop, maxFileSize, setFieldValue, fieldName],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    multiple,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : isLoading ? (
          <Loader2 className="mx-auto w-10 h-10 text-blue-950 animate-spin" />
        ) : (
          <p>Drag and drop an image here, or click to select an image</p>
        )}
        {field.value && (
          <div className="mt-2 relative w-full h-40">
            <Image
              src={field.value}
              alt="Preview"
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
        )}
        <ErrorMessage
          name={fieldName}
          component="div"
          className="text-red-500"
        />
      </div>
    </>
  );
};

export default ImageUpload;
