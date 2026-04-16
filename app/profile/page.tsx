"use client"

import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import { 
  ArrowLeft,
  User, 
  Shield, 
  Bell, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Check,
  Wallet,
  CreditCard,
  Fingerprint,
  Moon,
  Share2,
  Star
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

type MenuItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  href: string
  badge?: string
  value?: string
  toggle?: boolean
  enabled?: boolean
}

type MenuSection = {
  title: string
  items: MenuItem[]
}

const stats = [
  { label: "Transferts", value: "24", subtext: "ce mois" },
  { label: "Economise", value: "186 EUR", subtext: "vs banques" },
  { label: "Note", value: "4.9", subtext: "satisfaction" },
]

const menuSections: MenuSection[] = [
  {
    title: "Compte",
    items: [
      { icon: User, label: "Informations personnelles", href: "#" },
      { icon: Shield, label: "Securite", href: "#", badge: "KYC Verifie" },
      { icon: CreditCard, label: "Methodes de paiement", href: "#" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", href: "#", toggle: true },
      { icon: Globe, label: "Langue", href: "#", value: "Francais" },
      { icon: Moon, label: "Mode sombre", href: "#", toggle: true },
      { icon: Fingerprint, label: "Biometrie", href: "#", toggle: true, enabled: true },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Centre d'aide", href: "#" },
      { icon: Share2, label: "Inviter des amis", href: "#", badge: "10 EUR" },
      { icon: Star, label: "Noter l'app", href: "#" },
    ]
  },
]

export default function ProfilePage() {
  return (
    <main className="phone-frame min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="safe-top sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center justify-between px-5 py-4">
          <Link 
            href="/"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center press-effect"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <span className="font-bold text-foreground">Mon Profil</span>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-5 py-6 space-y-6 stagger-children">
        {/* Profile Card */}
        <section className="bg-card rounded-3xl p-6 border border-border/40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-global-orange to-wise-green flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                KM
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success flex items-center justify-center border-2 border-card">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold font-headline text-foreground">
                Kofi Mensah
              </h2>
              <p className="text-sm text-muted-foreground">
                kofi.mensah@email.com
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 bg-success/10 text-success text-xs font-bold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verifie
                </span>
                <span className="px-2.5 py-1 bg-global-orange/10 text-global-orange text-xs font-bold rounded-full">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 text-center border border-border/40">
              <p className="text-2xl font-bold font-headline text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
            </div>
          ))}
        </section>
        
        {/* Menu Sections */}
        {menuSections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
              {section.title}
            </h3>
            <div className="bg-card rounded-2xl overflow-hidden border border-border/40">
              {section.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 press-effect text-left ${
                      index > 0 ? "border-t border-border/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                          item.badge.includes("EUR") 
                            ? "bg-global-orange text-white" 
                            : "bg-success/10 text-success"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.value && (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                      {item.toggle ? (
                        <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                          item.enabled ? "bg-global-orange" : "bg-surface-container"
                        }`}>
                          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            item.enabled ? "translate-x-5" : "translate-x-0"
                          }`} />
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
        
        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 p-4 text-destructive font-bold press-effect rounded-2xl border border-destructive/20 bg-destructive/5">
          <LogOut className="w-5 h-5" />
          Se deconnecter
        </button>
        
        {/* App Info */}
        <div className="text-center space-y-1 py-4">
          <p className="text-xs text-muted-foreground">DiasporaConnect v1.0.0</p>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-bold">
            MIABE Hackathon 2026
          </p>
        </div>
      </div>
      
      <BottomNav />
    </main>
  )
}
