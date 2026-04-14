import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'Nudge — Never Forget to Follow Up With a Client Again',
  description:
    'Text or voice note Nudge after a client call. It tracks everything and reminds you when to follow up.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body
        style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
        className="antialiased bg-white text-[#1a1a1a]"
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
