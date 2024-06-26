<template>
  <div>
    <MyHeader></MyHeader>
    <div class="login-register-container">
      <component
        :is="currentComponent"
        class="login-register-component"
      ></component>
    </div>
  </div>
</template>

<script>
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import MyHeader from "@/components/MyHeader.vue";

export default {
  name: "LoginRegister",
  components: {
    LoginComponent,
    RegisterComponent,
    MyHeader,
  },
  computed: {
    currentComponent() {
      return this.$route.name === "login"
        ? "LoginComponent"
        : "RegisterComponent";
    },
  },
};
</script>

<style scoped>
.login-register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
