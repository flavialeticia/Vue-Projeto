<template>
  <div v-if="visible" :class="['notification', typeClass]" role="status">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('info') // 'success' | 'error' | 'warning' | 'info'
let timeoutId = null

function show(t, msg, ms = 4000) {
  type.value = t || 'info'
  message.value = msg
  visible.value = true
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => (visible.value = false), ms)
}

const typeClass = computed(() => {
  if (type.value === 'success') return 'notif-success'
  if (type.value === 'error') return 'notif-error'
  if (type.value === 'warning') return 'notif-warning'
  return 'notif-info'
})

// permitir que o pai invoque show via ref
defineExpose({ show })
</script>

<style>
.notification {
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 12px;
}
.notif-success { background: #e6ffed; color: #0f5132; }
.notif-error   { background: #ffe6e6; color: #6b0f0f; }
.notif-warning { background: #fff4e5; color: #6b4a00; }
.notif-info    { background: #e8f1ff; color: #08306b; }
</style>
