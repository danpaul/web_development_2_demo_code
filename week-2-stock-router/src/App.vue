<script>
export default {};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ps-2">
    <RouterLink to="/" class="navbar-brand" href="#">Stock App</RouterLink>
    <RouterLink class="nav-link" to="/about">About</RouterLink>
  </nav>
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>
