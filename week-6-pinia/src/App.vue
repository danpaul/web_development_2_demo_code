<script>
import { useArticlesStore } from "@/stores/articles";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const articlesStore = useArticlesStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
      authStore.logout();
      router.push("/auth");
    };

    return {
      articlesStore,
      authStore,
      handleLogout,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Article App</RouterLink>
      <div class="navbar-nav ms-auto">
        <RouterLink
          v-if="authStore.isAuthenticated"
          class="nav-item nav-link"
          to="/article"
          >Add New Article</RouterLink
        >
        <RouterLink
          v-if="authStore.isAuthenticated"
          class="nav-item nav-link"
          to="/read-later"
        >
          Read Later
          <span
            v-if="articlesStore.readLaterCount"
            class="badge bg-primary ms-1"
          >
            {{ articlesStore.readLaterCount }}
          </span>
        </RouterLink>
        <template v-if="!authStore.isAuthenticated">
          <RouterLink class="nav-item nav-link" to="/auth"
            >Login/Register</RouterLink
          >
        </template>
        <template v-else>
          <RouterLink class="nav-item nav-link" to="/profile"
            >Profile</RouterLink
          >
          <a href="#" class="nav-item nav-link" @click.prevent="handleLogout"
            >Logout</a
          >
        </template>
      </div>
    </div>
  </nav>
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>
