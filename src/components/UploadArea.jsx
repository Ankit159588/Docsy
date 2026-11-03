import { useState } from "react";
import { CloudUpload, ShieldCheck, X, FileImage, FileText } from "lucide-react";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function UploadArea() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file validation and selection
  function handleFiles(files) {
    const validFiles = [];
    const newErrors = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(`${file.name}: Unsupported file format`);
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: File exceeds 10 MB`);
      } else {
        validFiles.push(file);
      }
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

    setErrors(newErrors);
  }

  // Handle file picker
  function handleFileChange(event) {
    const files = Array.from(event.target.files);

    handleFiles(files);

    event.target.value = "";
  }

  // Handle drag and drop
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);

    handleFiles(files);
  }

  // Remove individual file
  function handleRemoveFile(indexToRemove) {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  }

  // Remove all files
  function handleClearAll() {
    setSelectedFiles([]);
    setErrors([]);
  }

  // Get file icon
  function getFileIcon(file) {
    if (file.type === "application/pdf") {
      return FileText;
    }

    return FileImage;
  }

  // Calculate total selected file size
  const totalSize = selectedFiles.reduce((total, file) => total + file.size, 0);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="font-recia text-3xl md:text-4xl text-text-main">
          Ready to get started?
        </h2>

        <p className="text-text-main/60 mt-3">
          Choose a file and let QuickTools handle the rest.
        </p>
      </div>

      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white border-2 border-dashed rounded-2xl p-10 md:p-16 text-center transition-colors ${
          isDragging ? "border-sage bg-sage-light/20" : "border-sage-light"
        }`}
      >
        {/* Upload Icon */}
        <div className="w-16 h-16 bg-pink rounded-full flex items-center justify-center mx-auto mb-6">
          <CloudUpload size={32} className="text-sage-dark" />
        </div>

        {/* Upload Text */}
        <h3 className="font-recia text-2xl md:text-3xl text-text-main">
          {isDragging ? "Release to upload files" : "Drop your files here"}
        </h3>

        <p className="text-text-main/60 mt-3">
          or click the button below to browse
        </p>

        {/* File Input */}
        <input
          onChange={handleFileChange}
          multiple
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          className="hidden"
        />

        {/* Choose Files Button */}
        <label
          htmlFor="fileInput"
          className="inline-block mt-7 px-8 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage-dark transition-colors cursor-pointer"
        >
          Choose Files
        </label>

        {/* Supported Formats */}
        <p className="text-sm text-text-main/50 mt-5">JPG, PNG, WEBP, PDF</p>

        <p className="text-xs text-text-main/40 mt-1">Maximum 10 MB per file</p>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6 space-y-4">
          {/* File List Heading */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-text-main">
              Selected Files ({selectedFiles.length})
            </h3>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Total Size */}
          <p className="text-sm text-text-main/60">
            Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB
          </p>

          {/* Individual File Cards */}
          {selectedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file);

            return (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="bg-white border border-sage-light rounded-xl p-4 flex items-center justify-between gap-4"
              >
                {/* File Information */}
                <div className="flex items-center gap-3 min-w-0">
                  <FileIcon size={24} className="text-sage-dark shrink-0" />

                  <div className="min-w-0">
                    <p className="font-medium text-text-main truncate">
                      {file.name}
                    </p>

                    <p className="text-sm text-text-main/60 mt-1">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="p-2 rounded-lg text-text-main/60 hover:bg-pink hover:text-red-600 transition-colors shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Privacy Message */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <ShieldCheck size={19} className="text-sage" />

        <p className="text-sm text-text-main/60">
          100% Private · Files stay on your device
        </p>
      </div>
    </section>
  );
}

export default UploadArea;
