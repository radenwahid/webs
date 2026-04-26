import { c as createComponent, h as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_BuAMovgT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_B4-Wq8Et.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const pass = form.get("password");
    if (pass === "your_admin_password_here") {
      const res = new Response(null, { status: 302, headers: { Location: "/admin" } });
      res.headers.append("Set-Cookie", `admin_auth=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`);
      return res;
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login — Joki Coding", "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="login-wrap" data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <div class="login-logo" data-astro-cid-rf56lckb>ADMIN<span data-astro-cid-rf56lckb>PANEL</span></div> <p class="login-sub" data-astro-cid-rf56lckb>Joki Coding by Raden</p> <form method="POST" class="login-form" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Password</label> <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••" data-astro-cid-rf56lckb> <button type="submit" class="btn btn-primary" data-astro-cid-rf56lckb>Masuk →</button> </form> </div> </div> ` })} `;
}, "C:/laragon/www/webs/src/pages/admin/login.astro", void 0);
const $$file = "C:/laragon/www/webs/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
