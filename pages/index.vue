<template>
  <div>
    <h1>Blog Dashboard</h1>
    <select v-model="filterStatus" @change="filterPosts">
      <option value="">All</option>
      <option value="published">Published</option>
      <option value="unpublished">Unpublished</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Publish Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.status }}</td>
          <td v-if="showActions">
            <button @click="editPost(post.id)">Edit</button>
            <button @click="deletePost(post.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNuxtApp } from "#app";

const { $axiosInstance } = useNuxtApp();
const posts = ref([]);
const filterStatus = ref("");
const showActions = ref(false);
const fetchPosts = async () => {
  const { data } = await $axiosInstance.get("/blogs");
  posts.value = data.data;
  if (posts.value.length > 0) {
    showActions.value = true;
  }
};
fetchPosts();

const filteredPosts = computed(() =>
  filterStatus.value
    ? posts.value.filter((post) => post.status === filterStatus.value)
    : posts.value,
);

const editPost = (id) => {
  navigateTo(`/edit/${id}`);
};

const deletePost = async (id) => {
  await $axiosInstance.delete(`/blogs/${id}`);
  fetchPosts();
};
</script>
