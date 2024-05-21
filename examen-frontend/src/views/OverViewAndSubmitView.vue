<template>
  <div class="container">
    <BaseCard class="info-item space-on-first">
      <div class="top-content">
        <div class="content">
          <h3>Rapporterad av:</h3>
          <p>{{ userDataStorage.userName }}</p>
        </div>
        <n-button
          type="primary"
          class="style-btn"
          size="small"
          @click="editStates.userName.toggle()"
        >
          {{ saveOrEdit(editStates.userName.value.value) }}
        </n-button>
      </div>
      <Transition name="fade">
        <div v-if="editStates.userName.value.value">
          <n-button
            type="primary"
            class="style-btn"
            size="small"
            @click="onChangeUserClick"
          >
            Logga ut
          </n-button>
        </div>
      </Transition>
    </BaseCard>

    <BaseCard class="info-item">
      <div class="top-content">
        <div class="content">
          <h3>System:</h3>
          <p>{{ formDataStorage.system.label }}</p>
        </div>
        <n-button
          type="primary"
          class="style-btn"
          size="small"
          @click="editStates.system.toggle()"
        >
          {{ saveOrEdit(editStates.system.value.value) }}
        </n-button>
      </div>
      <Transition name="fade">
        <div v-if="editStates.system.value.value">
          <BaseDropdown
            :options="systemOptions"
            :selected-label="selectedLabel"
            @select="onSystemSelect"
          />
        </div>
      </Transition>
    </BaseCard>

    <BaseCard class="info-item">
      <div class="top-content">
        <div class="content">
          <h3>Titel:</h3>
          <p>{{ formDataStorage.title }}</p>
        </div>
        <n-button
          type="primary"
          class="style-btn"
          size="small"
          @click="editStates.title.toggle()"
        >
          {{ saveOrEdit(editStates.title.value.value) }}
        </n-button>
      </div>
      <Transition name="fade">
        <n-input
          v-if="editStates.title.value.value"
          v-model:value="formDataStorage.title"
          type="text"
          placeholder="Ny buggtitel"
          show-count
          clearable
          maxlength="50"
        />
      </Transition>
    </BaseCard>

    <BaseCard class="info-item">
      <div class="top-content">
        <div class="content">
          <h3>Beskrivning:</h3>
          <p>{{ formDataStorage.description }}</p>
        </div>
        <n-button
          type="primary"
          class="style-btn"
          size="small"
          @click="editStates.description.toggle()"
        >
          {{ saveOrEdit(editStates.description.value.value) }}
        </n-button>
      </div>
      <Transition name="fade">
        <BaseTextarea
          v-if="editStates.description.value.value"
          v-model:value="formDataStorage.description"
          placeholder-text="Beskriv buggen"
        />
      </Transition>
    </BaseCard>

    <BaseCard class="info-item">
      <div class="top-content">
        <div class="content">
          <h3>Prioritet:</h3>
          <p>{{ formDataStorage.priority }}</p>
        </div>
        <n-button
          type="primary"
          class="style-btn"
          size="small"
          @click="editStates.priority.toggle()"
        >
          {{ saveOrEdit(editStates.priority.value.value) }}
        </n-button>
      </div>
      <Transition name="fade">
        <div v-if="editStates.priority.value.value" class="add-widht">
          <BaseRadioInput
            v-model:modelValue="formDataStorage.priority"
            :options="priorityOptions"
          />
        </div>
      </Transition>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import BaseCard from "@/components/UI/BaseCard.vue";
import { useToggle } from "@vueuse/core";
import BaseDropdown from "@/components/UI/BaseDropdown.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { RouteNames } from "@/router/routeNames";
import { systemOptions, priorityOptions } from "@/utils/commonOptions";
import { NButton, NInput } from "naive-ui";
import BaseTextarea from "@/components/UI/BaseTextarea.vue";
import BaseRadioInput from "@/components/UI/BaseRadioInput.vue";
import {
  useFormDataStorage,
  useUserDataStorage,
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

function createToggle() {
  const [value, toggle] = useToggle(false);
  return { value, toggle };
}

const editStates = {
  userName: createToggle(),
  system: createToggle(),
  title: createToggle(),
  description: createToggle(),
  priority: createToggle(),
};

function saveOrEdit(condition: boolean) {
  return condition ? "Spara" : "Ändra";
}

function onSystemSelect(key?: string) {
  const selectedSystem = systemOptions.find((option) => option.key === key);
  if (selectedSystem && key !== undefined) {
    selectedLabel.value = selectedSystem.label;
    formDataStorage.value.system = {
      label: selectedSystem.label,
      key: key,
    };
  }
}

function onChangeUserClick() {
  router.push({ name: RouteNames.Login });
}
</script>

<style lang="scss" scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .content {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  p {
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  n-button {
    background-color: rgb(57, 72, 158);
    color: white;
  }
}

.container {
  padding-top: 20px;
}
.add-margintop-input {
  margin-top: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.add-widht {
  width: 100%;
}
.add-gap-radio {
  width: 40%;
}
.style-btn {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: all 0.5s;
}

.style-btn:hover {
  box-shadow: rgb(57, 72, 158) 0px 20px 30px -10px;
}
h3 {
  margin-bottom: 0;
}
</style>
