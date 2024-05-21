<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useThemeVars } from "naive-ui";

const themeVars = useThemeVars();
</script>
<style lang="scss" scoped>
.base-card {
  padding: 20px;
  font-family: v-bind("themeVars.fontFamily");
  font-size: v-bind("themeVars.fontSizeMedium");
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
}
@media (min-width: 768px) {
  .base-card {
    max-width: 800px;
    font-size: 1.2rem;
    margin-top: 30px;
  }
}
</style>
