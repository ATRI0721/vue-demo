<template>
  <div>
    <MyHeader />
    <div class="container">
      <ProductDetail />
      <h1><i class="iconfont icon-likefill"></i>猜你喜欢</h1>
      <ShowCase :contenturl="`${this.$URL}/product/${this.$store.state.user.id}/${id}`" :amount="4"/>
    </div>
  </div>
</template>

<script>
import ProductDetail from "@/components/ProductDetail.vue";
import ShowCase from "@/components/ShowCase.vue";

export default {
  name: "ProductView",
  props: ["id"],
  components: {
    ProductDetail,
    ShowCase,
  },
};
</script>

<style scoped>
.container {
    width: 86%;
    margin:10px auto;
}

h1 {
    margin-top: 30px;
    margin-bottom: 30px;
    color: firebrick;

}

h1 i{
    font-size: 40px;
    line-height: 40px;
}
</style>
