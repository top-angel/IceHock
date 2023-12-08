import React, { useState, ChangeEvent, useRef, useEffect } from "react";

interface SelectedImage {
  file: File;
  url: string;
}

type props = {
  className?: string;
  onImageUpload?: (imageFile: File) => void;
};

const ImageUploader = (props: props) => {
  const { className, onImageUpload } = props;

  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({
          file: file,
          url: reader.result as string,
        });
        onImageUpload && onImageUpload(file);
        inputRef.current = null;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full ${props.className}`}>
      {selectedImage ? (
        <div className="w-full h-full">
          <div className="w-full px-2 text-xs font-normal font-primary text-darkgray">
            <div className="px-2 py-1 text-white bg-black rounded-lg bg-opacity-20">
              {selectedImage.file.name}
            </div>
            <button
              onClick={handleButtonClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium w-full justify-center text-white rounded-md bg-gradient-to-r from-[#634CF3] to-[#5E3BC3]"
            >
              Reupload
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className={`border-1 w-full flex flex-col justify-center items-center rounded-xl border border-dashed border-bordergray text-center font-primary text-xs font-normal text-darkgray ${className}`}
        >
          <div className="text-sm font-normal text-white font-primary">
            <div className="cursor-pointer text-primary bg-gradient-to-r from-[#4441EC] to-[#804BF2]  inline-block text-transparent bg-clip-text">
              Click to upload
            </div>
            <div> or drag and drop</div>
          </div>
          <div className="mt-1 text-sm font-normal text-white font-primary">
            CSV file
          </div>
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
