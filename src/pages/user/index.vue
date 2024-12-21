<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { user, logout } = useAuth();
const router = useRouter();

definePage({
	beforeEnter() {
		if (!localStorage.getItem("token")) {
			useRouter().push("/login");
		}
	},
});

const handleLogout = async () => {
	await logout();
	router.push("/login");
};
</script>
<template>
	<h1 class="text-red-400">user</h1>

	<Button variant="destructive" @click="handleLogout">Logout</Button>
	<pre>{{ user }}</pre>
</template>
