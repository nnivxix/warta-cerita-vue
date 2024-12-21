<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import Label from "@/components/ui/label/Label.vue";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { FetchError } from "ofetch";

definePage({
	beforeEnter() {
		if (localStorage.getItem("token")) {
			useRouter().push("/user");
		}
	},
});

const { login } = useAuth();
const router = useRouter();

const form = ref({
	email: "",
	password: "",
});
const errors = ref({
	email: "",
});
const submit = async () => {
	errors.value.email = "";
	if (!form.value.email || !form.value.password) {
		return;
	}
	try {
		await login(form.value);

		await router.push("/user");
	} catch (error) {
		if (error instanceof FetchError) {
			console.log("FetchError: ", error.data.message);
			errors.value.email = error.data.message;
		}
	}
};
</script>
<template>
	<div class="flex items-center justify-center h-screen">
		<form
			@submit.prevent="submit"
			class="flex flex-col gap-3 max-w-2xl w-full mx-auto"
		>
			<h1>Login</h1>
			<div class="flex flex-col gap-3 w-full">
				<Label for="email">Email</Label>
				<Input
					type="email"
					id="email"
					v-model="form.email"
					placeholder="user@email.com"
				/>
				<span class="text-red-500" v-if="errors.email">{{ errors.email }}</span>
			</div>
			<Label for="password">Password</Label>
			<Input
				type="password"
				id="password"
				v-model="form.password"
				placeholder="Password"
			/>
			<Button type="submit">Login</Button>
		</form>
	</div>
</template>

<style scoped></style>
