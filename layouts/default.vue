<template>
  <div>
       <Header />
        <nuxt />
        <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  }
};
</script>


  