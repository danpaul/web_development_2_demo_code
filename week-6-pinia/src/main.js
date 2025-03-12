import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ArticleUpdate from "./components/ArticleUpdate.vue";
import ArticleUpdateImproved from "./components/ArticleUpdateImproved.vue";
import ArticleCreate from "./components/ArticleCreate.vue";
import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";
import ArticlePage from "./components/ArticlePage.vue";
import ReadLaterTable from "./components/ReadLaterTable.vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

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
    path: "/article/:id",
    component: ArticlePage,
  },
  {
    path: "/articles-edit/:id",
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
  {
    path: "/read-later",
    component: ReadLaterTable,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// Initialize the auth store
const authStore = useAuthStore(pinia);
await authStore.initializeAuth();

app.mount("#app");
