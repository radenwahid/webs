import { motion } from "framer-motion";

const services = [
  { icon: "🌐", title: "Web Development", desc: "Landing page, company profile, dashboard, full-stack app. Semua bisa." },
  { icon: "📱", title: "Mobile App", desc: "Flutter atau React Native, dari UI sampai integrasi API." },
  { icon: "🎓", title: "Tugas Kuliah", desc: "Deadline mepet? Tenang. Semua mata kuliah programming bisa dihandle." },
  { icon: "📄", title: "Skripsi / Thesis", desc: "Sistem informasi, website, aplikasi — lengkap dengan dokumentasi." },
  { icon: "🔌", title: "API Integration", desc: "REST API, GraphQL, third-party services. Integrasi beres." },
  { icon: "🎨", title: "UI/UX Implementation", desc: "Figma to code, pixel perfect, responsive, dan clean." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <p className="section-label">✦ What I Do</p>
          <h2 className="section-title">SERVICES</h2>
          <div className="title-underline" />
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="brutalist-card service-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .section-header { margin-bottom: 3rem; }
        .section-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }
        .title-underline {
          width: 60px;
          height: 4px;
          background: var(--accent);
          margin-top: 0.75rem;
          border: 2px solid var(--border-color);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .service-card { cursor: default; }
        .service-icon { font-size: 2rem; margin-bottom: 1rem; }
        .service-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .service-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
