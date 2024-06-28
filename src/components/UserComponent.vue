<template>
  <div class="main" v-if="!this.$store.state.user.login">
    <a href="/login" id="login">
      登录<span class="iconfont icon-login"></span>
    </a>
    <a href="/register" id="register">
      注册<span class="iconfont icon-register"></span>
    </a>
  </div>
  <a href="" class="main" v-else>
    <img :src="avatar" />
    {{ this.$store.state.user.name }}
  </a>
</template>

<script>

export default {
  name: "UserComponent",
  data() {
    return {
      avatar: require("@/assets/logo.png"),
    };
  },
  plugins: [],
  methods: {
    checkLogin() {
      if (localStorage.getItem("username") && localStorage.getItem("userid")) {
      this.$store.state.user.name = localStorage.getItem("username");
      this.$store.state.user.id = localStorage.getItem("userid");
      this.$store.state.user.login = true;
    }else {
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.state.user.login = false;
      this.$store.state.user.name = "";
      this.$store.state.user.id = 0;
    }
    }
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    window.addEventListener("beforeunload", this.checkLogin);
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.checkLogin);
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
