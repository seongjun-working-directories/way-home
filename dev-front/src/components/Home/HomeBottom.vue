<template>
  <section id="info">
    <p class="line">Way Home에서 휴게소 정보를 확인하세요.</p>
    <FrequentComponent />
    <recentUpdateComponent />
  </section>
</template>

<script lang="ts" setup>
  import FrequentComponent from '../layouts/FrequentComponent.vue';
  import recentUpdateComponent from '../layouts/recentUpdateComponent.vue';

  // import { ref } from 'vue';
  // import type { Ref } from 'vue';

  // let place: Ref<string> = ref('휴게소');
  // let placeText: Ref<string> = ref('본문');
</script>

<style scoped>
  html,
  body {
    width: 100%;
    height: 100%;
  }
  .line {
    margin: 20px 0 40px 0;
    text-shadow: 0.5px 0.5px green;
  }
</style>
