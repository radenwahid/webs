import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Mahasiswa Teknik Informatika",
    text: "Gila cepet banget, deadline 2 hari langsung beres. Kodenya rapi dan ada penjelasannya juga. Recommended banget!",
    stars: 5,
    tag: "Tugas Kuliah",
  },
  {
    name: "Siti Rahayu",
    role: "Mahasiswa Sistem Informasi",
    text: "Skripsi gue yang udah stuck berbulan-bulan akhirnya kelar. Raden sabar banget ngejelasin alur sistemnya. 10/10.",
    stars: 5,
    tag: "Skripsi",
  },
  {
    name: "Budi Santoso",
    role: "Startup Founder",
    text: "Landing page-nya keren abis, persis kayak yang gue mau. Komunikasinya juga enak, nggak ribet. Pasti balik lagi.",
    stars: 5,
    tag: "Web Dev",
  },
  {
    name: "Dewi Lestari",
    role: "Freelancer",
    text: "Minta integrasi payment gateway, beres dalam sehari. Nggak ada drama, langsung jalan. Mantap.",
    stars: 5,
    tag: "API Integration",
  },
  {
    name: "Rizky Firmansyah",
    role: "Mahasiswa D3 Komputer",
    text: "Udah coba beberapa joki lain, tapi yang ini beda. Hasilnya beneran bisa dipahami, bukan asal jadi.",
    stars: 5,
    tag: "Mobile App",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -1 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Testimonials() {
  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <p className="section-label">✦ Kata Mereka</p>
          <h2 className="section-title">TESTIMONI</h2>
          <div className="title-underline" />
        </motion.div>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="brutalist-card testi-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
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
        .testi-section { background: var(--bg); }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .testi-card { display: flex; flex-direction: column; gap: 1rem; }
        .testi-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .testi-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--accent);
          color: #fff;
          padding: 0.2rem 0.6rem;
          border: 1.5px solid var(--border-color);
        }
        .testi-stars { color: #FACC15; font-size: 1rem; letter-spacing: 2px; }
        .testi-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted);
          flex: 1;
        }
        .testi-author { display: flex; align-items: center; gap: 0.75rem; }
        .testi-avatar {
          width: 40px;
          height: 40px;
          background: var(--accent);
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
          flex-shrink: 0;
        }
        .testi-name { font-weight: 700; font-size: 0.9rem; }
        .testi-role { font-size: 0.8rem; color: var(--text-muted); }
      `}</style>
    </section>
  );
}
