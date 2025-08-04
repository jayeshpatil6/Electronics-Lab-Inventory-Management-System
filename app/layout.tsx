import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../src/contexts/AuthContext"
import { ComponentsProvider } from "../src/contexts/ComponentsContext"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Electronics Lab Inventory Management System",
  description: "Manage your electronics lab inventory efficiently",
  generator: 'v0.dev',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  keywords: ['inventory', 'electronics', 'lab', 'management', 'components'],
  authors: [{ name: 'Lab Inventory Team' }],
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ComponentsProvider>{children}</ComponentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
