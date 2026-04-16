import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope"
})

export const metadata: Metadata = {
  title: "DiasporaConnect | Transfert d'argent vers l'Afrique",
  description: "Envoyez de l'argent vers l'Afrique avec les frais les plus bas. Sécurisé par blockchain, sans intermédiaire bancaire.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A1628",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
