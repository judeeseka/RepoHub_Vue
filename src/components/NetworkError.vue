<template>
  <Card class="w-full md:w-5/6 md:mx-auto lg:w-1/2">
    <CardContent>
      <h2>Uh-oh!</h2>

      <p>
        It looks like you're experiencing some network issues, please take a breath and
        <a class="underline" href="#" @click="router.go(-1)">click here</a> to try again.
      </p>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped></style>
