import { motion } from "framer-motion";

const slowFade = { duration: 1.8, ease: "easeOut" as const };

const InvitationCard = () => {
  return (
    <section className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="bg-cream rounded-lg p-8 md:p-12 gold-glow gold-border relative">
          {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-6 h-6`}
              style={{
                borderTop: i < 2 ? "2px solid hsl(40, 65%, 45%)" : "none",
                borderBottom: i >= 2 ? "2px solid hsl(40, 65%, 45%)" : "none",
                borderLeft: i % 2 === 0 ? "2px solid hsl(40, 65%, 45%)" : "none",
                borderRight: i % 2 !== 0 ? "2px solid hsl(40, 65%, 45%)" : "none",
              }}
            />
          ))}

          <div className="text-center">
            <motion.h2
              className="font-script text-burgundy-deep text-4xl md:text-5xl mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...slowFade, delay: 0.4 }}
            >
              Yousef & Marwa
            </motion.h2>

            <motion.div
              className="separator-ornament w-32 mx-auto my-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.7 }}
            />

            <motion.p
              className="font-body text-burgundy-deep text-lg md:text-xl leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...slowFade, delay: 1 }}
            >
              With love and joy, we invite you
              <br />
              to share the most beautiful day of our lives
            </motion.p>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...slowFade, delay: 1.3 }}
            >
              <p className="font-display text-burgundy-deep text-lg font-semibold tracking-wider">
                May 6, 2026
              </p>
              <p className="font-body text-burgundy text-base">
                From 5:00 PM until midnight
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...slowFade, delay: 1.6 }}
            >
              <span className="text-gold text-xl">✦</span>
              <p className="font-script text-burgundy-deep text-xl">Honored by your presence</p>
              <span className="text-gold text-xl">✦</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InvitationCard;
