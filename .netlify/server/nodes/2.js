

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.64d67eaf.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/Loader.7743ba5a.js","_app/immutable/chunks/context.b2e45193.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/ButtonSeeOrders.4eca0236.js","_app/immutable/chunks/Empty.ca93c88d.js","_app/immutable/chunks/stores.c85a31ab.js","_app/immutable/chunks/singletons.c259dcd0.js","_app/immutable/chunks/animate.cb8904a9.js"];
export const stylesheets = ["_app/immutable/assets/2.f9092b6a.css","_app/immutable/assets/ToastComplete.318929df.css","_app/immutable/assets/Loader.bd99c7ef.css","_app/immutable/assets/ButtonSeeOrders.2208015d.css"];
export const fonts = [];
