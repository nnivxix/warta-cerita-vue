import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

for (const route of routes) {
	if (route.name === "/user") {
		route.meta ??= {};
		route.meta.requiresAuth = true;
	}
}

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
