

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chillGuy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.d35683e6.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js"];
export const stylesheets = ["_app/immutable/assets/3.ba3c19e6.css"];
export const fonts = [];
