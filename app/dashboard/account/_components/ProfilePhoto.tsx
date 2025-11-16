"use client";

import { Camera, Cross, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { FormEvent, useRef, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProfilePhotoSkeleton from "./ProfilePhotoSkeleton";

const ProfilePhoto = () => {
  const { user, isLoading, refetchUserInfo } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const onFileSelect = (files: FileList | null) => {
    if (!files || files?.length === 0) return;

    const file = files[0];

    console.log("file: ", file);

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  if (isLoading) {
    return <ProfilePhotoSkeleton />;
  }

  const onCancelFileUpload = (e: FormEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFile(null);

    // Reset input so selecting same file again works
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadProfilePhoto = async () => {
    if (!file) return;

    setIsFileUploading(true);

    try {
      const formData = new FormData();
      formData.append("profile_image", file); // ← Only appending the image

      const { data } = await axiosInstance.patch("/users/me/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refetchUserInfo(data);

      setPreview(null);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsFileUploading(false);
    }
  };

  return (
    <Card className="border-slate-200 mb-4 sm:w-max">
      <CardContent className="">
        <div className="flex flex-wrap sm:flex-row items-center gap-4 md:gap-8">
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 md:w-24 md:h-24">
              {preview ? (
                <AvatarImage
                  src={preview}
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
              ) : (
                <AvatarImage
                  src={user?.profile_image}
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
              )}
              <AvatarFallback className="uppercase">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <Input
              id="file"
              accept="image/*"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => onFileSelect(e.target.files)}
            />
            {preview ? (
              <Button
                variant={"ghost"}
                size={"sm"}
                className="absolute bottom-0 right-0 bg-destructive text-white rounded-lg 
                 hover:bg-destructive/85 transition-colors shadow-lg cursor-pointer"
                onClick={onCancelFileUpload}
              >
                <Trash className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            ) : (
              <Label
                htmlFor="file"
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-lg 
                 hover:bg-primary/85 transition-colors shadow-lg cursor-pointer"
              >
                <Camera className="w-3 h-3 md:w-4 md:h-4" />
              </Label>
            )}
          </div>

          <Button
            className="text-sm md:text-base w-full sm:w-auto cursor-pointer"
            disabled={!preview || !file}
            onClick={handleUploadProfilePhoto}
          >
            <Upload className="w-3 h-3 md:w-4 md:h-4" />
            {isFileUploading ? "Uploading..." : "Upload New Photo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhoto;
