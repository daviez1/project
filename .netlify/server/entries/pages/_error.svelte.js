import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="min-h-[60vh] flex items-center justify-center"><div class="text-center"><h1 class="text-4xl font-bold mb-4">Error ${escape($page.status)}</h1> <p class="text-gray-600 mb-8">${escape($page.error?.message)}</p> <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700" data-svelte-h="svelte-1a8j2hc">Go Home</a></div></div>`;
});
export {
  Error as default
};
