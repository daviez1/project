

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.88971049.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/stores.d53d2243.js","_app/immutable/chunks/singletons.09d642d6.js","_app/immutable/chunks/index.d6cec099.js"];
export const stylesheets = [];
export const fonts = [];
