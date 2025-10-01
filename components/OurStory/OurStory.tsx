import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../constants/ourStory.constants";
import OurStoryCard from "./subComponents/OurStoryCard";

export default function OurStory() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <OurStoryCard />
      </div>
    </section>
  );
}
