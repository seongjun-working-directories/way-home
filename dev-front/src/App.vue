<template>
  <div>
    <header-component />
    <router-view />
    <!-- <footer-component /> -->
  </div>
</template>
<script setup lang="ts">
  import 'bulma/css/bulma.min.css';
  import HeaderComponent from './components/layouts/HeaderComponent.vue';
</script>

<style scoped></style>
