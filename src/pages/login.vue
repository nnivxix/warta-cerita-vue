<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { ref } from "vue";
import { ofetch } from "ofetch";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

definePage({
	beforeEnter() {
		if (localStorage.getItem("token")) {
			useRouter().push("/user");
		}
	},
});

const { user } = useAuth();
const router = useRouter();

const form = ref({
	email: "",
	password: "",
});
const submit = async () => {
	const login = await ofetch("http://localhost:8000/api/login", {
		method: "POST",
		body: form.value,
	});

	if (login.token) {
		localStorage.setItem("token", login.token);
		user.value = login.user;

		await router.push("/user");
	}
};
</script>
<template>
	<div class="flex items-center justify-center h-screen">
		<form @submit.prevent="submit" class="flex flex-col gap-3 max-w-lg mx-auto">
			<h1>Login</h1>
			<Input type="email" v-model="form.email" placeholder="user@email.com" />
			<Input type="password" v-model="form.password" placeholder="Password" />
			<Button type="submit">Login</Button>
		</form>
	</div>
</template>

<style scoped></style>
