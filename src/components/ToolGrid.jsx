import { tools } from "../data/tools";
import ToolCard from "./ToolCard";

function ToolGrid({ selectedFiles }) {
  const hasFiles = selectedFiles.length > 0;

  const hasPDF = selectedFiles.some((file) => file.type === "application/pdf");

  const hasImage = selectedFiles.some((file) => file.type.startsWith("image/"));

  const filteredTools = tools.filter((tool) => {
    if (!hasFiles) return true;

    if (hasPDF && tool.category === "PDF") return true;

    if (hasImage && tool.category === "Image") return true;

    return false;
  });
  return (
    <section id="tools" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="font-recia text-3xl md:text-4xl text-text-main">
          Explore Our Tools
        </h2>

        <p className="text-text-main/60 mt-3">
          Everything you need to manage your files in one place.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default ToolGrid;
