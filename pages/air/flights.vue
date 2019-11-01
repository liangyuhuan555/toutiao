<template>
  <div>
    <flights :data="flightsdata.info" />
    <flightshead />
    <flightsitem v-for="(item) in currentFlights" :key="item.id" :data="item" />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.current_page"
      :page-sizes="pages.page_sizes"
      :page-size="pages.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    ></el-pagination>
  </div>
</template>

<script>
import flights from "@/components/air/flights.vue";
import flightshead from "@/components/air/FlightsHead.vue";
import flightsitem from "@/components/air/FlightsItem.vue";
export default {
  data() {
    return {
      pages: {
        current_page: 1,
        page_sizes: [5, 10, 15, 20],
        page_size: 5,
        total: 30
      },
      flightsdata: {
        flights: [],
        info: {},
        options: {}
      },
      // 被分页的机票列表
      currentFlights: []
      //  @size-change="handleSizeChange"              每页要显示的数量
      // @current-change="handleCurrentChange"         当前页码
      // :current-page="currentPage4"                  当前所在的页码
      // :page-sizes="[10, 20, 30, 40]"                每页显示个数选择器的选项设
      // :page-size="100"                              每个分页显示的数量
      // layout="total, sizes, prev, pager, next, jumper"
      // :total="100"                                   总共的数量
    };
  },
  components: {
    flights,
    flightshead,
    flightsitem
  },
  methods: {
    // 获取机票数据
    getList(isFirst) {
      // 因为第一次请求就把所有列表数据请求到了 所有需要判断一下是不是第一次请求 不是第一次可以直接拿数据即可 传参为true 就是第一次
      if (isFirst) {
        console.log(isFirst);
        let form = this.$route.query;
        // console.log(form)
        this.$axios.get("/airs", { params: form }).then(res => {
          console.log(res);
          this.flightsdata = res.data;
          // 机票数据的数组长度就是列表的数量
          this.pages.total = this.flightsdata.flights.length;
          // 根据不同页码显示不同的数据公式
          // 当前页码-1 * 每页条数
          this.currentFlights = this.flightsdata.flights.slice(
            (this.pages.current_page - 1 )* this.pages.page_size,
            this.pages.current_page * this.pages.page_size
          );
        });
      } else {
        this.currentFlights = this.flightsdata.flights.slice(
          (this.pages.current_page - 1) * this.pages.page_size,
          this.pages.current_page * this.pages.page_size
        )
      }
    },
    // 每页要显示的页面数量点击事件 
    // 每次改变选择数量 都可以返回选中的数量数值
    handleSizeChange(value) {
      
      console.log(value);
      this.pages.page_size = value;
      this.getList();
    },
    // 单前页码的选择事件要显示那一页
    // 每次改变选择数量 都可以返回选中的页码数
    handleCurrentChange(value) {
      console.log(value);
      this.pages.current_page = value;
      this.getList();
    }
  },
  mounted() {
    this.getList(true);
  }
};
</script>

<style lang="less" scoped>
div {
  width: 1000px;
  margin: 0 auto;
}
</style>>

