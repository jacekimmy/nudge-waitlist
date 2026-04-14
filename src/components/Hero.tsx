import EmailCapture from './EmailCapture'
import ChatUI from './ChatUI'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{
        background:
          'radial-gradient(circle, rgba(47,164,215,0.12) 1px, transparent 1px) 0 0 / 22px 22px, linear-gradient(to bottom, #CCE9F7 0%, #EEF7FD 40%, #ffffff 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 pt-10 pb-10">
        {/* Logo */}
        <div className="mb-10">
          <span className="text-[#2FA4D7] font-bold text-2xl tracking-tight">Nudge</span>
        </div>

        {/* Two-column layout: text left, chat right */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left: headline + CTA */}
          <div className="flex-1 space-y-7">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#D6EEF9] text-[#1a6a8a] text-base font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#2FA4D7] inline-block" />
              Coming soon
            </div>
            <h1 className="text-6xl xl:text-7xl font-extrabold text-[#1a1a1a] leading-[1.05] tracking-tight">
              Your Clients Tracked. Your Follow-Ups Sent. You Did Nothing.
            </h1>
            <p className="text-xl xl:text-2xl text-[#4a4a4a] leading-relaxed">
              Voice note your assistant after a client call. It handles everything else.
            </p>
            <EmailCapture />
          </div>

          {/* Right: chat mockup with float animation */}
          <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
            <ChatUI />
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-5px); }
          }
        `}</style>
      </div>
    </section>
  )
}
