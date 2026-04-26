import { c as createComponent, h as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_BuAMovgT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_B4-Wq8Et.mjs';
import { r as requireAuth } from '../../chunks/auth_BqupFyoq.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_CpxnXrsa.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  const authCheck = requireAuth(Astro2.request);
  if (authCheck) return authCheck;
  let message = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "create" || action === "update") {
      const data = {
        icon: form.get("icon"),
        title_id: form.get("title_id"),
        title_en: form.get("title_en"),
        desc_id: form.get("desc_id"),
        desc_en: form.get("desc_en"),
        sort_order: Number(form.get("sort_order") || 0),
        visible: form.get("visible") === "true"
      };
      if (action === "create") {
        await supabaseAdmin.from("services").insert(data);
        message = "Service berhasil ditambahkan!";
      } else {
        await supabaseAdmin.from("services").update(data).eq("id", form.get("id"));
        message = "Service berhasil diupdate!";
      }
    } else if (action === "delete") {
      await supabaseAdmin.from("services").delete().eq("id", form.get("id"));
      message = "Service dihapus.";
    }
  }
  const { data: services } = await supabaseAdmin.from("services").select("*").order("sort_order");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Services \u2014 Admin", "data-astro-cid-vvh6hhgl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrap" data-astro-cid-vvh6hhgl> <aside class="admin-sidebar" data-astro-cid-vvh6hhgl> <div class="sidebar-logo" data-astro-cid-vvh6hhgl>ADMIN<span data-astro-cid-vvh6hhgl>PANEL</span></div> <nav class="sidebar-nav" data-astro-cid-vvh6hhgl> <a href="/admin" data-astro-cid-vvh6hhgl>📊 Dashboard</a> <a href="/admin/services" class="active" data-astro-cid-vvh6hhgl>⚙️ Services</a> <a href="/admin/testimonials" data-astro-cid-vvh6hhgl>💬 Testimoni</a> <a href="/admin/projects" data-astro-cid-vvh6hhgl>🖼️ Galeri</a> <a href="/" target="_blank" data-astro-cid-vvh6hhgl>🌐 Lihat Site</a> <a href="/admin/logout" class="logout" data-astro-cid-vvh6hhgl>🚪 Logout</a> </nav> </aside> <main class="admin-main" data-astro-cid-vvh6hhgl> <h1 class="admin-title" data-astro-cid-vvh6hhgl>Services</h1> ${message && renderTemplate`<div class="alert" data-astro-cid-vvh6hhgl>${message}</div>`} <!-- Add Form --> <details class="form-details" data-astro-cid-vvh6hhgl> <summary data-astro-cid-vvh6hhgl>+ Tambah Service Baru</summary> <form method="POST" class="admin-form" style="margin-top:1rem" data-astro-cid-vvh6hhgl> <input type="hidden" name="_action" value="create" data-astro-cid-vvh6hhgl> <div class="form-row" data-astro-cid-vvh6hhgl> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Icon (emoji)</label><input name="icon" value="🔧" required data-astro-cid-vvh6hhgl></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Sort Order</label><input name="sort_order" type="number" value="0" data-astro-cid-vvh6hhgl></div> </div> <div class="form-row" data-astro-cid-vvh6hhgl> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Judul (ID)</label><input name="title_id" required data-astro-cid-vvh6hhgl></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Title (EN)</label><input name="title_en" required data-astro-cid-vvh6hhgl></div> </div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Deskripsi (ID)</label><textarea name="desc_id" required data-astro-cid-vvh6hhgl></textarea></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Description (EN)</label><textarea name="desc_en" required data-astro-cid-vvh6hhgl></textarea></div> <div class="form-group" data-astro-cid-vvh6hhgl> <label data-astro-cid-vvh6hhgl>Visible</label> <select name="visible" data-astro-cid-vvh6hhgl><option value="true" data-astro-cid-vvh6hhgl>Ya</option><option value="false" data-astro-cid-vvh6hhgl>Tidak</option></select> </div> <div class="form-actions" data-astro-cid-vvh6hhgl><button type="submit" class="btn btn-primary" data-astro-cid-vvh6hhgl>Simpan</button></div> </form> </details> <!-- Table --> <div class="admin-table-wrap" data-astro-cid-vvh6hhgl> <table class="admin-table" data-astro-cid-vvh6hhgl> <thead data-astro-cid-vvh6hhgl><tr data-astro-cid-vvh6hhgl><th data-astro-cid-vvh6hhgl>Icon</th><th data-astro-cid-vvh6hhgl>Judul</th><th data-astro-cid-vvh6hhgl>Status</th><th data-astro-cid-vvh6hhgl>Aksi</th></tr></thead> <tbody data-astro-cid-vvh6hhgl> ${services?.map((s) => renderTemplate`<tr data-astro-cid-vvh6hhgl> <td data-astro-cid-vvh6hhgl>${s.icon}</td> <td data-astro-cid-vvh6hhgl><strong data-astro-cid-vvh6hhgl>${s.title_id}</strong><br data-astro-cid-vvh6hhgl><small style="color:var(--text-muted)" data-astro-cid-vvh6hhgl>${s.title_en}</small></td> <td data-astro-cid-vvh6hhgl><span${addAttribute(`badge ${s.visible ? "badge-on" : "badge-off"}`, "class")} data-astro-cid-vvh6hhgl>${s.visible ? "Aktif" : "Hidden"}</span></td> <td data-astro-cid-vvh6hhgl> <details class="inline-edit" data-astro-cid-vvh6hhgl> <summary class="btn btn-outline btn-sm" data-astro-cid-vvh6hhgl>Edit</summary> <form method="POST" class="admin-form" style="margin-top:.75rem;padding:1rem;border:2px solid var(--border-color)" data-astro-cid-vvh6hhgl> <input type="hidden" name="_action" value="update" data-astro-cid-vvh6hhgl> <input type="hidden" name="id"${addAttribute(s.id, "value")} data-astro-cid-vvh6hhgl> <div class="form-row" data-astro-cid-vvh6hhgl> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Icon</label><input name="icon"${addAttribute(s.icon, "value")} data-astro-cid-vvh6hhgl></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Sort</label><input name="sort_order" type="number"${addAttribute(s.sort_order, "value")} data-astro-cid-vvh6hhgl></div> </div> <div class="form-row" data-astro-cid-vvh6hhgl> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Judul ID</label><input name="title_id"${addAttribute(s.title_id, "value")} data-astro-cid-vvh6hhgl></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Title EN</label><input name="title_en"${addAttribute(s.title_en, "value")} data-astro-cid-vvh6hhgl></div> </div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Desc ID</label><textarea name="desc_id" data-astro-cid-vvh6hhgl>${s.desc_id}</textarea></div> <div class="form-group" data-astro-cid-vvh6hhgl><label data-astro-cid-vvh6hhgl>Desc EN</label><textarea name="desc_en" data-astro-cid-vvh6hhgl>${s.desc_en}</textarea></div> <div class="form-group" data-astro-cid-vvh6hhgl> <label data-astro-cid-vvh6hhgl>Visible</label> <select name="visible" data-astro-cid-vvh6hhgl> <option value="true"${addAttribute(s.visible, "selected")} data-astro-cid-vvh6hhgl>Ya</option> <option value="false"${addAttribute(!s.visible, "selected")} data-astro-cid-vvh6hhgl>Tidak</option> </select> </div> <div class="form-actions" data-astro-cid-vvh6hhgl> <button type="submit" class="btn btn-primary btn-sm" data-astro-cid-vvh6hhgl>Update</button> </div> </form> </details> <form method="POST" style="display:inline" onsubmit="return confirm('Hapus service ini?')" data-astro-cid-vvh6hhgl> <input type="hidden" name="_action" value="delete" data-astro-cid-vvh6hhgl> <input type="hidden" name="id"${addAttribute(s.id, "value")} data-astro-cid-vvh6hhgl> <button type="submit" class="btn btn-danger btn-sm" data-astro-cid-vvh6hhgl>Hapus</button> </form> </td> </tr>`)} </tbody> </table> </div> </main> </div> ` })} `;
}, "C:/laragon/www/webs/src/pages/admin/services.astro", void 0);

const $$file = "C:/laragon/www/webs/src/pages/admin/services.astro";
const $$url = "/admin/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
