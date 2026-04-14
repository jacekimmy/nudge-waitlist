'use client'

import { useEffect, useRef, useState } from 'react'

type Message = {
  from: 'user' | 'nudge'
  text: string
  time?: string
  isTimestamp?: boolean
  buttons?: string[]
}

const messages: Message[] = [
  {
    from: 'user',
    text: 'Just got off a call with Marcus from Elevate Clothing. $2K brand video project. He\'s interested but wants to think about it.',
    time: '2:14 PM',
  },
  {
    from: 'nudge',
    text: 'Got it. Marcus · Elevate Clothing · $2K · Warm. I\'ll remind you to follow up Thursday.',
    time: '2:14 PM',
  },
  {
    from: 'nudge',
    text: 'Thursday, 9:00 AM',
    isTimestamp: true,
    time: '',
  },
  {
    from: 'nudge',
    text: 'Time to follow up with Marcus. Here\'s a draft:',
    time: '9:00 AM',
  },
  {
    from: 'nudge',
    text: 'Hey Marcus, wanted to check in on the brand video project. Let me know if you\'re ready to move forward.',
    time: '9:00 AM',
    buttons: ['Send', 'Edit', 'Snooze', 'Skip'],
  },
]

export default function ChatMockup() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    if (visibleCount >= messages.length) return

    const delay = visibleCount === 0 ? 300 : messages[visibleCount - 1].isTimestamp ? 400 : 900
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [hasStarted, visibleCount])

  const realMessages = messages.filter((m) => !m.isTimestamp)
  const realVisible = messages
    .slice(0, visibleCount)
    .filter((m) => !m.isTimestamp).length

  return (
    <section className="py-20 px-6">
      <div
        ref={sectionRef}
        className="max-w-[800px] mx-auto w-full"
      >
        <div className="bg-[#EFF3F6] rounded-2xl p-4 sm:p-6 max-w-[480px] mx-auto shadow-sm">
          {/* Chat header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#dde4ea]">
            <div className="w-9 h-9 rounded-full bg-[#2FA4D7] flex items-center justify-center text-white font-bold text-sm shrink-0">
              N
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] text-sm leading-tight">Nudge</p>
              <p className="text-xs text-[#4a4a4a]">online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-2 min-h-[320px]">
            {messages.map((msg, i) => {
              const isVisible = i < visibleCount
              if (!isVisible) return null

              if (msg.isTimestamp) {
                return (
                  <div
                    key={i}
                    className="flex justify-center my-3 opacity-0 animate-[fadeIn_0.4s_ease_forwards]"
                    style={{ animationDelay: '0ms' }}
                  >
                    <span className="text-xs text-[#4a4a4a] bg-[#dde4ea] px-3 py-1 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                )
              }

              const isUser = msg.from === 'user'

              return (
                <div
                  key={i}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} opacity-0`}
                  style={{
                    animation: 'fadeSlideIn 0.35s ease forwards',
                  }}
                >
                  <div className={`max-w-[78%] ${isUser ? '' : ''}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-[#2FA4D7] text-white rounded-br-sm'
                          : 'bg-white text-[#1a1a1a] rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.buttons && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {msg.buttons.map((btn) => (
                          <button
                            key={btn}
                            className="px-3 py-1 bg-white border border-[#2FA4D7] text-[#2FA4D7] text-xs font-medium rounded-full hover:bg-[#2FA4D7] hover:text-white transition-colors cursor-pointer"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.time && (
                      <p className={`text-[10px] text-[#4a4a4a] mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Typing indicator */}
            {hasStarted && visibleCount < messages.length && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
