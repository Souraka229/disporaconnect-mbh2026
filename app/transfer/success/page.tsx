"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, Smartphone, Wallet, Share2, Copy, ArrowRight, Shield, Clock } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

const paymentMethods = [
  { id: "mtn", name: "MTN MoMo", color: "bg-yellow-400", textColor: "text-black" },
  { id: "moov", name: "Moov Money", color: "bg-blue-500", textColor: "text-white" },
  { id: "orange", name: "Orange Money", color: "bg-orange-500", textColor: "text-white" },
]

export default function TransferSuccessPage() {
  const [selectedMethod, setSelectedMethod] = useState("mtn")
  const [showConfetti, setShowConfetti] = useState(true)
  const [copied, setCopied] = useState(false)
  
  const amount = 65596
  const eurAmount = 100
  const sender = "Kofi M."
  const recipient = "Maman"
  const transactionId = "DC-2026-0415-7X9K"
  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <main className="phone-frame min-h-screen bg-background pb-28">
      {/* Success Header */}
      <div className="bg-gradient-to-b from-success/20 to-background pt-12 pb-8 px-5">
        <div className="flex flex-col items-center text-center space-y-4 stagger-children">
          {/* Animated Success Icon */}
          <div className="relative">
            <div className={cn(
              "w-24 h-24 rounded-full bg-success flex items-center justify-center",
              showConfetti && "success-pulse"
            )}>
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <div className="absolute -inset-3 rounded-full border-4 border-success/30 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Transfert envoye
            </h1>
            <p className="text-muted-foreground text-sm">
              {recipient} va recevoir les fonds dans quelques minutes
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-5 -mt-2 stagger-children">
        {/* Amount Card */}
        <section className="bg-card rounded-3xl p-6 border border-border/40 shadow-sm">
          <div className="text-center space-y-1 mb-6">
            <p className="text-sm text-muted-foreground">Montant envoye</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold font-headline text-foreground">
                {amount.toLocaleString("fr-FR")}
              </span>
              <span className="text-xl font-bold text-muted-foreground">XOF</span>
            </div>
            <p className="text-sm text-muted-foreground">
              ({eurAmount} EUR)
            </p>
          </div>
          
          {/* Transaction Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">De</span>
              <span className="font-semibold text-foreground">{sender}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">A</span>
              <span className="font-semibold text-foreground">{recipient}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Statut</span>
              <span className="font-semibold text-success flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                En cours de livraison
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">ID Transaction</span>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 font-mono text-xs bg-surface-container px-3 py-1.5 rounded-lg press-effect"
              >
                {transactionId}
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
            </div>
          </div>
        </section>

        {/* Estimated Arrival */}
        <section className="flex items-center gap-4 p-4 bg-soft-blue/50 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Arrivee estimee</p>
            <p className="text-sm text-muted-foreground">Dans moins de 30 minutes</p>
          </div>
        </section>
        
        {/* Withdrawal Method Selection */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">Retrait via Mobile Money</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all press-effect",
                  selectedMethod === method.id
                    ? "bg-global-orange/10 border-2 border-global-orange"
                    : "bg-card border border-border/40"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm", method.color, method.textColor)}>
                  {method.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">Retrait instantane</p>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-6 h-6 rounded-full bg-global-orange flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full h-[60px] bg-global-orange text-white rounded-2xl font-bold flex items-center justify-center gap-3 press-effect shadow-lg shadow-global-orange/30 touch-manipulation"
          >
            <Smartphone className="w-5 h-5" />
            Retirer via {paymentMethods.find(m => m.id === selectedMethod)?.name}
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/portfolio"
              className="h-14 bg-card text-foreground border border-border/40 rounded-2xl font-semibold flex items-center justify-center gap-2 press-effect"
            >
              <Wallet className="w-5 h-5" />
              Portefeuille
            </Link>
            
            <button className="h-14 bg-card text-foreground border border-border/40 rounded-2xl font-semibold flex items-center justify-center gap-2 press-effect">
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>
        </div>
        
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Transaction securisee et verifiable</span>
        </div>

        {/* New Transfer CTA */}
        <Link
          href="/transfer"
          className="flex items-center justify-center gap-2 py-3 text-global-orange font-bold press-effect"
        >
          <span>Nouveau transfert</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <BottomNav />
    </main>
  )
}
