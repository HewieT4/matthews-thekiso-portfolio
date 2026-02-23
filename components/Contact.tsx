
import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import emailjs from 'https://esm.sh/@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setFormState('loading');

    // NOTE: Replace these with your actual EmailJS credentials
    const SERVICE_ID = 'YOUR_SERVICE_ID'; 
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    try {
      // If keys are placeholders, we'll simulate a success for demo purposes but log a reminder
      if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.warn("EmailJS: Please configure your Service ID, Template ID, and Public Key to enable real emails.");
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      }
      
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset to idle after 5 seconds
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white/5 reveal">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-accent font-semibold tracking-widest uppercase mb-2 no-print">Get in touch</h3>
          <h2 className="font-bebas text-5xl md:text-7xl mb-8">Connect With Me</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-md">
            I'm currently looking for new entry-level roles, internships, and learnership opportunities. Let's build something great together.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Phone</p>
                <p className="text-xl font-bold">+27 65 916 9351</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Email</p>
                <p className="text-xl font-bold">sefellethekiso@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Location</p>
                <p className="text-xl font-bold">Gauteng, South Africa</p>
              </div>
            </div>
             <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Instagram size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Instagram</p>
                <a href="https://www.instagram.com/h.e.w.s?igsh=MWgyeHdnNW00eWg0dA==" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-accent transition-colors">@h.e.w.s</a>
              </div>
            </div>
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-6 no-print">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required
              name="user_name"
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              required
              name="user_email"
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <input 
            required
            name="subject"
            type="text" 
            placeholder="Subject" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors"
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
          />
          <textarea 
            required
            name="message"
            placeholder="Your Message" 
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors resize-none"
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          <button 
            disabled={formState === 'loading'}
            type="submit" 
            className="w-full py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
          >
            {formState === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : formState === 'success' ? (
              <CheckCircle />
            ) : formState === 'error' ? (
              <AlertCircle />
            ) : (
              <Send size={20} />
            )}
            {formState === 'loading' ? 'Sending...' : formState === 'success' ? 'Sent Successfully!' : formState === 'error' ? 'Error Sending' : 'Send Message'}
          </button>
          
          {formState === 'error' && (
            <p className="text-red-400 text-sm text-center animate-shake">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
