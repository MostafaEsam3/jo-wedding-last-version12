import { motion } from "framer-motion";

const slowFade = { duration: 1.8, ease: "easeOut" as const };

const FooterSection = () => {
  return (
    <footer className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      {["✦", "☽", "✦", "✧", "✦"].map((char, i) => (
        <motion.div
          key={i}
          className="absolute text-gold/70 pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 2) * 40}%`,
            fontSize: `${16 + i * 4}px`,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
        >
          {char}
        </motion.div>
      ))}

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.div
          className="mb-8 animate-float"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 200 140" className="w-40 h-28 mx-auto">
            <rect x="20" y="30" width="160" height="100" rx="6" fill="hsl(40, 35%, 96%)" stroke="hsl(40, 65%, 45%)" strokeWidth="1" />
            <path d="M20 30 L100 85 L180 30" fill="none" stroke="hsl(40, 65%, 45%)" strokeWidth="1" />
            <circle cx="100" cy="95" r="16" fill="hsl(0, 55%, 20%)" stroke="hsl(40, 65%, 45%)" strokeWidth="1" />
            <text x="100" y="100" textAnchor="middle" fill="hsl(40, 65%, 45%)" fontSize="12" fontFamily="Great Vibes">
              Y&M
            </text>
          </svg>
        </motion.div>

        <motion.h2
          className="font-script text-gold text-3xl md:text-4xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.7 }}
        >
          Awaiting you with love
        </motion.h2>

        <motion.div
          className="separator-ornament w-32 mx-auto my-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1 }}
        />

        <motion.p
          className="font-display text-gold text-xl tracking-wider mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 1.2 }}
        >
          Yousef & Marwa
        </motion.p>

        <motion.p
          className="font-body text-gold/70 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 1.4 }}
        >
          2026
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;
