'use client'

import { useEffect, useState } from 'react'

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
    text: "Just got off a call with Marcus from Elevate Clothing. $2K brand video project. He's interested but wants to think about it.",
    time: '2:14 PM',
  },
  {
    from: 'nudge',
    text: "Got it. Marcus · Elevate Clothing · $2K · Warm. I'll remind you to follow up Thursday.",
    time: '2:14 PM',
  },
  {
    from: 'nudge',
    text: 'Thursday, 9:00 AM',
    isTimestamp: true,
  },
  {
    from: 'nudge',
    text: "Time to follow up with Marcus. Here's a draft:",
    time: '9:00 AM',
  },
  {
    from: 'nudge',
    text: "Hey Marcus, wanted to check in on the brand video project. Let me know if you're ready to move forward.",
    time: '9:00 AM',
    buttons: ['Send', 'Edit', 'Snooze', 'Skip'],
  },
]

export default function ChatUI() {
  const [started, setStarted] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  // Drive the message-by-message reveal once started
  useEffect(() => {
    if (!started) return
    if (visibleCount >= messages.length) return
    const delay = visibleCount === 0 ? 350 : messages[visibleCount - 1].isTimestamp ? 400 : 950
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay)
    return () => clearTimeout(timer)
  }, [started, visibleCount])

  return (
    <div className="bg-[#EFF3F6] rounded-2xl p-4 sm:p-5 shadow-md w-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#dde4ea]">
        <div className="w-8 h-8 rounded-full bg-[#2FA4D7] flex items-center justify-center text-white font-bold text-sm shrink-0">
          N
        </div>
        <div>
          <p className="font-semibold text-[#1a1a1a] text-sm leading-tight">Nudge</p>
          <p className="text-xs text-[#4a4a4a]">online</p>
        </div>
      </div>

      {/* Pre-start state: button */}
      {!started ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <button
            onClick={() => setStarted(true)}
            className="see-it-btn group flex items-center gap-2 px-5 py-3 bg-white border-2 border-[#2FA4D7] text-[#2FA4D7] font-semibold text-sm rounded-full cursor-pointer"
          >
            <span className="text-base">▶</span>
            See it in action
          </button>
        </div>
      ) : (
        /* Messages */
        <div className="space-y-2 min-h-[260px]">
          {messages.map((msg, i) => {
            if (i >= visibleCount) return null

            if (msg.isTimestamp) {
              return (
                <div key={i} className="flex justify-center my-2.5 opacity-0 animate-[fadeIn_0.4s_ease_forwards]">
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
                style={{ animation: 'fadeSlideIn 0.35s ease forwards' }}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
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
          {visibleCount < messages.length && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .see-it-btn {
          transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
        }
        .see-it-btn:hover {
          background-color: #2FA4D7;
          color: white;
          box-shadow: 0 4px 16px rgba(47, 164, 215, 0.35);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}
