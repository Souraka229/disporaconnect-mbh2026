import { Check, X } from "lucide-react"

export default function FeeTable() {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-white">
      <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-200">
        <div className="p-4 sm:p-6 text-sm sm:text-base font-medium text-zinc-500">
          Fonctionnalité
        </div>
        <div className="p-4 sm:p-6 text-center border-l border-zinc-200">
          <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Les Autres (WU, etc.)</span>
        </div>
        <div className="p-4 sm:p-6 text-center bg-[#00A651]/5 border-l border-[#00A651]/10">
          <span className="inline-block px-3 py-1 bg-[#00A651] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-2">DiasporaConnect</span>
        </div>
      </div>

      <div className="divide-y divide-zinc-200">
        {/* Row 1 */}
        <div className="grid grid-cols-3 hover:bg-zinc-50 transition-colors">
          <div className="p-4 sm:p-6 text-sm sm:text-base font-medium text-zinc-900 flex items-center">
            Frais de transfert
          </div>
          <div className="p-4 sm:p-6 text-center border-l border-zinc-200 flex items-center justify-center flex-col">
            <span className="text-red-500 font-bold text-lg sm:text-xl">7 - 15%</span>
            <span className="text-xs text-zinc-500 block hidden sm:block">Par transaction</span>
          </div>
          <div className="p-4 sm:p-6 text-center bg-[#00A651]/5 border-l border-[#00A651]/10 flex items-center justify-center flex-col">
            <span className="text-[#00A651] font-bold text-lg sm:text-xl">{'< 0.01%'}</span>
            <span className="text-xs text-[#00A651]/70 block hidden sm:block">Propulsé par Solana</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 hover:bg-zinc-50 transition-colors">
          <div className="p-4 sm:p-6 text-sm sm:text-base font-medium text-zinc-900 flex items-center">
            Délai de réception
          </div>
          <div className="p-4 sm:p-6 text-center border-l border-zinc-200 flex items-center justify-center font-bold text-zinc-600">
            1 à 3 jours ouvrés
          </div>
          <div className="p-4 sm:p-6 text-center bg-[#00A651]/5 border-l border-[#00A651]/10 flex items-center justify-center font-bold text-[#00A651]">
            Immédiat (1s)
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 hover:bg-zinc-50 transition-colors">
          <div className="p-4 sm:p-6 text-sm sm:text-base font-medium text-zinc-900 flex items-center">
            Taux de change
          </div>
          <div className="p-4 sm:p-6 text-center border-l border-zinc-200 flex items-center justify-center">
            <div className="flex items-center gap-2 text-zinc-600">
              <X className="w-5 h-5 text-red-500" /> Majoré (+3%)
            </div>
          </div>
          <div className="p-4 sm:p-6 text-center bg-[#00A651]/5 border-l border-[#00A651]/10 flex items-center justify-center">
            <div className="flex items-center gap-2 text-[#00A651] font-medium">
              <Check className="w-5 h-5" /> Taux réel du marché
            </div>
          </div>
        </div>
        
        {/* Row 4 */}
        <div className="grid grid-cols-3 hover:bg-zinc-50 transition-colors">
          <div className="p-4 sm:p-6 text-sm sm:text-base font-medium text-zinc-900 flex items-center">
            Retrait Mobile Money
          </div>
          <div className="p-4 sm:p-6 text-center border-l border-zinc-200 flex items-center justify-center">
            <div className="flex items-center gap-2 text-zinc-600">
              <X className="w-5 h-5 text-red-500" /> Agence physique
            </div>
          </div>
          <div className="p-4 sm:p-6 text-center bg-[#00A651]/5 border-l border-[#00A651]/10 flex items-center justify-center">
            <div className="flex items-center gap-2 text-[#00A651] font-medium">
              <Check className="w-5 h-5" /> Direct (MoMo/Moov)
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
