<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="width: 18%">휴게소</th>
          <th scope="col" style="width: 70%">제목</th>
          <th scope="col" style="width: 4%">공감</th>
          <th scope="col" style="width: 4%">조회</th>
          <th scope="col" colspan="1" style="width: 4%">댓글</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th scope="row">
            <span class="badge rounded-pill text-bg-secondary">경산휴게소</span>
          </th>
          <td style="text-align: left">제목</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
        </tr>
        <!-- <tr v-for="b in board">
          <th scope="row">
            <span class="badge rounded-pill text-bg-secondary">
              {{ board.restTitle }}</span
            >
          </th>
          <td>{{ board.title }}</td>
          <td>{{ board.views }}</td>
          <td>{{ board.reply }}</td>
        </tr> -->
      </tbody>
    </table>
    <br />
  </div>
</template>

<script lang="ts" setup>
  /* import { onMounted } from 'vue';
interface content {
  restTitle: string;
  title: string;
  views: number;
  reply: number;
}
const board: content[] = [];
onMounted(async () => {
  await http.get('/board').then((response) => {
    board.values = response.data;
  });
}); */
</script>
<style scoped>
  a {
    margin-left: 80%;
  }
</style>
