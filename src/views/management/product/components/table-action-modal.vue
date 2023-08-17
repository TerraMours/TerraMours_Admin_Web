<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="商品名称" path="roleName">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="商品分类" path="roleName">
          <n-select v-model:value="formModel.categoryId" :options="options" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="商品价格" path="roleName">
          <n-input-number v-model:value="formModel.price">
            <template #prefix>￥</template>
          </n-input-number>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="商品折扣" path="roleName">
          <n-input-number v-model:value="formModel.discount" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="商品库存" path="roleName">
          <n-input-number v-model:value="formModel.stock" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="商品描述" path="roleName">
          <n-input v-model:value="formModel.description" />
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
import type { FormInst } from 'naive-ui';
import { AddProduct, UpdateProduct, fetchAllCategoryList } from '@/service';

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
  editData?: PayManagement.Product | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
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
    add: '添加商品',
    edit: '编辑商品'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  PayManagement.Product,
  'id' | 'name' | 'description' | 'price' | 'discount' | 'categoryId' | 'stock'
>;

const formModel = reactive<FormModel>(createDefaultFormModel());

function createDefaultFormModel(): FormModel {
  return {
    id: 0,
    name: '',
    description: '',
    price: 0,
    discount: 0,
    categoryId: 0,
    stock: null
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
      const { data } = await AddProduct(
        formModel.name,
        formModel.description,
        formModel.price,
        formModel.discount,
        formModel.categoryId,
        formModel.stock
      );
      if (data) {
        window.$message?.success('新增成功!');

        closeModal();
      }
    },
    edit: async () => {
      if (props.editData) {
        const { data } = await UpdateProduct(
          formModel.id,
          formModel.name,
          formModel.description,
          formModel.price,
          formModel.discount,
          formModel.categoryId,
          formModel.stock
        );
        if (data) {
          window.$message?.success('更新成功!');
          closeModal();
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
  const { data } = await fetchAllCategoryList();
  if (data) {
    setTimeout(() => {
      options = data.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }, 1000);
  }
}
getRoleData();
</script>

<style scoped></style>
