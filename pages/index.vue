 <!--  测试 -->
<template>
  <div class="xyly_index">
    <!-- 轮播图 开始 -->
    <div class="index_carousel">
      <el-carousel indicator-position="outside" height="700px">
        <el-carousel-item v-for="(item,index) in swiperList" :key="index">
          <div
            :style="`background:url(${$axios.defaults.baseURL+item.url}) center center ;height: 700px`"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <!--  tabs栏 开始 -->
      <div class="index_tabs"></div>
      <!--  tabs栏 结束 -->
    </div>
    <!-- 轮播图 结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList: []
    };
  },
  asyncData(context) {
    return context.app.$axios.get("/scenics/banners").then(res => {
      return {
        swiperList: res.data.data
      };
    });
  }
};
</script>

<style  lang="less" scoped  >
.xyly_index {
  min-width: 1000px;
}
.index_carousel {
  height: 700px;
  position: relative;
  .index_tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}
</style>