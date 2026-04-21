import { motion } from "framer-motion";

const COLORS = [
  { name: "Black", hsl: "0 0% 10%" },
  { name: "Deep Burgundy", hsl: "345 50% 20%" },
  { name: "Wine", hsl: "0 40% 25%" },
  { name: "Beige", hsl: "35 25% 75%" },
];

const slowFade = { duration: 1.8, ease: "easeOut" as const };

const DressCodeSection = () => {
  return (
    <section className="py-20 px-4 bg-burgundy-gradient relative">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-script text-gold text-3xl md:text-4xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowFade}
        >
          Dress Code
        </motion.h2>

        <motion.p
          className="font-body text-gold text-base mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.4 }}
        >
          Please wear the following colors
          <br />
          to create an elegant, harmonious look together
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.7 }}
        >
          {COLORS.map((color, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.15, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full gold-border shadow-lg transition-shadow duration-300 group-hover:shadow-[0_0_20px_hsl(40,65%,45%,0.5)]"
                style={{ backgroundColor: `hsl(${color.hsl})` }}
              />
              <span className="font-body text-gold text-xs">{color.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DressCodeSection;
