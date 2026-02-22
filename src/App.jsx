import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Terminal, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- A. NAVBAR ---
const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100px',
        end: 99999,
        toggleClass: { className: 'bg-offwhite/80 backdrop-blur-xl border-dark/10 text-dark', targets: navRef.current },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { color: '#111111', background: 'rgba(245, 243, 238, 0.8)', border: '1px solid rgba(17, 17, 17, 0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { color: '#E8E4DD', background: 'transparent', border: '1px solid transparent', duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 py-3 px-6 rounded-full transition-colors font-sans text-sm tracking-tight text-paper border border-transparent">
      <div className="font-bold text-lg mr-8">SAURABH.</div>
      <a href="#philosophy" className="link-hover">Philosophy</a>
      <a href="#protocol" className="link-hover">Protocol</a>
      <a href="#join" className="btn-magnetic px-5 py-2 rounded-full border border-signal text-signal overflow-hidden group">
        <span className="absolute inset-0 bg-signal transform scale-x-0 origin-left transition-transform duration-500 ease-magnetic group-hover:scale-x-100 z-0"></span>
        <span className="btn-text group-hover:text-dark transition-colors font-medium">Join Council</span>
      </a>
    </nav>
  );
};

// --- B. HERO SECTION ---
const Hero = () => {
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative h-[100dvh] w-full flex flex-col justify-end p-8 md:p-16">
      {/* Background with Heavy Gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80")' }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/80 to-transparent" />

      {/* Content */}
      <div className="relative z-20 w-full md:w-2/3 max-w-4xl text-paper">
        <p className="hero-animate font-mono text-signal mb-6 text-sm uppercase tracking-widest flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span>
          System Initialization
        </p>

        <h1 className="hero-animate font-sans font-bold text-5xl md:text-7xl leading-none tracking-tighter mix-blend-difference text-white">
          MASTER the
        </h1>
        <h2 className="hero-animate font-serif italic text-7xl md:text-9xl text-signal leading-none -mt-2 -ml-2 mb-8 mix-blend-screen overflow-hidden">
          Digital Force.
        </h2>

        <p className="hero-animate font-sans text-xl md:text-2xl text-paper/80 max-w-2xl leading-relaxed mb-10 border-l-2 border-signal pl-6">
          Saurabh — Your AI Jedi guiding you through the digital force of machine learning.
        </p>

        <button className="hero-animate btn-magnetic bg-signal text-dark px-8 py-4 rounded-full font-sans font-bold text-lg uppercase tracking-wider group">
          <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-magnetic group-hover:scale-x-100 z-0"></span>
          <span className="btn-text">Start Your Training</span>
        </button>
      </div>
    </section>
  );
};

// --- C. FEATURES (The 3 Interaction Cards) ---

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState(['Signal to Noise Ratio', 'Algorithmic Purity', 'Agnostic Discovery']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-paper p-8 rounded-4xl shadow-lg border border-dark/10 h-72 flex flex-col relative overflow-hidden group">
      <h3 className="font-sans font-bold text-2xl tracking-tighter mb-2">"Force-Sensitive" Curation</h3>
      <p className="font-sans text-dark/70 text-sm mb-6">Cutting through digital noise to deliver only tools that matter.</p>

      <div className="relative flex-1 mt-4">
        {cards.map((text, i) => (
          <div
            key={text}
            className="absolute w-full p-4 rounded-2xl bg-white border border-dark/5 shadow-sm transition-all duration-700 ease-spring-bounce flex items-center justify-between font-mono text-xs uppercase"
            style={{
              top: `${i * 12}px`,
              transform: `scale(${1 - i * 0.05})`,
              zIndex: 10 - i,
              opacity: 1 - i * 0.2
            }}
          >
            <span>{text}</span>
            <Radio size={14} className={i === 0 ? "text-signal animate-pulse" : "text-dark/30"} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const fullText = "Breaking down complex neural networks into simple steps.";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length + 10) i = 0; // Reset after a pause
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark text-paper p-8 rounded-4xl shadow-lg border border-dark/10 h-72 flex flex-col relative">
      <h3 className="font-sans font-bold text-2xl tracking-tighter mb-2">The "Padawan" Path</h3>
      <p className="font-sans text-paper/70 text-sm mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span>
        Live Transmission
      </p>

      <div className="flex-1 bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 font-mono text-xs leading-relaxed overflow-hidden">
        <div className="text-signal/50 mb-2">{'>'} sys.boot.protocol</div>
        <div>
          <span className="text-paper">{text}</span>
          <span className="inline-block w-2.5 h-3.5 ml-1 align-middle bg-signal animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const CursorScheduler = () => {
  const cursorRef = useRef();
  const cellRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      // Move to cell
      tl.to(cursorRef.current, { x: 80, y: 70, duration: 1, ease: 'power2.inOut' })
        // Click
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        // Cell Highlight
        .to(cellRef.current, { backgroundColor: '#E63B2E', color: '#111', duration: 0.2 }, "-=0.2")
        // Move away
        .to(cursorRef.current, { x: 180, y: 150, opacity: 0, duration: 1, delay: 0.5 })
        // Reset cell
        .set(cellRef.current, { backgroundColor: 'transparent', color: '#111' })
        // Reset cursor
        .set(cursorRef.current, { x: 0, y: 0, scale: 1, opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-paper p-8 rounded-4xl shadow-lg border border-dark/10 h-72 flex flex-col relative overflow-hidden group">
      <h3 className="font-sans font-bold text-2xl tracking-tighter mb-2">Wisdom Over Hype</h3>
      <p className="font-sans text-dark/70 text-sm mb-6">Philosophy over tutorials. Learn to think with the tools.</p>

      <div className="flex-1 rounded-2xl border border-dark/10 bg-offwhite p-4 relative">
        <div className="grid grid-cols-7 gap-1 h-full font-mono text-[10px] text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-dark/40">{d}</div>)}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              ref={i === 9 ? cellRef : null}
              className={`flex items-center justify-center rounded-md border border-dark/5 transition-colors ${i === 9 ? 'font-bold' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        {/* SVG Cursor */}
        <div ref={cursorRef} className="absolute top-0 left-0 z-10 w-6 h-6 text-dark drop-shadow-md">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1"><path d="M4 2.872a1.002 1.002 0 011.603-.801l14.286 10.714a1.002 1.002 0 01-.2 1.705l-4.502 1.93-3.111 6.533a1.001 1.001 0 01-1.801.003L7.427 16.48l-4.708-1.569A1.002 1.002 0 014 14.004V2.872z" /></svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-8 md:px-16 bg-offwhite">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorScheduler />
      </div>
    </section>
  );
};

// --- D. PHILOSOPHY SECTION ---
const Philosophy = () => {
  const textRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const splitText = textRef.current.children;
      gsap.from(splitText, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" className="relative py-40 px-8 md:px-16 bg-black text-paper overflow-hidden">
      {/* Concrete texture bg */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80")' }}
      />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="font-sans text-xl md:text-2xl text-paper/50 mb-8 max-w-2xl">
          Most influencers focus on: following the latest 10-minute tutorial hype.
        </p>
        <div ref={textRef} className="overflow-hidden">
          <span className="block font-serif italic text-6xl md:text-8xl leading-none tracking-tight">
            We focus on:
          </span>
          <span className="block font-serif italic text-6xl md:text-8xl leading-none tracking-tight text-signal mt-2">
            Thinking with the tools.
          </span>
        </div>
      </div>
    </section>
  );
};

// --- E. PROTOCOL SECTION (Sticky Stacking Archive) ---
const ProtocolCard = ({ num, title, desc, icon: Icon, zIndex, bgImage }) => {
  const cardRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top top',
        endTrigger: '.protocol-container',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });

      // Blur out the card when the NEXT card scrolls over it
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
        scale: 0.9,
        filter: 'blur(20px)',
        opacity: 0.5,
        ease: 'none'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="absolute inset-x-0 h-[100dvh] flex items-center justify-center bg-offwhite border-t border-dark/10" style={{ zIndex }}>
      {/* Subtle Brutalist Texture */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-multiply" style={{ backgroundImage: `url(${bgImage})` }} />

      <div className="relative z-10 max-w-4xl w-full px-8 md:px-16 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <div className="font-mono text-signal text-lg mb-6 border border-signal px-3 py-1 rounded-full w-max">{num}</div>
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-dark mb-6 leading-none">{title}</h2>
          <p className="font-sans text-xl text-dark/70 leading-relaxed border-l-4 border-signal pl-6">{desc}</p>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <Icon size={120} className="text-dark/20" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}

const Protocol = () => {
  return (
    <section id="protocol" className="protocol-container relative w-full" style={{ height: '300dvh' }}>
      <ProtocolCard
        num="[01]" title="Signal Extraction"
        desc="Isolating high-value machine learning patterns from the surrounding algorithmic noise."
        icon={Radio} zIndex={10} bgImage="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop"
      />
      <ProtocolCard
        num="[02]" title="Neural Translation"
        desc="Converting highly complex transformer architectures into clear, actionable human logic."
        icon={Terminal} zIndex={20} bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
      />
      <ProtocolCard
        num="[03]" title="Jedi Application"
        desc="Deploying your trained models with exact precision, maintaining philosophical intent over hype."
        icon={MousePointer2} zIndex={30} bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
      />
    </section>
  );
};

// --- F. GET STARTED & G. FOOTER ---
const Footer = () => {
  return (
    <section id="join" className="relative bg-dark text-paper rounded-t-[4rem] mt-[-2rem] z-40 overflow-hidden pt-32 pb-16 px-8 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center pb-32 border-b border-paper/10">
        <h2 className="font-serif italic text-6xl md:text-8xl tracking-tight text-white mb-6">Join the Council.</h2>
        <p className="font-sans text-xl text-paper/60 max-w-xl mb-12">
          Subscribe to the Signal and receive raw, unpolished transmissions of AI wisdom directly to your terminal.
        </p>
        <button className="btn-magnetic bg-signal text-dark px-10 py-5 rounded-full font-sans font-bold text-xl uppercase tracking-widest group">
          <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-magnetic group-hover:scale-x-100 z-0"></span>
          <span className="btn-text">Subscribe to the Signal</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center font-mono text-sm text-paper/40 gap-8">
        <div className="flex items-center gap-3 border border-signal/30 bg-signal/5 px-4 py-2 rounded-full text-signal">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse shadow-[0_0_10px_#e63b2e]"></span>
          SYSTEM OPERATIONAL
        </div>
        <div>© 2026 SAURABH. DIGITAL FORCE.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-paper transition-colors">Transmissions</a>
          <a href="#" className="hover:text-paper transition-colors">Archives</a>
          <a href="#" className="hover:text-paper transition-colors">Data Policy</a>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <main className="relative selection:bg-signal selection:text-dark">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <div style={{ height: '300dvh', pointerEvents: 'none', position: 'absolute' }}></div>{/* Spacer for sticky cards */}
      <Footer />
    </main>
  );
}

export default App;
