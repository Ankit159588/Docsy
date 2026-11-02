import { Wrench, Sun, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className=" font-recia w-full bg-cream border-b border-sage-light/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-text-main">
          QuickTools<span className="text-sage">.</span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#tools" className="text-text-main hover:text-sage-dark">
            All Tools
          </a>

          <a href="#about" className="text-text-main hover:text-sage-dark">
            About
          </a>

          <a href="#privacy" className="text-text-main hover:text-sage-dark">
            Privacy
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-pink transition">
            <Sun size={20} />
          </button>

          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
