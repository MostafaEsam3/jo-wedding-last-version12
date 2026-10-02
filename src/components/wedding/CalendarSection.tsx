import { motion } from "framer-motion";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const MAY_2026 = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null],
];

const HIGHLIGHT_DAY = 9;
const slowFade = { duration: 1.8, ease: "easeOut" as const };

const CalendarSection = () => {
  return (
    <section className="py-20 px-4 bg-burgundy-gradient relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold/70 pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            fontSize: `${12 + Math.random() * 16}px`,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        >
          ✦
        </motion.div>
      ))}

      <div className="max-w-sm mx-auto relative z-10">
        <motion.h2
          className="font-script text-gold text-3xl md:text-4xl text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowFade}
        >
          Save the Date
        </motion.h2>

        <motion.p
          className="text-center font-display text-gold text-lg mb-8 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 0.4 }}
        >
          October 2026
        </motion.p>

        <motion.div
          className="bg-burgundy-deep rounded-lg p-6 gold-border gold-glow"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-7 gap-1 mb-3">
            {DAYS.map((day) => (
              <div key={day} className="text-center font-display text-gold text-xs font-bold py-1">
                {day}
              </div>
            ))}
          </div>

          {MAY_2026.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((day, di) => (
                <div key={di} className="text-center py-1.5">
                  {day !== null && (
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-body text-sm transition-all
                        ${day === HIGHLIGHT_DAY
                          ? "bg-gold text-burgundy-deep font-bold animate-glow-pulse"
                          : "text-gold"
                        }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-6 font-script text-gold text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowFade, delay: 1 }}
        >
          ✦ From 8 PM until midnight ✦
        </motion.p>
      </div>
    </section>
  );
};

export default CalendarSection;
