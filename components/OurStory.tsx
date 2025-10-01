import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../constants/ourStory.constants";

export default function OurStory() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            {ourStorySriLankaHeader}
          </h2>
          <div className="space-y-6">
            {ourStorySriLanka.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xl text-muted-foreground leading-relaxed text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
