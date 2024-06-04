<template>
  <div v-if="isLoading">
    <div class="flex items-center space-x-4 mb-2 justify-center">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[200px] md:w-[250px]" />
        <Skeleton class="h-4 w-[200px] md:w-[250px]" />
      </div>
    </div>
  </div>
  <div v-else-if="isError" class="text-center"><NetworkError /></div>
  <div v-else>
    <Alert class="md:w-3/4 md:mx-auto lg:w-2/3" v-for="item in styledRepos" :key="item.id">
      <AlertTitle>
        <router-link :to="`/repositories/${item.name}`">{{ item.name }} </router-link>
      </AlertTitle>
      <AlertDescription>{{ item?.description }}</AlertDescription>

      <div className="flex gap-1 items-center mt-3 " v-if="item.language">
        <p className="w-3 h-3 rounded-full border" :style="{ backgroundColor: item.color }"></p>
        <p className="text-xs">{{ item.language }}</p>
      </div>
    </Alert>
  </div>

  <div className="mt-8 flex items-center justify-center gap-3 mb-4">
    <Button :variant="pageNumber <= 1 ? 'disabled' : 'default'" @click="prevPage"> Prev </Button>
    <p>{{ pageNumber }}</p>
    <Button :variant="hasNextPage ? 'default' : 'disabled'" @click="nextPage"> Next </Button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { RouterLink } from 'vue-router'
import api from '@/services/api'
import NetworkError from './NetworkError.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { COLOR } from '@/utils/color'
import { extractLinkHeaders } from '@/utils/helper'

const username = 'judeeseka'
const pageNumber = ref(1)
const hasPrevPage = ref(true)
const hasNextPage = ref(false)
const props = defineProps(['searchQuery'])
const computedSearchQuery = computed(() => props.searchQuery)

const { isLoading, isError, data, refetch } = useQuery({
  queryKey: ['allRepo', pageNumber, computedSearchQuery],
  queryFn: ({ queryKey }) => {
    return api.getAllRepos(username, { page: queryKey[1] }, queryKey[2])
  },
  keepPreviousData: true
})

// Compute styled repos based on the language property
const styledRepos = computed(() => {
  if (!data.value) return []

  return data.value.data.map((repo) => {
    const color = COLOR[repo.language]
    return {
      ...repo,
      color
    }
  })
})

const prevPage = () => {
  pageNumber.value = Math.max(pageNumber.value - 1, 1)
}
const nextPage = () => {
  pageNumber.value = pageNumber.value + 1
}

watch(
  () => props.searchQuery,
  () => {
    pageNumber.value = 1 // Reset to first page on search
    refetch()
  }
)

watch(
  () => data.value,
  () => {
    if (!data.value) return
    const pages = extractLinkHeaders(data?.value?.headers?.link)
    hasPrevPage.value = pages.prevPage
    hasNextPage.value = pages.nextPage
  }
)
</script>

<style scoped></style>
