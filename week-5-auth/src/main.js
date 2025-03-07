import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ArticleUpdate from "./components/ArticleUpdate.vue";
import ArticleUpdateImproved from "./components/ArticleUpdateImproved.vue";
import ArticleCreate from "./components/ArticleCreate.vue";
import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";
import { getAuthToken, setAuthToken } from "@/utils/auth";

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

// Initialize auth token if it exists
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/article",
    component: ArticleCreate,
  },
  {
    path: "/articles/:id",
    component: ArticleUpdate,
  },
  {
    path: "/articles-improved/:id",
    component: ArticleUpdateImproved,
  },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
