import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  tags: string[];
}

export default function GalleryGrid({ projects }: { projects: Project[] }) {
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
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-header">
          <p className="section-label">{tr.gallery_label}</p>
          <h2 className="section-title">{tr.gallery_title}</h2>
          <div className="title-underline" />
        </motion.div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada project. Tambahkan lewat admin dashboard.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="gallery-card brutalist-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="gallery-img-wrap">
                  {p.image_url
                    ? <img src={p.image_url} alt={p.title} className="gallery-img" loading="lazy" />
                    : <div className="gallery-img-placeholder">📁</div>
                  }
                </div>
                <div className="gallery-body">
                  <h3 className="gallery-title">{p.title}</h3>
                  {p.description && <p className="gallery-desc">{p.description}</p>}
                  {p.tags?.length > 0 && (
                    <div className="gallery-tags">
                      {p.tags.map(tag => <span key={tag} className="gallery-tag">{tag}</span>)}
                    </div>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary gallery-btn">
                      {tr.gallery_visit}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .section-header { margin-bottom:3rem; }
        .section-label { font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.5rem;display:block; }
        .title-underline { width:60px;height:4px;background:var(--accent);margin-top:.75rem;border:2px solid var(--border-color); }
        .gallery-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem; }
        .gallery-card { padding:0;overflow:hidden;display:flex;flex-direction:column; }
        .gallery-img-wrap { width:100%;aspect-ratio:16/9;overflow:hidden;border-bottom:3px solid var(--border-color); }
        .gallery-img { width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease; }
        .gallery-card:hover .gallery-img { transform:scale(1.04); }
        .gallery-img-placeholder { width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--bg); }
        .gallery-body { padding:1.25rem;display:flex;flex-direction:column;gap:.75rem;flex:1; }
        .gallery-title { font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700; }
        .gallery-desc { font-size:.9rem;color:var(--text-muted);line-height:1.6; }
        .gallery-tags { display:flex;flex-wrap:wrap;gap:.4rem; }
        .gallery-tag { font-size:.7rem;font-weight:700;text-transform:uppercase;padding:.2rem .5rem;border:1.5px solid var(--border-color);letter-spacing:.05em; }
        .gallery-btn { font-size:.8rem;padding:.5rem 1rem;margin-top:auto; }
        .empty-state { text-align:center;padding:4rem;border:3px dashed var(--border-color);color:var(--text-muted); }
      `}</style>
    </section>
  );
}
