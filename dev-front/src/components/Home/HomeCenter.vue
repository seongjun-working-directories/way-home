<template>
  <div class="search">
    <form class="home_menu" action="./search" method="get">
      <input
        v-model="inputRest"
        type="text"
        class="search_bar input box"
        list="auto_List"
        name="query"
      />
      <datalist v-if="inputRestList && inputRest" id="auto_List" class="auto_list">
        <option
          v-for="rest in inputRestList"
          :key="rest"
          :value="rest"
          class="list-group-item"
          @click="optionClickevent(inputRestList[inputRestList.indexOf(rest)])"
        >
          {{ rest }}
        </option>
      </datalist>
      <img src="https://img.icons8.com/ios-glyphs/2x/search.png" class="icon" />
    </form>
  </div>
  <div>
    <router-link to="/map" class="home_menu map_button button is-white"> 내 위치 찾기 </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import axios from '@way-home/modules/api/axios';
  const inputRest = ref('');
  const modal = ref(false);

  const result: any = await axios.methods.$callAPI('GET', '/api/svarInfos');

  const highwayDataArray: string[] = [];

  //svarNm중에 휴게소명만 hiwayDataArray에 삽입
  for (let i = 0; i < result.data.result.length; i++) {
    if (result.data.result[i].svarNm.match('휴게소')) {
      highwayDataArray.push(result.data.result[i].svarNm);
    }
  }

  const inputRestList = computed(() => {
    // return highwayDataArray.filter((data) => data.includes(inputRest.value)).sort();
    return highwayDataArray.filter((data) => data.startsWith(inputRest.value)).sort();
  });

  function optionClickevent(rest: string) {
    inputRest.value = rest;
    modal.value = false;
  }
</script>

<style scoped>
  /*.search_bar {
    height: 50px;
    padding-left: 40px;
    width: 500px;
    font-size: 17px;
    border-radius: 7px;
  }*/
  .home_menu {
    width: 250px;
    margin: auto;
    margin-bottom: 10px;
    height: 50px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  .home_menu input {
    width: 250px;
    height: 50px;
    box-shadow: none;
    border-color: white;
  }
  .map_button {
    background-color: #ffca44;
  }
  .map_button:hover {
    background-color: #fbc02c;
  }
  .search {
    position: relative;
    display: inline-block;
  }
  option {
    padding-left: 40px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 500px;
    text-align: left;
    background-color: white;
    border: 1px solid rgb(218, 218, 218);
    border-radius: 7px;
  }

  .auto_list {
    padding-left: 40px;
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
    top: 25%;
    right: 1%;
    width: 30px;
    padding: 5px;
    opacity: 70%;
  }

  input::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
</style>
