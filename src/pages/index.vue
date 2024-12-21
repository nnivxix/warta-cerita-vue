<script setup lang="ts">
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
</script>
<template>
	<div class="flex items-center justify-center h-screen">
		<div class="max-w-4xl flex flex-col gap-4 w-full mx-auto">
			<h1 class="text-3xl">Hello Gaes, Welcome</h1>
			<p>Let's share your <em> cerita </em> with us.</p>
			<div>
				<RouterLink
					to="/login"
					:class="cn(buttonVariants({ variant: 'default', size: 'lg' }))"
				>
					Let's get started
				</RouterLink>
			</div>
		</div>
	</div>
</template>
