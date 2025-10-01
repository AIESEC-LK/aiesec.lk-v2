

import OurPartners from "@/components/OurPartners/OurPartners";
import FAQ from "@/components/FAQ/FAQ";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import OurStory from "@/components/OurStory";
export default function Home() {
  return (
    <div >
        <OurStory />
      <OurPartners />
      <FAQ />
      <Contact />
      <Footer />

    </div>
  );
}
