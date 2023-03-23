<template>
  <div class="modal-wrapper">
    <button
      class="modal-list"
      v-for="item in nearHiwayList"
      :key="item.svarNm"
      @click="clickDetailModal"
    >
      <span class="rest_title">{{ item.svarNm }}</span>
      <ul>
        <li>위치 {{ item.svarAddr }}</li>
        <li>소개</li>
        <li>간략 정보</li>
      </ul>
    </button>
  </div>
</template>
<script lang="ts" setup>
  import { HiwaySvarInfo } from '@way-home/modules/api/types';
  import { Ref, ref } from 'vue';

  const showDetailModal: Ref<boolean> = ref(false);
  // const nearHiwayList: HiwaySvarInfo[] = [];
  const nearHiwayList = [
    {
      svarNm: 'dfdf',
      svarAddr: 'dfdf',
    },
    {
      svarNm: 'dfdf',
      svarAddr: 'dfdf',
    },
    {
      svarNm: 'dfdf',
      svarAddr: 'dfdf',
    },
  ];
  const clickDetailModal = () => {};
</script>
<style>
  .modal-wrapper {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 40px;
    bottom: 0;
    width: 320px;
    margin: 0 20px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 5px 0;
  }

  .modal-list {
    word-break: keep-all;
    text-align: left;
    padding: 15px 20px;
    min-width: 100px;
    position: relative;
    line-height: 1.9;
    cursor: pointer;
    background-color: #fefefe;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 5px;
    border-radius: 8px;
    color: black;
    width: 300px;
  }
  .modal-list:hover {
    background-color: #fbc02c;
  }
  .rest_title {
    font-size: 20px;
  }
</style>
