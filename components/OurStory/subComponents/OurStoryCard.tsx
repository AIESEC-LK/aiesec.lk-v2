import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../../constants/ourStory.constants";

export default function OurStoryCard() {
  return (
    <div className="border border-muted rounded-2xl bg-background/80 shadow-sm px-6 py-10 max-w-3xl mx-auto text-center mb-16">
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
  );
}
