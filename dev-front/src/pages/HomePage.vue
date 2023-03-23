<template>
  <section id="home">
    <div class="home__form">
      <div class="home__top">
        <HomeTop />
      </div>
      <Suspense>
        <div class="home__center">
          <HomeCenter />
        </div>
      </Suspense>
      <div class="home__bottom"><HomeBottom /></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import HomeCenter from '../components/Home/HomeCenter.vue';
  import HomeBottom from '../components/Home/HomeBottom.vue';
  import HomeTop from '../components/Home/HomeTop.vue';
</script>
<style scoped>
  html,
  body {
    width: 100%;
    height: 100%;
  }
  #home {
    width: 100%;
    margin: 0 auto;
  }
  .home__form {
    width: 100%;
    height: 768px;
    display: block;
    flex-direction: row;
    justify-content: center;
    border-radius: 32px;
  }
  .home__top {
    margin-top: 50px;
    /* border-bottom: 1px solid black; */
  }
  .home__center {
    margin-top: 60px;
    /* border-bottom: 1px solid black; */
  }
  .home__bottom {
    margin-top: 50px;
  }

  /* .home__map {
  width: 70%;
  height: 100%;
}
.home__info {
  width: 100%;
  height: 30%;
} */
</style>
