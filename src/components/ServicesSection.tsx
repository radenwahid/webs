import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface Service {
  id: string; icon: string;
  title_id: string; title_en: string;
  desc_id: string; desc_en: string;
}

const BRUTAL_COLORS = [
  { bg: '#0057FF', color: '#FFEE00' },
  { bg: '#0A0A0A', color: '#FFEE00' },
  { bg: '#FF6B00', color: '#0A0A0A' },
  { bg: '#00C853', color: '#0A0A0A' },
  { bg: '#D500F9', color: '#FFEE00' },
  { bg: '#FF1744', color: '#FFEE00' },
];

const PER_PAGE = 6;

export default function ServicesSection({ services }: { services: Service[] }) {
  const [lang, setLang] = useState<Lang>('id');
  const [page, setPage] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState('dark');
  const dragStart = useRef(0);

  useEffect(() => {
    const saved = (localStorage.getItem('lang') || 'id') as Lang;
    setLang(saved);
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    const handler = () => setLang((localStorage.getItem('lang') || 'id') as Lang);
    window.addEventListener('langchange', handler);
    // Watch theme changes
    const obs = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme') || 'dark'));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const mqH = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', mqH);
    return () => { window.removeEventListener('langchange', handler); mq.removeEventListener('change', mqH); obs.disconnect(); };
  }, []);

  const mobilePairs: Service[][] = [];
  for (let i = 0; i < services.length; i += 2) mobilePairs.push(services.slice(i, i + 2));

  const next = useCallback(() => setMobileIdx(i => (i + 1) % mobilePairs.length), [mobilePairs.length]);
  const prev = useCallback(() => setMobileIdx(i => (i - 1 + mobilePairs.length) % mobilePairs.length), [mobilePairs.length]);

  useEffect(() => {
    if (!isMobile || mobilePairs.length <= 1 || paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [isMobile, mobilePairs.length, paused, next]);

  const getBrutalStyle = (idx: number) => {
    if (theme !== 'brutal') return {};
    const c = BRUTAL_COLORS[idx % BRUTAL_COLORS.length];
    return { backgroundColor: c.bg, color: c.color };
  };

  const tr = translations[lang];
  const totalPages = Math.ceil(services.length / PER_PAGE);
  const paged = services.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
    setPaused(false);
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.services_label}</p>
          <h2 className="section-title">{tr.services_title}</h2>
          <div className="title-underline" />
        </motion.div>

        {!isMobile && (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={page} className="services-grid"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                {paged.map((s, i) => (
                  <motion.div key={s.id} className="brutalist-card service-card"
                    style={getBrutalStyle(page * PER_PAGE + i)}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <div className="service-icon">{s.icon}</div>
                    <h3 className="service-title">{lang === 'id' ? s.title_id : s.title_en}</h3>
                    <p className="service-desc" style={theme === 'brutal' ? { color: 'inherit', opacity: 0.85 } : {}}>{lang === 'id' ? s.desc_id : s.desc_en}</p>
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
                {mobilePairs[mobileIdx]?.map((s, pairI) => (
                  <div key={s.id} className="brutalist-card service-card"
                    style={getBrutalStyle(mobileIdx * 2 + pairI)}>
                    <div className="service-icon">{s.icon}</div>
                    <h3 className="service-title">{lang === 'id' ? s.title_id : s.title_en}</h3>
                    <p className="service-desc" style={theme === 'brutal' ? { color: 'inherit', opacity: 0.85 } : {}}>{lang === 'id' ? s.desc_id : s.desc_en}</p>
                  </div>
                ))}
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
        .services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem}
        .service-card{cursor:default}
        .service-icon{font-size:2rem;margin-bottom:1rem}
        .service-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:.5rem}
        .service-desc{color:var(--text-muted);font-size:.95rem;line-height:1.6}
        .pagination{display:flex;justify-content:center;gap:.6rem;margin-top:2rem}
        .page-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--border-color);background:transparent;cursor:pointer;transition:background .2s,transform .2s;padding:0}
        .page-dot.active{background:var(--accent);transform:scale(1.3)}
        .mobile-carousel{overflow:hidden;touch-action:pan-y}
        .mobile-slide{display:flex;flex-direction:column;gap:1rem;user-select:none}
      `}</style>
    </section>
  );
}
