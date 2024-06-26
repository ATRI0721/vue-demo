<template>
  <div class="header">
    <div class="left">
      <UserComponent />
    </div>
    <div class="right">
      <a href="/" class="items">首页<span class="iconfont icon-home"></span></a>
      <span @click="gotocart" class="items"
        >购物车<span class="iconfont icon-shoppingcart"></span
      ></span>
      <span @click="gotouser" class="items"
        >个人中心<span class="iconfont icon-person"></span
      ></span>
    </div>
    <el-dialog v-model="dialogVisible" title="提示" width="500" top="40vh">
      <span style="font-size: 18px; margin-top: 10px"
        >你还没有登录，是否前往登录？</span
      >
      <template #footer>
        <div class="dialog-footer">
          <div
            style="display: flex; justify-content: space-evenly; width: 100%"
          >
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="dialogVisible = false; $router.push('/login');"
              style="text-decoration: none; color: #fff"
              >登录
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
  <div style="height: 50px"></div>
</template>

<script>
import UserComponent from "@/components/UserComponent";
import { ElMessage } from "element-plus";

export default {
  name: "MyHeader",
  components: {
    UserComponent,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    checkLogin() {
      if (
        this.$store.getters.getUserId == null ||
        this.$store.getters.getUserId === "" ||
        this.$store.getters.getUserId === 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    checkPage() {
      if (this.$route.path === "/login") {
        ElMessage(
          {
            type: "info",
            message: "请先登录",
          }
        )
        return true;
      } else {
        return false;
      }
    },
    gotocart() {
      if (this.checkPage()) return;
      if (this.checkLogin()) {
        this.$router.push("/user/cart");
      } else {
        this.dialogVisible = true;
      }
    },
    gotouser() {
      if (this.checkPage()) return;
      if (this.checkLogin()) {
        this.$router.push("/user");
      } else {
        this.dialogVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #333;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  position: fixed;
  z-index: 999;
}

.iconfont {
  font-size: 24px;
  position: relative;
  top: 3px;
  left: 5px;
}

#home {
  width: 70px;
}

.left {
  float: left;
  margin-left: 30px;
}

.right {
  float: right;
  margin-right: 30px;
  width: 330px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.items {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
</style>
