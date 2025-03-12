<script>
import { useAuthStore } from "@/stores/auth";
import Notification from "./Notification.vue";
import Loading from "./Loading.vue";

export default {
  name: "Auth",
  data() {
    return {
      isLogin: true,
      formData: {
        email: "",
        password: "",
      },
      success: null,
    };
  },
  components: {
    Notification,
    Loading,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    error() {
      return this.authStore.getError;
    },
    isLoading() {
      return this.authStore.isLoading;
    },
  },
  methods: {
    toggleAuthMode() {
      this.isLogin = !this.isLogin;
      this.success = null;
      this.formData.email = "";
      this.formData.password = "";
    },
    async handleSubmit() {
      if (this.isLogin) {
        await this.authStore.login(this.formData);
        this.$router.push("/profile");
      } else {
        await this.authStore.register(this.formData);
        this.success = "Register successful";
        this.isLogin = true;
      }
    },
  },
};
</script>

<template>
  <Loading v-if="isLoading" />
  <Notification v-if="success" :isError="false" @close="success = null">
    {{ success }}
  </Notification>
  <div class="row justify-content-center align-items-center min-vh-100 m-0">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-body p-4">
          <div class="text-center mb-4">
            <h2 class="card-title mb-3">
              {{ isLogin ? "Login" : "Register" }}
            </h2>
            <button class="btn btn-link p-0" @click="toggleAuthMode">
              {{ isLogin ? "Need an account?" : "Already have an account?" }}
            </button>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              {{ isLogin ? "Login" : "Register" }}
            </button>
          </form>
          <Notification
            v-if="error"
            :isError="true"
            @close="authStore.$patch({ error: null })"
            class="mt-3"
          >
            {{ error }}
          </Notification>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
