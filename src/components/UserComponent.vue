<template>
  <div class="main" v-if="!this.$store.getters.getLoginStatus">
    <a href="/login" id="login">
      登录<span class="iconfont icon-login"></span>
    </a>
    <a href="/register" id="register">
      注册<span class="iconfont icon-register"></span>
    </a>
  </div>
  <a href="" class="main" v-else>
    <img :src="avatar" />
    {{ this.$store.getters.getUserName }}
  </a>
</template>

<script>
export default {
  name: "UserComponent",
  data() {
    return {
      avatar: "",
    };
  },
  plugins: [],
  methods: {},
  created() {
    if (localStorage.getItem("username") && localStorage.getItem("userid")) {
      this.$store.commit("setUserName", localStorage.getItem("username"));
      this.$store.commit("setUserId", localStorage.getItem("userid"));
      this.$store.commit("setLoginStatus", true);
    }
    // this.$store.commit("setUserName", localStorage.getItem("username"));
    // this.$store.commit("setUserId", localStorage.getItem("userid"));
    // this.$store.commit("setLoginStatus", true);
  },
  mounted() {
    if (this.$store.getters.getLoginStatus) {
      this.avatar = require("../assets/logo.png");
    }
  },
  unmounted() {
    if (this.$store.getters.getLoginStatus) {
      localStorage.setItem("username", this.$store.getters.getUserName);
      localStorage.setItem("userid", this.$store.getters.getUserId);
    }
  },
};
</script>

<style scoped>
.main {
  width: 200px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.main a {
  color: #fff;
  text-decoration: none;
}

.main img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.iconfont {
  font-size: 24px;
  position: relative;
  top: 3px;
  left: 5px;
}
</style>
