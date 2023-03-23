<template>
  <div class="footer">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&copy; 2022 Way Home, Inc</p>

    <ul v-for="route in routes" :key="route.path">
      <li v-if="route.name != null">
        <a :href="route.path">{{ route.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { routes } from '@/routes/routes';
  console.log(routes, 'router');
</script>

<style scoped>
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4em;
  }
</style>
