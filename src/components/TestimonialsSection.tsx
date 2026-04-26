import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  tag: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -1 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [lang, setLang] = useState<Lang>('id');

  useEffect(() => {
    const saved = (localStorage.getItem('lang') || 'id') as Lang;
    setLang(saved);
    const handler = () => setLang((localStorage.getItem('lang') || 'id') as Lang);
    window.addEventListener('langchange', handler);
    return () => window.removeEventListener('langchange', handler);
  }, []);

  const tr = translations[lang];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.testi_label}</p>
          <h2 className="section-title">{tr.testi_title}</h2>
          <div className="title-underline" />
        </motion.div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} className="brutalist-card testi-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}>
              <div className="testi-top">
                <span className="testi-tag">{t.tag}</span>
                <span className="testi-stars">{"★".repeat(t.stars)}</span>
              </div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.name[0]}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .section-header { margin-bottom:3rem; }
        .section-label { font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.5rem;display:block; }
        .title-underline { width:60px;height:4px;background:var(--accent);margin-top:.75rem;border:2px solid var(--border-color); }
        .testi-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem; }
        .testi-card { display:flex;flex-direction:column;gap:1rem; }
        .testi-top { display:flex;justify-content:space-between;align-items:center; }
        .testi-tag { font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;background:var(--accent);color:var(--accent-text);padding:.2rem .6rem;border:1.5px solid var(--border-color); }
        .testi-stars { color:#FACC15;font-size:1rem;letter-spacing:2px; }
        .testi-text { font-size:.95rem;line-height:1.7;color:var(--text-muted);flex:1; }
        .testi-author { display:flex;align-items:center;gap:.75rem; }
        .testi-avatar { width:40px;height:40px;background:var(--accent);border:2px solid var(--border-color);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:var(--accent-text);flex-shrink:0; }
        .testi-name { font-weight:700;font-size:.9rem; }
        .testi-role { font-size:.8rem;color:var(--text-muted); }
      `}</style>
    </section>
  );
}
