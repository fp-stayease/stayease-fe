"use client";

import { useState, useEffect, FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { paymentService } from "@/services/paymentService";
import ImageDropZone from "@/components/ImageDropZone";
import {useAlert} from "@/context/AlertContext";

interface UploadProofDialogProps {
  bookingId?: string;
}

const UploadProofDialog: FC<UploadProofDialogProps> = ({
  bookingId: propBookingId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(
    propBookingId || null,
  );
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!propBookingId) {
      const params = new URLSearchParams(searchParams);
      const id = params.get("id");
      setBookingId(id);
    }
  }, [searchParams, propBookingId]);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (!bookingId) {
      console.error("Booking ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await paymentService.uploadPayment(bookingId, formData);
      showAlert("success", "Your payment proof successfully uploaded");
      router.push("/profile/bookings");
    } catch (error) {
      showAlert("error", "Upload failed. Please try again");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-950" variant="ghost">
          <h1>Upload Payment Proof</h1>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Payment Proof</DialogTitle>
        <DialogDescription>
          Drop your payment proof image here, or click to select a file. Only
          JPG, JPEG, or PNG files up to 1MB are allowed.
        </DialogDescription>
        <ImageDropZone
          onFileChange={handleFileChange}
          acceptedFileTypes={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          }}
          maxFileSize={1024 * 1024} // 1MB
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="link" className="text-blue-950">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleUpload}
            disabled={!file}
            className="bg-blue-950"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProofDialog;
