import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Terminal, Sparkles, Code } from 'lucide-react';

export default function Hero({ heroData, accentColor }) {
  const [copied, setCopied] = useState(false);

  const title = heroData?.title || "I am Tanjim — Programmer.";
  const subtitle = heroData?.subtitle || "A beginner programmer from Bangladesh building real projects and using AI for better results, faster and cleaner.";
  const primaryBtn = heroData?.primaryBtn || { text: "View Projects", link: "#projects" };
  const secondaryBtn = heroData?.secondaryBtn || { text: "Contact Me", link: "#contact" };
  const codeBlock = heroData?.codeBlock || [
    "const developer = {",
    '  name: "Tanjim Ahmed",',
    '  location: "Bangladesh 🇧🇩",',
    '  role: "Junior Software Developer & AI Builder",',
    '  stack: ["JavaScript", "React", "Node.js", "Tailwind CSS"],',
    '  mindset: "Build fast, learn continuously, craft clean UI",',
    '  availableForWork: true,',
    "};"
  ];

  const handleCopyCode = () => {
    const codeText = Array.isArray(codeBlock) ? codeBlock.join('\n') : codeBlock;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" id="hero">
      {/* Background glow effects */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-mono text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for new projects & AI dev</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {title.includes('—') ? (
                <>
                  {title.split('—')[0]}—{' '}
                  <span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100"
                    style={{ backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${accentColor} 100%)` }}
                  >
                    {title.split('—')[1]}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              {primaryBtn?.text && (
                <a
                  href={primaryBtn.link}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: accentColor }}
                  id="hero-primary-btn"
                >
                  <span>{primaryBtn.text}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {secondaryBtn?.text && (
                <a
                  href={secondaryBtn.link}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-neutral-200 glass-card hover:border-neutral-600 hover:bg-neutral-800/80 transition-all duration-300 active:scale-95"
                  id="hero-secondary-btn"
                >
                  <span>{secondaryBtn.text}</span>
                  <Code className="w-4 h-4 text-neutral-400" />
                </a>
              )}
            </div>
          </div>

          {/* Right Code Window Column */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/90 relative group">
              
              {/* Window Header */}
              <div className="bg-neutral-900/90 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                    <span>tanjim.config.js</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Copy code"
                  aria-label="Copy code to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Window Content */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto bg-[#0d0d0d]/90 text-neutral-300 leading-relaxed">
                {Array.isArray(codeBlock) ? (
                  codeBlock.map((line, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="text-neutral-600 select-none w-6 text-right font-mono">{idx + 1}</span>
                      <span className="whitespace-pre">
                        {line.includes('const ') ? (
                          <>
                            <span className="text-purple-400">const</span>{' '}
                            <span className="text-blue-300">{line.replace('const ', '').split('=')[0]}</span>=
                            <span className="text-amber-300">{line.split('=')[1] || ''}</span>
                          </>
                        ) : line.includes('//') ? (
                          <span className="text-neutral-500 italic">{line}</span>
                        ) : line.includes(':') ? (
                          <>
                            <span className="text-sky-300">{line.split(':')[0]}</span>:
                            <span className="text-emerald-300">{line.split(':').slice(1).join(':')}</span>
                          </>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <pre className="whitespace-pre-wrap">{codeBlock}</pre>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="px-4 py-2.5 bg-neutral-900/60 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>JavaScript ES2026</span>
                <span className="text-emerald-400 font-semibold">● 100% Client CMS Ready</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
