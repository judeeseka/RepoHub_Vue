<script setup>
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div className="pt-20 md:pt-0 h-screen flex flex-col justify-center items-center px-4">
    <h1 className="text-5xl text-center">Simplify your Github Experience</h1>
    <p className="mt-2 mb-8 italic text-center w-5/6 mx-auto">
      Explore, create and manage repositories, Hassle-free
    </p>

    <Button>
      <RouterLink to="/repositories">Browse Repositories</RouterLink>
    </Button>
  </div>
</template>
