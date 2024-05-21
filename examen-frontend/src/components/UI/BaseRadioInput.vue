<template>
  <n-radio-group
    size="large"
    class="n-group"
    :value="modelValue"
    @change="emits('update:modelValue', $event.target.value)"
  >
    <n-radio
      v-for="option in options"
      :key="option.value"
      class="n-radio"
      :value="option.value"
    >
      <template v-if="option.icon && isImageURL(option.icon)">
        <img :src="option.icon" class="radio-icon" />
      </template>
      <template v-else-if="option.icon">
        <Icon
          :icon="option.icon"
          :style="{ color: option.color }"
          class="radio-icon"
        />
      </template>
      <span class="label">{{ option.label }}</span>
    </n-radio>
  </n-radio-group>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { Icon } from "@iconify/vue";
import { NRadio, NRadioGroup } from "naive-ui";

defineProps({
  options: {
    type: Array as PropType<
      Array<{ label: string; value: string; icon?: string; color?: string }>
    >,
    default: () => [],
  },
  modelValue: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
});
const isImageURL = (url: any) => {
  return /\.(jpeg|jpg|gif|png)$/.test(url) || /^data:image\/png/.test(url);
};
const emits = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();
</script>
<style lang="scss" scoped>
.radio-icon {
  width: 1.9em;
  height: 1.9em;
  color: rgb(57, 72, 158);
}

.n-group {
  display: flex;
  justify-content: space-between;

  @media (max-width: 400px) {
    flex-direction: column;
  }
}
.n-radio {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

:deep(.n-radio__label) {
  display: flex;
  align-items: center;
  gap: 0.45em;

  @media (max-width: 411px) {
    gap: 20px;
  }
}
</style>
