import {
  Files,
  Scissors,
  FileDown,
  FileImage,
  Image,
  RefreshCw,
  Maximize,
} from "lucide-react";

const iconMap = {
  files: Files,
  scissors: Scissors,
  "file-down": FileDown,
  "file-image": FileImage,
  image: Image,
  "refresh-cw": RefreshCw,
  maximize: Maximize,
};

function ToolCard({ tool, onSelectTool }) {
  const Icon = iconMap[tool.icon];

  return (
    <div
      onClick={() => {
        onSelectTool(tool.id);
      }}

      className="bg-white border border-sage-light/60 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="w-12 h-12 bg-pink rounded-xl flex items-center justify-center mb-4">
        <Icon size={24} className="text-sage-dark" />
      </div>

      <h3 className="font-recia text-xl text-text-main">{tool.name}</h3>

      <p className="text-sm text-text-main/60 mt-2 leading-relaxed">
        {tool.description}
      </p>

      <div className="mt-4">
        <span className="text-xs bg-sage-light/30 text-sage-dark px-3 py-1 rounded-full">
          {tool.category}
        </span>
      </div>
    </div>
  );
}

export default ToolCard;
