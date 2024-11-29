<template>
  <div>
    <h1>{{ "Edit Post" }}</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.title" placeholder="Title" required />
      <textarea
        v-model="form.content"
        placeholder="Content"
        required
      ></textarea>
      <select v-model="route.params.id" required>
        <option v-for="author in authors" :key="author.id" :value="author.id">
          {{ author.name }}
        </option>
      </select>
      <select v-model="form.status" required>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
      </select>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp, useRoute, navigateTo } from "#app";

const { $axiosInstance } = useNuxtApp();
const route = useRoute();
const isEditMode = ref(!!route.params.id);
const authors = ref([]);
const form = ref({
  author_id: 0,
  title: "",
  content: "",
  status: "unpublished",
});

const fetchAuthors = async () => {
  const { data } = await $axiosInstance.get("/authors");
  authors.value = data.data;
};

const fetchPost = async (id) => {
  const { data } = await $axiosInstance.get(`/blogs/${id}`);
  form.value = { ...data };
};

onMounted(() => {
  fetchAuthors();
  if (isEditMode.value) fetchPost(route.params.id);
});

const submitForm = async () => {
  await $axiosInstance.put(`/blogs/${route.params.id}`, form.value);
  console.log(route.params.id);

  navigateTo("/");
};
</script>
