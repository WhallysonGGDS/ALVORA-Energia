import Header from "@/components/Header";
import MotionDirector from "@/components/MotionDirector";
import SunArc from "@/components/SunArc";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Energy from "@/components/sections/Energy";
import Operations from "@/components/sections/Operations";
import Solar from "@/components/sections/Solar";
import Wind from "@/components/sections/Wind";
import Infrastructure from "@/components/sections/Infrastructure";
import Technology from "@/components/sections/Technology";
import Impact from "@/components/sections/Impact";
import People from "@/components/sections/People";
import Sustainability from "@/components/sections/Sustainability";
import Investors from "@/components/sections/Investors";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:p-3">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Energy />
        <Operations />
        <Solar />
        <Wind />
        <Infrastructure />
        <Technology />
        <Impact />
        <People />
        <Sustainability />
        <Investors />
        <FinalCta />
      </main>
      <Footer />
      <SunArc />
      <MotionDirector />
    </>
  );
}
