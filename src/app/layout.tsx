import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/components/provider/AuthProvider'

export const metadata: Metadata = {
  title: "Documentor | Chat with your pdf documents privately",
  description: "From legal agreements to financial reports, documentor brings your pdf documents to life. You can ask questions, get summaries, find information, & more securly and privately.",
  icons: {
    icon: [
      "/favicon.ico"
    ],
    apple: [
      "/apple-touch-icon.png",
    ],
    other: [
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="overflow-x-hidden">
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  )
}
