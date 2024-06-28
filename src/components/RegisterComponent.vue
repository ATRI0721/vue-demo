<template>
  <div class="register-component">
    <img :src="require('../assets/dc.jpg')" alt="" />
    <div class="form-container">
      <div class="title">
        <h1>注册</h1>
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
          <el-form-item label="Confirm" prop="confirmPass">
            <el-input
              v-model="Form.confirmPass"
              type="password"
              :placeholder="placeholder.confirmPass"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button type="default" @click="resetForm"> Reset </el-button>
        <el-button type="primary" @click="submitForm"> Submit </el-button>
      </div>
      <el-link :underline="false" @click="goToLogin"
        >已有账号？ 点击登录</el-link
      >
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="注册成功"
      width="500"
      :before-close="handleClose"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleClose">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

function hasNumberAndLetter(value) {
  return /\d/.test(value) && /[a-zA-Z]/.test(value);
}

function validatePassword(rule, value, callback) {
  if (value === "") {
    callback(new Error("Please enter your password"));
  } else if (!hasNumberAndLetter(value)) {
    callback(
      new Error("Password must contain at least one number and one letter")
    );
  } else {
    callback();
  }
}

export default {
  name: "RegisterComponent",
  data() {
    return {
      Form: {
        username: "",
        pass: "",
        confirmPass: "",
      },
      placeholder: {
        Username: "",
        pass: "",
        confirmPass: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter your username",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "Username must be 3 to 10 characters",
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "Password must be 6 to 16 characters",
            trigger: "blur",
          },
          { validator: validatePassword, trigger: "blur" },
        ],
        confirmPass: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          { validator: this.validateConfirmPass, trigger: ["change", "blur"] },
        ],
      },
      dialogVisible: false,
    };
  },
  methods: {
    validateConfirmPass(rule, value, callback) {
      if (value === "") {
        callback(new Error("Please confirm your password"));
      } else if (value !== this.Form.pass) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const userData = {
            username: this.Form.username,
            password: this.Form.pass,
          };
          axios
            .post(this.$URL + "/user/register", userData)
            .then((response) => {
              if (response.data != -1) {
                localStorage.setItem("userid", JSON.stringify(response.data));
                localStorage.setItem("username", this.Form.username);
                this.$store.state.user.id = response.data;
                this.$store.state.user.name = this.Form.username;
                this.$store.state.user.login = true;
                this.dialogVisible = true;
              } else {
                ElMessage.error("用户名已存在, 请重新输入");
                this.$refs.formRef.resetFields();
              }
            })
            .catch();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.push({ path: '/' });
    },
    goToLogin() {
      this.$router.push({ path: '/login' });
    }
  },
};
</script>

<style scoped>
.register-component {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56vw;
  height: 50vh;
  border-radius: 10px;
}

.register-component img {
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
  height: 90px;
}

.form {
  height: 150px;
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
  padding-top: 20px;
  width: 80%;
}
</style>
