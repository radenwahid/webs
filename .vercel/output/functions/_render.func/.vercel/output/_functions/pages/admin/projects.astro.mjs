import { c as createComponent, h as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_BuAMovgT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_B4-Wq8Et.mjs';
import { r as requireAuth } from '../../chunks/auth_BqupFyoq.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_CpxnXrsa.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  const authCheck = requireAuth(Astro2.request);
  if (authCheck) return authCheck;
  let message = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "upload") {
      const imageData = String(form.get("image_data") || "");
      const imageName = String(form.get("image_name") || `img_${Date.now()}.webp`);
      if (imageData && imageData.startsWith("data:")) {
        const base64 = imageData.split(",")[1];
        const mimeMatch = imageData.match(/data:([^;]+);/);
        const mime = mimeMatch ? mimeMatch[1] : "image/webp";
        const buffer = Buffer.from(base64, "base64");
        const filename = `${Date.now()}_${imageName}`;
        const { data, error } = await supabaseAdmin.storage.from("projects").upload(filename, buffer, { contentType: mime, upsert: false });
        if (!error && data) {
          const { data: urlData } = supabaseAdmin.storage.from("projects").getPublicUrl(filename);
          message = `IMAGE_URL:${urlData.publicUrl}`;
        } else {
          message = `Upload error: ${error?.message}`;
        }
      } else {
        message = "Tidak ada data gambar.";
      }
    } else if (action === "create" || action === "update") {
      const tagsRaw = String(form.get("tags") || "");
      const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
      const data = {
        title: form.get("title"),
        description: form.get("description"),
        image_url: form.get("image_url"),
        link: form.get("link"),
        tags,
        visible: form.get("visible") === "true"
      };
      if (action === "create") {
        await supabaseAdmin.from("projects").insert(data);
        message = "Project ditambahkan!";
      } else {
        await supabaseAdmin.from("projects").update(data).eq("id", form.get("id"));
        message = "Project diupdate!";
      }
    } else if (action === "delete") {
      await supabaseAdmin.from("projects").delete().eq("id", form.get("id"));
      message = "Project dihapus.";
    }
  }
  const { data: projects } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });
  const uploadedUrl = message.startsWith("IMAGE_URL:") ? message.replace("IMAGE_URL:", "") : "";
  if (uploadedUrl) message = `\u2713 Upload berhasil! URL: ${uploadedUrl}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Galeri \u2014 Admin", "data-astro-cid-jm74fzil": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrap" data-astro-cid-jm74fzil> <aside class="admin-sidebar" data-astro-cid-jm74fzil> <div class="sidebar-logo" data-astro-cid-jm74fzil>ADMIN<span data-astro-cid-jm74fzil>PANEL</span></div> <nav class="sidebar-nav" data-astro-cid-jm74fzil> <a href="/admin" data-astro-cid-jm74fzil>📊 Dashboard</a> <a href="/admin/services" data-astro-cid-jm74fzil>⚙️ Services</a> <a href="/admin/testimonials" data-astro-cid-jm74fzil>💬 Testimoni</a> <a href="/admin/projects" class="active" data-astro-cid-jm74fzil>🖼️ Galeri</a> <a href="/" target="_blank" data-astro-cid-jm74fzil>🌐 Lihat Site</a> <a href="/admin/logout" class="logout" data-astro-cid-jm74fzil>🚪 Logout</a> </nav> </aside> <main class="admin-main" data-astro-cid-jm74fzil> <h1 class="admin-title" data-astro-cid-jm74fzil>Galeri Project</h1> ${message && renderTemplate`<div class="alert" data-astro-cid-jm74fzil>${message}</div>`} <!-- Upload Image --> <details class="form-details" data-astro-cid-jm74fzil> <summary data-astro-cid-jm74fzil>📤 Upload Gambar ke Storage</summary> <form method="POST" enctype="multipart/form-data" class="admin-form" style="margin-top:1rem" id="uploadForm" data-astro-cid-jm74fzil> <input type="hidden" name="_action" value="upload" data-astro-cid-jm74fzil> <input type="hidden" name="image_data" id="imageData" data-astro-cid-jm74fzil> <input type="hidden" name="image_name" id="imageName" data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil> <label data-astro-cid-jm74fzil>Pilih Gambar (JPG/PNG/WebP)</label> <input type="file" name="image_raw" id="imageRaw" accept="image/*" required data-astro-cid-jm74fzil> </div> <div id="previewWrap" style="display:none;margin-top:.75rem" data-astro-cid-jm74fzil> <img id="previewImg" style="max-width:100%;max-height:200px;border:2px solid var(--border-color)" data-astro-cid-jm74fzil> <p id="sizeInfo" style="font-size:.8rem;color:var(--text-muted);margin-top:.4rem" data-astro-cid-jm74fzil></p> </div> <div class="form-actions" data-astro-cid-jm74fzil> <button type="submit" class="btn btn-primary" id="uploadBtn" data-astro-cid-jm74fzil>Upload</button> </div> </form> </details> <!-- Add Project --> <details class="form-details" data-astro-cid-jm74fzil> <summary data-astro-cid-jm74fzil>+ Tambah Project Baru</summary> <form method="POST" class="admin-form" style="margin-top:1rem" data-astro-cid-jm74fzil> <input type="hidden" name="_action" value="create" data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Judul Project</label><input name="title" required data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Deskripsi</label><textarea name="description" data-astro-cid-jm74fzil></textarea></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>URL Gambar (dari upload di atas)</label><input name="image_url" placeholder="https://..." data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Link Project</label><input name="link" placeholder="https://..." data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Tags (pisah koma)</label><input name="tags" placeholder="React, Node.js, Skripsi" data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil> <label data-astro-cid-jm74fzil>Visible</label> <select name="visible" data-astro-cid-jm74fzil><option value="true" data-astro-cid-jm74fzil>Ya</option><option value="false" data-astro-cid-jm74fzil>Tidak</option></select> </div> <div class="form-actions" data-astro-cid-jm74fzil><button type="submit" class="btn btn-primary" data-astro-cid-jm74fzil>Simpan</button></div> </form> </details> <!-- Table --> <div class="admin-table-wrap" data-astro-cid-jm74fzil> <table class="admin-table" data-astro-cid-jm74fzil> <thead data-astro-cid-jm74fzil><tr data-astro-cid-jm74fzil><th data-astro-cid-jm74fzil>Gambar</th><th data-astro-cid-jm74fzil>Judul</th><th data-astro-cid-jm74fzil>Link</th><th data-astro-cid-jm74fzil>Status</th><th data-astro-cid-jm74fzil>Aksi</th></tr></thead> <tbody data-astro-cid-jm74fzil> ${projects?.map((p) => renderTemplate`<tr data-astro-cid-jm74fzil> <td data-astro-cid-jm74fzil> ${p.image_url ? renderTemplate`<img${addAttribute(p.image_url, "src")}${addAttribute(p.title, "alt")} style="width:60px;height:40px;object-fit:cover;border:2px solid var(--border-color)" data-astro-cid-jm74fzil>` : renderTemplate`<span style="color:var(--text-muted)" data-astro-cid-jm74fzil>—</span>`} </td> <td data-astro-cid-jm74fzil><strong data-astro-cid-jm74fzil>${p.title}</strong></td> <td data-astro-cid-jm74fzil>${p.link ? renderTemplate`<a${addAttribute(p.link, "href")} target="_blank" style="color:var(--accent)" data-astro-cid-jm74fzil>Buka ↗</a>` : "\u2014"}</td> <td data-astro-cid-jm74fzil><span${addAttribute(`badge ${p.visible ? "badge-on" : "badge-off"}`, "class")} data-astro-cid-jm74fzil>${p.visible ? "Aktif" : "Hidden"}</span></td> <td data-astro-cid-jm74fzil> <details class="inline-edit" data-astro-cid-jm74fzil> <summary class="btn btn-outline btn-sm" data-astro-cid-jm74fzil>Edit</summary> <form method="POST" class="admin-form" style="margin-top:.75rem;padding:1rem;border:2px solid var(--border-color)" data-astro-cid-jm74fzil> <input type="hidden" name="_action" value="update" data-astro-cid-jm74fzil> <input type="hidden" name="id"${addAttribute(p.id, "value")} data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Judul</label><input name="title"${addAttribute(p.title, "value")} data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Deskripsi</label><textarea name="description" data-astro-cid-jm74fzil>${p.description}</textarea></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>URL Gambar</label><input name="image_url"${addAttribute(p.image_url || "", "value")} data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Link</label><input name="link"${addAttribute(p.link || "", "value")} data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil><label data-astro-cid-jm74fzil>Tags</label><input name="tags"${addAttribute(p.tags?.join(", ") || "", "value")} data-astro-cid-jm74fzil></div> <div class="form-group" data-astro-cid-jm74fzil> <label data-astro-cid-jm74fzil>Visible</label> <select name="visible" data-astro-cid-jm74fzil> <option value="true"${addAttribute(p.visible, "selected")} data-astro-cid-jm74fzil>Ya</option> <option value="false"${addAttribute(!p.visible, "selected")} data-astro-cid-jm74fzil>Tidak</option> </select> </div> <div class="form-actions" data-astro-cid-jm74fzil><button type="submit" class="btn btn-primary btn-sm" data-astro-cid-jm74fzil>Update</button></div> </form> </details> <form method="POST" style="display:inline" onsubmit="return confirm('Hapus project ini?')" data-astro-cid-jm74fzil> <input type="hidden" name="_action" value="delete" data-astro-cid-jm74fzil> <input type="hidden" name="id"${addAttribute(p.id, "value")} data-astro-cid-jm74fzil> <button type="submit" class="btn btn-danger btn-sm" data-astro-cid-jm74fzil>Hapus</button> </form> </td> </tr>`)} </tbody> </table> </div> </main> </div> ` })}  `;
}, "C:/laragon/www/webs/src/pages/admin/projects.astro", void 0);

const $$file = "C:/laragon/www/webs/src/pages/admin/projects.astro";
const $$url = "/admin/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
