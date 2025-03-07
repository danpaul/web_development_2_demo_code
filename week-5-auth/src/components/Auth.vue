<script>
export default {
  name: "Auth",
  data() {
    return {
      isLogin: true,
      formData: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    toggleAuthMode() {
      this.isLogin = !this.isLogin;
      this.error = null;
      this.isLoading = false;
      this.formData.email = "";
      this.formData.password = "";
    },
    async handleSubmit() {
      try {
        this.error = null;
        this.isLoading = true;
        const endpoint = this.isLogin ? "/auth/login" : "/auth/register";

        // relevant endpoints: API_ENDPOINTS.auth

        // Here you would typically make an API call to your backend
        console.log("Submitting to:", endpoint, this.formData);
      } catch (error) {
        this.error = error.message || "An error occurred during authentication";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
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

            <button
              type="submit"
              class="btn btn-primary w-100"
              @click="handleSubmit"
            >
              {{ isLogin ? "Login" : "Register" }}
            </button>
          </form>

          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
