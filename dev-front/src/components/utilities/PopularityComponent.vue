<template>
  <div>
    <div class="row row-cols-1 row-cols-md-4 mb-4">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-body">
            <!-- <h1 class="card-title pricing-card-title">$0<small class="text-muted fw-light">/mo</small></h1> -->
            <p class="rest_title">시흥 휴게소</p>
            <div class="float-start" style="margin-left: 25%">
              <div class="star-rating">
                <span v-for="i in 5" :key="i">&star;</span>
                <div class="star-rating_check" :style="{ width: rating + '%' }">
                  <span v-for="i in 5" :key="i">&starf;</span>
                </div>
              </div>
            </div>
            <div class="float-end" style="margin-right: 25%; margin-top: 4px">
              <p class="rest_rating">{{ (5 * rating) / 100 }} / 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const rating = 60;
</script>
<style scoped>
  .rest_title {
    text-align: left;
    margin-left: 70px;
    font-size: 15px;
    font-weight: bold;
  }
  .rest_rating {
    text-align: right;
    margin-right: 15px;
    font-size: 13px;
  }
  .star-rating {
    position: relative;
    color: gold;
    display: inline-block;
  }
  .star-rating_check {
    position: absolute;
    top: 0;
    color: gold;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
