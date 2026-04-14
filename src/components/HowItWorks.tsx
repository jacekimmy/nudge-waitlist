'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    title: 'Talk to it',
    body: "Get off a call, send a voice note or text. \"Just talked to Marcus, $2K video project, he's interested but needs to think.\"",
  },
  {
    title: 'It logs everything',
    body: 'Contact, company, deal size, status. No forms. It picks it all up from what you said.',
  },
  {
    title: 'It reminds you',
    body: 'Nudge pings you on the right day with a draft message ready to send. Tap send or edit it first.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('section-hidden')
          el.classList.add('section-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#F5F5F5] py-28 px-10">
      <div ref={ref} className="section-hidden max-w-[1200px] mx-auto w-full text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-16 tracking-tight">
          Here&rsquo;s How It Works
        </h2>
        <div className="space-y-12 max-w-[680px] mx-auto text-left">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div className="text-6xl font-extrabold text-[#2FA4D7] leading-none shrink-0 w-12 text-center select-none">
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-2">{step.title}</h3>
                <p className="text-[#4a4a4a] text-lg leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
