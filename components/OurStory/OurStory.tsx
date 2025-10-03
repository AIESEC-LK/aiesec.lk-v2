import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../constants/ourStory.constants";
import OurStoryCard from "./subComponents/OurStoryCard";

export default function OurStory() {
  return (
    <section className="relative bg-gradient-to-b from-gray-400 to-white ">
      <div className="container mx-auto px-4 lg:px-8">
        <OurStoryCard />
      </div>
    </section>
  );
}
