import { CloudUpload, ShieldCheck } from "lucide-react";

function UploadArea() {
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
      <div className="bg-white border-2 border-dashed border-sage-light rounded-2xl p-10 md:p-16 text-center">
        {/* Upload Icon */}
        <div className="w-16 h-16 bg-pink rounded-full flex items-center justify-center mx-auto mb-6">
          <CloudUpload size={32} className="text-sage-dark" />
        </div>

        {/* Upload Text */}
        <h3 className="font-recia text-2xl md:text-3xl text-text-main">
          Drop your files here
        </h3>

        <p className="text-text-main/60 mt-3">
          or click the button below to browse
        </p>

        {/* Button - visual only */}
        <button
          type="button"
          className="mt-7 px-8 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage-dark transition-colors"
        >
          Choose Files
        </button>

        {/* Supported Formats */}
        <p className="text-sm text-text-main/50 mt-5">
          JPG, PNG, WEBP, PDF and more
        </p>
      </div>

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
