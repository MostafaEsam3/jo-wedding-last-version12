import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AttendanceStatus = 'yes' | 'no' | null;

const danceOptions = [
  { value: 'pro', label: 'أنا ملك الدانس فلور', emoji: '💃' },
  { value: 'shy', label: 'بس لو حد جرني', emoji: '🙈' },
  { value: 'no', label: 'هشجع من بعيد', emoji: '👏' },
];

const arrivalOptions = [
  { value: 'early', label: 'من أول ما الباب يتفتح', emoji: '⏰' },
  { value: 'ontime', label: 'في الميعاد بالظبط', emoji: '✅' },
];

const RsvpSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const [attendance, setAttendance] = useState<AttendanceStatus>(null);
  const [danceChoice, setDanceChoice] = useState('');
  const [arrivalChoice, setArrivalChoice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (attendance !== null) {
      gsap.from('.response-message', {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }
  }, [attendance]);

  useEffect(() => {
    if (attendance === 'yes') {
      gsap.from('.question-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }
  }, [attendance]);

  useEffect(() => {
    if (isSubmitted && confirmRef.current) {
      gsap.from(confirmRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -10,
        duration: 0.9,
        ease: 'elastic.out(1, 0.5)',
      });
      const particles = confirmRef.current.querySelectorAll('.particle');
      gsap.from(particles, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [isSubmitted]);
  useEffect(() => {
  if (isSubmitted && sectionRef.current) {
    sectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}, [isSubmitted]);

  const handleSubmit = () => {
    const rsvpData = {
      attendance,
      danceChoice,
      arrivalChoice,
      message,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('wedding-rsvp', JSON.stringify(rsvpData));
    // Preserve scroll position so the page doesn't jump
    const scrollY = window.scrollY;
    setIsSubmitted(true);
    requestAnimationFrame(() => {
      // window.scrollTo({ top: scrollY, behavior: 'auto' });
    });
  };

  const getResponseMessage = () => {
    if (attendance === 'yes') {
      return 'يا سلاااام! فرحتونا والله، هنستناكم';
    }
    return 'يا خسارة! هتوحشونا بجد، بس إن شاء الله نشوفكم قريب';
  };

  if (isSubmitted) {
    return (
      <section
        id="rsvp"
        ref={sectionRef}
        dir="rtl"
        className="py-20 px-4 bg-burgundy-gradient"
      >
        <div className="container mx-auto max-w-xl">
          <div
            ref={confirmRef}
            className="bg-cream text-burgundy-deep rounded-3xl p-8 md:p-12 text-center relative overflow-hidden gold-border gold-glow"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle absolute top-4 right-4 w-3 h-3 bg-gold rounded-full" />
              <div className="particle absolute top-8 left-8 w-2 h-2 bg-gold-light rounded-full" />
              <div className="particle absolute bottom-6 right-12 w-4 h-4 bg-burgundy/40 rounded-full" />
              <div className="particle absolute bottom-10 left-6 w-2 h-2 bg-gold rounded-full" />
            </div>

            <h3 className="font-diwani text-3xl md:text-4xl mb-4">شكراً لردكم</h3>
            <p className="font-diwani text-burgundy text-lg">
              {attendance === 'yes'
                ? 'تم تسجيل حضوركم، منورين والله'
                : 'قدرنا ردكم، ويا رب نشوفكم في فرحة تانية'}
            </p>

            {message && (
              <div className="mt-6 p-4 bg-burgundy-deep/5 rounded-xl gold-border">
                <p className="font-diwani text-sm text-burgundy/70 mb-1">رسالتكم</p>
                <p className="font-diwani text-burgundy-deep italic">"{message}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      dir="rtl"
      className="py-20 px-4 bg-burgundy-gradient"
    >
      <div className="container mx-auto max-w-2xl">
        <div
          ref={cardRef}
          className="bg-cream text-burgundy-deep rounded-3xl p-6 md:p-10 gold-border gold-glow"
        >
          <h2 className="font-diwani text-center text-3xl md:text-5xl mb-8">
            جاي ولا مش جاي؟
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setAttendance('yes')}
              className={`flex-1 py-5 px-8 rounded-2xl font-diwani font-bold text-xl transition-all duration-300 ${
                attendance === 'yes'
                  ? 'bg-burgundy-deep text-gold scale-105 shadow-lg'
                  : 'bg-burgundy-deep/10 text-burgundy-deep hover:bg-burgundy-deep/20 hover:scale-105 gold-border'
              }`}
            >
              أيوه جاي
            </button>
            <button
              onClick={() => setAttendance('no')}
              className={`flex-1 py-5 px-8 rounded-2xl font-diwani font-bold text-xl transition-all duration-300 ${
                attendance === 'no'
                  ? 'bg-burgundy-deep text-gold scale-105 shadow-lg'
                  : 'bg-burgundy-deep/10 text-burgundy-deep hover:bg-burgundy-deep/20 hover:scale-105 gold-border'
              }`}
            >
              للأسف مش هقدر
            </button>
          </div>

          {attendance !== null && (
            <div className="response-message text-center p-5 bg-burgundy-deep/5 rounded-2xl mb-8 gold-border">
              <p className="font-diwani text-xl text-burgundy-deep">{getResponseMessage()}</p>
            </div>
          )}

          {attendance === 'yes' && (
            <div className="space-y-6">
              <div className="question-card bg-burgundy-deep/5 rounded-2xl p-5 gold-border">
                <label className="block font-diwani font-bold text-lg mb-4">
                  هترقص معانا؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {danceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDanceChoice(option.value)}
                      className={`p-4 rounded-xl transition-all duration-300 font-diwani text-base ${
                        danceChoice === option.value
                          ? 'bg-gold text-burgundy-deep scale-105 shadow-lg'
                          : 'bg-cream text-burgundy-deep hover:bg-burgundy-deep/10 gold-border'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="question-card bg-burgundy-deep/5 rounded-2xl p-5 gold-border">
                <label className="block font-diwani font-bold text-lg mb-4">
                  هتيجي امتى؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {arrivalOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setArrivalChoice(option.value)}
                      className={`p-4 rounded-xl transition-all duration-300 font-diwani text-base ${
                        arrivalChoice === option.value
                          ? 'bg-gold text-burgundy-deep scale-105 shadow-lg'
                          : 'bg-cream text-burgundy-deep hover:bg-burgundy-deep/10 gold-border'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="question-card bg-burgundy-deep/5 rounded-2xl p-5 gold-border">
                <label className="block font-diwani font-bold text-lg mb-4">
                  قولوا كلمة حلوة للعروسين
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتبوا لنا كلمة حلوة..."
                  className="w-full p-4 rounded-xl gold-border bg-cream
                    focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all duration-300
                    resize-none h-28 font-diwani text-burgundy-deep placeholder:text-burgundy/40"
                />
              </div>
            </div>
          )}

          {attendance !== null && (
            <button
              onClick={handleSubmit}
              className="w-full mt-8 py-5 px-8 rounded-2xl font-diwani font-bold text-xl
                bg-burgundy-deep text-gold hover:bg-burgundy transition-all duration-300
                hover:scale-105 shadow-lg"
            >
              تأكيد الرد
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
