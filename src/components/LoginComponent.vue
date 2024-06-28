<template>
  <div class="login-component">
    <img :src="require('../assets/dc.jpg')" alt="" />
    <div class="form-container">
      <div class="title">
        <h1>登录</h1>
      </div>
      <div>
        <el-form
          ref="formRef"
          style="max-width: 600px"
          :model="Form"
          status-icon
          :rules="rules"
          label-width="120px"
          class="form"
        >
          <el-form-item label="Username" prop="username">
            <el-input
              v-model="Form.username"
              :placeholder="placeholder.Username"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input
              v-model="Form.pass"
              type="password"
              :placeholder="placeholder.pass"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button type="default" @click="register">
          Register
        </el-button>
        <el-button type="primary" @click="submitForm">
          Submit
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';


export default {
  name: "LoginComponent",
  props: [],
  data() {
    return {
      Form: {
        username: "",
        pass: "",
      },
      placeholder: {
        Username: "",
        pass: "",
      },
      rules: {
        username: [
          { required: true, message: "Please enter your username", trigger: "blur" },
          { min: 3, max: 10, message: "Username must be 3 to 10 characters", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "Please enter your password", trigger: "change" },
          { min: 6, max: 16, message: "Password must be 6 to 16 characters", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    checkUser() {
      axios
      .post(this.$URL + '/user/login', { username: this.Form.username , password: this.Form.pass })
      .then(response => {
          if(response.data == -1){
            return false;
          }else{
            localStorage.setItem("userid", response.data);
            this.$store.state.user.id = response.data;
            return true;
          }
      })
      .catch();
      return true;
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (!this.checkUser()) {
            ElMessage.error("Username or password is incorrect");
            return false;
          }
          localStorage.setItem("username", this.Form.username);
          this.$store.state.user.name = this.Form.username;
          this.$store.state.user.login = true;
          this.$router.push("/");
        } else {
          return false;
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
  created(){
    if(this.$store.state.user.login){
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.login-component {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56vw;
  height: 50vh;
  border-radius: 10px;
}

.login-component img {
  width: 56%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 44%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0 10px 10px 0;
}

.title {
  text-align: center;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
}

.form {
    height: 90px;
    width: 100%;
    box-sizing: border-box;
    padding-right: 30px;
    margin-right: 30px;
}

.button {
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  height: 60px;
  width: 80%;
  padding-bottom: 20px;
}
</style>
