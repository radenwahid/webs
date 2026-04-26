import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface Service {
  id: string;
  icon: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ServicesSection({ services }: { services: Service[] }) {
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
    <section className="section" id="services">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.services_label}</p>
          <h2 className="section-title">{tr.services_title}</h2>
          <div className="title-underline" />
        </motion.div>
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div key={s.id} className="brutalist-card service-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{lang === 'id' ? s.title_id : s.title_en}</h3>
              <p className="service-desc">{lang === 'id' ? s.desc_id : s.desc_en}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .section-header { margin-bottom: 3rem; }
        .section-label { font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.5rem;display:block; }
        .title-underline { width:60px;height:4px;background:var(--accent);margin-top:.75rem;border:2px solid var(--border-color); }
        .services-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem; }
        .service-card { cursor:default; }
        .service-icon { font-size:2rem;margin-bottom:1rem; }
        .service-title { font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:.5rem; }
        .service-desc { color:var(--text-muted);font-size:.95rem;line-height:1.6; }
      `}</style>
    </section>
  );
}
