<template>
  <div class="login-container">
    <div class="img"></div>
    <div>
      <h1>Logga in med Gritacademy</h1>
    </div>
    <GoogleLogin :callback="callback" class="loginBtnStyle" />
  </div>
  <div v-if="showErrorModal" class="error-modal">
    <div class="error-content">
      <h2>Endast e-postadresser som tillhör gritacademy.se är tillåtna.</h2>
      <button @click="showErrorModal = false"><h3>Stäng</h3></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouteNames } from "@/router/routeNames";
import { useLocalStorage } from "@vueuse/core";
import type { CallbackTypes } from "vue3-google-login";
import { decodeCredential } from "vue3-google-login";
import { LocalStorageKeys } from "@/constants/localStorageKeys";
import { useUserDataStorage } from "@/composables/localStorage";

const { userDataStorage } = useUserDataStorage();

const router = useRouter();
const showErrorModal = ref(false);
const currentCard = useLocalStorage(LocalStorageKeys.CURRENT_CARD, 0);

const callback: CallbackTypes.CredentialCallback = (response) => {
  const tokenID = response.credential;
  const userData = decodeCredential(tokenID) as any;

  if (userData.hd === "gritacademy.se") {
    userDataStorage.value.userName = userData.name;
    userDataStorage.value.userImage = userData.picture;
    currentCard.value++;
    router.push({ name: RouteNames.BugDetailsView });
  } else {
    showErrorModal.value = true;
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.1);

  width: 100%;
  height: 100vh;
}

.img {
  height: 70vh;
  width: 100%;
  background-image: url("@/assets/grit.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.loginBtnStyle {
  font-size: 3rem;
  padding: 10px;
  margin-bottom: 35px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.error-content {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
