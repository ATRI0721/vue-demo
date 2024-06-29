<template>
  <div class="product-detail">
    <img :src="image" alt="Product Image" class="product-image" />
    <div class="info">
      <div>
        <el-text class="title">{{ name }}</el-text>
      </div>
      <el-text class="description">{{ description }}</el-text>
      <div>
        <el-text class="price">
          <span style="font-size: 22px">￥</span>
          {{
            parseInt(price) +
            "." +
            (price - parseInt(price)).toFixed(2).split(".")[1]
          }}
        </el-text>
      </div>
      <div class="cart">
        <el-input-number v-model="num" :min="1" :max="10" />
        <el-button type="danger" @click="addToCart" style="margin-left: 20px"
          >加入购物车</el-button
        >
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="提示" width="450px" top="42vh">
    <span style="font-size: 18px; margin-top: 10px"
      >你还没有登录，是否前往登录？</span
    >
    <template #footer>
      <div class="dialog-footer">
        <div style="display: flex; justify-content: space-evenly; width: 100%">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              dialogVisible = false;
              $router.push('/login');
            "
            style="text-decoration: none; color: #fff"
            >登录
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "ProductDetail",
  data() {
    return {
      image: "",
      name: "",
      description: "",
      price: "",
      id: "",
      num: 1,
      dialogVisible: false,
    };
  },
  methods: {
    getProductDetail() {
      const url = this.$URL + "/product/" + this.$route.params.id;
      axios
        .get(url)
        .then((response) => {
          this.image = response.data.productImage;
          this.name = response.data.productName;
          this.id = response.data.productId;
          this.description = response.data.productDescription;
          this.price = response.data.productPrice;
        })
        .catch();
    },
    addToCart() {
      if (!this.$store.state.user.login) {
        this.dialogVisible = true;
        return;
      }
      const url = `${this.$URL}/user/${this.$store.state.user.id}/addCart/${this.id}/${this.num}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.code == 1) {
            ElMessage({
              message: "添加成功",
              type: "success",
            });
          } else {
            ElMessage({
              message: "重复添加",
              type: "error",
            });
          }
        })
        .catch();
    },
  },
  created() {
    this.getProductDetail();
  },
};
</script>

<style scoped>
.product-detail {
  height: 450px;
  min-width: 1080px;
  margin: 0 auto;

  display: flex;
}

.product-image {
  width: 450px;
  height: 450px;
  object-fit: cover;
  margin: 0;
  padding: 0;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 600px;
  height: 100%;
  margin-left: 30px;
}

.title {
  height: 66px;
  margin-top: 10px;
  margin-bottom: 5px;

  font-size: 32px;
  font-weight: bold;
  color: #545454;
}

.description {
  height: 100px;
  margin-bottom: 10px;

  font-size: medium;
  color: #666666;
}

.price {
  height: 50px;
  font-size: 32px;
  color: red;
}
</style>
