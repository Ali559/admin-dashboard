<template>
  <div class="container">
    <img src="~/assets/images/sideImage.png" />
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="title"> What should be the title? </label>
        <input name="title" v-model="form.title" placeholder="Title" required />
      </div>
      <div class="input-group">
        <label for="content"> What is the blog about? </label>
        <textarea
          maxlength="500"
          v-model="form.content"
          placeholder="Write in less than 500 characters"
          required
        ></textarea>
      </div>

      <div class="optionsContainer">
        <div class="input-group">
          <label for="author">Who wrote the blog?</label>
          <select name="author" v-model="form.author_id" required>
            <option
              v-for="author in authors"
              :key="author.id"
              :value="author.id"
            >
              {{ author.name }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label for="author">Is the blog published?</label>
          <select name="status" v-model="form.status" required>
            <option>Published</option>
            <option>Unpublished</option>
          </select>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp, useRoute, navigateTo } from "#app";

const { $api } = useNuxtApp();
const route = useRoute();
const authors = ref([]);
const form = ref({
  author_id: null,
  title: "",
  content: "",
  status: "",
});
const fetchPost = async (id) => {
  const data = await $api(`/blogs/${id}`, {
    method: "GET",
  });
  form.value = {
    ...data,
    author_id: authors.value.find((author) => author.name === data.author)?.id,
    status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
  };
};
const fetchAuthors = async () => {
  const { data } = await $api("/authors", {
    method: "GET",
  });
  authors.value = data;
};

onMounted(() => {
  fetchAuthors();
  fetchPost(route.params.id);
});

const submitForm = async () => {
  await $api(`/blogs/${route.params.id}`, {
    method: "PUT",
    body: {
      author_id: form.value.author_id,
      title: form.value.title,
      content: form.value.content,
      status: form.value.status.toLowerCase(),
    },
  });

  navigateTo("/");
};
</script>

<style scoped>
.container {
  display: flex;
  /* gap: 2rem; */

  img {
    width: 50%;
    object-fit: cover;
  }
}
form {
  padding: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 50%;
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
  .optionsContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    select {
      padding: 1rem;
      min-width: 50%;
      border: 1px solid #ccc;
      border-radius: 4px;
      border: none;
      outline: none;
    }
  }
}

textarea {
  min-height: 10rem;
}

textarea,
input {
  outline: none;
  border: none;
  resize: vertical;
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
}
button {
  padding: 1rem;
  width: 100%;
  background-color: #54a6db;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
