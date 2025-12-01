"use client"

import { UploadDropzone } from "@uploadthing/react";

interface ImageUploadProps {
    onChange: (url:string) => void
    value: string;
    endpoint: "postImage"
}

function ImageUpload({endpoint, onChange, value}:ImageUploadProps) {
  return (
    <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) =>{
                onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            console.log(error);
        }}
    />
  )
}

export default ImageUpload
