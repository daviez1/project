

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/inventory/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.1a3a338e.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/Empty.ca93c88d.js","_app/immutable/chunks/stores.c85a31ab.js","_app/immutable/chunks/singletons.c259dcd0.js"];
export const stylesheets = ["_app/immutable/assets/5.e6060e67.css","_app/immutable/assets/ToastComplete.318929df.css"];
export const fonts = [];
