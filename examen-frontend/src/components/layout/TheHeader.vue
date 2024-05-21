<template>
  <div class="header-container">
    <header>
      <h2>{{ title }}</h2>
      <n-button round type="info" class="menu-button" @click="toggleMenu()">
        {{ isMenuVisible ? "Tillbaka" : "Meny" }}
        <Icon icon="mingcute:menu-fill" color="white" class="icon-spacing" />
      </n-button>
      <div class="header-menu">
        <a class="a-fontsize" @click.prevent="onLogOutUserClick">Logga ut</a>
        <!-- <a class="a-fontsize" @click.prevent="onHandleTasksClick"
          >Hantera ärenden</a
        > -->
        <a class="a-fontsize" @click.prevent="onReportBugClick"
          >Rapportera bugg</a
        >
      </div>
      <transition name="slide">
        <div v-if="isMenuVisible" class="menu">
          <div class="a-container">
            <!-- <a class="a-fontsize" @click.prevent="onHandleTasksClick"
              >Hantera ärenden</a
            > -->
            <a class="a-fontsize" @click.prevent="onReportBugClick"
              >Rapportera bugg</a
            >
            <a
              class="a-fontsize logout-position"
              @click.prevent="onLogOutUserClick"
            >
              <Icon icon="solar:logout-broken" class="logout-icon" />
              Logga ut
            </a>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useThemeVars } from "naive-ui";
import { useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { RouteNames } from "@/router/routeNames";
import { useUserDataStorage } from "@/composables/localStorage";
import { NButton } from "naive-ui";

const { userDataStorage } = useUserDataStorage();

const router = useRouter();

const themeVars = useThemeVars();
defineProps<{ title?: string }>();

const [isMenuVisible, toggleMenu] = useToggle(false);

function onLogOutUserClick() {
  userDataStorage.value = { userName: "", userImage: "", tokenID: "" };

  router.push({ name: RouteNames.Login });
}
function onReportBugClick() {
  router.push({ name: RouteNames.BugDetailsView });
}
// function onHandleTasksClick() {
//   router.push({ name: RouteNames.HanteraArenden });
// }
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  background-color: rgb(244, 244, 249);
  box-shadow: 0 8px 6px -6px rgba(12, 38, 238, 0.1);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(244, 244, 249);
}

header h2 {
  font-size: 1.4rem;
  font-weight: 1000;
  color: rgb(57, 72, 158);
  text-transform: lowercase;
  font-family: v-bind("themeVars.fontFamily");
}

.icon-spacing {
  margin-left: 8px;
}
.logout-position {
  margin-top: 50px;
}
.logout-icon {
  color: rgb(32, 128, 240);
  vertical-align: middle;
  width: 1.8rem;
  height: 1.8rem;
}
.menu {
  top: 70px;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 1001;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
.a-container {
  display: flex;
  flex-direction: column;
  color: #333;
  text-decoration: none;
}
.a-fontsize {
  cursor: pointer;
  font-size: 1.3rem;
  color: #333;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #0056b3;
    text-decoration: underline;
  }
}
.menu-button {
  display: block;
}

.header-menu {
  display: none;
}

@media (min-width: 768px) {
  .menu-button {
    display: none;
  }

  .header-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .a-fontsize {
    margin: 0 10px;

    &:hover,
    &:focus {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
@media (min-width: 1100px) {
  header h2 {
    font-size: 2rem;
    margin: 30px;
  }
  .a-fontsize {
    margin: 30px;

    &:hover,
    &:focus {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
