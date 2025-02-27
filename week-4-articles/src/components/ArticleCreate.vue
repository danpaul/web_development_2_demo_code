<script>
import ArticleForm from "./ArticleForm.vue";
import axios from "axios";

export default {
  data() {
    return {
      article: null,
      isLoading: true,
      error: null,
      articleId: this.$route.params.id,
      success: null,
    };
  },
  components: {
    ArticleForm,
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://localhost/articles/${this.articleId}`
      );
      this.article = response.data;
    } catch (error) {
      this.error = error.message || "An error occurred";
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async createArticle(articleData) {
      try {
        this.isLoading = true;
        await axios.post(`http://localhost/articles`, articleData);
        this.success = "Article created";
      } catch (error) {
        console.error(error);
        this.error = error.message || "An error occurred";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div v-if="error" class="alert alert-danger" role="alert">
    {{ error }}
  </div>
  <div v-if="success" class="alert alert-success" role="alert">
    {{ success }}
  </div>
  <div v-if="isLoading">Loading...</div>
  <ArticleForm v-else @submitForm="createArticle" />
</template>

<style lang="css" scoped></style>
