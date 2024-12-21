<script setup lang="ts">
import $fetch from "@/utils/$fetch";
import { useRouter } from "vue-router";

interface Story {
	slug: string;
	title: string;
	content: string;
	published_at: string;
	user: {
		name: string;
		email: string;
	};
}

interface PaginatedResponse<T> {
	data: T[];
	links: Links;
	meta: Meta;
}
export interface Links {
	first: string;
	last: string;
	prev: any;
	next: string;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface Link {
	url?: string;
	label: string;
	active: boolean;
}

const stories = await $fetch<PaginatedResponse<Story>>("/stories");

definePage({
	async beforeEnter() {
		if (!localStorage.getItem("token")) {
			await useRouter().push("/login");
		}
	},
});
</script>
<template>
	<div>
		<div class="flex flex-col">
			<div class="max-w-4xl flex flex-col px-8 gap-4 w-full mx-auto">
				<div>
					<h1 class="text-left text-2xl font-bold">Warta Cerita Warga</h1>
				</div>
				<template v-if="stories.data.length">
					<div
						v-for="story in stories.data"
						:key="story.slug"
						class="flex flex-col gap-1"
					>
						<h2 class="text-lg font-semibold">{{ story.title }}</h2>
						<p class="text-muted-foreground">{{ story.content }}</p>
						<p>Published by: {{ story.user.name }}</p>
						<p class="text-muted-foreground">
							Published at: {{ story.published_at }}
						</p>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Add your styles here */
</style>
