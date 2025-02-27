<script>
export default {};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ps-2">
    <RouterLink to="/" class="navbar-brand">Article App</RouterLink>
    <RouterLink class="nav-link" to="/article">Add New Article</RouterLink>
  </nav>
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>
