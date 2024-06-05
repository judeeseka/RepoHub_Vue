<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Button } from '@/components/ui/button'
</script>

<template>
  <header class="fixed w-full top-0 z-10 shadow-md">
    <div class="flex p-4 md:px-12 justify-between">
      <div class="flex gap-1 items-center">
        <img src="@/assets/logo.png" class="w-8" />
        <p class="text-xl">RepoHub</p>
      </div>

      <nav>
        <Button variant="link" class="md:h-11 md:rounded-md md:px-8">
          <RouterLink to="/">Home</RouterLink>
        </Button>
        <Button>
          <RouterLink to="/repositories">Explore</RouterLink>
        </Button>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <!-- <VueQueryDevtools /> -->
</template>

<style scoped></style>
