'use client'

import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const { error } = await getSupabase()
      .from('waitlist')
      .insert([{ email: trimmed }])

    if (!error) {
      setStatus('success')
    } else if (error.code === '23505') {
      setStatus('duplicate')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-[#2FA4D7] font-semibold text-lg">
        You&rsquo;re on the list. 🎉
      </p>
    )
  }

  if (status === 'duplicate') {
    return (
      <p className="text-[#4a4a4a] font-medium text-lg">
        You&rsquo;re already on the list!
      </p>
    )
  }

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          className="flex-1 px-5 py-4 rounded-xl border border-gray-200 text-[#1a1a1a] text-lg outline-none focus:border-[#2FA4D7] transition-colors placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="cta-btn px-7 py-4 bg-[#2FA4D7] text-white font-semibold rounded-xl text-lg disabled:opacity-60 whitespace-nowrap cursor-pointer"
        >
          {status === 'loading' ? 'Joining…' : 'Get Early Access'}
        </button>
        <style>{`
          .cta-btn {
            transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
          }
          .cta-btn:hover:not(:disabled) {
            background-color: #2290be;
            box-shadow: 0 4px 20px rgba(47, 164, 215, 0.4);
            transform: translateY(-1px);
          }
          .cta-btn:active:not(:disabled) {
            transform: translateY(0px);
            box-shadow: 0 2px 8px rgba(47, 164, 215, 0.3);
          }
        `}</style>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-red-500 text-sm">Something went wrong. Try again.</p>
      )}
      <p className="mt-3 text-sm text-[#4a4a4a]">We&rsquo;ll email you when it&rsquo;s ready.</p>
    </div>
  )
}
