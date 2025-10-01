import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function EntityCard({
  entity,
}: {
  entity: { name: string; logo: string };
}) {
  return (
    <Card className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group cursor-pointer flex flex-col items-center border-0 shadow-none">
      <CardContent className="flex flex-col items-center p-4">
        <div
          className="w-28 h-28 mb-3 flex items-center justify-center rounded-lg p-3"
          style={{ minHeight: 112 }}
        >
          <Image
            src={entity.logo || "/placeholder.svg"}
            alt={entity.name}
            width={96}
            height={96}
            className="object-contain max-h-24 max-w-24"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="text-sm text-gray-900 font-normal text-center">
          {entity.name}
        </div>
      </CardContent>
    </Card>
  );
}
