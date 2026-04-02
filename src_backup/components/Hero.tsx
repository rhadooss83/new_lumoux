import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-40 pb-20 px-4">
      <div className="relative mb-6 flex flex-col items-center">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter flex flex-wrap justify-center items-center gap-4">
          <span className="relative z-10 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Clarity
          </span>
          <span className="text-zinc-400/80 blur-[2px] transition-all duration-700 hover:blur-none hover:text-white cursor-default">Through Design.</span>
        </h1>
      </div>

      <p className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed mb-10 mt-6">
        We transform complex problems into minimal, high-performing digital
        experiences. A UI/UX design studio focused on websites design, branding and logo design, with a human-centric approach.
        Freelance UI/UX Designer for Startups & Founders world wide.
      </p>

      <Link
        to="/portfolio"
        className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
      >
        View My Work
      </Link>
    </div>
  );
}
