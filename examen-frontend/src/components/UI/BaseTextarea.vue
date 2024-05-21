<template>
  <n-input
    v-model:value="value"
    :autosize="{
      minRows: 3,
    }"
    type="textarea"
    :placeholder="placeholderText"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType } from "vue";
import { NInput } from "naive-ui";

const props = defineProps({
  placeholderText: {
    type: String,
    default: "",
  },
  initialValue: {
    type: String as PropType<string>,
    default: "",
  },
});

const value = ref<string>(props.initialValue);

const emit = defineEmits<{
  (event: "updateText", newValue: string): void;
}>();

watch(value, (newValue) => {
  emit("updateText", newValue);
});
</script>
