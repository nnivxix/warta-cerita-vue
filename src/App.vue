<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { onMounted } from "vue";

const { fetchCurrentUser } = useAuth();

onMounted(async () => {
	if (localStorage.getItem("token")) {
		await fetchCurrentUser();
	}
});
</script>

<template>
	<div>
		<RouterView />
	</div>
</template>
