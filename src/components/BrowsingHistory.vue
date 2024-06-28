<template>
  <div class="browsing-history">
    <ShowCase
      :contenturl="
        this.$URL + '/user/' + this.$store.state.user.id + '/getClicks'
      "
      reverse="true"
      message="还没有浏览记录哦~~"
    />
  </div>
</template>

<script>
import ShowCase from "./ShowCase.vue";

export default {
  name: "BrowsingHistory",
  components: {
    ShowCase,
  },
  data() {
    return {
      browsingHistory: [],
    };
  },
};
</script>

<style scoped>
.browsing-history {
  width: 100%;
  background-color: #f5f5f5;
}
</style>
