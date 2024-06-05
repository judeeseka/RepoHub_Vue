<template>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this repository.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction @click.prevent="handleClick">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</template>

<script setup>
import { ref } from 'vue'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useQueryClient } from '@tanstack/vue-query'
import { Loader2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const queryClient = useQueryClient()
const router = useRouter()
const props = defineProps(['repoName'])
const emit = defineEmits(['close-dialog'])
const isLoading = ref(false)

const handleClick = async () => {
  isLoading.value = true
  const payload = { name: props.repoName }

  const response = await api.deleteRepoData('judeeseka', payload)
  isLoading.value = false
  queryClient.invalidateQueries({ queryKey: ['allRepo'] })
  emit('close-dialog')
  router.push('/repositories')
}
</script>

<style scoped></style>
