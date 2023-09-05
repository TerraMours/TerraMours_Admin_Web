<template>
  <div class="h-full overflow-y-auto">
    <n-card title="聊天记录管理" :bordered="false" class="rounded-16px shadow-sm ">
      <n-space class="pb-12px" justify="space-between">
        <n-space align="center" :size="18">
          <n-button size="small" type="primary" @click="getTableData">
            <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
            刷新表格
          </n-button>
        </n-space>
      </n-space>
      <n-data-table remote :columns="columns" :data="tableData" :loading="loading" :pagination="pagination" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { DataTableColumns, PaginationProps } from 'naive-ui';
import { fetchChatList } from '@/service';
import { useLoading } from '@/hooks';

const { loading, startLoading, endLoading } = useLoading(false);
const queryString = ref(null);
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
  },
  prefix ({ itemCount }) {
        return `Total is ${itemCount}.`
      }
});

async function getTableData() {
  startLoading();
  const { data } = await fetchChatList(getQueryString(), pagination.page, pagination.pageSize);
  if (data) {
    setTimeout(() => {
      setTableData(data.items);
      pagination.itemCount = data.total;
      pagination.pageCount = data.page  =Math.ceil(data.total/data.pageSize);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<GptManagement.Chat>> = ref([
  {
      type: 'expand',
			title: '展开',
			width: 1,
      renderExpand: (rowData) => {
        return `${rowData.message}`
      }
    },
  {
    key: 'index',
    title: '序号',
    align: 'center',
		width: 5,
  },
  {
    key: 'userId',
    title: '发起用户',
    align: 'center',
		width: 5,
  },
  {
    key: 'role',
    title: '角色',
    align: 'center',
		width: 5,
  },
  {
    key: 'message',
    title: '消息',
    align: 'center',
    resizable: true,
		width: 30,
    ellipsis: {
      tooltip: true
    }
  },
  {
    key: 'createDate',
    title: '创建时间',
    align: 'center',
		width: 20,
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
