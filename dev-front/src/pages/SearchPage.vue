<template>
  <section id="home_middle">
    <div>
      <form action="/search" method="get">
        <input type="text" class="search_bar" name="query" :value="query" />
        <img src="https://img.icons8.com/ios-glyphs/2x/search.png" class="icon" />
      </form>
    </div>

    <br />

    <ul id="myTab" role="tablist">
      <li role="presentation">
        <button
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >휴게소</button
        >
      </li>
      <li role="presentation">
        <button
          id="profile-tab"
          type="button"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          >고속도로</button
        >
      </li>
    </ul>
    <div id="myTabContent">
      <div id="home" role="tabpanel" aria-labelledby="home-tab">
        <div>
          <a v-for="list in searchSvarVMList" :key="list.svarNm" href="/detail" aria-current="true">
            <div v-if="searchSvarVMList.length === 0">
              <strong>검색결과를 찾지 못했습니다. 다시 입력해주세요.</strong>
            </div>
            <div v-else>
              <small>{{ list.routeNm }}</small>
              <strong>{{ list.svarNm }}</strong>
            </div>
          </a>
        </div>
      </div>
      <div id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div>
          <a v-for="list in searchRouteNmList" :key="list.routeNm" href="#" aria-current="true">
            <div v-if="searchRouteNmList.length === 0">
              <strong>검색결과를 찾지 못했습니다. 다시 입력해주세요.</strong>
            </div>
            <div v-else>
              <small>{{ list.routeNm }}</small>
              <strong>{{ list.svarNm }}</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { HighwayData } from '@way-home/modules/api/types/index';

  //url 파라미터 읽기
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const query = urlParams.get('query') as string;

  const getItem = localStorage.getItem('highwayDataArray') as string;
  //[test]console.dir(typeof JSON.parse(getItem));

  const highwayDataArray: HighwayData[] = JSON.parse(getItem);

  const searchSvarVMList: HighwayData[] = [];
  const searchRouteNmList: HighwayData[] = [];

  for (let i = 0; i < highwayDataArray.length; i++) {
    //query값을 포함하는 svarNm SearchList에 삽입
    if (highwayDataArray[i].svarNm.includes(query)) {
      searchSvarVMList.push(highwayDataArray[i]);
    }
    //query값을 포함하는 routeNm SearchList에 삽입
    if (highwayDataArray[i].routeNm.includes(query)) {
      searchRouteNmList.push(highwayDataArray[i]);
    }
  }
</script>

<style scoped>
  html,
  body {
    width: 100%;
    height: 100%;
  }
  .search_bar {
    left: 0;
    width: 500px;
    height: 50px;
    padding-left: 40px;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.25);
    font-size: 17px;
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
