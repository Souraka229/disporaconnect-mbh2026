import Image from "next/image"

interface HeroIphoneProps {
  imageSrc: string
  alt: string
  className?: string
}

export default function HeroIphone({ imageSrc, alt, className = "" }: HeroIphoneProps) {
  return (
    <div className={`relative mx-auto w-[280px] sm:w-[320px] md:w-[390px] ${className}`}>
      {/* Glow Effect au hover pour un effet interactif premium */}
      <div className="absolute inset-0 bg-[#00A651]/20 blur-[60px] rounded-full scale-75 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />
      
      <div className="relative bg-white dark:bg-zinc-900 border-[8px] border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden aspect-[390/844] flex flex-col group transition-transform duration-500 hover:-translate-y-2">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-[120px] h-6 bg-zinc-200 dark:bg-zinc-800 rounded-b-3xl relative flex items-center justify-end px-3">
            <div className="w-1.5 h-1.5 bg-black/40 dark:bg-black/80 rounded-full" />
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full h-full relative bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
          {/* Fallback Display if no real image is loaded */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-zinc-400 bg-zinc-100 dark:bg-zinc-900">
            <p className="text-xs mb-2">Espace Image</p>
            <p className="font-mono text-[10px] break-all border border-dashed border-zinc-300 dark:border-zinc-700 p-2 rounded w-full">
              {imageSrc}
            </p>
            <p className="text-[10px] mt-4 opacity-60">
              (Remplacez par votre capture {imageSrc})
            </p>
          </div>

          {/* Next.js Image Element (Will cover fallback if valid src) */}
          <Image 
            src={imageSrc} 
            alt={alt}
            fill
            className="object-cover relative z-10"
            sizes="(max-width: 768px) 280px, 390px"
            priority
          />
        </div>
      </div>
    </div>
  )
}
