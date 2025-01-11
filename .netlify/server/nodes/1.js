

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5e4be17d.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/stores.c85a31ab.js","_app/immutable/chunks/singletons.c259dcd0.js","_app/immutable/chunks/index.d6cec099.js"];
export const stylesheets = [];
export const fonts = [];
