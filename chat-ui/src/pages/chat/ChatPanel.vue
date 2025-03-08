<script lang="ts" setup>
import type { Chat } from './types';
import { marked } from 'marked';

defineProps<{
  chats: Chat[]
  streamingMessage?: string
}>()

</script>

<template>
  <div class="full-height">
    <div :key="index" :class="`chat chat-${chat.role}`" v-for="(chat, index) in chats">
      <p v-html="marked(chat.message)" v-if="chat.role === 'assistant'"></p>
      <p v-else>{{ chat.message }}</p>
    </div>
    <p class="chat chat-assistant" v-html="marked(streamingMessage ?? '')"></p>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  margin: 20px 5px;

  p {
    margin: 0;
  }

  &.chat-assistant {
    color: $dark-text-color;
  }

  &.chat-user {
    padding: 10px 20px;
    border-radius: 20px;
    background-color: $dark;
    color: $dark-text-color;
    width: fit-content;
    max-width: 50%;
    margin-left: auto;
  }
}
</style>