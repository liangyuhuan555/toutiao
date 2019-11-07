<template>
  <div class="hotel_item">
    <div class="hotel_item_info" v-for="(item,index) in hotelInfo" :key="index">
      <div class="hotel_photo">
        <img :src="item.photos" alt />
      </div>
      <div class="hotel_info">
        <div class="name">
          <a>
            <p class="zh_name">{{item.name}}</p>
          </a>
          <p class="eng_name">
            {{item.alias}}
            <i class="iconfont icon-huangguan"></i>
            <i class="iconfont icon-huangguan"></i>
            <i class="iconfont icon-huangguan"></i>
            <span>经济型</span>
          </p>
        </div>
        <div class="stars">
          <i class="iconfont icon-xing fullStar" 
            v-for="(item2,index) in item.starsArray" :key="index">
            <i class="iconfont icon-xing halfStar" v-if="item2 !== 1"></i>
          </i>
          <span class="score">
            <i class="fullStar_orange">{{item.stars}}</i>分
          </span>
          <span class="evaluation">
            <i class="fullStar_orange">{{item.all_remarks}}</i>条评价
          </span>
          <span>
            <i class="fullStar_orange">{{item.common_remarks}}</i>篇游记
          </span>
        </div>
        <div class="position">
          <p>
            <i class="iconfont icon-weizhi"></i>位于: 高淳县淳溪镇镇兴路118号(高淳县委党校对面)
          </p>
        </div>
      </div>
      <div class="hotel_price">
        <div class="hotel_price_brand" v-for="(item,index) in item.products" :key="index">
          <div class="left">{{item.name}}</div>
          <div class="right">
            <span>
              <i class="hotel_price_orange">￥{{item.price}}</i>起 &gt;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelInfo"],
  mounted () {
    // console.log("111")
  },
};
</script>

<style lang='less' scoped>
.hotel_item {
  .hotel_item_info {
    display: flex;
    height: 260px;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid #eee;
    .hotel_photo {
      img {
        width: 320px;
        height: 100%;
      }
    }
    .hotel_info {
      width: 445px;
      padding-left: 20px;
      .name {
        .zh_name {
          font-size: 24px;
        }
        .eng_name {
          font-size: 16px;
          color: #999;
          i {
            color: #ff9900;
          }
        }
      }
      .stars {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        .icon-xing {
          color: #eff2f7;
          .halfStar {
          width: 50%;
          top: -11px;
          left:0;
          overflow: hidden;
          position: absolute;
          color: #f7ba2a;
        }
        }
        .score {
          padding-right: 10px;
        }
        .evaluation {
          padding-right: 20px;
        }
        .fullStar {
          position: relative;
        }
        .fullStar_orange {
          color: #f7ba2a;
        }
      }
      .position {
        font-size: 14px;
        color: #666;
      }
    }
    .hotel_price {
      flex: 1;
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      .hotel_price_brand {
        padding-right: 30px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        font-size: 14px;
        border-bottom: 1px solid #ebeef5;
        color: #666;
        .hotel_price_orange {
          color: #ff9900;
          font-size: 16px;
        }
      }
      .hotel_price_brand:hover {
        background-color: #f5f7fa;
        cursor: pointer;
      }
    }
  }
}
</style>