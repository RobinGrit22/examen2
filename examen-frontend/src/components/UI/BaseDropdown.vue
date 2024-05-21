<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button type="primary" class="style-btn">{{ selectedLabel }}</n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { NDropdown, NButton } from "naive-ui";
type HandleSelectFunction = (selectedKey: string) => void;

defineProps({
  options: {
    type: Array as () => Array<any>,
    default: () => [],
  },
  selectedLabel: {
    type: String,
    default: "",
  },
  handleSelect: {
    type: Function as unknown as () => HandleSelectFunction,
    default: () => {},
  },
});
</script>
<style lang="scss" scoped>
.style-btn {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.style-btn:hover {
  box-shadow: rgb(57, 72, 158) 0px 20px 30px -10px;
}
</style>
