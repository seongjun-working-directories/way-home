<template>
  <div>
    <Suspense>
      <!-- <template #default> -->
      <CategoryComponent />

      <!-- 로딩 -->
      <template #fallback>
        <div>
          카테고리 :
          <select id="select_route">
            <option>-</option>
          </select>
          <select id="select_rest">
            <option>공통</option>
          </select>
        </div>
      </template>
    </Suspense>
    <br />
    <div>
      <textarea id="title" v-model="inputTitle" placeholder="제목"> </textarea>
      <br />
      <textarea id="content" v-model="inputContent" placeholder="본문"></textarea>
      <br />
      <FileComponent />
      <br />
      <button
        type="button"
        :disabled="inputTitle === '' || selectedRestarea === '공통'"
        @click="add"
      >
        임시저장
      </button>
      <button type="button" @click="read"> 불러오기 </button>
      <button
        type="button"
        :disabled="inputTitle === '' || inputContent === ''"
        data-bs-dismiss="modal"
        @click="submit"
      >
        완료
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import type { BoardData } from '@way-home/modules/api/types/index';

  const inputTitle = ref('');
  const inputContent = ref('');

  let selectedHighway = localStorage.getItem('selectedHighway') as string;
  let selectedRestarea = localStorage.getItem('selectedRestarea') as string;

  function add() {
    localStorage.setItem('selectedHighway', selectedHighway);
    localStorage.setItem('selectedRestarea', selectedRestarea);
    localStorage.setItem('title', inputTitle.value);
    localStorage.setItem('content', inputContent.value);
    inputTitle.value = '';
    inputContent.value = '';
  }

  function read() {
    selectedHighway = localStorage.getItem('selectedHighway') as string;
    selectedRestarea = localStorage.getItem('selectedRestarea') as string;
    inputTitle.value = localStorage.getItem('title') as string;
    inputContent.value = localStorage.getItem('content') as string;
  }

  async function submit() {
    const token = localStorage.getItem('token') as string;
    const date = new Date();
    const year = `${date.getFullYear()}년`;
    const month = `${date.getMonth()}월`;
    const day = `${date.getDate()}월`;
    const hour = `${date.getHours()}시`;
    const minutes = `${date.getMinutes()}분`;
    const seconds = `${date.getSeconds()}초`;
    const time = year + month + day + hour + minutes + seconds;

    const board: BoardData = {
      id: '0',
      title: inputTitle.value,
      author: token,
      content: inputContent.value,
      date: time,
      routeNm: selectedHighway,
      svarNm: selectedRestarea,
    };

    if (board) {
      console.log('TEST');
    }

    // [TEST] console.log(boardSubmit);
  }
</script>

<style scoped>
  #content {
    height: 150px;
  }
  button {
    margin: 2px;
    height: 25px;
  }
  #select_route {
    width: 225px;
    height: 35px;
    margin: 5px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
  }
  #select_rest {
    width: 250px;
    height: 35px;
    margin: 5px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
  }
</style>
