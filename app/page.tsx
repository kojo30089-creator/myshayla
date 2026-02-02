"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import confetti from "canvas-confetti";
import { Heart, Moon, Sparkles, Volume2, VolumeX } from "lucide-react";

// ============================================================================
// ✨ THE ART DIRECTION
// ============================================================================
const CONFIG = {
  recipientName: "Princess",
  musicUrl: "/background.mp3",
  chapters: [
    {
      title: "Celestial",
      text: "In a world of billions, my soul found its gravity in you.",
    },
    {
      title: "Ethereal",
      text: "Every laugh we share is a note in a symphony I never want to end.",
    },
    {
      title: "Eternal",
      text: "You aren't just my partner; you are my home, my peace, and my forever.",
    },
  ],
  finalMessage: "You make life more beautiful just by being in it.",
};

export default function CelestialValentine() {
  const [stage, setStage] = useState<"awakening" | "journey" | "proposal" | "constellation">("awakening");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    setStage("journey");
  };

  return (
    <main className="fixed inset-0 bg-[#0a0a0c] text-white selection:bg-rose-200/30 overflow-hidden font-light">
      <audio ref={audioRef} loop src={CONFIG.musicUrl} />
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(255,182,193,0.05)_0%,_transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <AnimatePresence mode="wait">
        {stage === "awakening" && (
          <Awakening key="awake" onStart={handleStart} name={CONFIG.recipientName} />
        )}
        {stage === "journey" && (
          <Journey key="journey" onNext={() => setStage("proposal")} />
        )}
        {stage === "proposal" && (
          <Proposal key="proposal" onYes={() => setStage("constellation")} />
        )}
        {stage === "constellation" && (
          <Constellation key="constellation" />
        )}
      </AnimatePresence>

      {stage !== "awakening" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed bottom-8 right-8 z-50 flex gap-4">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            {isPlaying ? <Volume2 className="w-4 h-4 text-rose-200" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          </button>
        </motion.div>
      )}
    </main>
  );
}

function Awakening({ onStart, name }: { onStart: () => void; name: string }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
      className="relative z-10 h-full w-full flex flex-col items-center justify-center cursor-pointer"
      onClick={onStart}
    >
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-64 h-64 bg-rose-500/20 rounded-full blur-[100px]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }} className="text-center space-y-8">
        <Heart className="w-12 h-12 text-rose-300 mx-auto stroke-[1px] animate-pulse" />
        <h1 className="text-2xl tracking-[0.8em] uppercase font-extralight text-rose-100/60 ml-[0.8em]">{name}</h1>
        <p className="text-xs tracking-[0.3em] text-white/30 uppercase">Tap to begin the journey</p>
      </motion.div>
    </motion.div>
  );
}

function Journey({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= CONFIG.chapters.length) {
      setTimeout(onNext, 1000);
    }
  }, [index, onNext]);

  return (
    <div className="relative z-10 h-full w-full flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {index < CONFIG.chapters.length && (
          <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 1.5 }} className="max-w-2xl text-center space-y-8">
            <span className="text-xs tracking-[0.5em] text-rose-300/50 uppercase italic">— {CONFIG.chapters[index].title} —</span>
            <h2 className="text-4xl md:text-5xl leading-tight font-extralight italic">{CONFIG.chapters[index].text}</h2>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => setIndex(index + 1)} className="mt-12 px-8 py-px h-12 border border-white/20 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Proposal({ onYes }: { onYes: () => void }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noLabelIndex, setNoLabelIndex] = useState(0);
  
  const noLabels = ["No", "Wait", "Think", "Retry", "Missed", "Nope", "Can't Click"];

  const moveNoButton = () => {
    // Generate random jumps between 100 and 200 pixels
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    setNoPosition({ x, y });
    setNoLabelIndex((prev) => (prev + 1) % noLabels.length);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full flex flex-col items-center justify-center space-y-16 p-6">
      <div className="space-y-4 text-center">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="mb-8">
          <Moon className="w-16 h-16 text-rose-100/20 mx-auto" strokeWidth={1} />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
          Will you be my <br/>
          <span className="text-rose-200 italic">Valentine?</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center relative min-h-[100px]">
        {/* YES BUTTON - Solid and Glowing */}
        <button 
          onClick={() => {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#ffffff', '#ffccd5', '#fb7185'] });
            onYes();
          }}
          className="relative z-10 px-16 py-4 rounded-full bg-rose-500/20 border border-rose-300/40 text-rose-100 backdrop-blur-md shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all hover:scale-105 hover:bg-rose-500/30"
        >
          <span className="tracking-[0.3em] uppercase text-sm font-semibold">Yes</span>
        </button>

        {/* IMPROVED NO BUTTON - More Visible Glass Style */}
        <motion.button 
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="px-10 py-4 rounded-full border border-white/40 bg-white/10 text-white/80 text-xs tracking-widest uppercase backdrop-blur-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {noLabels[noLabelIndex]}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Constellation() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full flex flex-col items-center justify-center p-8 text-center">
      <div className="relative">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -inset-24 bg-rose-400 rounded-full blur-[120px]" />
        <Sparkles className="w-12 h-12 text-rose-200 mb-8 mx-auto opacity-50" />
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 2 }} className="space-y-6">
            <h2 className="text-4xl font-serif italic text-rose-50">Forever & Always</h2>
            <p className="max-w-md text-xl font-extralight text-rose-100/70 leading-relaxed">{CONFIG.finalMessage}</p>
            <div className="pt-12"><div className="w-px h-24 bg-gradient-to-b from-rose-200/50 to-transparent mx-auto" /></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
