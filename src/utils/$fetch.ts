import { ofetch } from "ofetch";
import { useRouter } from "vue-router";

const router = useRouter();
const $fetch = ofetch.create({
	async onRequest({ options }) {
		const token = localStorage.getItem("token");

		if (token) {
			options.headers.set("Authorization", `Bearer ${token}`);
		}
		options.headers.set("Content-Type", "application/json");
		options.headers.set("Accept", "application/json");
		options.baseURL = import.meta.env.VITE_API_URL;
	},
	async onResponse({ response }) {
		// console.log("on response:", response);
	},
	async onRequestError({ error }) {
		// console.log("on req error:", error);
	},
	async onResponseError({ response }) {
		if (response.status === 401) {
			localStorage.removeItem("token");
			await router.push("/login");
		}
	},
});

export default $fetch;
