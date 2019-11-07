<template>
  <div class="hotelmap">
    <div class="hotelmap_left">
      <div class="hotelmap_left_district">
        <span class="hotelmap_left_district_quyu">区域:</span>
        <span class="hotelmap_left_district_name" ref="reference">
          <span>全部</span>
          <span
            v-for="(item, index) in districtdata.name"
            :key="index"
            @click="screening(districtdata.name[index])"
            ref="screening"
          >{{item.name}}</span>
          <br />
          <i style="font-style: normal; cursor: pointer;" @click="screeningmore">
            <i class="iconfont icon-jiantou_shang"></i>
            等{{districtdata.screeninglength}}个区域
          </i>
        </span>
      </div>
      <div class="hotelmap_left_strategy">
        <span>攻略:</span>
        <div class="hotelmap_left_strategy_name">{{districtdata.strategy}}</div>
      </div>
      <div class="hotelmap_left_average">
        均价 &nbsp;&nbsp;&nbsp;: &nbsp;
        <el-tooltip
          class="item"
          effect="dark"
          content="等级均价由平日价格计算得出，节假日价格会有上浮。"
          placement="top-start"
        >
          <span class="el-icon-question hotelmap_left_average_icon1"></span>
        </el-tooltip>

        <el-tooltip
          visible-arrow="false"
          class="item"
          effect="dark"
          content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
          placement="bottom"
        >
          <div class="hotelmap_left_rate">
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <span class="hotelmap_left_average_price">&nbsp;&nbsp;&nbsp;¥888</span>
          </div>
        </el-tooltip>
        <el-tooltip
          visible-arrow="false"
          class="item"
          effect="dark"
          content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
          placement="bottom"
        >
          <div class="hotelmap_left_rate">
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <span class="hotelmap_left_average_price">&nbsp;&nbsp;&nbsp;¥1888</span>
          </div>
        </el-tooltip>
        <el-tooltip
          visible-arrow="false"
          class="item"
          effect="dark"
          content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
          placement="bottom"
        >
          <div class="hotelmap_left_rate">
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <div class="iconfont icon-cs-hg-1 hotelmap_left_average_icon2"></div>
            <span class="hotelmap_left_average_price">&nbsp;&nbsp;&nbsp;¥2888</span>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="hotelmap_right">
      <div class="container" v-show="Ishow"></div>
      <div id="container" v-show="!Ishow"></div>
      <div id="panel" v-show="!Ishow"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hotemapdata: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      Ishow: false,

      districtdata: {
        screening: "",
        name: [],
        // 区域个数
        screeninglength: "",
        strategy:
          "北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。"
      },

      // 点击那个区域的名字
      screeningname: "",
      location: {}
    };
  },
  // 监听父组件传过的数据在执行生成点实例
  watch: {
    hotemapdata() {
      this.hotemapdata.forEach(element => {
        console.log(element.location.longitude);
        console.log(element.location.latitude);
      });

      // console.log(this.hotemapdata);
      // 请求城市下的景点
      this.$axios.get("/cities", { params: { name: "南京" } }).then(res => {
        // console.log(res);
        // 给区域名称赋值
        this.districtdata.name = res.data.data[0].scenics;
        // 多少个景点名称的数量
        this.districtdata.screeninglength = this.districtdata.name.length;
        // console.log(this.districtdata.name);
      });

      // 地图接口
      window.onLoad = () => {
        // 5  js 加载完毕了！！！
        var map = new AMap.Map("container", {
          // 地图的缩放倍数
          zoom: 12,
          resizeEnable: true
          // 要显示的经纬度[经度，纬度]
          // center: [116.39, 39.9]
        });
        var currentCenter = map.getCenter();
        // 6 使用插件
        var toolbar = new AMap.ToolBar();
        // map.plugin(toolbar);
        map.addControl(toolbar);
        // // 多个点实例组成的数组
        var markerList = [];

        this.hotemapdata.forEach((e, i) => {
          console.log(e.location.longitude);
          console.log(e.location.latitude);

          // 点标记显示内容，HTML要素字符串
          var markerContent =
            '<div class="marker-route el-icon-location" style=font-size:35px;color:#4196fc></div>';
          markerList.push(
            new AMap.Marker({
              // 将 html 传给 content
              content: markerContent,
              // 以 icon 的 [center bottom] 为原点
              offset: new AMap.Pixel(-13, -30),

              // 点标记的坐标
              position: new AMap.LngLat(
                e.location.longitude,
                e.location.latitude
              ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              // 鼠标移入的时候的提示
              title: e.name
            })
          );
        });

        console.log(markerList);

        map.add(markerList);
        // 自动适配到合适视野范围
        // 无参数，默认包括所有覆盖物的情况
        map.setFitView();
      };

      // 1 定义 高度地图 js 路径  同时下载了插件
      //  同时下载了 其他插件
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=b329f3568c3769213b6cc011593bf89d&callback=onLoad&plugin=AMap.ToolBar";
      // 2 手动创建了一个script标签
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      // 3 定义 script标签的 引入地址
      jsapi.src = url;
      // 4 把script标签 放入到 html标签的 head标签的中
      document.head.appendChild(jsapi);
    }
  },
  methods: {
    screening(v) {
      this.districtdata.screening = v.area;
      // 点击当前的区域名字
      this.screeningname = v.name;
      console.log(v.name);
      this.Ishow = true;
      //  setTimeout (this.Ishow=false,1000)
      setTimeout(res => {
        this.Ishow = false;
      }, 1000);
    },
    // 点击区域进行筛选 加样式
    screeningmore() {
      this.$refs.reference.style.height = "70px";
    }
  }
};
</script>

<style lang="less" scoped>
.hotelmap {
  width: 1000px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .hotelmap_left {
    flex: 3;
    font-size: 14px;
    color: #666;
    .hotelmap_left_district,
    .hotelmap_left_strategy {
      height: 165px;
      padding: 25px 25px 10px 0;
      display: flex;
      .hotelmap_left_district_quyu {
        flex: 1;
      }
      .hotelmap_left_district_name,
      .hotelmap_left_strategy_name {
        padding-left: 25px;
        flex: 16;
        font-size: 13px;
        width: 30px;
        height: 140px;
        overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box; //必须结合的属性，将对象作为弹性伸缩盒子模型显示
        // -webkit-line-clamp: 2; //控制文本的行数
        // -webkit-box-orient: vertical; //必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式
        // overflow: hidden; //超出的文本隐藏
        // text-overflow: ellipsis; //溢出用省略号显示
        span {
          display: inline;
          cursor: pointer;
          text-align: center;
          margin-right: 20px;
        }
        span:hover {
          color: #0094ff;
          border-bottom: 1px #0094ff solid;
        }
      }
    }
    .hotelmap_left_strategy {
      height: 75px;
      padding: 0px 25px 10px 0;
    }
    .hotelmap_left_average {
      display: flex;
      position: relative;
      height: 40px;
      padding: 25px 25px 50px 0;
      .hotelmap_left_rate {
        display: flex;
        padding-right: 60px;
        // align-items: center;
        // justify-content: center;
        > div {
          flex: 1;
        }
      }

      .hotelmap_left_average_icon1 {
        position: absolute;
        top: 26px;
        left: 28px;
        color: #ccc;
      }
      .hotelmap_left_average_icon2 {
        color: #ff9901;
      }
    }
  }
  .hotelmap_right {
    width: 100%;
    height: 100%;
    flex: 2;
    padding-top: 18px;
    #container {
      width: 100%;
      height: 95%;
      margin: 0 auto;
    }
  }
  .icon-jiantou_shang {
    font-size: 12px;
    color: #ff9901;
  }
  .container {
    margin: 100px auto;
    width: 2px;
    height: 2px;
    border-radius: 1px;
    box-shadow: 0 -12px 0 3px black, /*上*/ 0 12px 0 1px #333,
      /*下*/ -12px 0 0 1px #333, /*左*/ 12px 0 0 1px #333,
      /*右*/ -9px -9px 0 1px #333, /*左上*/ 9px -9px 0 2px #333,
      /*右上*/ -9px 9px 0 1px #333, /*左下*/ 9px 9px 0 1px #333 /*右下*/;
    animation: loading 2s linear 0s infinite;
    -webkit-animation: loading 2s linear 0s infinite;
    -o-animation: loading 2s linear 0s infinite;
    -moz-animation: loading 2s linear 0s infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-o-keyframes loading {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(360deg);
    }
  }

  @-moz-keyframes loading {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
}
</style>