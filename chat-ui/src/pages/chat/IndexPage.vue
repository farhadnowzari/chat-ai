<script lang="ts" setup>
import { ref } from 'vue';
import ChatInput from './ChatInput.vue';
import ChatPanel from './ChatPanel.vue';
import type { Chat } from './types';

const chats = ref<Chat[]>([]);


</script>

<template>
  <q-page class="mw-sm fit q-mx-auto column q-pa-md">
    <div class="q-my-auto text-center" v-if="!chats.length">
      <span class="text-h4 text-grey-8">What can I help you with?</span>
    </div>
    <div class="chat-container column" v-else>
      <ChatPanel :chats="chats" class="q-mt-auto"></ChatPanel>
    </div>
    <span class="q-my-sm"></span>
    <ChatInput style="position: sticky; bottom: 0;"></ChatInput>
  </q-page>
</template>

<style lang="scss" scoped>
.chat-container {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
}
</style>