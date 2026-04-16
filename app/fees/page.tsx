"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingDown, Building2, Zap, Check, X, Shield } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function FeesComparisonPage() {
  const sendAmount = 200
  const currency = "EUR"
  
  const diasporaFee = 0
  const diasporaRate = 655.957
  const diasporaReceive = Math.round(sendAmount * diasporaRate)
  
  const competitors = [
    { name: "Western Union", fee: 12, rate: 620, color: "bg-yellow-500" },
    { name: "MoneyGram", fee: 10, rate: 615, color: "bg-blue-600" },
    { name: "Banque", fee: 25, rate: 600, color: "bg-gray-500" },
  ]
  
  const maxSavings = Math.round((sendAmount - competitors[2].fee) * diasporaRate - (sendAmount - 25) * 600)
  
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
          <span className="text-base font-bold text-foreground">Comparaison des frais</span>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-5 py-6 space-y-6 stagger-children">
        {/* Amount Header */}
        <section className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">Pour un envoi de</p>
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {sendAmount} {currency}
          </h1>
        </section>

        {/* Savings Banner */}
        <section className="bg-success/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center">
            <TrendingDown className="w-7 h-7 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-success font-headline">
              +{maxSavings.toLocaleString("fr-FR")} XOF
            </p>
            <p className="text-sm text-success/80">
              de plus pour votre destinataire
            </p>
          </div>
        </section>

        {/* DiasporaConnect Card - Best Option */}
        <section className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-global-orange text-white px-4 py-1.5 rounded-full text-xs font-bold z-10">
            MEILLEUR CHOIX
          </div>
          <div className="bg-card rounded-3xl p-6 border-2 border-global-orange shadow-lg shadow-global-orange/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-global-orange flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">DiasporaConnect</h3>
                <p className="text-xs text-success font-semibold">Frais 0% sur les premiers 200 EUR</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="text-center">
                <p className="text-3xl font-bold text-success font-headline">0%</p>
                <p className="text-xs text-muted-foreground">Frais</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-xl font-bold text-foreground font-headline">{diasporaRate.toLocaleString("fr-FR")}</p>
                <p className="text-xs text-muted-foreground">Taux XOF</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Recoit</p>
                <p className="text-xl font-bold text-foreground font-headline">{(diasporaReceive/1000).toFixed(0)}k</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["Transfert instantane", "0 frais caches", "Taux reel"].map((feature) => (
                <div key={feature} className="flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-full">
                  <Check className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitors */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">Autres services</h3>
          
          {competitors.map((competitor) => {
            const receive = Math.round((sendAmount - competitor.fee) * competitor.rate)
            const diff = diasporaReceive - receive
            
            return (
              <div 
                key={competitor.name}
                className="bg-card rounded-2xl p-5 border border-border/40 opacity-70"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${competitor.color} flex items-center justify-center`}>
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-foreground">{competitor.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-destructive">{competitor.fee} EUR</p>
                    <p className="text-xs text-muted-foreground">de frais</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-muted-foreground">Taux</p>
                      <p className="font-semibold text-foreground">{competitor.rate} XOF</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recoit</p>
                      <p className="font-semibold text-foreground">{receive.toLocaleString("fr-FR")} XOF</p>
                    </div>
                  </div>
                  <div className="bg-destructive/10 px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold text-destructive">-{diff.toLocaleString("fr-FR")} XOF</span>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Comparison Table */}
        <section className="bg-card rounded-2xl p-5 border border-border/40">
          <h3 className="text-sm font-bold text-foreground mb-4">Comparatif detaille</h3>
          
          <div className="space-y-3">
            {[
              { feature: "Frais de transfert", diaspora: "0%", others: "5-15%" },
              { feature: "Taux de change", diaspora: "Taux reel", others: "Majore" },
              { feature: "Delai", diaspora: "30 min", others: "1-3 jours" },
              { feature: "Frais caches", diaspora: false, others: true },
              { feature: "Mobile Money", diaspora: true, others: "Variable" },
            ].map((row) => (
              <div key={row.feature} className="flex items-center py-2 border-b border-border/30 last:border-0">
                <span className="flex-1 text-sm text-muted-foreground">{row.feature}</span>
                <div className="w-24 text-center">
                  {typeof row.diaspora === "boolean" ? (
                    row.diaspora ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-bold text-success">{row.diaspora}</span>
                  )}
                </div>
                <div className="w-24 text-center">
                  {typeof row.others === "boolean" ? (
                    row.others ? (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    ) : (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{row.others}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex mt-4 text-xs text-muted-foreground">
            <span className="flex-1" />
            <span className="w-24 text-center font-semibold text-foreground">Diaspora</span>
            <span className="w-24 text-center">Autres</span>
          </div>
        </section>

        {/* Trust Footer */}
        <div className="flex items-center justify-center gap-2 py-2 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Donnees mises a jour le 15 avril 2026</span>
        </div>

        {/* CTA */}
        <Link
          href="/transfer"
          className="w-full h-[60px] bg-global-orange text-white rounded-2xl font-bold flex items-center justify-center gap-3 press-effect shadow-lg shadow-global-orange/30 touch-manipulation text-lg"
        >
          <span>Envoyer avec DiasporaConnect</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      
      <BottomNav />
    </main>
  )
}
