<template>
  <div class="form-card">
    <h3>{{ model ? "Editar Recurso" : "Novo Recurso" }}</h3>

    <form @submit.prevent="submit">
      <label>Título</label>
      <input v-model="form.titulo" />

      <label>Autor</label>
      <input v-model="form.autor" />

      <label>Status</label>
      <select v-model="form.status">
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

      <p v-if="error" style="color:red;">Preencha todos os campos!</p>

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
  titulo: "",
  autor: "",
  status: "ativo"
})

watch(
  () => props.model,
  (value) => {
    if (value) Object.assign(form, value)
  },
  { immediate: true }
)

const submit = () => {
  if (!form.titulo || !form.autor) {
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
  padding: 15px;
  margin-top: 20px;
}
</style>
