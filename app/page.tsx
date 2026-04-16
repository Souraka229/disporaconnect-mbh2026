"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Globe, MapPin, ArrowRight, Sparkles, Smartphone, ShieldCheck } from "lucide-react"

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans selection:bg-global-orange/30">
      <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-global-orange/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-wise-green/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

        {/* Left Section: Content */}
        <div className="flex-1 flex flex-col pt-8 pb-12 px-6 sm:px-12 lg:px-24 z-10 lg:overflow-y-auto">
          {/* Top Bar */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-global-orange to-wise-green flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-global-orange to-wise-green">DC</span>
                </div>
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">DiasporaConnect</span>
            </div>

            {/* Premium Search Bar */}
            <div className="relative group w-full sm:w-[320px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-global-orange transition-colors" />
              </div>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-global-orange focus:ring-1 focus:ring-global-orange/50 backdrop-blur-xl rounded-full py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all outline-none shadow-sm"
                placeholder="Rechercher des services, pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Hero Content */}
          <main className="flex-1 flex flex-col justify-center max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit mb-6">
              <Sparkles className="w-4 h-4 text-wise-green" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">La banque du futur</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-headline font-extrabold tracking-tight leading-[1.1] mb-6">
              L'argent, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-global-orange via-[#FF9D5C] to-wise-green">sans frontières.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
              Une plateforme unique pour gérer vos finances, que vous soyez de la diaspora ou résident au Bénin.
            </p>

            {/* The Two Choices (Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 w-full">
              
              {/* Card 1: Diaspora */}
              <Link 
                href="/dashboard"
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-global-orange/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:-translate-y-1 block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-24 h-24 text-global-orange" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-global-orange/10 rounded-2xl flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6 text-global-orange" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">Pour la Diaspora</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    Envoyez de l'argent, investissez au pays et gérez vos comptes en toute simplicité.
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-medium text-global-orange group-hover:gap-3 transition-all">
                    Accéder à mon espace <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Benin */}
              <Link 
                href="/dashboard"
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-wise-green/50 hover:shadow-[0_0_30px_rgba(22,163,74,0.1)] hover:-translate-y-1 block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MapPin className="w-24 h-24 text-wise-green" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-wise-green/10 rounded-2xl flex items-center justify-center mb-6">
                    <MapPin className="w-6 h-6 text-wise-green" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">Béninois au Bénin</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    Recevez vos fonds instantanément, payez vos factures et accédez aux services locaux.
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-medium text-wise-green group-hover:gap-3 transition-all">
                    Ouvrir mon compte <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-surface-on" />
                <span>Sécurité Bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-surface-on" />
                <span>Mobile First</span>
              </div>
            </div>
          </main>
        </div>

        {/* Right Section: Interactive iPhone Mockup */}
        <div className="hidden lg:flex w-[45%] bg-white/[0.02] border-l border-white/5 items-center justify-center relative p-12">
          
          {/* Glow behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[700px] bg-gradient-to-tr from-global-orange/30 to-wise-green/30 blur-[80px] rounded-full opacity-60" />
          
          {/* iPhone Frame */}
          <div className="relative w-[340px] h-[720px] bg-background border-[8px] border-[#1f2937] rounded-[3rem] shadow-2xl shadow-black/50 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out z-10 ring-1 ring-white/10">
            {/* iPhone Top Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
              <div className="w-32 h-6 bg-[#1f2937] rounded-b-2xl relative">
                <div className="absolute top-2 right-6 w-1.5 h-1.5 bg-black/50 rounded-full" />
              </div>
            </div>
            
            {/* The Actual App Render! */}
            {/* Using iframe to load the actual app Dashboard view */}
            <div className="w-full h-full bg-background pt-1">
              <iframe 
                src="/dashboard" 
                className="w-full h-full border-none pointer-events-auto"
                title="Application Preview"
              />
            </div>
          </div>
          
          {/* Floating UI Elements for depth */}
          <div className="absolute bottom-24 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-pulse z-20 hidden xl:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Transfert Reçu</p>
                <p className="text-xs text-white/70">À l'instant</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
