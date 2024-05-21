import { ref, onMounted } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { LocalStorageKeys } from "@/constants/localStorageKeys";

export function useUserDataStorage() {
  const defaultData = ref({
    userName: "",
    userImage: "",
    tokenID: "",
  });

  const userDataStorage = useLocalStorage(
    LocalStorageKeys.USER_DATA,
    defaultData
  );
  return {
    userDataStorage,
  };
}

export function useFormDataStorage() {
  const defaultData = ref({
    title: "",
    priority: "",
    system: {
      label: "",
      key: "",
    },
    description: "",
  });

  const formDataStorage = useLocalStorage(
    LocalStorageKeys.FORM_DATA,
    defaultData
  );

  return {
    formDataStorage,
  };
}
