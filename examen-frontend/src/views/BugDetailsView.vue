<template>
  <div class="form-layout">
  <BaseCard>
      <h3>Välj system</h3>
      <NMessageProvider>
        <div class="add-system-button-container">
          <BaseDropdown
            :options="systemOptions"
            :selected-label="selectedLabel"
            @select="onSystemSelect"
          />
        </div>
      </NMessageProvider>
    </BaseCard>
    <BaseCard class="card-with-icon">
      <h3>Buggens titel</h3>
      <n-input
        v-model:value="formDataStorage.title"
        type="text"
        placeholder="Titel"
        show-count
        clearable
        maxlength="50"
      />
    </BaseCard>
    <BaseCard>
      <h3>Beskrivning</h3>
      <BaseTextarea
        v-model:value="formDataStorage.description"
        placeholder-text="Beskriv buggen"
      />
    </BaseCard>
    <BaseCard>
      <h3>Prioritet</h3>
      <div class="test">
        <BaseRadioInput
          v-model:modelValue="formDataStorage.priority"
          :options="priorityOptions"
        />
      </div>
    </BaseCard>
    <BaseCard>
      <h3>Rapporterad av</h3>
      <div class="reported-by">
        <div class="user-info">
          <img
            :src="userDataStorage.userImage"
            alt="User Image"
            class="user-image"
          />
          <p>{{ userDataStorage.userName }}</p>
        </div>
        <NPopconfirm
          positive-text="Logga ut"
          negative-text="Avbryt"
          @positive-click="onChangeUserClick"
        >
          <template #trigger>
            <NButton type="primary" class="style-btn style-change-user-btn">
              Byt
            </NButton>
          </template>
          För att byta användare måste du logga ut.
        </NPopconfirm>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NMessageProvider, NButton, NPopconfirm, NInput } from "naive-ui";
import BaseDropdown from "@/components/UI/BaseDropdown.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import { useRouter } from "vue-router";
import { RouteNames } from "@/router/routeNames";
import { systemOptions } from "@/utils/commonOptions";
import BaseTextarea from "@/components/UI/BaseTextarea.vue";
import { priorityOptions } from "@/utils/commonOptions";
import BaseRadioInput from "@/components/UI/BaseRadioInput.vue";
import {
  useUserDataStorage,
  useFormDataStorage,
} from "@/composables/localStorage";

const { formDataStorage } = useFormDataStorage();
const { userDataStorage } = useUserDataStorage();

const router = useRouter();
const selectedLabel = ref("Välj ett system");

onMounted(() => {
  const selectedOption = systemOptions.find(
    (option: any) => option.key === formDataStorage.value.system.key
  );
  selectedLabel.value = selectedOption
    ? selectedOption.label
    : "Välj ett system";
});

function onSystemSelect(key?: string) {
  const selectedSystem = systemOptions.find(
    (option: any) => option.key === key
  );
  if (selectedSystem && key !== undefined) {
    selectedLabel.value = selectedSystem.label;
    formDataStorage.value.system = {
      label: selectedSystem.label,
      key: selectedSystem.key,
    };
  } else {
    formDataStorage.value.system = { label: "", key: "" };
  }
}

function onChangeUserClick() {
  router.push({ name: RouteNames.Login });
}
</script>

<style lang="scss" scoped>
.reported-by {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-system-button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.add-system-button {
  margin-top: 10px;
}
.user-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.form-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 20px;
}
.space-on-first {
  padding-top: 20px;
}
.style-btn {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: all 0.5s;
}

.style-btn:hover {
  box-shadow: rgb(57, 72, 158) 0px 20px 30px -10px;
}
@media (min-width: 768px) {
  .form-layout {
    gap: 0;
  }
}
</style>
