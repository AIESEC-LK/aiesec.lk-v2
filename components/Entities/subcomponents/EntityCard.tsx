import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function EntityCard({
  entity,
}: {
  entity: { name: string; logo: string };
}) {
  return (
    <div className="group cursor-pointer">
      <Card className="rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-105 p-6 h-full flex flex-col items-center justify-center min-h-[180px]">
        <CardContent className="flex flex-col items-center p-0">
          <div
            className="w-20 h-20 mb-4 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300"
            style={{ minHeight: 80 }}
          >
            <Image
              src={entity.logo || "/placeholder.svg"}
              alt={entity.name}
              width={64}
              height={64}
              className="object-contain max-h-16 max-w-16 transition-transform duration-300 group-hover:scale-110"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="text-sm text-gray-700 font-medium text-center leading-tight group-hover:text-gray-900 transition-colors duration-300">
            {entity.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
