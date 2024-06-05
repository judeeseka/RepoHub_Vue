<template>
  <DialogContent class="max-w-[90%] md:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{{ props.title }}</DialogTitle>
      <DialogDescription>{{ props.subtitle }}</DialogDescription>
    </DialogHeader>
    <form class="grid gap-4 py-4">
      <div class="grid md:grid-cols-4 items-center gap-y-2 md:gap-4">
        <Label htmlFor="name" class="md:text-right"> Name </Label>
        <Input
          id="name"
          placeholder="new-repository"
          name="name"
          class="col-span-3"
          v-model="name"
        />
      </div>
      <p
        v-if="errorValue"
        class="text-red-500 text-sm text-center italic -mt-3 md:w-[278px] md:text-left md:ml-auto"
      >
        {{ errorValue }}
      </p>
      <div class="grid md:grid-cols-4 items-center gap-y-2 md:gap-4">
        <Label htmlFor="description" class="md:text-right"> Description </Label>
        <Input
          id="description"
          placeholder="brief description"
          name="description"
          class="col-span-3"
          v-model="repoDescription"
        />
      </div>
    </form>
    <DialogFooter>
      <Button @click.prevent="handleSubmit" :variant="isLoading ? 'disabled' : 'default'">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        {{ props.action }}
      </Button>
    </DialogFooter>
  </DialogContent>
</template>

<script setup>
import { ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-vue-next'
import { useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const props = defineProps(['title', 'subtitle', 'repoName', 'description', 'action', 'method'])
const emit = defineEmits(['close-dialog'])
const name = ref(props.repoName)
const repoDescription = ref(props.description)
const isLoading = ref(false)
const errorValue = ref(null)
const queryClient = useQueryClient()
const router = useRouter()

const handleSubmit = async () => {
  isLoading.value = true
  errorValue.value = ''

  try {
    if (props.method) {
      const payload = {
        name: name.value,
        description: repoDescription.value,
        repoName: props.repoName
      }
      console.log(payload)
      const response = await api.updateRepoData('judeeseka', payload)
      queryClient.invalidateQueries({ queryKey: ['singleRepo'] })
      isLoading.value = false
      emit('close-dialog')

      if (props.repoName !== name.value) {
        queryClient.invalidateQueries({ queryKey: ['allRepo'] })
        router.push('/')
      }
    } else {
      const payload = { name: name.value, description: repoDescription.value }
      const response = await api.postRepoData(payload)
      queryClient.invalidateQueries({ queryKey: ['allRepo'] })
      isLoading.value = false
      name.value = ''
      repoDescription.value = ''
      emit('close-dialog')
    }
  } catch (error) {
    const length = error.response.data.errors.length - 1
    const errorMessage = error.response.data.errors[length].message
    errorValue.value = errorMessage
    isLoading.value = false
  }
}
</script>

<style scoped></style>
