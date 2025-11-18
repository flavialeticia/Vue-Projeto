<template>
  <div>
    <h2>Recursos</h2>

    <button @click="createResource">+ Novo Recurso</button>

    <input v-model="search" placeholder="Buscar por título..." />

    <p v-if="loading">Carregando...</p>
    <p v-if="error" style="color:red;">Erro ao carregar dados</p>
    <p v-if="resources.length === 0">Nenhum recurso encontrado.</p>

    <ul>
      <li v-for="r in filtered" :key="r.id">
        <strong>{{ r.titulo }}</strong>
        — {{ r.autor }}
        <button @click="edit(r)">Editar</button>
        <button @click="remove(r.id)">Excluir</button>

        <SubResourceList :resourceId="r.id" />
      </li>
    </ul>

    <ResourceForm
      v-if="showForm"
      :model="current"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResourceForm from './ResourceForm.vue'
import SubResourceList from './SubResourceList.vue'
import resourceService from '../services/resourceService'

const resources = ref([])
const loading = ref(false)
const error = ref(false)
const showForm = ref(false)
const current = ref(null)
const search = ref("")

const load = async () => {
  loading.value = true
  error.value = false
  try {
    resources.value = await resourceService.getAll()
  } catch {
    error.value = true
  }
  loading.value = false
}

const filtered = computed(() => {
  return resources.value.filter(r =>
    r.titulo.toLowerCase().includes(search.value.toLowerCase())
  )
})

const createResource = () => {
  current.value = null
  showForm.value = true
}

const edit = (item) => {
  current.value = { ...item }
  showForm.value = true
}

const remove = async (id) => {
  if (!confirm("Tem certeza que deseja excluir?")) return
  await resourceService.remove(id)
  await load()
}

const save = async (data) => {
  if (current.value) {
    await resourceService.update(current.value.id, data)
  } else {
    await resourceService.create(data)
  }
  showForm.value = false
  await load()
}

const cancel = () => {
  showForm.value = false
}

onMounted(load)
</script>
