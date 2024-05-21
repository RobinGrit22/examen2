<template>
  <TheHeader :title="headerTitle" class="header-style" />
  <div class="outer">
    <div class="inner">
      <n-form ref="formRef" class="form-layout" @submit.prevent="onSubmit">
        <BugDetailsView v-if="isBugDetailsPage" />
        <OverViewAndSubmitView v-else />

        <div class="buttons-container">
          <n-button
            type="primary"
            size="large"
            @click="goBack"
            :disabled="isBugDetailsPage"
            class="left-button"
          >
            Tillbaka
          </n-button>
          <n-button
            type="primary"
            size="large"
            class="right-button"
            @click="goNext"
          >
            {{ isBugDetailsPage ? "Nästa" : "Skicka" }}
          </n-button>
        </div>

        <n-modal v-model:show="showConfirmModal" title="Confirm Submission">
          <n-card
            class="n-modal-style"
            title="Är du säker?"
            :bordered="false"
            size="huge"
          >
            <div>Vill du skicka in buggrapporten?</div>
            <template #footer>
              <div class="modal-buttons">
                <n-button @click="showConfirmModal = false">Avbryt</n-button>
                <n-button type="primary" @click="onSubmit">Skicka</n-button>
              </div>
            </template>
          </n-card>
        </n-modal>

        <n-modal v-model:show="showErrorModal" title="Fel">
          <n-card
            class="n-modal-style"
            title="Fel"
            :bordered="false"
            size="huge"
          >
            <div>{{ errorMessage }}</div>
            <template #footer>
              <div class="modal-buttons">
                <n-button @click="closeErrorModal">Stäng</n-button>
              </div>
            </template>
          </n-card>
        </n-modal>

        <n-modal v-model:show="showConfirmedModal" title="Submission Confirmed">
          <n-card class="n-modal-style" :bordered="false" size="huge">
            <template #footer>
              <div class="confirmed-modal-btn-container">
                <h2>Rapporten skickad!</h2>
                <Icon icon="noto:partying-face" class="confetti-icon" />
                <n-button
                  type="primary"
                  class="confirmed-modal-btn"
                  @click="handleConfirmed"
                  >Okej</n-button
                >
              </div>
            </template>
          </n-card>
        </n-modal>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BugDetailsView from "@/views/BugDetailsView.vue";
import OverViewAndSubmitView from "@/views/OverViewAndSubmitView.vue";
import { RouteNames } from "@/router/routeNames";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { NButton, NForm, NModal, NCard } from "naive-ui";
import TheHeader from "@/components/layout/TheHeader.vue";
import { LocalStorageKeys } from "@/constants/localStorageKeys";
import { useFormDataStorage } from "@/composables/localStorage";
import axios from "axios";

const showConfirmModal = ref(false);
const showConfirmedModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");

const { formDataStorage } = useFormDataStorage();

const route = useRoute();
const router = useRouter();

const isBugDetailsPage = computed(
  () => route.name === RouteNames.BugDetailsView
);

const headerTitle = computed(() => {
  return isBugDetailsPage.value ? "Bugg Detaljer" : "Översikt och Skicka";
});

function goBack() {
  router.push({ name: RouteNames.BugDetailsView });
}

function goNext() {
  if (isBugDetailsPage.value) {
    router.push({ name: RouteNames.OverViewAndSubmit });
  } else {
    showConfirmModal.value = true;
  }
}

async function onSubmit() {
  const formData = {
    title: formDataStorage.value.title,
    priority: parseInt(formDataStorage.value.priority, 10),
    description: formDataStorage.value.description,
    project_id: formDataStorage.value.system.key,
  };

  try {
    const response = await axios.post(
      `http://localhost:3000/project/${formData.project_id}/issue`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    showConfirmModal.value = false;
    showConfirmedModal.value = true;
    console.log("Issue created:", response.data);
  } catch (error) {
    console.error("Error creating issue:", error);
  }
}

function closeErrorModal() {
  showErrorModal.value = false;
}

function handleConfirmed() {
  showConfirmedModal.value = false;
  localStorage.removeItem(LocalStorageKeys.FORM_DATA);
  router.push({ name: RouteNames.BugDetailsView });
}
</script>

<style lang="scss" scoped>
.form-layout {
  background-color: rgb(235, 235, 245);
  width: 100%;
}
.outer {
  min-height: calc(100vh - 50px);
  background-color: rgb(235, 235, 245);
}
.header-style {
  position: sticky;
  top: 0;
  background-color: rgb(244, 244, 249);
  z-index: 1000;
}
.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  margin-top: 35px;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.left-button,
.right-button {
  &:hover:not(:disabled) {
    box-shadow: rgb(57, 72, 158) 0px 20px 30px -10px;
  }

  transition: all 0.5s;
  margin-bottom: 15px;
  margin-top: 10px;
  width: 40%;
  font-size: 1.5rem;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.n-modal-style {
  width: 600px;
}
.confirmed-modal-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  height: 100%;
}
.confirmed-modal-btn {
  width: 100px;
}
@media (min-width: 768px) {
  .buttons-container {
    max-width: 768px;
  }
  .outer {
    background-color: rgb(208, 208, 218);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner {
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .form-layout {
    min-height: auto;
    border-radius: 10px;
  }
}
</style>
