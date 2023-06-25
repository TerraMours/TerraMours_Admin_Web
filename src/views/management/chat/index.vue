<template>
  <div class="h-full overflow-hidden">
    <n-card title="聊天记录管理" :bordered="false" class="rounded-16px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space align="center" :size="18">
          <n-button size="small" type="primary" @click="getTableData">
            <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
            刷新表格
          </n-button>
        </n-space>
      </n-space>
      <n-data-table :columns="columns" :data="tableData" :loading="loading" :pagination="pagination" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
import { fetchChatList } from '@/service';
import { useLoading } from '@/hooks';

const { loading, startLoading, endLoading } = useLoading(false);
const queryString = ref('');
const tableData = ref<GptManagement.Chat[]>([]);
function setTableData(data: GptManagement.Chat[]) {
  tableData.value = data;
}
const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
    getTableData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    getTableData();
  }
});

async function getTableData() {
  startLoading();
  const { data } = await fetchChatList(getQueryString(), pagination.page, pagination.pageSize);
  if (data) {
    setTimeout(() => {
      setTableData(data.items);
      pagination.itemCount = data.total;
      pagination.pageCount = data.page;
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<GptManagement.Chat>> = ref([
  {
    key: 'index',
    title: '序号',
    align: 'center'
  },
  {
    key: 'role',
    title: '角色',
    align: 'center'
  },
  {
    key: 'message',
    title: '消息',
    align: 'center',
    resizable: true,
    minWidth: 500,
    maxWidth: 1000,
    ellipsis: {
      tooltip: true
    }
  },
  {
    key: 'userId',
    title: '发起用户',
    align: 'center'
  },
  {
    key: 'createDate',
    title: '创建时间',
    align: 'center'
  }
]) as Ref<DataTableColumns<GptManagement.Chat>>;

function getQueryString() {
  return queryString.value;
}

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
