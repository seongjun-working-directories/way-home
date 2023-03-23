<template>
  <div class="search">
    <form class="justify-item-center" action="./search" method="get">
      <input
        v-model="inputRest"
        type="text"
        class="search_bar"
        name="query"
        @focus="modal = true"
      />
      <img src="https://img.icons8.com/ios-glyphs/2x/search.png" class="icon" />
    </form>

    <div v-if="inputRestList && modal" class="auto_list">
      <li
        v-for="rest in 5"
        :key="rest"
        class="list-group-item"
        @click="clickevent(inputRestList[rest - 1])"
      >
        {{ inputRestList[rest - 1] }}</li
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import axios from '@way-home/modules/api/axios';
  const inputRest = ref('');
  const modal = ref(false);

  const result: any = await axios.methods.$callAPI('GET', '/api/svarInfos');

  const highwayDataArray: string[] = ['공통'];

  for (let i = 0; i < result.data.result.length; i++) {
    if (result.data.result[i].svarNm.match('휴게소')) {
      highwayDataArray.push(result.data.result[i].svarNm);
    }
  }

  const inputRestList = computed(() => {
    return highwayDataArray.filter((data) => data.includes(inputRest.value));
  });

  function clickevent(rest: string) {
    inputRest.value = rest;
    modal.value = false;
  }
</script>
<style scoped>
  .auto_list {
    position: absolute;
    width: 500px;
    text-align: left;
    background-color: white;
    border: 1px solid rgb(218, 218, 218);
    border-radius: 7px;
  }
  .auto_list > li {
    line-height: 180%;
  }
  .search_bar {
    width: 500px;
    height: 50px;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.25);
    font-size: 17px;
  }
  .search {
    position: relative;
    display: inline-block;
  }

  .auto_list {
    padding-left: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 500px;
    text-align: left;
    background-color: white;
    border: 1px solid rgb(218, 218, 218);
    border-radius: 7px;
  }

  .icon {
    position: absolute;
    top: 20%;
    left: 1%;
    width: 30px;
    padding: 5px;
    opacity: 70%;
  }
</style>
