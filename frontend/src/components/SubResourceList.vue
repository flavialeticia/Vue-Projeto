<template>
  <div class="sub">
    <h4>Sub-itens</h4>

    <button @click="create">+ Novo sub-item</button>
    <ul>
      <li v-for="s in list" :key="s.id">
        {{ s.conteudo }}
        <button @click="edit(s)">Editar</button>
        <button @click="remove(s.id)">Excluir</button>
      </li>
    </ul>

    <SubResourceForm
      v-if="showForm"
      :model="current"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import subService from '../services/subresourceService'
import SubResourceForm from './SubResourceForm.vue'

const props = defineProps({ resourceId: Number })

const list = ref([])
const showForm = ref(false)
const current = ref(null)

const load = async () => {
  list.value = await subService.getByResource(props.resourceId)
}

const create = () => {
  current.value = null
  showForm.value = true
}

const edit = (item) => {
  current.value = { ...item }
  showForm.value = true
}

const remove = async (id) => {
  await subService.remove(id)
  await load()
}

const save = async (data) => {
  if (current.value) {
    await subService.update(current.value.id, data)
  } else {
    await subService.create({ ...data, resourceId: props.resourceId })
  }
  showForm.value = false
  await load()
}

const cancel = () => (showForm.value = false)

onMounted(load)
</script>

<style>
.sub {
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  margin-top: 8px;
}
</style>
