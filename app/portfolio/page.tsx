"use client"

import Link from "next/link"
import { ArrowLeft, Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, TrendingUp, Send, Eye, EyeOff } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const wallets = [
  { id: 1, name: "Euro", code: "EUR", symbol: "E", balance: 2500, change: 0, color: "bg-primary" },
  { id: 2, name: "Franc CFA", code: "XOF", symbol: "F", balance: 480000, change: 0, color: "bg-wise-green" },
  { id: 3, name: "Dollar US", code: "USD", symbol: "$", balance: 350, change: 2.4, color: "bg-blue-500" },
]

const transactions = [
  { id: 1, type: "send", title: "Envoye a Maman", date: "Aujourd'hui, 14:32", amount: -100, currency: "EUR", status: "success" },
  { id: 2, type: "receive", title: "Recu de Papa", date: "Hier, 09:15", amount: 200, currency: "EUR", status: "success" },
  { id: 3, type: "exchange", title: "EUR vers XOF", date: "12 Avr", amount: -150, currency: "EUR", status: "success" },
]

export default function PortfolioPage() {
  const [showBalance, setShowBalance] = useState(true)
  const totalBalance = 2850
  const totalXOF = Math.round(totalBalance * 655.957)
  
  return (
    <main className="phone-frame min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="safe-top bg-primary text-primary-foreground">
        <div className="px-5 py-4 flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center press-effect">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-bold">Mon Solde</span>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center press-effect"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Balance Display */}
        <div className="px-5 pb-8 pt-4 text-center">
          <p className="text-sm text-primary-foreground/70 mb-1">Solde total</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            {showBalance ? (
              <h1 className="text-5xl font-bold font-headline animate-number">
                {totalBalance.toLocaleString("fr-FR")} <span className="text-2xl">EUR</span>
              </h1>
            ) : (
              <h1 className="text-5xl font-bold font-headline">
                ••••••
              </h1>
            )}
          </div>
          {showBalance && (
            <p className="text-sm text-primary-foreground/70">
              ~ {totalXOF.toLocaleString("fr-FR")} XOF
            </p>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="px-5 pb-6">
          <div className="flex justify-center gap-6">
            {[
              { icon: Plus, label: "Ajouter", color: "bg-white text-primary" },
              { icon: Send, label: "Envoyer", color: "bg-global-orange text-white" },
              { icon: RefreshCw, label: "Echanger", color: "bg-white/20 text-white" },
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2 press-effect">
                <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-primary-foreground/80">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6 stagger-children -mt-4">
        {/* Wallets */}
        <section className="bg-card rounded-3xl p-5 border border-border/40 shadow-sm -mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">Mes devises</h2>
            <button className="text-sm font-bold text-global-orange press-effect flex items-center gap-1">
              Gerer <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <div 
                key={wallet.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-surface-container/50 press-effect"
              >
                <div className={`w-12 h-12 rounded-xl ${wallet.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {wallet.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground">{wallet.name}</p>
                  <p className="text-xs text-muted-foreground">{wallet.code}</p>
                </div>
                <div className="text-right">
                  {showBalance ? (
                    <>
                      <p className="font-bold text-foreground">
                        {wallet.balance.toLocaleString("fr-FR")} {wallet.code}
                      </p>
                      {wallet.change > 0 && (
                        <p className="text-xs text-success flex items-center justify-end gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{wallet.change}%
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-bold text-foreground">••••</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mini Chart */}
        <section className="bg-card rounded-2xl p-5 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Activite 7 jours</h3>
            <div className="flex items-center gap-1 text-success text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +12%
            </div>
          </div>
          <div className="h-20 flex items-end gap-1.5">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div 
                key={i} 
                className="flex-1 bg-global-orange/20 rounded-t-lg relative overflow-hidden"
                style={{ height: `${height}%` }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-global-orange rounded-t-lg transition-all"
                  style={{ height: `${Math.min(height, 100)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </section>
        
        {/* Transactions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">Historique</h2>
            <button className="text-sm font-bold text-global-orange press-effect">
              Tout voir
            </button>
          </div>
          
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/40 press-effect"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  tx.type === "send" ? "bg-destructive/10 text-destructive" :
                  tx.type === "receive" ? "bg-success/10 text-success" :
                  "bg-primary/10 text-primary"
                }`}>
                  {tx.type === "send" ? <ArrowUpRight className="w-5 h-5" /> :
                   tx.type === "receive" ? <ArrowDownLeft className="w-5 h-5" /> :
                   <RefreshCw className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{tx.title}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} {tx.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <BottomNav />
    </main>
  )
}
