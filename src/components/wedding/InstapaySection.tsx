import { motion } from "framer-motion";
import instapayImg from "@/assets/instapay.jpeg";

const slowFade = { duration: 1.6, ease: "easeOut" as const };

const InstapaySection = () => {
  return (
    <section dir="rtl" className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-diwani text-gold text-3xl md:text-5xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowFade}
        >
          وده رقمي بقبل انستا باي عادي
        </motion.h2>

        <motion.p
          className="font-diwani text-gold/80 text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.4 }}
        >
          01065179223
        </motion.p>

        <motion.div
          className="rounded-2xl overflow-hidden gold-border gold-glow mx-auto max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.6 }}
        >
          <img
            src={instapayImg}
            alt="InstaPay transfer details"
            className="w-full h-auto block"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InstapaySection;
