import OurPartners from "@/components/OurPartners/OurPartners";
import FAQ from "@/components/FAQ/FAQ";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import OurStory from "@/components/OurStory/OurStory";

import { Entities } from "@/components/Entities/Entities";
import { OpportunitiesForPartners } from "@/components/OpportunitiesForPartners/OpportunitiesForPartners";
import Navigation from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
export default function Home() {
  return (
    <div >
      <Navigation />
      <Hero />
      <div className="relative">

     

          <OurStory />
       
      </div>


      <div className=" ">
        <Entities />
      </div>

      <OpportunitiesForPartners />
      <OurPartners />
      <FAQ />
      <Contact />


      <Footer />
    </div>
  );
}
