<template>
  <div id="map"> <nearModal /> </div>
</template>
<script lang="ts">
  import nearModal from '../components/layouts/nearModal.vue';

  export default {
    data() {
      return {
        map: null,
      };
    },
    methods: {
      initMap() {
        const container = document.querySelector('#map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        this.map = new window.kakao.maps.Map(container, options);
      },
    },
    components: {
      nearModal,
    },
    mounted() {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement('script');
        script.src =
          '//dapi.kakao.com/v2/maps/sdk.js?appkey=f9b0724b9eb556ffd37d7c7faa27f11a&autoload=false';
        script.addEventListener('load', () => {
          kakao.maps.load(this.initMap);
        });
        document.head.appendChild(script);
      } else {
        this.initMap();
      }
    },
  };
</script>
<style scoped>
  #map {
    height: 100vh;
  }
</style>
