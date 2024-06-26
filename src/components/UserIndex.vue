<template>
  <div class="content">
    <div class="info">
      <el-avatar :size="80" :src="imageurl" style="margin: 0 30px" />
      <div class="name">
        <span>我的账号</span>
        <span>{{ this.$store.getters.getUserName }}</span>
      </div>
      <span></span>
      <el-button type="default" size="large" style="margin: 40px" @click="loginDialogVisible = true">退出登陆</el-button>
    </div>
    <div class="recommend">
      <div class="rtitle">
        <h3>为你推荐</h3>
      </div>
      <ShowCase
        :contenturl="this.$URL + '/user/' + this.$store.getters.getUserId"
        :amount="6"
      />
    </div>
     <el-dialog
      v-model="loginDialogVisible"
      title="确定要退出登录吗？"
      width="500"
      top="40vh"
      center
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="loginDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="quit"> 退出登陆 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ShowCase from "@/components/ShowCase.vue";

export default {
  name: "UserIndex",
  components: {
    ShowCase,
  },
  data() {
    return {
      imageurl: require("../assets/logo.png"),
      loginDialogVisible: false,
    };
  },
  methods: {
    quit() {
      this.loginDialogVisible = false;
      this.$store.commit("setUserName", "");
      this.$store.commit("setUserId", "");
      this.$store.commit("setLoginStatus", false);
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.content {
  min-width: 790px;
  max-width: 860px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.recommend {
  width: 100%;
}

.info {
  width: 100%;
  height: 170px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  grid-template-columns: 140px 140px 1fr 200px;
}

.name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333333;
}
</style>
