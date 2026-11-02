import { ShieldCheck, Zap, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="bg-cream px-6 pt-20 pb-16 font-recia">
      <div className="max-w-5xl mx-auto text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 bg-pink px-4 py-2 rounded-full mb-8">
          <Sparkles size={16} className="text-sage-dark" />
          <span className="text-sm font-medium text-text-main">
            Free tools. No registration required.
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-text-main leading-tight">
          Everything you need
          <br />
          <span className="text-sage">to manage your files.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-text-main/70 max-w-2xl mx-auto">
          Convert, compress and manage your files with simple, fast and secure
          tools. Everything happens right in your browser.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-sage" size={20} />
            <span className="text-sm">100% Private</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="text-sage" size={20} />
            <span className="text-sm">Fast Processing</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="text-sage" size={20} />
            <span className="text-sm">Completely Free</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
