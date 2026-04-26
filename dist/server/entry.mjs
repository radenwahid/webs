import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cxz31djG.mjs';
import { manifest } from './manifest_CA48F0cz.mjs';

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
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
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
    "mode": "standalone",
    "client": "file:///C:/laragon/www/webs/dist/client/",
    "server": "file:///C:/laragon/www/webs/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
