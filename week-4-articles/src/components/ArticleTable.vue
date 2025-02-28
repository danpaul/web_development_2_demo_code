<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

/**
 * @component ArticleTable
 * @description A component that displays a paginated table of articles with edit functionality.
 * The table shows article titles, authors, posting dates, and edit links.
 */
export default {
  data() {
    return {
      articles: [], // Array of article objects
      isLoading: true, // Loading state flag
      error: null, // Error message storage
      currentPage: 1, // Current page number for pagination
    };
  },
  async mounted() {
    await this.loadArticles();
  },
  methods: {
    /**
     * Fetches articles from the API for the current page
     */
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
          `${API_ENDPOINTS.articles}?page=${this.currentPage}`
        );
        this.articles = results.data;
      } catch (error) {
        console.error(error);
        this.error = error.message || "An error occurred";
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * Increments the page number and loads the next page of articles
     */
    async loadNextPage() {
      this.currentPage++;
      await this.loadArticles();
    },
    /**
     * Decrements the page number and loads the previous page of articles
     */
    async loadPreviousPage() {
      this.currentPage--;
      await this.loadArticles();
    },

    /**
     * Deletes an article with the given ID
     * @param {number} id - The ID of the article to delete
     */
    async deleteArticle(id) {
      console.log(`Deleting article with ID: ${id}`);
      console.error(new Error("Method not implemented"));
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
          <th>Delete</th>
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
          <td>
            <button class="btn btn-danger" @click="deleteArticle(article.id)">
              Delete
            </button>
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
