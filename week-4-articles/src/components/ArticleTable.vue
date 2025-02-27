<script>
import axios from "axios";

export default {
  data() {
    return {
      interval: null,
      articles: [],
      isLoading: true,
      error: null,
      currentPage: 1,
    };
  },
  async mounted() {
    await this.loadArticles();
  },
  beforeUnmount() {
    // clean up the interval we created
    clearInterval(this.interval);
  },
  methods: {
    async loadArticles() {
      // asynchronously load articles
      // handle loading and error states
      try {
        // set loading state to true
        this.isLoading = true;
        // clear error messages
        this.error = null;
        // clear existing articles
        this.articles = [];
        const results = await axios.get(
          `http://localhost/articles?page=${this.currentPage}`
        );
        this.articles = results.data;
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.isLoading = false;
      }
    },
    async loadNextPage() {
      this.currentPage++;
      await this.loadArticles();
    },
    async loadPreviousPage() {
      this.currentPage--;
      await this.loadArticles();
    },
  },
};
</script>

<template>
  <div v-if="error" class="alert alert-danger" role="alert">
    {{ error }}
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Posted At</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.posted_at }}</td>
          <td>
            <RouterLink
              type="button"
              class="btn btn-primary"
              :to="`/articles/${article.id}`"
              >Edit</RouterLink
            >
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="...">
      <ul class="pagination">
        <li :class="{ 'page-item': true, disabled: currentPage === 1 }">
          <a @click="loadPreviousPage" class="page-link" href="#">Previous</a>
        </li>
        <li :class="{ 'page-item': true, disabled: articles.length < 10 }">
          <a @click="loadNextPage" class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="css" scoped></style>
