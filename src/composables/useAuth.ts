import $fetch from "@/utils/$fetch";
import { ref } from "vue";
import { useRouter } from "vue-router";

const user = ref(null);

export function useAuth() {
	const fetchCurrentUser = async () => {
		const response = await $fetch("/user");
		user.value = response;
	};

	const logout = async () => {
		await $fetch("/logout", {
			method: "DELETE",
		});
		user.value = null;
		localStorage.removeItem("token");

		// await useRouter().push("/login");
	};

	return {
		user,
		fetchCurrentUser,
		logout,
	};
}
