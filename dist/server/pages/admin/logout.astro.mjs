import { f as createComponent } from '../../chunks/astro/server_5CbLVaOW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const res = new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  res.headers.append("Set-Cookie", "admin_auth=; Path=/; HttpOnly; Max-Age=0");
  return res;
}, "C:/laragon/www/webs/src/pages/admin/logout.astro", void 0);

const $$file = "C:/laragon/www/webs/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
