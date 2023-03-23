<template>
  <div class="title"> 가장 검색이 빈번한 휴게소 </div>
  <div class="columns is-vcentered">
    <div class="column" v-for="item in hiwaySvarInfoList" :key="item.svarNm">
      <p>휴게소명: {{ item.svarNm }}</p>
      <p>주소: {{ item.svarAddr }}</p>
      <p>번호: {{ item.rprsTelNo }}</p>
    </div>
    <div class="column">
      <p class="bd-notification is-primary"
        >Second column with more content. This is so you can see the vertical alignment.</p
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { HiwaySvarInfo } from '@way-home/modules/api/types';

  // const hiwaySvarInfoList: HiwaySvarInfo[] = [];
  const hiwaySvarInfoList = [
    {
      svarNm: '하남드림휴게소',
      svarAddr: '경기 하남시 중부고속도로 117',
      rprsTelNo: '031-791-4200',
    },
    {
      svarNm: '옥천만남의광장휴게소',
      svarAddr: '충북 옥천군 옥천읍중앙로 135',
      rprsTelNo: '043-732-0081',
    },
    {
      svarNm: '낙동강의성(영천)휴게소',
      svarAddr: '경상북도 의성군 단밀면 도안로 757-68',
      rprsTelNo: '031-481-9758',
    },
  ];

  const insertInitialData = async (hiwaySvarInfoList: HiwaySvarInfo[]) => {
    // NOT IMPLEMENTED YET
    // [DATA-EXAMPLE]
    // await
  };

  // insertInitialData(hiwaySvarInfoList);

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
