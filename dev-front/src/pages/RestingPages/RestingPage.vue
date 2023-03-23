<template>
  <div>
    <p>휴게소 둘러보기</p>
    실제 이용자들이 평가하는 휴게소 정보를 확인 해보세요.

    <div class="search_form">
      <Suspense>
        <SearchComponent />
        <template #fallback>
          <input class="search_form-bar" type="text" placeholder="휴게소를 입력해주세요" />
        </template>
      </Suspense>
    </div>
    <br />
    <p>인기회사</p>
    <PopularityComponent />
  </div>
</template>

<script lang="ts" setup>
  import PopularityComponent from '../../components/utilities/PopularityComponent.vue';
  import SearchComponent from '../../components/utilities/SearchComponent.vue';
</script>
<style scoped>
  .search_form {
    margin-left: 16%;
    margin-top: 10px;
  }
  .search_form input {
    width: 500px;
    margin-left: 16%;
    margin-top: 10px;
  }
  p {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
  }
</style>
