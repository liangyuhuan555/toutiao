<template>
  <div class="postlistitem">
       <postList/>
       <postcomment/>
  </div>
</template>

<script>
import postList from '@/components/post/postList.vue'
import postcomment from '@/components/post/postcomment.vue'
export default {
components:{
  postList,postcomment
}
}
</script>
<style lang="less" scoped>
.postcomment{
  width: 1000px;
  margin:0 auto;
}
</style>>

