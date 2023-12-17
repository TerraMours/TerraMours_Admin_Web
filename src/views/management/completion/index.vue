<template>
	<div class="flex flex-col w-full h-full">
<n-layout class="z-40 transition h-full" has-sider>
	<List/>
	<n-layout-content>
		<Chat/>
	</n-layout-content>
</n-layout>
	</div>
</template>
<script setup lang="tsx">
import { List, Chat } from './components';
</script>
