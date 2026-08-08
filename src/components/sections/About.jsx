import React from 'react';
import { MapPin, Code2, Award, Zap, CheckCircle2 } from 'lucide-react';

export default function About({ aboutData, accentColor }) {
  const longText = aboutData?.longText || "I'm a passionate self-taught programmer based in Bangladesh...";
  const stats = aboutData?.stats || [
    { id: "1", label: "Projects Built", value: "15+" },
    { id: "2", label: "Code Commits", value: "800+" },
    { id: "3", label: "Technologies", value: "12+" },
    { id: "4", label: "Satisfaction", value: "100%" }
  ];
  const location = aboutData?.location || "Bangladesh 🇧🇩";
  const avatar = aboutData?.avatar;

  return (
    <section className="py-20 relative border-t border-neutral-800/60" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Background & Mindset
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Avatar / Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div 
                className="absolute -inset-1 rounded-3xl opacity-30 blur-xl transition duration-500 group-hover:opacity-60"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative glass-card rounded-3xl p-3 overflow-hidden border border-neutral-800">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Tanjim - Programmer"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex flex-col items-center justify-center p-6 text-center border border-neutral-800">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      T
                    </div>
                    <span className="text-xl font-bold text-white">Tanjim Ahmed</span>
                    <span className="text-xs font-mono text-neutral-400 mt-1">Programmer & AI Developer</span>
                  </div>
                )}

                {/* Location overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-300 font-medium">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Based in {location}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Remote Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-neutral-800/80 leading-relaxed text-neutral-300 text-base sm:text-lg font-normal">
              <p className="whitespace-pre-line">{longText}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div 
                  key={stat.id || stat.label}
                  className="glass-card rounded-2xl p-4 text-center border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div 
                    className="text-2xl sm:text-3xl font-bold text-white font-mono"
                    style={{ color: accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
