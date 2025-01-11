

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/kiosko/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.750a17bb.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js","_app/immutable/chunks/DishCardInSection.6e1151b5.js","_app/immutable/chunks/Loader.7743ba5a.js","_app/immutable/chunks/context.b2e45193.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/chunks/ToastComplete.e5bedbdd.js","_app/immutable/chunks/animate.cb8904a9.js","_app/immutable/chunks/ButtonSeeOrders.4eca0236.js","_app/immutable/chunks/Empty.ba11395c.js","_app/immutable/chunks/stores.d53d2243.js","_app/immutable/chunks/singletons.09d642d6.js"];
export const stylesheets = ["_app/immutable/assets/6.834180da.css","_app/immutable/assets/DishCardInSection.5e19bed4.css","_app/immutable/assets/Loader.bd99c7ef.css","_app/immutable/assets/ToastComplete.318929df.css","_app/immutable/assets/ButtonSeeOrders.2208015d.css"];
export const fonts = [];
