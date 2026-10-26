import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, ChevronRight, Volume2, VolumeX, X, Hotel, MailOpen, Heart, Stars, Feather } from "lucide-react";
import { useInView } from 'react-intersection-observer';

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Hasini & Dinal
 * Background: Cream/Sand
 * Accents: Brown/Brown
 */

const brideGroomImage = "/image123.jpeg";
const backgroundMusic = "/Harry_Potter_-_Theme_Song_Hedwig_s_Theme_(mp3.pm).mp3";
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbzUhMfjlvB-Q89txL_PHlfNZPzX89n0liV-TnSoCfhN2MA8sGdHMkwL4rEDHdRtYtadlw/exec";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function MagicalLights() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [lights, setLights] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setLights([]);
      return;
    }

    const colors = ["#c9a227", "#ffffff", "#ffdf00", "#ffffff", "#c5a059"];
    const lightCount = isMobile ? 25 : 50;
    const newLights = Array.from({ length: lightCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 20 - 10,
    }));

    setLights(newLights);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute rounded-full"
          style={{ 
            backgroundColor: light.color, 
            width: light.size, 
            height: light.size,
            boxShadow: `0 0 ${light.size * 2}px ${light.color}, 0 0 ${light.size * 4}px ${light.color}`
          }}
          initial={{
            x: `${light.x}vw`,
            y: "110vh",
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: "-10vh",
            x: `${light.x + light.drift}vw`,
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [0, 1, 1.2, 1, 0],
          }}
          transition={{
            duration: isLowPowerMode ? light.duration * 1.2 : light.duration,
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CountdownTimer() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const targetDate = useMemo(() => new Date("January 20, 2027 09:29:00").getTime(), []);

  const getTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  })), []);

  return (
    <section
      ref={ref}
      className="relative py-14 md:py-20 flex flex-col items-center overflow-hidden z-20 bg-black"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1810] via-[#5c3a1e] to-[#2a1810]" />
      </div>
      
      {/* Texture & Glow Layer */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-[#c9a227]/20"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360, 0],
              opacity: [0, 0.45, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-6xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="mx-auto mb-8 max-w-4xl text-center md:mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/45 bg-black/30 px-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#c9a227]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffffff] sm:text-sm">
              The Big Day Approaches
            </span>
            <Sparkles className="h-4 w-4 text-[#c9a227]" />
          </motion.div>

          <h2 className="font-alex text-4xl sm:text-5xl md:text-7xl leading-tight text-white drop-shadow-xl">
            Counting Down to <span className="relative inline-block text-shimmer">
              Forever
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[#ffffff]/80 font-montserrat tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
            Every second brings us closer to our blessed wedding day. We cannot wait to celebrate this grace-filled moment with you.
          </p>
        </motion.div>

        <div className="w-full rounded-3xl md:rounded-[2.5rem] border border-[#c9a227]/30 bg-black/20 p-3 sm:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.1,
                  type: "spring",
                  bounce: 0.35
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-[2rem] border border-white/10 bg-white/5 p-2 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-[#c9a227]/40 group-hover:bg-white/10 md:p-8">
                  <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#c9a227]/20 hidden sm:block" />
                  <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-[#c9a227]/10 hidden sm:block" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-[36px] w-full items-center justify-center overflow-hidden sm:h-[64px] md:h-[96px]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: 40, opacity: 0, scale: 0.65 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -40, opacity: 0, scale: 0.65 }}
                          transition={{
                            type: "spring",
                            stiffness: 370,
                            damping: 24,
                            mass: 1
                          }}
                          className="absolute font-serif text-2xl font-semibold text-[#ffffff] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-5xl md:text-7xl"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="mt-2 sm:mt-3 rounded-full border border-[#c9a227]/40 bg-black/40 px-1.5 sm:px-3 py-1 sm:py-1.5 shadow-sm md:mt-5">
                      <p className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.22em] text-[#c9a227] md:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-[#c9a227]">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-[#ffffff]/80 sm:text-2xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Small screens: candles float only in the empty bands above the heading and below the card.
const mobileCandles = [
  { left: "7%", top: "18px", height: 34, delay: 0 },
  { left: "24%", top: "34px", height: 24, delay: 1.2 },
  { left: "72%", top: "30px", height: 26, delay: 0.6 },
  { left: "89%", top: "14px", height: 36, delay: 0.9 },
  { left: "12%", bottom: "22px", height: 30, delay: 0.3 },
  { left: "50%", bottom: "14px", height: 24, delay: 1.7 },
  { left: "84%", bottom: "20px", height: 32, delay: 1.5 },
];

// Large screens: candles line the side gutters beside the card.
const desktopCandles = [
  { left: "5%", top: "12%", height: 46, delay: 0 },
  { left: "11%", top: "38%", height: 34, delay: 1.2 },
  { left: "6%", top: "68%", height: 40, delay: 0.6 },
  { left: "92%", top: "10%", height: 38, delay: 0.9 },
  { left: "86%", top: "44%", height: 48, delay: 0.3 },
  { left: "93%", top: "74%", height: 32, delay: 1.5 },
  { left: "26%", top: "2%", height: 28, delay: 2 },
  { left: "72%", top: "3%", height: 30, delay: 1.1 },
];

type Candle = { left: string; top?: string; bottom?: string; height: number; delay: number };

function FloatingCandles() {
  const groups: Array<[Candle[], string]> = [
    [mobileCandles, "flex lg:hidden"],
    [desktopCandles, "hidden lg:flex"],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {groups.flatMap(([list, visibility], g) => list.map((candle, i) => (
        <motion.div
          key={`${g}-${i}`}
          className={`absolute flex-col items-center -translate-x-1/2 ${visibility}`}
          style={{ left: candle.left, top: candle.top, bottom: candle.bottom }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5 + (i % 3), delay: candle.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-2.5 h-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#ff9a1f] via-[#ffd76a] to-[#fff6d5] shadow-[0_0_14px_6px_rgba(255,200,90,0.45)]"
            animate={{ scaleY: [1, 1.2, 0.9, 1.1, 1], opacity: [0.9, 1, 0.85, 1, 0.9] }}
            transition={{ duration: 1.4, delay: candle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="w-3 md:w-3.5 rounded-sm bg-gradient-to-r from-[#e8dcc0] via-[#fffaf0] to-[#d9c9a5] shadow-[0_0_18px_rgba(255,220,150,0.25)]"
            style={{ height: candle.height }}
          />
        </motion.div>
      )))}
    </div>
  );
}

const stars = Array.from({ length: 40 }).map((_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.6,
}));

function MagicStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#f3e2a0]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, boxShadow: "0 0 6px #f3e2a0" }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 3, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Preload critical assets */
const criticalAssets = ["/monogram_aa.png"];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#fbf6ea]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#5c3a1e] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#5c3a1e] mt-1">Saminro Grand Palace, Makola</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fbf6ea]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#5c3a1e]/30" />
                <h3 className="font-playball text-3xl text-[#5c3a1e]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#5c3a1e]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#e3c77d]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#5c3a1e] mb-4 border-b border-[#e3c77d]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-stone-700">{room.name}</p>
                            <p className="text-[10px] text-stone-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#5c3a1e] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#5c3a1e]/30" />
                <h3 className="font-playball text-3xl text-[#5c3a1e]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#5c3a1e]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#e3c77d]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#5c3a1e] mb-4 border-b border-[#e3c77d]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-stone-700">{room.name}</p>
                            <p className="text-[10px] text-stone-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#5c3a1e] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#5c3a1e]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#5c3a1e]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#5c3a1e] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-stone-50 flex justify-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to.replace(/_/g, " ")); // Replace underscores with spaces for cleaner URLs
    }
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [musicAudible, setMusicAudible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlockedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      hasStartedMusicRef.current = true;
      audioUnlockedRef.current = true;
      setMusicAudible(true);
      return true;
    } catch (err) {
      console.error("Audio play failed:", err);
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    if (audioUnlockedRef.current) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [playMusic, playMutedMusicFallback]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    if (isOpened) {
      preloadAssets();
    }
  }, [isOpened]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // With no-cors, we can't check response.ok, so we assume success if no promise rejection
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <main
      className={`min-h-screen w-full bg-[#fdfaf5] transition-all duration-1000 ${isOpened
        ? "relative"
        : "h-[100dvh] overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <MagicalLights />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={videoRef}
              muted
              playsInline
              onEnded={() => {
                setIsOpened(true);
                void unlockAudioFromGesture();
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${!isVideoPlaying ? "blur-md scale-105" : "blur-0 scale-100"}`}
            >
              <source src="/gemini_generated_video_7e40cf78.mp4" type="video/mp4" />
            </video>

            <div className={`absolute inset-0 z-10 bg-black/40 transition-opacity duration-1000 ${isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`} />

            {!isVideoPlaying && (
              <div className="absolute z-20 flex flex-col items-center gap-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <p className="text-[#ffffff] font-cinzel text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 drop-shadow-md">The Wedding Invitation</p>
                  <h1 className="text-[#ffffff] font-alex text-[3.5rem] leading-[1.1] md:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4">
                    <span>Hasini</span>
                    <span className="font-serif text-2xl md:text-3xl italic text-[#c9a227] my-1 md:my-0">&amp;</span>
                    <span>Dinal</span>
                  </h1>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoPlaying(true);
                    videoRef.current?.play();
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.muted = false;
                      audioRef.current.volume = 1;
                      audioRef.current.play().catch(console.error);
                      setMusicAudible(true);
                      audioUnlockedRef.current = true;
                    }
                    void unlockAudioFromGesture();
                  }}
                  className="px-8 py-4 bg-[#5c3a1e] text-[#ffffff] rounded-full font-cinzel tracking-[0.2em] text-[10px] md:text-sm uppercase shadow-2xl hover:bg-[#3b2314] transition-all border border-[#c9a227]/30 hover:scale-105 mt-4"
                >
                  View Invitation
                </motion.button>
              </div>
            )}

            {isVideoPlaying && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  videoRef.current?.pause();
                  setIsOpened(true);
                  void unlockAudioFromGesture();
                }}
                className="absolute bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-[#c9a227]/60 bg-[#2a1810]/70 px-5 py-2.5 font-cinzel text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#f3e2a0] shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md transition-all hover:bg-[#3b2314] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]"
              >
                Skip Video
                <ChevronRight className="h-4 w-4 text-[#d4af37]" />
              </motion.button>
            )}
            
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section className="relative z-10 w-full bg-[#2a1810] flex justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.2] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.18),transparent_65%)] pointer-events-none" />

              <motion.img
                src="/hero-invitation.png"
                alt="Hasini & Dinal - 20th January 2027 at Monty Hotel, Ampara"
                width={870}
                height={1808}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="relative block w-full h-auto md:w-auto md:max-h-[100dvh] md:shadow-[0_0_80px_rgba(212,175,55,0.25)]"
              />

              <div className="absolute bottom-4 md:bottom-6 w-full flex flex-col items-center z-10 pointer-events-none">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-1 rounded-full bg-[#2a1810]/60 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#f3e2a0] font-bold">SCROLL</span>
                  <ChevronDown className="h-4 w-4 text-[#d4af37]" />
                </motion.div>
              </div>
            </section>

            <section className="relative py-24 md:py-36 w-full flex flex-col items-center overflow-hidden z-10 border-b-[0.5px] border-[#c9a227]/30 bg-[#fdfaf5]">
              <div className="absolute inset-0 opacity-[0.5] bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] pointer-events-none" />

              {/* Cute heart accents for 'Cute' feel */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 text-[#d4af37] opacity-40"
              >
                <Heart size={30} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 text-[#d4af37] opacity-40"
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>

              <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#c9a227] opacity-60 hidden md:block"></div>
              <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#c9a227] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#c9a227] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#c9a227] opacity-60 hidden md:block"></div>

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16"
                >
                  <p className="tracking-[0.4em] md:tracking-[0.7em] text-[#c9a227] text-[9px] md:text-[12px] uppercase font-montserrat font-bold drop-shadow-sm">
                    {guestName ? "WE CORDIALLY INVITE" : "WE CORDIALLY INVITE YOU"}
                  </p>
                  {guestName && (
                    <div className="pt-4 pb-2 w-full flex justify-center">
                      <span className="text-[#3b2314] font-alex text-[2.8rem] md:text-6xl block my-2 drop-shadow-sm leading-tight text-center">
                        {guestName}
                      </span>
                    </div>
                  )}
                  <p className="text-stone-500 font-serif text-[15px] md:text-[22px] italic tracking-wide mt-2 mb-2 uppercase">
                    TO CELEBRATE OUR WEDDING
                  </p>
                  <div className="h-[0.5px] w-24 bg-[#c9a227]/50 mt-6" />
                </motion.div>

                <div className="relative w-full flex flex-col items-center mt-4 mb-8">
                  {/* Arched portrait in a gold frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="relative w-[260px] md:w-[340px] aspect-[3/4] p-2 rounded-t-full bg-gradient-to-b from-[#e6c66a] via-[#b8860b] to-[#7a5512] shadow-[0_30px_70px_-20px_rgba(59,35,20,0.55)]"
                  >
                    <div className="relative w-full h-full rounded-t-full overflow-hidden border-2 border-[#fbf5e6] group">
                      <img
                        src="/pre/couple-portrait.jpeg"
                        alt="Hasini & Dinal"
                        loading="lazy"
                        decoding="async"
                        width={340}
                        height={453}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3b2314]/40 via-transparent to-transparent" />
                    </div>
                    <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-[#c9a227] animate-pulse" />
                    <Sparkles className="absolute -bottom-3 -left-3 w-5 h-5 text-[#c9a227] animate-pulse" style={{ animationDelay: "700ms" }} />
                  </motion.div>

                  {/* Families */}
                  <div className="relative w-full max-w-5xl mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-0 md:gap-8">
                    {[
                      { role: "The Bride", relation: "Beloved daughter of", father: "Mr. H.M. Upul Nishantha", mother: "Mrs. U.G. Sandya Shyamali", name: "Hasini", surname: "Dhananjana", from: -30 },
                      null,
                      { role: "The Groom", relation: "Beloved son of", father: "Mr. S. Abeysinghe", mother: "Mrs. P.A. Irangani", name: "Dinal", surname: "Abeysinghe", from: 30 },
                    ].map((family, i) =>
                      family ? (
                        <motion.div
                          key={family.name}
                          initial={{ opacity: 0, y: 30, x: 0 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.2 }}
                          className="relative z-0 w-full max-w-[340px] md:max-w-[400px] rounded-t-[999px] p-[1.5px] bg-gradient-to-b from-[#e6c66a] via-[#b8860b] to-[#7a5512] shadow-[0_30px_60px_-25px_rgba(59,35,20,0.55)]"
                        >
                          <div className="relative rounded-t-[999px] bg-gradient-to-b from-[#fffaf0] via-[#fbf5e6] to-[#f3e6c8] px-6 pt-16 pb-12 md:px-10 md:pt-20 md:pb-14 overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,226,150,0.45),transparent_65%)] pointer-events-none" />
                            <div className="absolute inset-2.5 rounded-t-[999px] border-[0.5px] border-[#b8860b]/50 pointer-events-none" />

                            {/* Bottom corner flourishes */}
                            {["left-4 scale-x-100", "right-4 -scale-x-100"].map((pos) => (
                              <svg key={pos} viewBox="0 0 40 40" className={`absolute bottom-4 ${pos} w-8 h-8 text-[#b8860b]/70 pointer-events-none`} fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M2 38 L2 18 M2 38 L22 38" />
                                <path d="M2 26 C10 26 14 30 14 38" />
                                <circle cx="2" cy="14" r="1.5" fill="currentColor" />
                                <circle cx="26" cy="38" r="1.5" fill="currentColor" />
                              </svg>
                            ))}

                            <div className="relative flex flex-col items-center text-center">
                              <Sparkles className="w-4 h-4 text-[#c9a227] mb-3" />
                              <p className="font-montserrat text-[9px] md:text-[10px] tracking-[0.5em] text-[#b8860b] uppercase font-bold">
                                {family.role}
                              </p>

                              <h3 className="mt-4 font-alex text-gold-gradient text-[3.4rem] md:text-7xl leading-none py-1">
                                {family.name}
                              </h3>
                              <p className="mt-2 font-cinzel text-[10px] md:text-[11px] tracking-[0.55em] text-[#8b5a2b] uppercase">
                                {family.surname}
                              </p>

                              <svg viewBox="0 0 160 16" className="w-36 h-4 my-6 text-[#b8860b]" fill="none" stroke="currentColor" strokeWidth="0.8">
                                <path d="M0 8 H62" />
                                <path d="M98 8 H160" />
                                <path d="M62 8 C70 0 76 0 80 8 C84 0 90 0 98 8" />
                                <path d="M62 8 C70 16 76 16 80 8 C84 16 90 16 98 8" />
                                <circle cx="80" cy="8" r="2" fill="currentColor" />
                              </svg>

                              <p className="font-serif italic text-[#8b5a2b] text-[15px] md:text-lg">
                                {family.relation}
                              </p>
                              <p className="mt-3 font-serif text-[#3b2314] text-lg md:text-xl leading-snug font-medium">
                                {family.father}
                              </p>
                              <p className="font-script text-[#b8860b] text-2xl leading-tight">&amp;</p>
                              <p className="font-serif text-[#3b2314] text-lg md:text-xl leading-snug font-medium">
                                {family.mother}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="relative z-20 -my-9 md:my-0 mx-auto flex items-center justify-center w-[72px] h-[72px] md:w-24 md:h-24 rounded-full bg-[#2a1810] border-2 border-[#c9a227] shadow-[0_0_0_5px_#fbf5e6,0_0_0_6px_rgba(201,162,39,0.5),0_0_40px_rgba(212,175,55,0.45)]"
                        >
                          {/* Deathly Hallows */}
                          <svg viewBox="0 0 100 100" className="absolute w-12 h-12 md:w-16 md:h-16 opacity-25" fill="none" stroke="#d4af37" strokeWidth="3">
                            <polygon points="50,8 94,86 6,86" />
                            <circle cx="50" cy="60" r="25" />
                            <line x1="50" y1="8" x2="50" y2="86" />
                          </svg>
                          <span className="relative font-script text-4xl md:text-5xl text-shimmer leading-none">&amp;</span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <CountdownTimer />

            <section className="relative py-20 md:py-28 bg-[#fbf5e6] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,226,150,0.55),transparent_60%)] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 flex items-center gap-3 mb-10 md:mb-12"
              >
                <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-r from-transparent to-[#b8860b]" />
                <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#8b5a2b]">From the Portrait Gallery</span>
                <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-l from-transparent to-[#b8860b]" />
              </motion.div>

              {/* Gilded oval portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ rotate: [-0.8, 0.8, -0.8] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% -40px" }}
                  className="relative"
                >
                  {/* Hanging ribbon */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#f3e2a0] to-[#8a6416] shadow" />
                    <div className="w-px h-7 bg-gradient-to-b from-[#b8860b] to-[#8a6416]" />
                  </div>

                  <div className="relative w-[250px] h-[310px] md:w-[320px] md:h-[400px] rounded-[50%] p-3 md:p-4 bg-[conic-gradient(from_200deg,#7a5512,#e6c66a,#b8860b,#f3e2a0,#8a6416,#d4af37,#7a5512)] shadow-[0_35px_70px_-20px_rgba(59,35,20,0.6),0_0_60px_rgba(212,175,55,0.35)]">
                    <div className="absolute inset-1.5 md:inset-2 rounded-[50%] border border-[#fff3c4]/60 pointer-events-none" />
                    <div className="relative w-full h-full rounded-[50%] p-1 bg-[#3b2314]">
                      <div className="relative w-full h-full rounded-[50%] overflow-hidden">
                        <motion.img
                          src="/pre/couple-selfie.jpeg"
                          alt="Hasini & Dinal"
                          loading="lazy"
                          decoding="async"
                          animate={{ scale: [1.04, 1.12, 1.04] }}
                          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                          className="w-full h-full object-cover object-[center_35%]"
                        />
                        <div className="absolute inset-0 rounded-[50%] shadow-[inset_0_0_40px_rgba(42,24,16,0.55)]" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#fff3c4]/20" />
                      </div>
                    </div>
                    <Sparkles className="absolute -top-1 -right-2 w-6 h-6 text-[#c9a227] animate-pulse" />
                    <Sparkles className="absolute bottom-6 -left-3 w-5 h-5 text-[#c9a227] animate-pulse" style={{ animationDelay: "800ms" }} />
                  </div>
                </motion.div>

                {/* Name plaque */}
                <div className="relative mx-auto -mt-5 w-fit px-7 py-2.5 rounded-sm bg-gradient-to-b from-[#e6c66a] via-[#c9a227] to-[#8a6416] shadow-[0_10px_25px_-8px_rgba(59,35,20,0.6)] border border-[#fff3c4]/50">
                  <p className="font-cinzel text-[11px] md:text-xs tracking-[0.3em] text-[#2a1810] uppercase font-bold whitespace-nowrap">
                    Hasini &amp; Dinal
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
                className="relative z-10 mt-8 max-w-md px-6 text-center font-serif italic text-[#5c3a1e]/80 text-base md:text-xl"
              >
                Two hearts, one story, and a little bit of magic
              </motion.p>
            </section>

            <section className="relative py-24 md:py-36 bg-[#f7efdf] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-[1px] bg-[#5c3a1e]" />
                        <span className="text-[#c9a227]">✦</span>
                        <span className="text-[#5c3a1e] font-bold uppercase tracking-[0.4em] text-[10px]">
                          T H E | V E N U E
                        </span>
                      </div>
                      <h2 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#5c3a1e] leading-tight tracking-widest font-bold uppercase">
                        Monty Hotel
                      </h2>
                      <p className="font-playball text-3xl md:text-5xl text-[#5c3a1e] italic mt-2">
                        Ampara
                      </p>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#e3c77d]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#5c3a1e] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#5c3a1e] font-cinzel leading-relaxed tracking-wide uppercase">
                          Monty Hotel, Ampara.
                        </p>
                      </div>
                      <p className="text-[#5c3a1e]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        <div dangerouslySetInnerHTML={{ __html: `WEDNESDAY, 20 JANUARY 2027<br/><br/>Celebration: 9.00 AM - 4.00 PM<br/>Poruwa Ceremony: 9.29 AM<br/>Registration: 11.50 AM` }} />
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open("https://www.google.com/maps/search/?api=1&query=Monty+Hotel+Ampara", "_blank")
                        }
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#5c3a1e] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#3b2314]"
                      >
                        <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Get Directions
                      </button>

                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(92,58,30,0.2)] border border-[#e3c77d]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#5c3a1e]/30 pointer-events-none z-20" />
                    <div className="w-full h-full overflow-hidden bg-white relative">
                      <iframe
                        src="https://maps.google.com/maps?q=Monty%20Hotel%20Ampara&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-28 md:py-40 bg-[#1f120b] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.12] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.22),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(92,58,30,0.6),transparent_70%)] pointer-events-none" />

              <MagicStars />
              <FloatingCandles />

              <div className="container mx-auto px-4 max-w-3xl flex flex-col items-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center mb-14"
                >
                  <div className="flex items-center gap-3 text-[#c9a227] mb-5">
                    <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-r from-transparent to-[#c9a227]" />
                    <Sparkles size={14} />
                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#f3e2a0]/80">By Owl Post</span>
                    <Sparkles size={14} />
                    <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-l from-transparent to-[#c9a227]" />
                  </div>
                  <h2 className="font-cinzel text-2xl md:text-4xl text-shimmer tracking-[0.3em] uppercase">
                    For Our Big Day
                  </h2>
                  <p className="mt-4 font-serif italic text-[#f3e2a0]/70 text-base md:text-xl">
                    Your presence is the most magical gift of all
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-xl"
                >
                  {/* Gold seal */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#e6c66a] via-[#b8860b] to-[#7a5512] shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_2px_6px_rgba(255,243,196,0.6)] border-2 border-[#f3e2a0]/60">
                    <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" stroke="#3b2314" strokeWidth="5">
                      <polygon points="50,10 92,84 8,84" />
                      <circle cx="50" cy="59" r="23" />
                      <line x1="50" y1="10" x2="50" y2="84" />
                    </svg>
                  </div>

                  <div className="relative bg-gradient-to-b from-[#fbf5e6] via-[#f5ead0] to-[#ead7a8] pt-16 pb-12 px-6 md:px-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),0_0_60px_rgba(212,175,55,0.2)]">
                    <div className="absolute inset-0 opacity-[0.35] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    <div className="absolute inset-3 border border-[#b8860b]/50 pointer-events-none" />
                    <div className="absolute inset-[18px] border-[0.5px] border-[#b8860b]/30 pointer-events-none" />
                    <span className="absolute top-5 left-5 text-[#b8860b] text-sm">✦</span>
                    <span className="absolute top-5 right-5 text-[#b8860b] text-sm">✦</span>
                    <span className="absolute bottom-5 left-5 text-[#b8860b] text-sm">✦</span>
                    <span className="absolute bottom-5 right-5 text-[#b8860b] text-sm">✦</span>

                    <div className="relative w-full flex flex-col items-center z-10">
                      <p className="font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] text-[#8b5a2b] uppercase font-semibold mb-3 text-center">
                        Hasini &amp; Dinal
                      </p>

                      <div className="flex items-center justify-center gap-4 w-full mb-3">
                        <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent to-[#b8860b]/60" />
                        <h3 className="font-alex text-5xl md:text-7xl text-gold-gradient whitespace-nowrap leading-[0.9] px-2">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-gradient-to-l from-transparent to-[#b8860b]/60" />
                      </div>
                      <p className="font-serif italic text-[#5c3a1e]/80 text-sm md:text-base text-center mb-10">
                        Kindly send your reply so we may save you a seat in the Great Hall
                      </p>

                      <form className="w-full space-y-8 text-left max-w-sm" onSubmit={handleRsvpSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-[#8b5a2b] uppercase tracking-[0.25em] transition-colors group-focus-within:text-[#b8860b]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="Your name"
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#b8860b]/40 px-0 py-2 text-[#3b2314] placeholder:text-[#8b5a2b]/40 focus:outline-none focus:border-[#b8860b] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-[#8b5a2b] uppercase tracking-[0.25em]">
                            Will you attend?
                          </label>

                          <div className="grid grid-cols-2 gap-3 font-serif italic text-base md:text-lg">
                            {[
                              { value: "yes", text: "Joyfully accepts" },
                              { value: "no", text: "Regretfully declines" },
                            ].map((option) => {
                              const selected = rsvpForm.attending === option.value;
                              return (
                                <label
                                  key={option.value}
                                  className={`flex items-center justify-center text-center gap-2 px-3 py-3 border cursor-pointer transition-all ${selected ? "border-[#b8860b] bg-[#3b2314] text-[#f3e2a0] shadow-[0_0_20px_rgba(212,175,55,0.35)]" : "border-[#b8860b]/40 text-[#5c3a1e] hover:border-[#b8860b] hover:bg-[#b8860b]/5"}`}
                                >
                                  <input
                                    type="radio"
                                    className="hidden"
                                    checked={selected}
                                    onChange={() => {
                                      setRsvpStatus("idle");
                                      setRsvpForm((prev) => ({ ...prev, attending: option.value }));
                                    }}
                                  />
                                  {selected && <Sparkles size={13} className="text-[#d4af37] shrink-0" />}
                                  <span>{option.text}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-[#8b5a2b] uppercase tracking-[0.25em] transition-colors group-focus-within:text-[#b8860b]">
                              Who will be joining?
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b border-[#b8860b]/40 px-0 py-2 pr-8 text-[#3b2314] focus:outline-none focus:border-[#b8860b] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                <option value="1">Only me</option>
                                <option value="2">The two of us</option>
                                {[3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} of us
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-[#b8860b]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold tracking-widest uppercase ${rsvpStatus === "success" ? "text-[#8b5a2b]" : "text-red-700"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "Mischief managed! Your RSVP has been sent."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="group relative w-full overflow-hidden bg-gradient-to-r from-[#3b2314] via-[#5c3a1e] to-[#3b2314] text-[#f3e2a0] border border-[#b8860b] py-4 font-cinzel text-[11px] md:text-xs tracking-[0.3em] uppercase transition-all shadow-[0_10px_30px_-10px_rgba(59,35,20,0.7)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] disabled:opacity-50"
                          >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#f3e2a0]/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            <span className="relative flex items-center justify-center gap-3">
                              <Sparkles size={14} className="text-[#d4af37]" />
                              {rsvpStatus === "sending" ? "Sending by owl..." : "Confirm Attendance"}
                              <Sparkles size={14} className="text-[#d4af37]" />
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <div className="relative bg-[#e3c77d]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-20 md:py-32 flex flex-col items-center overflow-hidden bg-[#f3e8d2]">
                <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,236,179,0.7),transparent_65%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(92,58,30,0.18),transparent_60%)] pointer-events-none" />

                {/* Drifting gold sparkles */}
                {[
                  { left: "8%", top: "14%", size: 14, delay: 0 },
                  { left: "90%", top: "10%", size: 18, delay: 1.2 },
                  { left: "5%", top: "62%", size: 12, delay: 0.6 },
                  { left: "93%", top: "58%", size: 14, delay: 1.8 },
                  { left: "18%", top: "90%", size: 10, delay: 2.4 },
                  { left: "80%", top: "92%", size: 12, delay: 0.9 },
                ].map((spark, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[#c9a227] pointer-events-none"
                    style={{ left: spark.left, top: spark.top }}
                    animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.15, 0.8], rotate: [0, 20, 0] }}
                    transition={{ duration: 4, delay: spark.delay, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles size={spark.size} />
                  </motion.div>
                ))}

                <div className="container mx-auto px-4 max-w-5xl relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-12 md:mb-16"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-r from-transparent to-[#b8860b]" />
                      <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#8b5a2b]">The Book of Wishes</span>
                      <div className="h-[0.5px] w-10 md:w-16 bg-gradient-to-l from-transparent to-[#b8860b]" />
                    </div>
                    <h2 className="font-alex text-gold-gradient text-4xl sm:text-5xl md:text-7xl leading-tight py-1">
                      Best Wishes
                    </h2>
                    <p className="mt-4 max-w-xl font-serif italic text-[#5c3a1e]/80 text-base md:text-xl leading-relaxed">
                      Your presence is the greatest gift of all, yet a few words from your heart would be a treasure we keep forever.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto w-full max-w-4xl p-2 md:p-3 rounded-md bg-gradient-to-br from-[#5c3a1e] via-[#3b2314] to-[#2a1810] shadow-[0_40px_90px_-25px_rgba(59,35,20,0.65)]"
                  >
                    {/* Gold-tooled leather edge */}
                    <div className="absolute inset-1 rounded-[4px] border border-[#c9a227]/50 pointer-events-none" />

                    <div className="relative grid md:grid-cols-2 bg-gradient-to-b from-[#fbf5e6] to-[#f2e4c4] rounded-[3px] overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                      {/* Book spine */}
                      <div className="hidden md:block absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8b5a2b]/20 to-transparent pointer-events-none" />
                      <div className="hidden md:block absolute inset-y-6 left-1/2 w-px bg-[#b8860b]/30 pointer-events-none" />

                      {/* Left page */}
                      <div className="relative flex flex-col items-center justify-center text-center px-8 py-10 md:px-12 md:py-14 border-b md:border-b-0 border-[#b8860b]/20">
                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-[#b8860b]/50 bg-[#fbf5e6] shadow-[0_0_30px_rgba(212,175,55,0.35)]">
                          <div className="absolute inset-1.5 rounded-full border-[0.5px] border-[#b8860b]/40" />
                          <Feather className="w-8 h-8 text-[#8b5a2b]" />
                        </div>
                        <p className="mt-8 font-serif italic text-[#3b2314] text-xl md:text-2xl leading-relaxed">
                          &ldquo;Words are, in my not-so-humble opinion, our most inexhaustible source of magic.&rdquo;
                        </p>
                        <p className="mt-4 font-cinzel text-[10px] tracking-[0.3em] text-[#8b5a2b] uppercase">Albus Dumbledore</p>
                        <div className="flex items-center gap-3 mt-8">
                          <div className="h-[0.5px] w-10 bg-[#b8860b]/50" />
                          <span className="text-[#b8860b] text-xs">✦</span>
                          <div className="h-[0.5px] w-10 bg-[#b8860b]/50" />
                        </div>
                        <p className="mt-6 font-script text-3xl md:text-4xl text-[#8b5a2b]">Hasini &amp; Dinal</p>
                      </div>

                      {/* Right page */}
                      <div className="relative px-8 py-10 md:px-12 md:py-14">
                        <form className="space-y-8 text-left" onSubmit={handleWishSubmit}>
                          <div className="relative group">
                            <label className="text-[10px] font-bold text-[#8b5a2b] uppercase tracking-[0.25em] transition-colors group-focus-within:text-[#b8860b]">
                              Signed by
                            </label>
                            <input
                              type="text"
                              placeholder="Your name"
                              value={wishForm.name}
                              onChange={(e) => {
                                setWishStatus("idle");
                                setWishForm((prev) => ({ ...prev, name: e.target.value }));
                              }}
                              className="w-full bg-transparent border-b border-[#b8860b]/40 px-0 py-2 text-[#3b2314] placeholder:text-[#8b5a2b]/40 focus:outline-none focus:border-[#b8860b] transition-all font-serif text-lg md:text-xl italic"
                              required
                            />
                          </div>

                          <div className="relative group">
                            <label className="text-[10px] font-bold text-[#8b5a2b] uppercase tracking-[0.25em] transition-colors group-focus-within:text-[#b8860b]">
                              Your wish
                            </label>
                            <textarea
                              rows={5}
                              placeholder="Dear Hasini & Dinal..."
                              value={wishForm.message}
                              onChange={(e) => {
                                setWishStatus("idle");
                                setWishForm((prev) => ({ ...prev, message: e.target.value }));
                              }}
                              className="mt-2 w-full px-0 py-1 text-[#3b2314] placeholder:text-[#8b5a2b]/40 focus:outline-none transition-all font-serif text-lg md:text-xl italic resize-none leading-[2.25rem] bg-[linear-gradient(transparent_calc(2.25rem-1px),rgba(184,134,11,0.35)_calc(2.25rem-1px))] bg-[length:100%_2.25rem] bg-local"
                              required
                            />
                          </div>

                          {(wishStatus === "success" || wishStatus === "error") && (
                            <p
                              className={`text-[10px] text-center font-semibold tracking-widest uppercase ${wishStatus === "success" ? "text-[#8b5a2b]" : "text-red-700"
                                }`}
                            >
                              {wishStatus === "success"
                                ? "Your wish has been sealed with magic. Thank you!"
                                : "Something went wrong. Please try again."}
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={wishStatus === "sending"}
                            className="group relative w-full overflow-hidden bg-gradient-to-r from-[#3b2314] via-[#5c3a1e] to-[#3b2314] text-[#f3e2a0] border border-[#b8860b] py-4 font-cinzel text-[11px] md:text-xs tracking-[0.3em] uppercase transition-all shadow-[0_10px_30px_-10px_rgba(59,35,20,0.7)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] disabled:opacity-50"
                          >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#f3e2a0]/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            <span className="relative flex items-center justify-center gap-3">
                              <Feather size={14} className="text-[#d4af37]" />
                              {wishStatus === "sending" ? "Sealing your wish..." : "Send Your Wishes"}
                              <Sparkles size={14} className="text-[#d4af37]" />
                            </span>
                          </button>
                        </form>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative py-24 md:py-32 bg-marble-emerald w-full flex flex-col items-center overflow-hidden z-20">
                {/* Couple photo watermark */}
                <img
                  src="/pre/couple-beach-walk.jpeg"
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain md:object-cover md:object-[center_68%] opacity-[0.18] mix-blend-luminosity pointer-events-none z-0"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0"></div>

                {/* Elegant border details */}
                <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent"></div>
                <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#c9a227]/20 pointer-events-none z-10 hidden md:block rounded-sm shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]"></div>

                <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center relative z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#c9a227]/40" />
                      <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-[#c9a227]/60" />
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#c9a227]/40" />
                    </div>

                    <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.5em] text-[#ffffff]/70 uppercase font-medium mb-4">
                      With heartfelt gratitude
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4">
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Hasini
                      </h2>
                      <span className="font-serif text-3xl md:text-5xl text-[#c9a227] italic opacity-80 drop-shadow-md pb-2">&</span>
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Dinal
                      </h2>
                    </div>
                  </motion.div>

                  <div className="mt-20 pt-8 border-t-[0.5px] border-[#c9a227]/30 w-full max-w-xs md:max-w-md flex flex-col items-center gap-4">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#ffffff]/50 font-bold leading-relaxed flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <span>© 2027 Hasini & Dinal</span>
                      <span className="hidden md:inline text-[#c9a227]/30">|</span>
                      <span>All Rights Reserved</span>
                    </p>
                    <p className="text-[#d4af37]/80 text-[11px] md:text-xs mt-2 font-serif italic tracking-wider text-center leading-relaxed">
                      Want a beautiful wedding website like this? Create yours with{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://wa.me/94707819074"
                        className="not-italic font-cinzel font-bold text-[#f3e2a0] underline decoration-[#c9a227]/60 underline-offset-4 hover:text-[#d4af37] hover:decoration-[#d4af37] transition-colors"
                      >
                        invitemint
                      </a>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="metadata"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#5c3a1e] bg-white/95 text-[#5c3a1e] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(92,58,30,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(92,58,30,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c3a1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #e3c77d33;
        }
        ::-webkit-scrollbar-thumb {
          background: #5c3a1e66;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}


