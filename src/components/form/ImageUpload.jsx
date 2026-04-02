import { useEffect, useState } from "react";

const ImageUpload = ({ 
  onImagesChange, 
  maxImages = 5, 
  className = "",
  disabled = false,
  acceptedTypes = "image/*",
  singleImage,
  image = null,
}) => {
  const isSingleImageMode =
    typeof singleImage === "boolean" ? singleImage : maxImages === 1;
  const [images, setImages] = useState([]);
  const [singleImagePreview, setSingleImagePreview] = useState(
    typeof image === "string" && image
      ? { id: "existing-image", preview: image }
      : null
  );
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!isSingleImageMode) return;

    if (typeof image === "string" && image) {
      setSingleImagePreview({ id: "existing-image", preview: image });
      return;
    }

    if (image && typeof image === "object" && image.preview) {
      setSingleImagePreview(image);
      return;
    }

    if (!image) {
      setSingleImagePreview(null);
    }
  }, [image, isSingleImageMode]);

  const handleFile = (file) => {
    if (!file) return;

    const newImage = {
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2, 11),
    };

    if (isSingleImageMode) {
      setSingleImagePreview(newImage);
      if (onImagesChange) {
        onImagesChange(newImage);
      }
      return;
    }

    const updatedImages = [...images, newImage].slice(0, maxImages);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };
  
  const handleFiles = (files) => {
    if (!files?.length) return;

    const fileArray = Array.from(files);

    if (isSingleImageMode) {
      handleFile(fileArray[0]);
      return;
    }

    const newImages = fileArray.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2, 11)
    }));
    
    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (id) => {
    if (isSingleImageMode) {
      setSingleImagePreview(null);
      if (onImagesChange) {
        onImagesChange(null);
      }
      return;
    }

    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20" 
            : "border-gray-300 dark:border-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={!isSingleImageMode}
          accept={acceptedTypes}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-brand-600 dark:text-brand-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, GIF up to 10MB each (max {isSingleImageMode ? 1 : maxImages} {isSingleImageMode ? "image" : "images"})
            </p>
          </div>
        </div>
      </div>

      {isSingleImageMode && singleImagePreview && (
        <div className="mt-4">
          <div className="relative group w-40">
            <img
              src={singleImagePreview.preview}
              alt="Preview"
              className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
            />
            <button
              type="button"
              onClick={() => removeImage(singleImagePreview.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {!isSingleImageMode && images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
