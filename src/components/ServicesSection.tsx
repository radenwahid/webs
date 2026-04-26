import { motion, AnimatePresence } from "framer-motion";
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

const PER_PAGE = 6;

export default function ServicesSection({ services }: { services: Service[] }) {
  const [lang, setLang] = useState<Lang>('id');
  const [page, setPage] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('lang') || 'id') as Lang;
    setLang(saved);
    const handler = () => setLang((localStorage.getItem('lang') || 'id') as Lang);
    window.addEventListener('langchange', handler);

    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const mqHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', mqHandler);

    return () => {
      window.removeEventListener('langchange', handler);
      mq.removeEventListener('change', mqHandler);
    };
  }, []);

  // Auto-slide mobile (2 per slide)
  const mobilePairs = [];
  for (let i = 0; i < services.length; i += 2) mobilePairs.push(services.slice(i, i + 2));

  useEffect(() => {
    if (!isMobile || mobilePairs.length <= 1) return;
    const t = setInterval(() => setMobileIdx(i => (i + 1) % mobilePairs.length), 3500);
    return () => clearInterval(t);
  }, [isMobile, mobilePairs.length]);

  const tr = translations[lang];
  const totalPages = Math.ceil(services.length / PER_PAGE);
  const paged = services.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.services_label}</p>
          <h2 className="section-title">{tr.services_title}</h2>
          <div className="title-underline" />
        </motion.div>

        {/* Desktop grid with pagination */}
        {!isMobile && (
          <>
            <div className="services-grid">
              <AnimatePresence mode="wait">
                <motion.div key={page} className="services-grid-inner"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  {paged.map((s, i) => (
                    <motion.div key={s.id} className="brutalist-card service-card"
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <div className="service-icon">{s.icon}</div>
                      <h3 className="service-title">{lang === 'id' ? s.title_id : s.title_en}</h3>
                      <p className="service-desc">{lang === 'id' ? s.desc_id : s.desc_en}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} className={`page-dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} aria-label={`Page ${i + 1}`} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Mobile carousel — 2 per slide, auto-slide */}
        {isMobile && (
          <div className="mobile-carousel">
            <AnimatePresence mode="wait">
              <motion.div key={mobileIdx} className="mobile-slide"
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                {mobilePairs[mobileIdx]?.map(s => (
                  <div key={s.id} className="brutalist-card service-card">
                    <div className="service-icon">{s.icon}</div>
                    <h3 className="service-title">{lang === 'id' ? s.title_id : s.title_en}</h3>
                    <p className="service-desc">{lang === 'id' ? s.desc_id : s.desc_en}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="pagination">
              {mobilePairs.map((_, i) => (
                <button key={i} className={`page-dot ${i === mobileIdx ? 'active' : ''}`} onClick={() => setMobileIdx(i)} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .section-header { margin-bottom:3rem; }
        .section-label { font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.5rem;display:block; }
        .title-underline { width:60px;height:4px;background:var(--accent);margin-top:.75rem;border:2px solid var(--border-color); }
        .services-grid { overflow:hidden; }
        .services-grid-inner { display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem; }
        .service-card { cursor:default; }
        .service-icon { font-size:2rem;margin-bottom:1rem; }
        .service-title { font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:.5rem; }
        .service-desc { color:var(--text-muted);font-size:.95rem;line-height:1.6; }
        .pagination { display:flex;justify-content:center;gap:.6rem;margin-top:2rem; }
        .page-dot { width:12px;height:12px;border-radius:50%;border:2px solid var(--border-color);background:transparent;cursor:pointer;transition:background .2s,transform .2s;padding:0; }
        .page-dot.active { background:var(--accent);transform:scale(1.3); }
        .mobile-carousel { overflow:hidden; }
        .mobile-slide { display:flex;flex-direction:column;gap:1rem; }
      `}</style>
    </section>
  );
}
