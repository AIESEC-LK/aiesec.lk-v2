import Image from "next/image";

export function EntityCard({
  entity,
}: {
  entity: { name: string; logo: string };
}) {
  return (
    <div className="group cursor-pointer opacity-0 transform translate-y-4 transition-all duration-700 animate-on-scroll:opacity-100 animate-on-scroll:translate-y-0">
      <div className="p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-3 sm:mb-4 flex items-center justify-center transition-all duration-300">
          <Image
            src={entity.logo || "/placeholder.svg"}
            alt={entity.name}
            width={70}
            height={70}
            className="object-contain max-h-16 max-w-16 sm:max-h-20 sm:max-w-20 md:max-h-24 md:max-w-24 lg:max-h-28 lg:max-w-28 transition-transform duration-300 group-hover:scale-110"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-xs sm:text-xs md:text-sm text-slate-600 font-medium text-center leading-tight group-hover:text-slate-800 transition-colors duration-300 px-1">
          {entity.name}
        </div>
      </div>
    </div>
  );
}
