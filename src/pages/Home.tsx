import Portfolio from "./Portfolio";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Helmet>
        <title>LumoUX Design Studio | Premium UI/UX Design Services</title>
        <meta name="description" content="LumoUX is a premium UI/UX design studio specializing in clear, functional, human-centered design for startups and founders." />
      </Helmet>
      <Portfolio isHome={true} />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
