import $fetch from "@/utils/$fetch";
import { ref } from "vue";

interface User {
	id: number;
	email: string;
	name: string;
}

const user = ref<User | null>(null);

export function useAuth() {
	const fetchCurrentUser = async () => {
		const response = await $fetch("/user");
		user.value = response;
	};

	const login = async (credentials: { email: string; password: string }) => {
		const response = await $fetch<{ user: User; token: string }>("/login", {
			method: "POST",
			body: credentials,
		});
		user.value = response.user;
		localStorage.setItem("token", response.token);
	};

	const logout = async () => {
		await $fetch("/logout", {
			method: "DELETE",
		});
		user.value = null;
		localStorage.removeItem("token");
	};

	return {
		user,
		fetchCurrentUser,
		logout,
		login,
	};
}
