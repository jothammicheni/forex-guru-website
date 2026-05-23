import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ForexGuru - Master Your Trading',
  description: 'Learn forex trading with professional mentorship and proven strategies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/crypto.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/crypto.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/crypto.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/crypto.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Brush+Script+MT:wght@400&display=swap');
          .font-script {
            font-family: 'Brush Script MT', cursive;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  )
}