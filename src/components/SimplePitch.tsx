'use client'

import { useEffect, useRef } from 'react'

export default function SimplePitch() {
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
        <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] tracking-tight">
          No Dashboard. No Setup. No Data Entry.
        </h2>
      </div>
    </section>
  )
}
