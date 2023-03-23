<template>
  <div>
    <div>
      <select id="sort_by">
        <option selected>최신순</option>
        <option value="1">공감순</option>
        <option value="2">조회순</option>
        <option value="3">댓글순</option>
      </select>
    </div>
    <div>
      <form id="search_form" role="search">
        <input
          type="search"
          placeholder="검색어를 입력해주세요"
          aria-label="검색어를 입력해주세요"
        />
        <button type="submit"> 검색 </button>
      </form>
    </div>

    <br />
    <TableComponent />
    <div v-show="loginTrue()">
      <a href="/post">
        <button type="button">글쓰기</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TableComponent from '../../components/utilities/TableComponent.vue';
  function loginTrue() {
    if ((localStorage.getItem('token') as string) !== '') {
      return true;
    } else return false;
  }
</script>
<style scoped>
  #sort_by {
    width: 100px;
    margin-left: 50px;
  }
  #search_form {
    width: 300px;
  }
  #search_form button {
    width: 80px;
  }
  a {
    margin-left: 90%;
  }
</style>
