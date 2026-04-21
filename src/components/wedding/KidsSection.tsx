import { motion } from "framer-motion";
import kidsPhoto from "@/assets/kids-photo.jpeg";

const slowFade = { duration: 1.8, ease: "easeOut" as const };

const KidsSection = () => {
  return (
    <section className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold/70 pointer-events-none"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${10 + Math.random() * 80}%`,
            fontSize: `${16 + Math.random() * 22}px`,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.4, 0.75, 0.4], rotate: [-5, 5, -5] }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        >
          ♥
        </motion.div>
      ))}

      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-script text-gold text-3xl md:text-4xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowFade}
        >
          Our story began long ago
        </motion.h2>

        <motion.div
          className="relative mx-auto w-72 md:w-80"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="relative rounded-xl overflow-hidden gold-border gold-glow">
            <img src={kidsPhoto} alt="Yousef and Marwa as children" className="w-full h-auto" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/20 to-transparent" />
          </div>
        </motion.div>

        <motion.p
          className="mt-8 font-body text-gold text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.8 }}
        >
          From childhood dreams... to a lifetime together
        </motion.p>
      </div>
    </section>
  );
};

export default KidsSection;
