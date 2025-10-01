import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../constants/ourStory.constants";
import OurStoryCard from "./subComponents/OurStoryCard";

export default function OurStory() {
  return (
    <section className="relative bg-gradient-to-b from-gray-400 to-white pt-8 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <OurStoryCard />
      </div>
    </section>
  );
}
