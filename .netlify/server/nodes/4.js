

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gestionarPedidos/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.c0ca3f58.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/Loader.7743ba5a.js","_app/immutable/chunks/context.b2e45193.js","_app/immutable/chunks/index.d6cec099.js"];
export const stylesheets = ["_app/immutable/assets/4.48fd3972.css","_app/immutable/assets/ToastComplete.318929df.css","_app/immutable/assets/Loader.bd99c7ef.css"];
export const fonts = [];
