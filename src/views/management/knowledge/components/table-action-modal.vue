<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="名称">
          <n-input v-model:value="formModel.knowledgeName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="类型">
          <n-select v-model:value="formModel.knowledgeType" size="medium" :options="ModelOptions" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="apiKey">
          <n-input v-model:value="formModel.apiKey" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="index">
          <n-input v-model:value="formModel.indexName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="工作空间">
          <n-select
            v-model:value="formModel.namespaceName"
            class="mr-10px"
            filterable
            tag
            placeholder="your NameSpase"
            clearable
            :style="{ width: '20%' }"
            :options="options"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="代理地址">
          <n-input v-model:value="formModel.baseUrl" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="是否启用">
          <n-switch v-model:value="formModel.isCommon" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { fetchGetRoleSelect, fetchAddKnowledge, fetchUpdateKnowledge } from '@/service';
import { formRules, createRequiredFormRule } from '@/utils';
const ModelOptions: { label: string; value: number; disabled: boolean }[] = [
  { label: 'pgvector', value: 7, disabled: false },
  { label: 'pinecone', value: 6, disabled: false }
];
let options: { value: string | number; label: string }[] = [];
export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格行数据 */
  editData?: KnowledgeManagement.Knowledge | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'updateDataTable'): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    if (props.visible) {
      getRoleData();
    }
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加知识库',
    edit: '编辑知识库'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  KnowledgeManagement.Knowledge,
  'knowledgeId' | 'isCommon' | 'knowledgeType' | 'apiKey' | 'indexName' | 'namespaceName' | 'baseUrl' | 'knowledgeName'
>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: FormRules = {
  userName: createRequiredFormRule('请输入用户名'),
  gender: createRequiredFormRule('请选择性别'),
  userPhoneNum: formRules.phone,
  userEmail: formRules.email
};

function createDefaultFormModel(): FormModel {
  return {
    knowledgeId: 0,
    knowledgeName: '',
    isCommon: true,
    knowledgeType: 7,
    apiKey: '',
    indexName: '',
    namespaceName: '',
    baseUrl: ''
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  const handlers: Record<ModalType, () => void> = {
    add: async () => {
      const { data } = await fetchAddKnowledge(
        formModel.knowledgeName,
        formModel.apiKey,
        formModel.indexName,
        formModel.namespaceName,
        formModel.baseUrl,
        formModel.isCommon,
        formModel.knowledgeType
      );
      if (data) {
        window.$message?.success('新增成功!');
        closeModal();
        emit('updateDataTable');
      }
    },
    edit: async () => {
      if (props.editData) {
        const { data } = await fetchUpdateKnowledge(
          formModel.knowledgeId,
          formModel.knowledgeName,
          formModel.apiKey,
          formModel.indexName,
          formModel.namespaceName,
          formModel.baseUrl,
          formModel.isCommon,
          formModel.knowledgeType
        );
        if (data) {
          window.$message?.success('更新成功!');
          closeModal();
          emit('updateDataTable');
        }
      }
    }
  };

  handlers[props.type]();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
async function getRoleData() {
  const { data } = await fetchGetRoleSelect();
  if (data) {
    setTimeout(() => {
      options = data.map(item => {
        return {
          value: item.key,
          label: item.value
        };
      });
    }, 1000);
  }
}
getRoleData();
</script>

<style scoped></style>
