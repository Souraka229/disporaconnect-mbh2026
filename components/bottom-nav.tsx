"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Wallet, Send, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/portfolio", label: "Solde", icon: Wallet },
  { href: "/transfer", label: "Envoyer", icon: Send, isMain: true },
  { href: "/fees", label: "Comparer", icon: BarChart3 },
  { href: "/profile", label: "Profil", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] safe-bottom">
      <div className="flex justify-around items-end px-2 pb-2 pt-2 bg-card/95 backdrop-blur-2xl border-t border-border/30">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          // Main CTA button (Send)
          if (item.isMain) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all press-effect",
                  isActive 
                    ? "bg-global-orange shadow-global-orange/40" 
                    : "bg-global-orange shadow-global-orange/30"
                )}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold mt-1.5 transition-colors",
                  isActive ? "text-global-orange" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl transition-all min-h-14 min-w-14 press-effect",
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive && "bg-soft-blue"
              )}>
                <Icon 
                  className="w-5 h-5 transition-all" 
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span className={cn(
                "text-[10px] font-semibold transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
