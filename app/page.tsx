"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// @ts-ignore
import confetti from "canvas-confetti";
import { Heart, Moon, Sparkles, Volume2, VolumeX } from "lucide-react";

// ============================================================================
// ✨ THE ART DIRECTION
// ============================================================================
const CONFIG = {
  recipientName: "My Shayla",
  musicUrl: "/background.mp3", // Smooth Lo-fi or Piano recommended
  chapters: [
    {
      title: "Celestial",
      text: "In a world of billions, my soul found its gravity in you.",
      color: "from-blue-200/20 to-purple-200/20",
    },
    {
      title: "Ethereal",
      text: "Every laugh we share is a note in a symphony I never want to end.",
      color: "from-rose-200/20 to-orange-200/20",
    },
    {
      title: "Eternal",
      text: "You aren't just my partner; you are my home, my peace, and my forever.",
      color: "from-indigo-200/20 to-rose-200/20",
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
      
      {/* Dynamic Background Noise & Glow */}
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

      {/* Subtle Controls */}
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

// --- STAGE 1: AWAKENING ---
function Awakening({ onStart, name }: { onStart: () => void; name: string }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
      className="relative z-10 h-full w-full flex flex-col items-center justify-center cursor-pointer"
      onClick={onStart}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-64 h-64 bg-rose-500/20 rounded-full blur-[100px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-center space-y-8"
      >
        <div className="relative">
            <Heart className="w-12 h-12 text-rose-300 mx-auto stroke-[1px] animate-pulse" />
        </div>
        <h1 className="text-2xl tracking-[0.8em] uppercase font-extralight text-rose-100/60 ml-[0.8em]">
          {name}
        </h1>
        <p className="text-xs tracking-[0.3em] text-white/30 uppercase">Tap to begin the journey</p>
      </motion.div>
    </motion.div>
  );
}

// --- STAGE 2: THE JOURNEY ---
function Journey({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= CONFIG.chapters.length) {
      setTimeout(onNext, 1000);
    }
  }, [index]);

  return (
    <div className="relative z-10 h-full w-full flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {index < CONFIG.chapters.length && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="max-w-2xl text-center space-y-8"
          >
            <span className="text-xs tracking-[0.5em] text-rose-300/50 uppercase italic">
              — {CONFIG.chapters[index].title} —
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight font-extralight italic">
              {CONFIG.chapters[index].text}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIndex(index + 1)}
              className="mt-12 px-8 py-px h-12 border border-white/20 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- STAGE 3: THE PROPOSAL ---
function Proposal({ onYes }: { onYes: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col items-center justify-center space-y-12"
    >
      <div className="space-y-4 text-center">
        <motion.div 
          animate={{ rotate: [0, 360] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <Moon className="w-16 h-16 text-rose-100/20 mx-auto" strokeWidth={1} />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
          Will you be my <br/>
          <span className="text-rose-200 italic">Valentine?</span>
        </h2>
      </div>

      <div className="flex gap-12 items-center">
        <button 
          onClick={() => {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffffff', '#ffccd5'] });
            onYes();
          }}
          className="relative group overflow-hidden px-12 py-4 rounded-full border border-rose-200/50 text-rose-100"
        >
          <span className="relative z-10 tracking-widest uppercase text-sm">Yes</span>
          <div className="absolute inset-0 bg-rose-200/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>
    </motion.div>
  );
}

// --- STAGE 4: CONSTELLATION (FINALE) ---
function Constellation() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="relative">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -inset-24 bg-rose-400 rounded-full blur-[120px]" 
        />
        
        <Sparkles className="w-12 h-12 text-rose-200 mb-8 mx-auto opacity-50" />
        
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="space-y-6"
        >
            <h2 className="text-4xl font-serif italic text-rose-50">Forever & Always</h2>
            <p className="max-w-md text-xl font-extralight text-rose-100/70 leading-relaxed">
                {CONFIG.finalMessage}
            </p>
            <div className="pt-12">
                <div className="w-px h-24 bg-gradient-to-b from-rose-200/50 to-transparent mx-auto" />
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
}