import { IndexRail } from "@/components/IndexRail";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/sections/Hero";
import { ProofStrip } from "@/sections/ProofStrip";
import { VideoReel } from "@/sections/VideoReel";
import { Services } from "@/sections/Services";
import { Work } from "@/sections/Work";
import { Process } from "@/sections/Process";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <IndexRail />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <ProofStrip />
        <VideoReel />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
