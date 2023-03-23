<template>
  <div class="title"> 최근에 정보 변경된 휴게소</div>
  <div class="columns is-vcentered">
    <div class="column" v-for="item in updatedRestList" :key="item.brdName">
      <!--key 어떤 값-->
      <p>{{ item.stdRestNm }} {{ item.brdName }}</p>
      <p>{{ item.svarAddr }}</p>
      <p>{{ item.stime }} ~ {{ item.etime }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { RestBestFood } from '@way-home/modules/api/types';
  // const updatedRestList: RestBestFood[] = [];
  const updatedRestList = [
    {
      stdRestNm: '서울만남(부산)휴게소',
      svarAddr: '서울 서초구 원지동10-16',
      brdName: '할리스커피',
      stime: '07:00',
      etime: '22:00',
    },
    {
      stdRestNm: '죽전(서울)휴게소',
      svarAddr: '경기 용인시 죽전2동866-2',
      brdName: '파스구찌',
      stime: '08:30',
      etime: '20:30',
    },
    {
      stdRestNm: '죽전(서울)휴게소',
      svarAddr: '경기 용인시 죽전2동866-2',
      brdName: '탐앤탐스',
      stime: '08:30',
      etime: '20:30',
    },
  ];
</script>
<style scoped>
  .title {
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
  }
  .column {
    border-radius: 8px;
    margin: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .column p {
    text-align: left;
    padding: 0 7px 0 7px;
  }
</style>
