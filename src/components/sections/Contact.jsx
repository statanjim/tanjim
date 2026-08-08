import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';

export default function Contact({ footerData, accentColor }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const socials = footerData?.socials || [];
  const emailObj = socials.find(s => s.platform.toLowerCase().includes('email') || s.url.startsWith('mailto:'));
  const contactEmail = emailObj ? emailObj.url.replace('mailto:', '') : 'sarkartanjimahmed2011@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section className="py-20 relative border-t border-neutral-800/60" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
            <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
            <span>04 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let's Build Something Together
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Have a project idea, question, or opportunity? Drop me a message below or email me directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-neutral-800/80">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors group"
                >
                  <div 
                    className="p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Direct Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors break-all">
                      {contactEmail}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="p-3 rounded-xl bg-neutral-800 text-neutral-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Location</span>
                    <span className="text-sm font-semibold text-white">
                      Bangladesh 🇧🇩 (UTC+6)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-neutral-400 block mb-3">Response Time</span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  I usually reply within 24 hours. Feel free to send code collaboration requests or project inquiries!
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-neutral-800/80">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    Thank you for reaching out, Tanjim will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Tanjim, I'd like to discuss a project..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                    id="contact-submit-btn"
                  >
                    {loading ? (
                      <span className="font-mono text-xs animate-pulse">Sending message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
