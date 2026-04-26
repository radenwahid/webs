import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead } from '../chunks/astro/server_5CbLVaOW.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CYJ0u--n.mjs';
import { r as requireAuth } from '../chunks/auth_BqupFyoq.mjs';
import { s as supabaseAdmin } from '../chunks/supabase_CpxnXrsa.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const authCheck = requireAuth(Astro2.request);
  if (authCheck) return authCheck;
  const [{ data: services }, { data: testimonials }, { data: projects }] = await Promise.all([
    supabaseAdmin.from("services").select("*").order("sort_order"),
    supabaseAdmin.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false })
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Dashboard \u2014 Joki Coding", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrap" data-astro-cid-u2h3djql> <aside class="admin-sidebar" data-astro-cid-u2h3djql> <div class="sidebar-logo" data-astro-cid-u2h3djql>ADMIN<span data-astro-cid-u2h3djql>PANEL</span></div> <nav class="sidebar-nav" data-astro-cid-u2h3djql> <a href="/admin" class="active" data-astro-cid-u2h3djql>📊 Dashboard</a> <a href="/admin/services" data-astro-cid-u2h3djql>⚙️ Services</a> <a href="/admin/testimonials" data-astro-cid-u2h3djql>💬 Testimoni</a> <a href="/admin/projects" data-astro-cid-u2h3djql>🖼️ Galeri</a> <a href="/" target="_blank" data-astro-cid-u2h3djql>🌐 Lihat Site</a> <a href="/admin/logout" class="logout" data-astro-cid-u2h3djql>🚪 Logout</a> </nav> </aside> <main class="admin-main" data-astro-cid-u2h3djql> <h1 class="admin-title" data-astro-cid-u2h3djql>Dashboard</h1> <div class="stats-grid" data-astro-cid-u2h3djql> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-num" data-astro-cid-u2h3djql>${services?.length ?? 0}</div> <div class="stat-label" data-astro-cid-u2h3djql>Services</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-num" data-astro-cid-u2h3djql>${testimonials?.length ?? 0}</div> <div class="stat-label" data-astro-cid-u2h3djql>Testimoni</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-num" data-astro-cid-u2h3djql>${projects?.length ?? 0}</div> <div class="stat-label" data-astro-cid-u2h3djql>Projects</div> </div> </div> <div class="quick-links" data-astro-cid-u2h3djql> <a href="/admin/services" class="btn btn-primary" data-astro-cid-u2h3djql>+ Tambah Service</a> <a href="/admin/testimonials" class="btn btn-primary" data-astro-cid-u2h3djql>+ Tambah Testimoni</a> <a href="/admin/projects" class="btn btn-primary" data-astro-cid-u2h3djql>+ Tambah Project</a> </div> </main> </div> ` })} `;
}, "C:/laragon/www/webs/src/pages/admin/index.astro", void 0);

const $$file = "C:/laragon/www/webs/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
