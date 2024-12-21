<script setup lang="ts">
import Avatar from "@/components/ui/avatar/Avatar.vue";
import AvatarFallback from "@/components/ui/avatar/AvatarFallback.vue";
import Button from "@/components/ui/button/Button.vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { user, logout } = useAuth();
const router = useRouter();

definePage({
	async beforeEnter() {
		if (!localStorage.getItem("token")) {
			await useRouter().push("/login");
		}
	},
});

const handleLogout = async () => {
	await logout();
	router.push("/login");
};
</script>
<template>
	<div class="flex items-center justify-center h-screen">
		<div class="max-w-4xl flex flex-col gap-4 w-full mx-auto">
			<div>
				<Avatar size="lg">
					<AvatarFallback>
						{{ user?.name[0] }}
					</AvatarFallback>
				</Avatar>
			</div>
			<h1 class="text-3xl">Hello, {{ user?.name }}</h1>
			<div>
				<Button variant="destructive" @click="handleLogout">Logout</Button>
			</div>
		</div>
	</div>
</template>
