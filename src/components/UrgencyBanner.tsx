import { motion } from "framer-motion";
import { Clock, Zap, Gift } from "lucide-react";
import { useState, useEffect } from "react";

const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-rose-soft via-primary to-lavender text-white py-3 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shimmer_2s_infinite]" 
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite linear",
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          {/* Offer */}
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">
              🎉 Oferta Especial: <span className="text-yellow-200">30% OFF</span> no Plano Família
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-white/30" />

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expira em:</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="bg-white/20 px-2 py-0.5 rounded">{formatNumber(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-0.5 rounded">{formatNumber(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-0.5 rounded">{formatNumber(timeLeft.seconds)}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#planos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-white text-primary px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Aproveitar
          </motion.a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default UrgencyBanner;
