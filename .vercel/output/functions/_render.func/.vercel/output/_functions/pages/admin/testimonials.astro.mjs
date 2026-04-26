import { c as createComponent, h as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_BuAMovgT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_B4-Wq8Et.mjs';
import { r as requireAuth } from '../../chunks/auth_BqupFyoq.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_CpxnXrsa.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Testimonials = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Testimonials;
  const authCheck = requireAuth(Astro2.request);
  if (authCheck) return authCheck;
  let message = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "create" || action === "update") {
      const data = {
        name: form.get("name"),
        role: form.get("role"),
        text: form.get("text"),
        stars: Number(form.get("stars") || 5),
        tag: form.get("tag"),
        visible: form.get("visible") === "true"
      };
      if (action === "create") {
        await supabaseAdmin.from("testimonials").insert(data);
        message = "Testimoni ditambahkan!";
      } else {
        await supabaseAdmin.from("testimonials").update(data).eq("id", form.get("id"));
        message = "Testimoni diupdate!";
      }
    } else if (action === "delete") {
      await supabaseAdmin.from("testimonials").delete().eq("id", form.get("id"));
      message = "Testimoni dihapus.";
    }
  }
  const { data: testimonials } = await supabaseAdmin.from("testimonials").select("*").order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Testimoni \u2014 Admin", "data-astro-cid-rmwmmmyq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrap" data-astro-cid-rmwmmmyq> <aside class="admin-sidebar" data-astro-cid-rmwmmmyq> <div class="sidebar-logo" data-astro-cid-rmwmmmyq>ADMIN<span data-astro-cid-rmwmmmyq>PANEL</span></div> <nav class="sidebar-nav" data-astro-cid-rmwmmmyq> <a href="/admin" data-astro-cid-rmwmmmyq>📊 Dashboard</a> <a href="/admin/services" data-astro-cid-rmwmmmyq>⚙️ Services</a> <a href="/admin/testimonials" class="active" data-astro-cid-rmwmmmyq>💬 Testimoni</a> <a href="/admin/projects" data-astro-cid-rmwmmmyq>🖼️ Galeri</a> <a href="/" target="_blank" data-astro-cid-rmwmmmyq>🌐 Lihat Site</a> <a href="/admin/logout" class="logout" data-astro-cid-rmwmmmyq>🚪 Logout</a> </nav> </aside> <main class="admin-main" data-astro-cid-rmwmmmyq> <h1 class="admin-title" data-astro-cid-rmwmmmyq>Testimoni</h1> ${message && renderTemplate`<div class="alert" data-astro-cid-rmwmmmyq>${message}</div>`} <details class="form-details" data-astro-cid-rmwmmmyq> <summary data-astro-cid-rmwmmmyq>+ Tambah Testimoni Baru</summary> <form method="POST" class="admin-form" style="margin-top:1rem" data-astro-cid-rmwmmmyq> <input type="hidden" name="_action" value="create" data-astro-cid-rmwmmmyq> <div class="form-row" data-astro-cid-rmwmmmyq> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Nama</label><input name="name" required data-astro-cid-rmwmmmyq></div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Role / Jabatan</label><input name="role" required data-astro-cid-rmwmmmyq></div> </div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Testimoni</label><textarea name="text" required data-astro-cid-rmwmmmyq></textarea></div> <div class="form-row" data-astro-cid-rmwmmmyq> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Tag</label><input name="tag" value="Project" data-astro-cid-rmwmmmyq></div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Bintang (1-5)</label><input name="stars" type="number" min="1" max="5" value="5" data-astro-cid-rmwmmmyq></div> </div> <div class="form-group" data-astro-cid-rmwmmmyq> <label data-astro-cid-rmwmmmyq>Visible</label> <select name="visible" data-astro-cid-rmwmmmyq><option value="true" data-astro-cid-rmwmmmyq>Ya</option><option value="false" data-astro-cid-rmwmmmyq>Tidak</option></select> </div> <div class="form-actions" data-astro-cid-rmwmmmyq><button type="submit" class="btn btn-primary" data-astro-cid-rmwmmmyq>Simpan</button></div> </form> </details> <div class="admin-table-wrap" data-astro-cid-rmwmmmyq> <table class="admin-table" data-astro-cid-rmwmmmyq> <thead data-astro-cid-rmwmmmyq><tr data-astro-cid-rmwmmmyq><th data-astro-cid-rmwmmmyq>Nama</th><th data-astro-cid-rmwmmmyq>Testimoni</th><th data-astro-cid-rmwmmmyq>Tag</th><th data-astro-cid-rmwmmmyq>Status</th><th data-astro-cid-rmwmmmyq>Aksi</th></tr></thead> <tbody data-astro-cid-rmwmmmyq> ${testimonials?.map((t) => renderTemplate`<tr data-astro-cid-rmwmmmyq> <td data-astro-cid-rmwmmmyq><strong data-astro-cid-rmwmmmyq>${t.name}</strong><br data-astro-cid-rmwmmmyq><small style="color:var(--text-muted)" data-astro-cid-rmwmmmyq>${t.role}</small></td> <td style="max-width:240px;font-size:.85rem" data-astro-cid-rmwmmmyq>${t.text.slice(0, 80)}...</td> <td data-astro-cid-rmwmmmyq>${t.tag}</td> <td data-astro-cid-rmwmmmyq><span${addAttribute(`badge ${t.visible ? "badge-on" : "badge-off"}`, "class")} data-astro-cid-rmwmmmyq>${t.visible ? "Aktif" : "Hidden"}</span></td> <td data-astro-cid-rmwmmmyq> <details class="inline-edit" data-astro-cid-rmwmmmyq> <summary class="btn btn-outline btn-sm" data-astro-cid-rmwmmmyq>Edit</summary> <form method="POST" class="admin-form" style="margin-top:.75rem;padding:1rem;border:2px solid var(--border-color)" data-astro-cid-rmwmmmyq> <input type="hidden" name="_action" value="update" data-astro-cid-rmwmmmyq> <input type="hidden" name="id"${addAttribute(t.id, "value")} data-astro-cid-rmwmmmyq> <div class="form-row" data-astro-cid-rmwmmmyq> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Nama</label><input name="name"${addAttribute(t.name, "value")} data-astro-cid-rmwmmmyq></div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Role</label><input name="role"${addAttribute(t.role, "value")} data-astro-cid-rmwmmmyq></div> </div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Testimoni</label><textarea name="text" data-astro-cid-rmwmmmyq>${t.text}</textarea></div> <div class="form-row" data-astro-cid-rmwmmmyq> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Tag</label><input name="tag"${addAttribute(t.tag, "value")} data-astro-cid-rmwmmmyq></div> <div class="form-group" data-astro-cid-rmwmmmyq><label data-astro-cid-rmwmmmyq>Bintang</label><input name="stars" type="number" min="1" max="5"${addAttribute(t.stars, "value")} data-astro-cid-rmwmmmyq></div> </div> <div class="form-group" data-astro-cid-rmwmmmyq> <label data-astro-cid-rmwmmmyq>Visible</label> <select name="visible" data-astro-cid-rmwmmmyq> <option value="true"${addAttribute(t.visible, "selected")} data-astro-cid-rmwmmmyq>Ya</option> <option value="false"${addAttribute(!t.visible, "selected")} data-astro-cid-rmwmmmyq>Tidak</option> </select> </div> <div class="form-actions" data-astro-cid-rmwmmmyq><button type="submit" class="btn btn-primary btn-sm" data-astro-cid-rmwmmmyq>Update</button></div> </form> </details> <form method="POST" style="display:inline" onsubmit="return confirm('Hapus testimoni ini?')" data-astro-cid-rmwmmmyq> <input type="hidden" name="_action" value="delete" data-astro-cid-rmwmmmyq> <input type="hidden" name="id"${addAttribute(t.id, "value")} data-astro-cid-rmwmmmyq> <button type="submit" class="btn btn-danger btn-sm" data-astro-cid-rmwmmmyq>Hapus</button> </form> </td> </tr>`)} </tbody> </table> </div> </main> </div> ` })} `;
}, "C:/laragon/www/webs/src/pages/admin/testimonials.astro", void 0);

const $$file = "C:/laragon/www/webs/src/pages/admin/testimonials.astro";
const $$url = "/admin/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testimonials,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
