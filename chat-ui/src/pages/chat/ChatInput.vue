<script lang="ts" setup>
import { ref } from 'vue';
import type { Chat } from './types';

const $emit = defineEmits<{
  (e: 'message', chat: Chat): void;
  (e: 'stream', chunk: string): void;
  (e: 'done'): void;
}>();

const sending = ref(false)
const model = ref<string>('')

const send = async () => {
  if (!model.value?.length) return
  sending.value = true

  const response = await fetch('http://localhost:3000/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: model.value })
  })
  $emit('message', { message: model.value, role: 'user' })
  model.value = ''
  if (response.body) {
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      $emit('stream', chunk)
    }
    sending.value = false
    $emit('done')
  }
}

</script>

<template>
  <q-input @keyup.enter="send" bg-color="dark" :disable="sending" standout placeholder="Ask anything..."
    v-model="model">
    <template #append>
      <q-btn @click="send" size="sm" round color="white" text-color="dark" icon="arrow_upward" :loading="sending"
        :disable="sending || !model?.length" />
    </template>
  </q-input>
</template>