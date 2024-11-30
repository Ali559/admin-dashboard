<template>
  <nav class="navbar">
    <div class="logo">Welcome back.</div>

    <div class="nav-links">
      <a
        href="/"
        class="nav-link"
        v-bind:class="{ active: $route.path === '/' }"
        >Dashboard</a
      >
      <a
        href="/add"
        class="nav-link"
        v-bind:class="{ active: $route.path === '/add' }"
        >Add Post</a
      >
    </div>
    <div class="theme-toggle" @click="toggleTheme">
      {{ theme === "dark" ? "🌙" : "☀️" }}
    </div>
  </nav>
</template>

<script setup>
import "~/assets/css/app.css";

const colorMode = useColorMode();
const theme = computed(() => colorMode.value);
const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
