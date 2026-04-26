import{j as e,m as n,t as c}from"./i18n.DtP3zLAA.js";import{r as o}from"./index.CVf8TyFT.js";function y({projects:t}){const[d,i]=o.useState("id");o.useEffect(()=>{const a=localStorage.getItem("lang")||"id";i(a);const r=()=>i(localStorage.getItem("lang")||"id");return window.addEventListener("langchange",r),()=>window.removeEventListener("langchange",r)},[]);const l=c[d];return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs(n.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5},className:"section-header",children:[e.jsx("p",{className:"section-label",children:l.gallery_label}),e.jsx("h2",{className:"section-title",children:l.gallery_title}),e.jsx("div",{className:"title-underline"})]}),t.length===0?e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"Belum ada project. Tambahkan lewat admin dashboard."})}):e.jsx("div",{className:"gallery-grid",children:t.map((a,r)=>e.jsxs(n.div,{className:"gallery-card brutalist-card",initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{delay:r*.08,duration:.45},children:[e.jsx("div",{className:"gallery-img-wrap",children:a.image_url?e.jsx("img",{src:a.image_url,alt:a.title,className:"gallery-img",loading:"lazy"}):e.jsx("div",{className:"gallery-img-placeholder",children:"📁"})}),e.jsxs("div",{className:"gallery-body",children:[e.jsx("h3",{className:"gallery-title",children:a.title}),a.description&&e.jsx("p",{className:"gallery-desc",children:a.description}),a.tags?.length>0&&e.jsx("div",{className:"gallery-tags",children:a.tags.map(s=>e.jsx("span",{className:"gallery-tag",children:s},s))}),a.link&&e.jsx("a",{href:a.link,target:"_blank",rel:"noopener noreferrer",className:"btn btn-primary gallery-btn",children:l.gallery_visit})]})]},a.id))})]}),e.jsx("style",{children:`
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
      `})]})}export{y as default};
