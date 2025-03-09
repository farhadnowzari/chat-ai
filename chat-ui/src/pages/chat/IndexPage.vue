<script lang="ts" setup>
import { ref, watch } from 'vue';
import ChatInput from './ChatInput.vue';
import ChatPanel from './ChatPanel.vue';
import type { Chat } from './types';
import { nextTick } from 'process';

const chats = ref<Chat[]>([]);
const streamingMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null);
const handleStream = (chunk: string) => {
  streamingMessage.value += chunk
}

const handleDone = () => {
  chats.value.push({ message: streamingMessage.value, role: 'assistant' })
  streamingMessage.value = ''
}

watch([chats, streamingMessage], () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

</script>

<template>
  <q-page class="mw-sm fit q-mx-auto column q-pa-md">
    <div class="q-my-auto text-center" v-if="!chats.length">
      <span class="text-h4 text-grey-8">What can I help you with?</span>
    </div>
    <div class="chat-container column" ref="chatContainer" v-else>
      <ChatPanel :streaming-message="streamingMessage" :chats="chats" class="q-mt-auto"></ChatPanel>
    </div>
    <span class="q-my-sm"></span>
    <ChatInput @done="handleDone" @stream="handleStream" @message="chats.push($event)"
      style="position: sticky; bottom: 0;"></ChatInput>
  </q-page>
</template>

<style lang="scss" scoped>
.chat-container {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
}
</style>