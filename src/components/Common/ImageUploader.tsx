import React, { useState, ChangeEvent, useRef } from "react";

interface SelectedImage {
  file: File;
  url: string;
}

type props = {
  className?: string;
  onImageUpload: (props: any) => void;
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
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          if (img.width < 100 || img.height < 100) {
            alert("Image should be larger than 100x100 pixels.");
          } else {
            setSelectedImage({
              file: file,
              url: reader.result as string,
            });
            onImageUpload({
              file: file,
              url: reader.result as string,
            });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {
        <div
          onClick={handleButtonClick}
          className={`border py-4 border-dashed w-full items-center rounded-xl  border-bordergray text-center font-primary text-xs font-normal text-darkgray ${className}`}
        >
          <div className="text-sm font-normal text-center font-primary">
            <span className="text-white cursor-pointer text-primary">
              Click to upload or drag and drop
            </span>
          </div>
          <div className="text-sm font-normal text-gray-500 font-primary text-graymiddle ">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </div>
        </div>
      }
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
