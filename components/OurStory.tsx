import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../constants/ourStory.constants";

export default function OurStory() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 text-center text-gray-900">
            {ourStorySriLankaHeader}
          </h3>
          <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            {ourStorySriLanka.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
