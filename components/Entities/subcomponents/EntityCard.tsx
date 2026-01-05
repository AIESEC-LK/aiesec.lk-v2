import Image from "next/image";

export function EntityCard({
  entity,
}: {
  entity: { name: string; logo: string };
}) {
  return (
    <div className="group cursor-pointer opacity-0 transform translate-y-4 transition-all duration-700 animate-on-scroll:opacity-100 animate-on-scroll:translate-y-0">
      <div className="p-4 sm:p-5 md:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
        <div
          className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mb-3 sm:mb-4 flex items-center justify-center transition-all duration-300"
          style={{ minHeight: 64 }}
        >
          <Image
            src={entity.logo || "/placeholder.svg"}
            alt={entity.name}
            width={48}
            height={48}
            className="object-contain max-h-12 max-w-12 sm:max-h-14 sm:max-w-14 md:max-h-16 md:max-w-16 transition-transform duration-300 group-hover:scale-110"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="text-xs sm:text-sm md:text-base text-slate-600 font-medium text-center leading-tight group-hover:text-slate-800 transition-colors duration-300 px-1">
          {entity.name}
        </div>
      </div>
    </div>
  );
}
