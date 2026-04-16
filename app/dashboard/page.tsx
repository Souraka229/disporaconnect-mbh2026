"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpDown, Wallet, BarChart3, User, Home, Send, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

const currencies = [
  { code: "USD", name: "Dollar US", flag: "🇺🇸", symbol: "$", rate: 592 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€", rate: 655.957 },
  { code: "GBP", name: "Livre Sterling", flag: "🇬🇧", symbol: "£", rate: 765.2 },
]

const receiveCurrencies = [
  { code: "XOF", name: "Franc CFA", flag: "🇧🇯", symbol: "F" },
]

const recentTransfers = [
  { id: 1, name: "Maman", initials: "MA", amount: 150, currency: "USD", received: "88 800", status: "success", date: "Aujourd'hui" },
  { id: 2, name: "Papa", initials: "PA", amount: 200, currency: "USD", received: "118 400", status: "success", date: "Hier" },
]

// Flag components
function USFlag() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 rounded-full">
      <circle cx="12" cy="12" r="12" fill="#1a1a2e"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#B22234"/>
      <path d="M2 12h20M2 8h20M2 16h20" stroke="white" strokeWidth="1.5"/>
      <rect x="2" y="2" width="10" height="7" fill="#3C3B6E"/>
    </svg>
  )
}

function BJFlag() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 rounded-full">
      <circle cx="12" cy="12" r="12" fill="white"/>
      <path d="M12 2 A10 10 0 0 1 12 22 A10 10 0 0 1 12 2" fill="#FCD116"/>
      <path d="M12 2 A10 10 0 0 0 12 22 L12 2" fill="#E8112D"/>
      <path d="M12 7 l1.5 4.5 h4.5 l-3.5 2.5 1.5 4.5 -3.5-2.5 -3.5 2.5 1.5-4.5 -3.5-2.5 h4.5 z" fill="#009E49"/>
    </svg>
  )
}

function BottomNav() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  const navItems = [
    { href: "/dashboard", label: "ACCUEIL", icon: Home },
    { href: "/transfer", label: "TRANSFÉRER", icon: Send },
    { href: "/fees", label: "FRAIS", icon: Receipt },
    { href: "/profile", label: "PROFIL", icon: User },
  ]
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] safe-bottom bg-white border-t border-gray-100">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-16"
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all",
                  isActive ? "text-global-orange" : "text-gray-400"
                )} 
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span className={cn(
                "text-[10px] font-bold tracking-wide",
                isActive ? "text-global-orange" : "text-gray-400"
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

export default function HomePage() {
  const [sendAmount, setSendAmount] = useState(200)
  const [sendCurrency, setSendCurrency] = useState(currencies[0])
  const [receiveCurrency] = useState(receiveCurrencies[0])
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
  
  const receiveAmount = Math.round(sendAmount * sendCurrency.rate).toLocaleString("fr-FR").replace(",", " ")
  const feePercent = 0.8
  const feeAmount = (sendAmount * feePercent / 100).toFixed(2).replace(".", ",")
  const wuFee = Math.round(sendAmount * 0.11)
  
  return (
    <main className="phone-frame min-h-screen bg-[#F8F9FB] pb-24">
      {/* Header */}
      <header className="safe-top px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Bonjour, Aminata 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Où envoyez-vous de l'argent aujourd'hui ?</p>
      </header>

      <div className="px-5 space-y-5">
        {/* Main Exchange Card */}
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          {/* Send Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">VOUS ENVOYEZ</span>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(Number(e.target.value))}
                inputMode="decimal"
                className="text-[40px] font-bold font-headline text-foreground bg-transparent outline-none w-full min-w-0"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
              
              <button 
                onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full transition-colors shrink-0"
              >
                <USFlag />
                <span className="font-bold text-foreground">{sendCurrency.code}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Currency Picker Dropdown */}
            {showCurrencyPicker && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 space-y-1 mt-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSendCurrency(currency)
                      setShowCurrencyPicker(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                      sendCurrency.code === currency.code ? "bg-orange-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{currency.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-foreground">{currency.code}</p>
                      <p className="text-xs text-muted-foreground">{currency.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Exchange Arrows */}
          <div className="flex justify-center py-4">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <ArrowUpDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Receive Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">ILS REÇOIVENT</span>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[40px] font-bold font-headline text-foreground">
                {receiveAmount}
              </span>
              
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-full shrink-0">
                <BJFlag />
                <span className="font-bold text-foreground">{receiveCurrency.code}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fee Info */}
          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-2 text-success">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M7.5 12l3 3 6-6" />
              </svg>
              <span className="text-sm font-medium">Frais : {feePercent}% - Soit {feeAmount} USD</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="text-xs">vs WU : jusqu'à {wuFee} USD de frais</span>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <Link 
          href="/transfer"
          className="w-full h-14 bg-global-orange hover:bg-global-orange/90 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-global-orange/20"
        >
          <span>Commencer un transfert</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Fee Comparison Link */}
        <Link 
          href="/fees"
          className="block text-center text-sm font-medium text-gray-600 hover:text-foreground transition-colors border border-dashed border-gray-300 rounded-lg py-2.5"
        >
          Voir la comparaison des frais
        </Link>

        {/* Recent Transfers */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Transferts récents</h2>
            <Link href="/portfolio" className="text-xs font-bold text-global-orange uppercase tracking-wide">
              VOIR TOUT
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentTransfers.map((transfer) => (
              <div
                key={transfer.id}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-global-orange to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                  {transfer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground">{transfer.name}</p>
                  <p className="text-xs text-muted-foreground">{transfer.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-foreground">{transfer.amount} {transfer.currency}</p>
                  <p className="text-xs text-success">+{transfer.received} XOF</p>
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
