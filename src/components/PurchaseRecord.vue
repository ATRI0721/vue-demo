<template>
  <div class="purchase-record">
    <ShowCase
      :contenturl="
        this.$URL + '/user/' + this.$store.state.user.id + '/getPurchases'
      "
      reverse="true"
      message="还没有购买记录哦~~"
    />
  </div>
</template>

<script>
import ShowCase from "@/components/ShowCase";
export default {
  name: "PurchaseRecord",
  components: {
    ShowCase,
  },
  data() {
    return {
      purchases: [],
    };
  },
};
</script>

<style scoped>
.purchase-record {
  width: 100%;
  background-color: #f5f5f5;
}
</style>
