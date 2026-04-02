import Hero from "../components/Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Portfolio isHome={true} />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
