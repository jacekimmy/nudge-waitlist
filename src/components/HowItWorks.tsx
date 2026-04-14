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
    <section className="bg-[#F5F5F5] py-20 px-6">
      <div ref={ref} className="section-hidden max-w-[800px] mx-auto w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-12 tracking-tight">
          Here&rsquo;s How It Works
        </h2>
        <div className="space-y-10 max-w-[520px] mx-auto text-left">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="text-5xl font-extrabold text-[#2FA4D7] leading-none shrink-0 w-10 text-center select-none">
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-1.5">{step.title}</h3>
                <p className="text-[#4a4a4a] text-base leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
