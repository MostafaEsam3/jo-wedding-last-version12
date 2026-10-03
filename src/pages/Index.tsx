import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/wedding/HeroSection";
import InvitationCard from "@/components/wedding/InvitationCard";
import KidsSection from "@/components/wedding/KidsSection";
import CalendarSection from "@/components/wedding/CalendarSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import InstapaySection from "@/components/wedding/InstapaySection";
import LocationSection from "@/components/wedding/LocationSection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import FooterSection from "@/components/wedding/FooterSection";
import GuestBook from "@/components/wedding/Wish";

const Index = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.07;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (envelopeOpened) startMusic();
  }, [envelopeOpened]);

  return (
    <div className="min-h-screen bg-background">
      {/* Persistent background music — keeps playing across all sections */}
      <audio ref={audioRef} src="/wedding-music.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          <motion.div key="hero" exit={{ opacity: 0, y: -50 }} transition={{ duration: 1 }}>
            <HeroSection
              onOpen={() => {
                startMusic();
                setEnvelopeOpened(true);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          >
            <KidsSection />
            <InvitationCard />
            <CalendarSection />
            {/* <RsvpSection /> */}
            <GuestBook />
            <InstapaySection />
            <LocationSection />
            <DressCodeSection />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
