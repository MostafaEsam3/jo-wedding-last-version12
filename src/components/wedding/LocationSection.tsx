import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const slowFade = { duration: 1.8, ease: "easeOut" as const };

const LocationSection = () => {
  return (
    <section className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-script text-gold text-3xl md:text-4xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowFade}
        >
          The Venue
        </motion.h2>

        <motion.div
          className="bg-cream rounded-xl p-8 gold-border gold-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-deep mb-4"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <MapPin className="w-8 h-8 text-gold" />
          </motion.div>

          <h3 className="font-display text-burgundy-deep text-2xl md:text-3xl font-bold mb-2">
            Al Qasr
          </h3>
          <p className="font-body text-burgundy text-lg mb-1">Wedding Hall</p>
          <p className="font-body text-burgundy/80 text-base">Sohag, Egypt</p>

          <div className="separator-ornament w-24 mx-auto my-6" />

          <motion.p
            className="font-body text-burgundy-deep text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...slowFade, delay: 0.9 }}
          >
            Awaiting your gracious presence
            <br />
            in a magical setting for this happy occasion
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
