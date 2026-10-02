import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import envelopeImg from "@/assets/envelope-hands.png";

const HeroSection = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
    setTimeout(onOpen, 2200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-burgundy-gradient relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 18}px`,
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="font-script text-gold text-4xl md:text-6xl mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          You Are Invited
        </motion.h1>

        <motion.div
          className="relative cursor-pointer"
          onClick={handleOpen}
          whileHover={!isOpened ? { scale: 1.05, y: -8 } : {}}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
        >
          <motion.img
            src={envelopeImg}
            alt="Golden wedding envelope"
            className="w-64 md:w-80 h-auto drop-shadow-2xl"
            animate={isOpened ? { scale: 1.1, opacity: 0, y: -60 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <AnimatePresence>
            {isOpened && (
              <motion.div
                className="absolute inset-x-8 top-12 bg-cream rounded-md gold-border p-6 flex flex-col items-center justify-center"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -180, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="font-script text-burgundy-deep text-2xl md:text-3xl">Mostafa & Hager</p>
                <div className="separator-ornament w-24 my-2" />
                <p className="font-body text-burgundy text-sm">05 . 06 . 2026</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!isOpened && (
            <motion.p
              className="mt-10 font-body text-gold text-lg tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onClick={handleOpen}
            >
              Tap to open the invitation
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
