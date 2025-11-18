<template>
  <div class="container">
    <h1>Gerenciamento de Recursos</h1>

    <ResourceList />
  </div>
</template>

<script setup>
import ResourceList from './components/ResourceList.vue'
</script>

<style>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>
