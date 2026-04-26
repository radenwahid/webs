import { c as createComponent, r as renderTemplate, d as renderSlot, e as renderHead, u as unescapeHTML, f as addAttribute, g as createAstro } from './astro/server_BuAMovgT.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Joki Coding by Raden \u2014 Solusi Coding Profesional",
    description = "Jasa joki coding profesional: tugas kuliah, skripsi, web development, mobile app, API integration. Cepat, rapi, terpercaya.",
    image = "/og-image.png",
    lang = "id"
  } = Astro2.props;
  const canonical = Astro2.url.href;
  return renderTemplate(_a || (_a = __template(["<html", ' data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Schema.org --><script type="application/ld+json">', `<\/script><link rel="icon" type="image/svg+xml" href="/favicon.svg"><script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', t);
      const l = localStorage.getItem('lang') || 'id';
      document.documentElement.setAttribute('lang', l);
    })();
  <\/script>`, "</head> <body> ", ' <button class="scroll-top" id="scrollTop" aria-label="Scroll to top">\u2191</button>  </body> </html> '])), addAttribute(lang, "lang"), title, addAttribute(description, "content"), addAttribute(canonical, "href"), addAttribute(canonical, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(lang === "id" ? "id_ID" : "en_US", "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Joki Coding by Raden",
    "description": description,
    "url": canonical,
    "serviceType": ["Web Development", "Mobile App Development", "Programming Tutoring"],
    "areaServed": "ID",
    "availableLanguage": ["Indonesian", "English"]
  })), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/laragon/www/webs/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
