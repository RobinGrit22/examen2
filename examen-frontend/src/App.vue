<template>
  <Login v-if="isLoginPage" />
  <TheForm v-else-if="isFormPage" />
</template>

<script setup lang="ts">
import { RouteNames } from "@/router/routeNames";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Login from "@/views/LoginView.vue";
import TheForm from "./components/form/TheForm.vue";

const route = useRoute();

const isLoginPage = computed(() => route.name === RouteNames.Login);
const isFormPage = computed(() =>
  [RouteNames.BugDetailsView, RouteNames.OverViewAndSubmit].includes(
    String(route.name)
  )
);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
