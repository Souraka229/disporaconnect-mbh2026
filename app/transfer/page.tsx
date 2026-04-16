"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, ChevronDown, Smartphone, Shield, Clock, Zap, User, Fingerprint } from "lucide-react"
import { cn } from "@/lib/utils"

const paymentMethods = [
  { id: "mtn", name: "MTN MoMo", color: "bg-yellow-400", textColor: "text-black" },
  { id: "moov", name: "Moov Money", color: "bg-blue-500", textColor: "text-white" },
  { id: "orange", name: "Orange Money", color: "bg-orange-500", textColor: "text-white" },
]

const contacts = [
  { id: 1, name: "Maman", phone: "+229 96 00 00 01", initials: "MA" },
  { id: 2, name: "Papa", phone: "+229 96 00 00 02", initials: "PA" },
  { id: 3, name: "Kofi Jr", phone: "+229 97 00 00 03", initials: "KJ" },
]

export default function TransferPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [sendAmount, setSendAmount] = useState(100)
  const [recipientName, setRecipientName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("mtn")
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  
  const rate = 655.957
  const receiveAmount = Math.round(sendAmount * rate)
  const fee = sendAmount >= 200 ? Math.round(sendAmount * 0.005) : 0
  const total = sendAmount + fee
  
  const handleConfirm = () => {
    router.push("/transfer/success")
  }

  const selectContact = (contact: typeof contacts[0]) => {
    setSelectedContact(contact.id)
    setRecipientName(contact.name)
    setPhoneNumber(contact.phone)
  }

  const canProceed = step === 1 ? sendAmount > 0 : (recipientName && phoneNumber)
  
  return (
    <main className="phone-frame min-h-screen bg-background">
      {/* Header */}
      <header className="safe-top sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center justify-between px-5 py-4">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : router.back()}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center press-effect"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-foreground">Nouveau transfert</span>
            <span className="text-xs text-muted-foreground">Etape {step} sur 2</span>
          </div>
          
          <Link href="/" className="text-sm font-bold text-global-orange press-effect px-2 py-1">
            Annuler
          </Link>
        </div>
        
        {/* Progress bar */}
        <div className="px-5 pb-4">
          <div className="h-1 bg-surface-container rounded-full overflow-hidden">
            <div 
              className="h-full bg-global-orange rounded-full transition-all duration-500"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6 pb-32 stagger-children">
        {step === 1 && (
          <>
            {/* Amount Section - Wise inspired */}
            <section className="bg-card rounded-3xl p-6 border border-border/40 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Vous envoyez</label>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(Number(e.target.value))}
                    inputMode="decimal"
                    className="text-5xl font-bold font-headline text-foreground bg-transparent outline-none w-full min-w-0"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                    autoFocus
                  />
                  <div className="flex items-center gap-2 bg-surface-container px-4 py-3 rounded-2xl shrink-0">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">E</div>
                    <span className="font-bold">EUR</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Exchange Rate Display */}
              <div className="flex items-center gap-3 p-4 bg-soft-blue/50 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-wise-green/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-wise-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">1 EUR = {rate.toLocaleString("fr-FR")} XOF</p>
                  <p className="text-xs text-muted-foreground">Taux du marche en temps reel</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Destinataire recoit</label>
                  <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Arrive en 30 min</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold font-headline text-foreground">
                    {receiveAmount.toLocaleString("fr-FR")}
                  </span>
                  <div className="flex items-center gap-2 bg-wise-green/10 px-4 py-3 rounded-2xl shrink-0">
                    <div className="w-7 h-7 rounded-full bg-wise-green flex items-center justify-center text-secondary-foreground text-xs font-bold">F</div>
                    <span className="font-bold">XOF</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Fee Breakdown */}
            <section className="bg-card rounded-2xl p-5 border border-border/40 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Resume des frais</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Montant envoye</span>
                  <span className="font-medium text-foreground">{sendAmount.toLocaleString("fr-FR")} EUR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais de transfert</span>
                  <span className="font-medium text-success">{fee === 0 ? "Gratuit" : `${fee} EUR`}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-foreground">{total.toLocaleString("fr-FR")} EUR</span>
                </div>
              </div>
            </section>
          </>
        )}

        {step === 2 && (
          <>
            {/* Quick Select Contacts */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">Envoyer a</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl shrink-0 transition-all press-effect min-w-[90px]",
                      selectedContact === contact.id
                        ? "bg-global-orange/10 border-2 border-global-orange"
                        : "bg-card border border-border/40"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm",
                      selectedContact === contact.id
                        ? "bg-global-orange text-white"
                        : "bg-gradient-to-br from-primary to-wise-green text-white"
                    )}>
                      {contact.initials}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{contact.name}</span>
                  </button>
                ))}
                <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-container border border-dashed border-border shrink-0 min-w-[90px] press-effect">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">Nouveau</span>
                </button>
              </div>
            </section>

            {/* Recipient Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">Coordonnees</h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Nom du destinataire"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full h-16 pl-12 pr-4 bg-card border border-border/40 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-global-orange/40 focus:border-global-orange text-base font-medium"
                  />
                </div>
                
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="+229 96 XX XX XX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-16 pl-12 pr-4 bg-card border border-border/40 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-global-orange/40 focus:border-global-orange text-base font-medium"
                  />
                </div>
              </div>
            </section>

            {/* Payment Methods */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">Mode de reception</h3>
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

            {/* Transfer Summary */}
            <section className="bg-card rounded-2xl p-5 border border-border/40 space-y-3">
              <h3 className="text-sm font-bold text-foreground">Resume du transfert</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vous envoyez</span>
                  <span className="font-bold text-foreground">{sendAmount} EUR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{recipientName || "Destinataire"} recoit</span>
                  <span className="font-bold text-success">{receiveAmount.toLocaleString("fr-FR")} XOF</span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Security Badge */}
        <div className="flex items-center gap-3 p-4 bg-primary rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Transaction securisee</p>
            <p className="text-xs text-white/70">Chiffrement de bout en bout</p>
          </div>
          <Fingerprint className="w-6 h-6 text-white/50" />
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-background/95 backdrop-blur-xl border-t border-border/30 p-5 safe-bottom">
        <button
          onClick={() => step === 1 ? setStep(2) : handleConfirm()}
          disabled={!canProceed}
          className={cn(
            "w-full h-[60px] rounded-2xl font-bold flex items-center justify-center gap-3 transition-all press-effect shadow-lg touch-manipulation text-lg",
            canProceed
              ? "bg-global-orange text-white shadow-global-orange/30"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <span>{step === 1 ? "Continuer" : "Confirmer le transfert"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  )
}
