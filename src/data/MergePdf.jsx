import { Trash2, ArrowUp, ArrowDown, Download } from "lucide-react";
import { useState } from "react";
import { mergePDFs } from "../utils/pdfUtils";

function MergePDF({ selectedFiles, onBack }) {
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");
  const [mergedBlob, setMergedBlob] = useState(null);
  const [files, setFiles] = useState(() =>
    selectedFiles.filter((file) => file.type === "application/pdf"),
  );

  function handleDownload() {
    if (!mergedBlob) return;

    const url = URL.createObjectURL(mergedBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quicktools-merged.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  async function handleMerge() {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files.");
      return;
    }

    try {
      setIsMerging(true);
      setError("");
      setMergedBlob(null);

      const result = await mergePDFs(files);

      setMergedBlob(result);
      console.log("PDF merged successfully!");
    } catch (error) {
      console.error("Merge failed:", error);
      setError("Unable to merge PDFs. Please check your files.");
    } finally {
      setIsMerging(false);
    }
  }

  function handleMoveFile(index, direction) {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= files.length) {
      return;
    }

    const updatedFiles = [...files];

    [updatedFiles[index], updatedFiles[newIndex]] = [
      updatedFiles[newIndex],
      updatedFiles[index],
    ];

    setFiles(updatedFiles);
  }

  function handleRemoveFile(indexToRemove) {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="text-text-main/60 hover:text-text-main mb-6"
      >
        ← Back to tools
      </button>

      <div className="text-center mb-8">
        <h2 className="font-recia text-3xl text-text-main">Merge PDF</h2>

        <p className="text-text-main/60 mt-2">
          Combine multiple PDF files into one document.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-text-main/10 p-6">
        <h3 className="font-semibold text-text-main mb-5">
          Your PDF files ({files.length})
        </h3>

        {files.length === 0 ? (
          <p className="text-center py-8 text-text-main/50">
            No PDF files available. Please upload PDFs first.
          </p>
        ) : (
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={file.id || `${file.name}-${index}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-text-main/10 bg-[#FEFAF3]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-main truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-text-main/50">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveFile(index, -1)}
                    disabled={index === 0}
                    className="p-2 rounded-lg hover:bg-[#B8CFB3]/30 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp size={18} />
                  </button>

                  <button
                    onClick={() => handleMoveFile(index, 1)}
                    disabled={index === files.length - 1}
                    className="p-2 rounded-lg hover:bg-[#B8CFB3]/30 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown size={18} />
                  </button>

                  <button
                    onClick={() => handleRemoveFile(index)}

                    className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    title="Remove from merge"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleMerge}
          disabled={isMerging || files.length < 2}
          className="w-full mt-6 py-3 rounded-xl bg-[#84A282] text-white font-semibold hover:bg-[#6F8E6D] disabled:opacity-50"
        >
          {isMerging ? "Merging PDFs..." : "Merge PDF"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {mergedBlob && (
          <button
            onClick={handleDownload}
            className="w-full mt-3 py-3 rounded-xl border border-[#84A282] text-[#6F8E6D] font-semibold hover:bg-[#B8CFB3]/20 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Merged PDF
          </button>
        )}
      </div>
    </section>
  );
}

export default MergePDF;
