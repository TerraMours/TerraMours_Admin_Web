<template>
	<n-layout-sider
		collapse-mode="width"
		:collapsed-width="0"
		:width="240"
		show-trigger="bar"
		content-style="padding: 24px;"
		bordered>
		<div class="flex flex-col w-full h-full">
		<main class="flex flex-col flex-1 min-h-0">
			<n-button  dashed block @click="addChatConversation">
			新建对话
			</n-button>
			<div class="flex-1 min-h-0 pb-4 overflow-hidden">
					<div v-if="!conversationData.length" class="flex flex-col items-center mt-4 text-center text-neutral-300">
						<SvgIcon icon="ri:inbox-line" class="mb-2 text-3xl" />
						<span>无数据</span>
					</div>
					<div v-else v-for="(item, index) of conversationData" :key="index">
						<n-input v-model:value='item.conversationName'></n-input>
					</div>
			</div>
			</main>
		</div>
	</n-layout-sider>
</template>
<script setup lang="tsx">
import { fetchAddChatConversation, fetchConversationsList } from '@/service';
import { onMounted, ref } from 'vue';
const conversationData=ref<ApiGptManagement.Conversations[]>([]);
async function getConversationsList() {
	const { data } = await fetchConversationsList(1, 100, null);
	if (data) {
		conversationData.value = data.items;
	}
}
async function addChatConversation() {
	const { data } = await fetchAddChatConversation('NEW Chat');
	if (data) {
		conversationData.value= [data, ...conversationData.value]
	}
}
onMounted(() => {
	getConversationsList();
});
</script>
