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
          v-model="form.content"
          placeholder="Write your blog..."
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
          <label for="status">Is the blog published?</label>
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
import { useNuxtApp, navigateTo } from "#app";
const { $api } = useNuxtApp();

const authors = ref([]);
const form = ref({
  author_id: 1,
  title: "",
  content: "",
  status: "Unpublished",
});

const fetchAuthors = async () => {
  const { data, error } = await useAsyncData("authors", () => $api("/authors"));
  if (error.value) return useToastify(error.value, { type: "error" });
  authors.value = data.value.data;
};

onMounted(() => {
  fetchAuthors();
});

const submitForm = async () => {
  await $api("/blogs", {
    body: {
      ...form.value,
      status: form.value.status.toLowerCase(),
    },
    method: "POST",
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
  border-radius: 4px;
  width: 100%;
  background-color: #54a6db;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
