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
						<a
							class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
							:class="isActive(item.conversationId) && ['border-[#4b9e5f]', 'bg-neutral-100', 'text-[#4b9e5f]', 'dark:bg-[#24272e]', 'dark:border-[#4b9e5f]', 'pr-14']"
							@click="handleSelect(item)"
						>
            <span>
              <SvgIcon icon="ri:message-3-line" />
            </span>
							<div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
								<n-input
									v-if="item.isEdit"
									v-model:value="item.conversationName" size="tiny"
								/>
								<span v-else>{{ item.conversationName }}</span>
							</div>
							<div v-if="isActive(item.conversationId)" class="absolute z-10 flex visible right-1">
								<template v-if="item.isEdit">
									<button class="p-1" @click="handleEdit(item, false, $event)">
										<SvgIcon icon="ri:save-line" />
									</button>
								</template>
								<template v-else>
									<button class="p-1">
										<SvgIcon icon="ri:edit-line" @click="handleEdit(item, true, $event)" />
									</button>
									<NPopconfirm placement="bottom" @positive-click="handleDeleteDebounce(index, $event)">
										<template #trigger>
											<button class="p-1">
												<SvgIcon icon="ri:delete-bin-line" />
											</button>
										</template>
										确定删除此记录?
									</NPopconfirm>
								</template>
							</div>
						</a>
					</div>
			</div>
			</main>
		</div>
	</n-layout-sider>
</template>
<script setup lang="tsx">
import {
	fetchAddChatConversation,
	fetchChangeChatConversation,
	fetchConversationsList,
	fetchDeleteChatConversation
} from '@/service';
import { onMounted, ref } from 'vue';
import { useChatState } from '@/store';
import { debounce } from 'lodash-es';
import { useBasicLayout } from '@/composables';
const conversationData=ref<ApiGptManagement.Conversations[]>([]);
const chatStore = useChatState();
const { isMobile } = useBasicLayout()
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

async function handleSelect({ conversationId }: ApiGptManagement.Conversations) {
	if (isActive(conversationId))
		return
	await chatStore.setActive(conversationId)
	if (isMobile)
		chatStore.setSiderCollapsed(true)
}
function isActive(uuid: number) {
	return chatStore.active === uuid
}
async function handleEdit(conversation: ApiGptManagement.Conversations, isEdit: boolean, event?: MouseEvent) {
	debugger
	console.log('111');
	event?.stopPropagation()
	conversation.isEdit = isEdit
	if (isEdit === false)
		await fetchChangeChatConversation(conversation.conversationId, conversation.conversationName)
}
async function handleEnter(conversation: ApiGptManagement.Conversations, isEdit: boolean, event: KeyboardEvent) {
	event?.stopPropagation()
	if (event.key === 'Enter') {
		conversation.isEdit = isEdit
		if (!isEdit)
			await fetchChangeChatConversation(conversation.conversationId, conversation.conversationName)
	}
}
async function handleDelete(index: number, event?: MouseEvent | TouchEvent) {
	event?.stopPropagation()
	const delItem = conversationData.value[index]

	const data = await fetchDeleteChatConversation(delItem.conversationId)
	if (data === true) {
		conversationData.value.splice(index, 1)
		await chatStore.setActive(conversationData.value.length > 0 ? conversationData.value[index - 1].conversationId : 0);
	}
	if (isMobile)
		chatStore.setSiderCollapsed(true)
}

const handleDeleteDebounce = debounce(handleDelete, 600)

onMounted(() => {
	getConversationsList();
});
</script>
