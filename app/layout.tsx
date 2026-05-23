import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ForexGuru - Master Your Trading',
  description: 'Learn forex trading with professional mentorship and proven strategies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  )
}
