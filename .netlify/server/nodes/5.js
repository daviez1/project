

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/inventory/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.b4b320a4.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/Empty.ba11395c.js","_app/immutable/chunks/stores.d53d2243.js","_app/immutable/chunks/singletons.09d642d6.js"];
export const stylesheets = ["_app/immutable/assets/5.e6060e67.css","_app/immutable/assets/ToastComplete.318929df.css"];
export const fonts = [];
