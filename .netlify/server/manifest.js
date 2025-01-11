export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.0a46a1a5.js","app":"_app/immutable/entry/app.1c486ec8.js","imports":["_app/immutable/entry/start.0a46a1a5.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/singletons.c259dcd0.js","_app/immutable/chunks/index.d6cec099.js","_app/immutable/entry/app.1c486ec8.js","_app/immutable/chunks/scheduler.e81b5c3b.js","_app/immutable/chunks/index.05df92e8.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/inventory/items",
				pattern: /^\/api\/inventory\/items\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/inventory/items/_server.ts.js'))
			},
			{
				id: "/api/inventory/items/stocks/[id]",
				pattern: /^\/api\/inventory\/items\/stocks\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/inventory/items/stocks/_id_/_server.ts.js'))
			},
			{
				id: "/api/inventory/items/[id]",
				pattern: /^\/api\/inventory\/items\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/inventory/items/_id_/_server.ts.js'))
			},
			{
				id: "/api/kiosko",
				pattern: /^\/api\/kiosko\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/kiosko/_server.ts.js'))
			},
			{
				id: "/api/kiosko/category",
				pattern: /^\/api\/kiosko\/category\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/kiosko/category/_server.ts.js'))
			},
			{
				id: "/api/kiosko/category/[id]",
				pattern: /^\/api\/kiosko\/category\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/kiosko/category/_id_/_server.ts.js'))
			},
			{
				id: "/api/kiosko/[id]",
				pattern: /^\/api\/kiosko\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/kiosko/_id_/_server.ts.js'))
			},
			{
				id: "/api/menu",
				pattern: /^\/api\/menu\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/_server.ts.js'))
			},
			{
				id: "/api/menu/category",
				pattern: /^\/api\/menu\/category\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/category/_server.ts.js'))
			},
			{
				id: "/api/menu/category/[id]",
				pattern: /^\/api\/menu\/category\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/category/_id_/_server.ts.js'))
			},
			{
				id: "/api/menu/[id]",
				pattern: /^\/api\/menu\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/_id_/_server.ts.js'))
			},
			{
				id: "/api/order",
				pattern: /^\/api\/order\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/order/_server.ts.js'))
			},
			{
				id: "/api/order/[id]",
				pattern: /^\/api\/order\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/order/_id_/_server.ts.js'))
			},
			{
				id: "/chillGuy",
				pattern: /^\/chillGuy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/gestionarPedidos",
				pattern: /^\/gestionarPedidos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/inventory",
				pattern: /^\/inventory\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/kiosko",
				pattern: /^\/kiosko\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/ordenar",
				pattern: /^\/ordenar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
