<script lang="ts" setup>
import { ref } from 'vue';

const sending = ref(false)
const model = ref<string>('')

const send = () => {
  if (!model.value?.length) return
  sending.value = true
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