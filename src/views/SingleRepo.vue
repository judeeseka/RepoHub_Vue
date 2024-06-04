<template>
  <div class="flex h-screen justify-center items-center">
    <div v-if="isLoading">
      <div class="flex items-center space-x-4 mb-2 justify-center">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[200px] md:w-[250px]" />
          <Skeleton class="h-4 w-[200px] md:w-[250px]" />
        </div>
      </div>
    </div>
    <div v-else-if="isError"><NetworkError /></div>
    <div v-else class="container">
      <Card class="w-full md:w-5/6 md:mx-auto lg:w-1/2">
        <CardHeader>
          <CardTitle class="text-center md:text-4xl">{{ computedSingleRepo.name }}</CardTitle>
          <CardDescription class="text-center md:text-2xl">
            {{ computedSingleRepo.description }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-center md:text-2xl">
            Owner:{{ ' ' }}
            <span class="font-semibold">{{ computedSingleRepo.owner?.login }}</span>
          </p>
          <p class="text-center md:text-2xl">
            Language:{{ ' ' }}
            <span class="font-semibold">{{ computedSingleRepo.language }}</span>
          </p>
          <p class="text-center md:text-2xl">
            Creation Date:{{ ' ' }}
            <span class="font-semibold">
              {{ formatDate(computedSingleRepo.created_at) }}
            </span>
          </p>
          <p class="text-center md:text-2xl">
            Last Updated Date:{{ ' ' }}
            <span class="font-semibold">
              {{ formatDate(computedSingleRepo.updated_at) }}
            </span>
          </p>
          <p class="text-center md:text-2xl">
            Number of Stars:{{ ' ' }}
            <span class="font-semibold">{{ computedSingleRepo.stargazers_count }}</span>
          </p>
          <p class="text-center md:text-2xl">
            Number of Forks:{{ ' ' }}
            <span class="font-semibold">{{ computedSingleRepo.forks_count }}</span>
          </p>
          <p class="text-center md:text-2xl">
            Number of Watchers:{{ ' ' }}
            <span class="font-semibold">{{ computedSingleRepo.watchers_count }}</span>
          </p>
          <p class="text-center md:text-2xl underline italic my-3">
            <a target="_blank" :href="computedSingleRepo.html_url"> View on GitHub </a>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import NetworkError from '../components/NetworkError.vue'

const route = useRoute()
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString() // Format date according to user's locale
}

const { data, isLoading, isError } = useQuery({
  queryKey: ['singleRepo', route.params.name],
  queryFn: ({ queryKey }) => api.getSingleRepo('judeeseka', queryKey[1])
})

const computedSingleRepo = computed(() => {
  if (!data.value) return []

  return data.value.data
})
</script>

<style scoped></style>
