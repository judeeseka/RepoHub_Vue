<template>
  <div class="container pt-20 lg:flex lg:flex-col lg:h-screen lg:justify-center">
    <h2 class="text-3xl text-center mb-8">All Repositories</h2>
    <div class="flex gap-4 justify-center">
      <Input class="md:w-1/2 lg:w-2/5 mb-4" type="text" @input="handleInput" />
    </div>
    <RepoData :searchQuery="searchInput" />
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import RepoData from '../components/RepoData.vue'

const searchInput = ref(null)
const debounceInput = ref(null)

const handleInput = (event) => {
  clearTimeout(debounceInput.value)
  debounceInput.value = setTimeout(() => {
    searchInput.value = event.target.value
  }, 350)
}
</script>

<style></style>
