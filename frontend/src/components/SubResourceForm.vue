<template>
  <div class="form-card">
    <h4>{{ model ? "Editar Comentário" : "Novo Comentário" }}</h4>

    <form @submit.prevent="submit">
      <label>Conteúdo</label>
      <input v-model="form.conteudo" />

      <label>Autor</label>
      <input v-model="form.autor" />

      <p v-if="error" style="color:red;">Campos obrigatórios!</p>

      <button type="submit">Salvar</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  model: Object
})

const emit = defineEmits(["save", "cancel"])

const error = ref(false)

const form = reactive({
  conteudo: "",
  autor: ""
})

watch(
  () => props.model,
  (value) => {
    if (value) Object.assign(form, value)
  },
  { immediate: true }
)

const submit = () => {
  if (!form.conteudo || !form.autor) {
    error.value = true
    return
  }
  error.value = false
  emit("save", { ...form })
}
</script>

<style>
.form-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}
</style>
