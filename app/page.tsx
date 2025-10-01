import { Entities } from "@/components/Entities";
import OurStory from "@/components/OurStory";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <OurStory />

      <Entities />
    </div>
  );
}
