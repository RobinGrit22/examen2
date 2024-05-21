import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { RouteNames } from "@/router/routeNames";
import { LocalStorageKeys } from "@/constants/localStorageKeys";
import BugDetailsView from "@/views/BugDetailsView.vue";
import OverViewAndSubmitView from "@/views/OverViewAndSubmitView.vue";

function isLoggedIn() {
  const userDataString = localStorage.getItem(LocalStorageKeys.USER_DATA);
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    return userData.userName !== "";
  }
  return false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: RouteNames.BugDetailsView },
    },
    {
      path: "/bugg-detaljer",
      name: RouteNames.BugDetailsView,
      component: BugDetailsView,
    },
    {
      path: "/logga-in",
      name: RouteNames.Login,
      component: LoginView,
    },
    {
      path: "/oversikt-skicka",
      name: RouteNames.OverViewAndSubmit,
      component: OverViewAndSubmitView,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const loggedIn = isLoggedIn();
  if (to.name !== RouteNames.Login && !loggedIn) {
    next({ name: RouteNames.Login });
  } else {
    next();
  }
});

export default router;
