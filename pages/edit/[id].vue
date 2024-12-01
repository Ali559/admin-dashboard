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
import { ref } from "vue";
import { useNuxtApp, useRoute, navigateTo } from "#app";

const { $api } = useNuxtApp();
const nuxtApp = useNuxtApp();
const route = useRoute();
const authors = ref([]);
const form = ref({
  author_id: null,
  title: "",
  content: "",
  status: "",
});

const { data, error } = await useAsyncData(
  `blogs/${route.params.id}`,
  async () => {
    const [authors, post] = await Promise.all([
      $api("/authors", { method: "GET" }),
      $api(`/blogs/${route.params.id}`, { method: "GET" }),
    ]);
    return { authors: authors.data, post };
  },
  {
    getCachedData: (key) => {
      const cached = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      if (!cached?.authors || !cached?.post) return;
      return cached;
    },
  },
);
authors.value = data.value.authors;
form.value = {
  content: data.value.post.content,
  title: data.value.post.title,
  author_id: authors.value.find(
    (author) => author.name === data.value.post.author,
  )?.id,
  status:
    data.value.post.status.charAt(0).toUpperCase() +
    data.value.post.status.slice(1),
};
if (error.value) useToastify(error.value, { type: "error" });

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
  delete nuxtApp.payload.data["posts"];
  delete nuxtApp.static.data["posts"];
  delete nuxtApp.payload.data[`blogs/${route.params.id}`];
  delete nuxtApp.static.data[`blogs/${route.params.id}`];
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
