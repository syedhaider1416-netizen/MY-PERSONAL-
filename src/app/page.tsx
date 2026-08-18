import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ConsoleNav } from "@/components/explore/ConsoleNav";
import { ScrollProgress } from "@/components/explore/ScrollProgress";
import { ConsoleHero } from "@/sections/console/ConsoleHero";
import { ConsoleBento } from "@/sections/console/ConsoleBento";
import { ConsoleWork } from "@/sections/console/ConsoleWork";
import { ProofStrip } from "@/sections/ProofStrip";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ConsoleNav />
      <FloatingWhatsApp />
      <main>
        <ConsoleHero />
        <ProofStrip />
        <ConsoleBento />
        <ConsoleWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
