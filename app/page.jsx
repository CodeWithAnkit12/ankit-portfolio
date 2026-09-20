import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Offcanvas from "@/components/Offcanvas";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statement from "@/components/Statement";
import Bio from "@/components/Bio";
import Strip from "@/components/Strip";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Awards from "@/components/Awards";
import Experience from "@/components/Experience";
import Logos from "@/components/Logos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import ToTop from "@/components/ToTop";
import SiteMotion from "@/components/SiteMotion";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Header />
      <Offcanvas />

      <main id="top">
        {/* Light half */}
        <Hero />
        <About />
        <Statement />
        <Bio />

        {/* Dark half — marquee, services, work, recognition */}
        <section className="dark">
          <Strip />
          <Services />
          <Works />
          <Awards />
        </section>

        {/* Light again */}
        <Experience />
        <Logos />

        {/* Dark close */}
        <section className="dark">
          <Contact />
          <Footer />
        </section>
      </main>

      <Popup />
      <ToTop />

      {/* One client component drives every behaviour on the page. */}
      <SiteMotion />
    </>
  );
}
