import * as server from '../entries/pages/ordenar/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ordenar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ordenar/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.14c4601c.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/DishCardInSection.6e1151b5.js","_app/immutable/chunks/Loader.7743ba5a.js","_app/immutable/chunks/context.b2e45193.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/animate.cb8904a9.js","_app/immutable/chunks/ButtonSeeOrders.4eca0236.js","_app/immutable/chunks/Empty.ca93c88d.js","_app/immutable/chunks/stores.c85a31ab.js","_app/immutable/chunks/singletons.c259dcd0.js"];
export const stylesheets = ["_app/immutable/assets/7.bc8dc825.css","_app/immutable/assets/DishCardInSection.5e19bed4.css","_app/immutable/assets/Loader.bd99c7ef.css","_app/immutable/assets/ToastComplete.318929df.css","_app/immutable/assets/ButtonSeeOrders.2208015d.css"];
export const fonts = [];
