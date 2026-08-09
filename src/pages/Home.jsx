import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Hero from "../features/Hero";
import StatsBar from "../features/StatsBar";
import Approach from "../features/Approach";
import Services from "../features/Services";
import Industries from "../features/Industries";
import EcosystemWheel from "../features/EcosystemWheel";
import Projects from "../features/Projects";
import Team from "../features/Team";
import Testimonials from "../features/Testimonials";
import Blog from "../features/Blog";
import Contact from "../features/Contact";

export default function Home() {
  return (
    <div className="bg-void">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Approach />
        <Services />
        <Industries />
        <EcosystemWheel />
        <Projects />
        <Team />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
