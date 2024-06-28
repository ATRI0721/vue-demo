<template>
  <div style="background-color: #f5f5f5">
    <MyHeader />
    <MySearcher />
    <div class="user-main">
      <div class="el-menu">
        <el-menu
          default-active="1"
          class="el-menu"
          active-text-color="#ffa200"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <span class="el-menu-items">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="this.$router.push('/user/cart')">
            <span class="el-menu-items">我的购物车</span>
          </el-menu-item>
          <el-menu-item index="3" >
            <span class="el-menu-items">历史浏览</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span class="el-menu-items">购买记录</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="max-width: 860px;min-height: 790px;">
        <UserIndex v-if="currentPage == 1" />
        <BrowsingHistory v-else-if="currentPage == 3" />
        <PurchaseRecord v-else-if="currentPage == 4" />
      </div>
    </div>
  </div>
</template>

<script>
import MySearcher from "@/components/MySearcher.vue";
import UserIndex from "@/components/UserIndex.vue";
import BrowsingHistory from "@/components/BrowsingHistory.vue";
import PurchaseRecord from "@/components/PurchaseRecord.vue";

export default {
  name: "UserView",
  components: {
    MySearcher,
    UserIndex,
    BrowsingHistory,
    PurchaseRecord,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    handleSelect(index) {
      this.currentPage = index;
      console.log(index);
    },
  },
  created() {
    if (!this.$store.state.user.login) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.user-main {
  width: fit-content;
  margin: 20px auto;
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
}

.el-menu {
  width: 260px;
  height: fit-content;
  background-color: #fff;
  border-radius: 16px;
}

.el-menu-items {
  margin-left: 40px;
}
</style>
