<template>
  <div>
    카테고리 :
    <select id="selectRoute" v-model="selectedHighway" name="" @change="changeSelect">
      <option
        v-for="highway in highwayDataDeduplicationArray"
        :key="highway.routeNm"
        :value="highway.routeNm"
      >
        {{ highway.routeNm }}
      </option>
    </select>

    <select id="selectRest" v-model="selectedRestarea" name="" @change="changeSelect">
      <option v-for="rest in selectedrestList" :key="rest.svarNm" :value="rest.svarNm">
        {{ rest.svarNm }}
      </option>
    </select>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import type { HighwayData } from '@way-home/modules/api/types/index';
  const selectedHighway = ref('-');
  const selectedRestarea = ref('공통');

  localStorage.setItem('selectedHighway', selectedHighway.value);
  localStorage.setItem('selectedRestarea', selectedRestarea.value);

  function changeSelect() {
    if (selectedHighway.value !== '-' && selectedRestarea.value === '공통') {
      return;
    }
    localStorage.setItem('selectedHighway', selectedHighway.value);
    localStorage.setItem('selectedRestarea', selectedRestarea.value);
  }

  const getItem = localStorage.getItem('highwayDataArray') as string;
  //[test]console.dir(typeof JSON.parse(getItem));

  const highwayDataArray: HighwayData[] = JSON.parse(getItem);

  // 첫 번째 select문에서 routeNM이 같으면 삭제하는 함수
  const removeDuplicates = (array: Array<any>, key: string) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter((i: any) => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };
  const highwayDataDeduplicationArray: HighwayData[] = removeDuplicates(
    highwayDataArray,
    'routeNm',
  );

  // 첫 번째 routeNM에 해당되는 두 번째 select문에서 svarNm이 나오는 리스트
  const selectedrestList = computed(() => {
    return highwayDataArray.filter((rest) => rest.routeNm === selectedHighway.value);
  });
</script>
<style scoped>
  #selectRoute {
    width: 225px;
    height: 35px;
    margin: 5px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
  }
  #selectRest {
    width: 250px;
    height: 35px;
    margin: 5px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
  }
</style>
