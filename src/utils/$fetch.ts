import { ofetch } from "ofetch";

const $fetch = ofetch.create({
	async onRequest({ options }) {
		const token = localStorage.getItem("token");

		if (token) {
			options.headers.set("Authorization", `Bearer ${token}`);
		}
		options.headers.set("Content-Type", "application/json");
		options.baseURL = import.meta.env.VITE_API_URL;
	},
});

export default $fetch;
