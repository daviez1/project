

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.33c30519.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/stores.d53d2243.js","_app/immutable/chunks/singletons.09d642d6.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/animate.cb8904a9.js","_app/immutable/chunks/context.b2e45193.js"];
export const stylesheets = ["_app/immutable/assets/0.bfa38a2f.css"];
export const fonts = [];
