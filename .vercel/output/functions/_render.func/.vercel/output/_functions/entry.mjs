import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CqBc7DQ1.mjs';
import { manifest } from './manifest_BJ-jSstY.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin/logout.astro.mjs');
const _page3 = () => import('./pages/admin/projects.astro.mjs');
const _page4 = () => import('./pages/admin/services.astro.mjs');
const _page5 = () => import('./pages/admin/testimonials.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/gallery.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/logout.astro", _page2],
    ["src/pages/admin/projects.astro", _page3],
    ["src/pages/admin/services.astro", _page4],
    ["src/pages/admin/testimonials.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/gallery.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "491d778a-0821-4f8d-bbe8-e95d04556d08",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
