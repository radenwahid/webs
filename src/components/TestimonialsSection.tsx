import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface Testimonial {
  id: string; name: string; role: string;
  text: string; stars: number; tag: string;
}

const PER_PAGE = 6;

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [lang, setLang] = useState<Lang>('id');
  const [page, setPage] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('lang') || 'id') as Lang;
    setLang(saved);
    const handler = () => setLang((localStorage.getItem('lang') || 'id') as Lang);
    window.addEventListener('langchange', handler);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const mqH = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', mqH);
    return () => { window.removeEventListener('langchange', handler); mq.removeEventListener('change', mqH); };
  }, []);

  const mobilePairs: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += 2) mobilePairs.push(testimonials.slice(i, i + 2));

  const next = useCallback(() => setMobileIdx(i => (i + 1) % mobilePairs.length), [mobilePairs.length]);
  const prev = useCallback(() => setMobileIdx(i => (i - 1 + mobilePairs.length) % mobilePairs.length), [mobilePairs.length]);

  useEffect(() => {
    if (!isMobile || mobilePairs.length <= 1 || paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [isMobile, mobilePairs.length, paused, next]);

  const tr = translations[lang];
  const totalPages = Math.ceil(testimonials.length / PER_PAGE);
  const paged = testimonials.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
    setPaused(false);
  };

  const Card = ({ t }: { t: Testimonial }) => (
    <div className="brutalist-card testi-card">
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
    </div>
  );

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.testi_label}</p>
          <h2 className="section-title">{tr.testi_title}</h2>
          <div className="title-underline" />
        </motion.div>

        {!isMobile && (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={page} className="testi-grid"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                {paged.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
                    animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }} transition={{ delay: i * 0.08 }}>
                    <Card t={t} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} className={`page-dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} aria-label={`Page ${i + 1}`} />
                ))}
              </div>
            )}
          </>
        )}

        {isMobile && mobilePairs.length > 0 && (
          <div className="mobile-carousel">
            <AnimatePresence mode="wait">
              <motion.div key={mobileIdx} className="mobile-slide"
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                onDragStart={() => setPaused(true)}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }} style={{ cursor: 'grab' }}>
                {mobilePairs[mobileIdx]?.map(t => <Card key={t.id} t={t} />)}
              </motion.div>
            </AnimatePresence>
            <div className="pagination">
              {mobilePairs.map((_, i) => (
                <button key={i} className={`page-dot ${i === mobileIdx ? 'active' : ''}`}
                  onClick={() => { setMobileIdx(i); setPaused(false); }} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .section-header{margin-bottom:3rem}
        .section-label{font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.5rem;display:block}
        .title-underline{width:60px;height:4px;background:var(--accent);margin-top:.75rem;border:2px solid var(--border-color)}
        .testi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem}
        .testi-card{display:flex;flex-direction:column;gap:1rem}
        .testi-top{display:flex;justify-content:space-between;align-items:center}
        .testi-tag{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;background:var(--accent);color:var(--accent-text);padding:.2rem .6rem;border:1.5px solid var(--border-color)}
        .testi-stars{color:#FACC15;font-size:1rem;letter-spacing:2px}
        .testi-text{font-size:.95rem;line-height:1.7;color:var(--text-muted);flex:1}
        .testi-author{display:flex;align-items:center;gap:.75rem}
        .testi-avatar{width:40px;height:40px;background:var(--accent);border:2px solid var(--border-color);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:var(--accent-text);flex-shrink:0}
        .testi-name{font-weight:700;font-size:.9rem}
        .testi-role{font-size:.8rem;color:var(--text-muted)}
        .pagination{display:flex;justify-content:center;gap:.6rem;margin-top:2rem}
        .page-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--border-color);background:transparent;cursor:pointer;transition:background .2s,transform .2s;padding:0}
        .page-dot.active{background:var(--accent);transform:scale(1.3)}
        .mobile-carousel{overflow:hidden;touch-action:pan-y}
        .mobile-slide{display:flex;flex-direction:column;gap:1rem;user-select:none}
      `}</style>
    </section>
  );
}
