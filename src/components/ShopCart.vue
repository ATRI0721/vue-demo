<template>
  <div>
    <div class="products">
       <h2 style="color: crimson">
        购物车<i class="iconfont icon-shoppingcart" style="font-size: 36px"></i>
      </h2>
      <span v-for="(p, index) in cart" :key="p.id" class="product">
        <ProductColumn
          :title="p.productName"
          :price="p.productPrice"
          :id="p.productId"
          :image="p.productImage"
          class="product-column"
        />
        <el-input-number
          v-model="quantities[index]"
          :min="1"
          :max="10"
          style="width: 120px; margin: 0 20px"
        ></el-input-number>
        <el-button
          type="danger"
          :icon="Delete"
          @click="deleting(index)"
          circle
          style="margin: 0 10px"
        />
      </span>
    </div>
    <div class="total">
      <div class="total-price">
        总价: ￥<span style="font-size: 36px">{{ parseInt(totalPrice) }}</span
        ><span>{{
          "." + parseFloat(totalPrice).toFixed(2).split(".")[1]
        }}</span>
      </div>
      <div></div>
      <el-button
        type="danger"
        size="large"
        style="margin-right: 50px"
        @click="payDialogVisible = true"
        >结算</el-button
      >
    </div>
    <el-dialog
      v-model="payDialogVisible"
      title="确认支付"
      width="500"
      top="40vh"
      center
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="payDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="purchase"> 支付 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="500"
      top="40vh"
      center
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="removeFromCart"> 删除 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import ProductColumn from "./ProductColumn.vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default {
  name: "ShopCart",
  components: {
    ProductColumn,
  },
  data() {
    return {
      productIds: [],
      cart: [],
      quantities: [],
      payDialogVisible: false,
      deleteDialogVisible: false,
      toDelete: -1,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].productPrice * this.quantities[i];
      }
      return total.toFixed(2);
    },
  },
  setup() {
    return {
      Delete,
    };
  },
  methods: {
    async getProducts() {
      axios
        .get(this.$URL + "/user/" + this.$store.state.user.id + "/getCart")
        .then((response) => {
          if (response.data.code == 1) {
            for (let i = 0; i < response.data.cart.length; i++) {
              this.productIds.push(response.data.cart[i].id);
              this.quantities.push(response.data.cart[i].quantity);
            }
            this.getCart();
          } else {
            console.log(response.data.msg);
          }
        });
    },
    removeFromCart() {
      let index = this.toDelete;
      this.cart.splice(index, 1);
      this.productIds.splice(index, 1);
      this.quantities.splice(index, 1);
      this.deleteDialogVisible = false;
      this.updataCart();
    },
    async getCart() {
      for (let i = 0; i < this.productIds.length; i++) {
        axios
          .get(this.$URL + "/product/" + this.productIds[i])
          .then((response) => {
            this.cart.push(response.data);
          });
      }
    },
    deleting(index) {
      this.toDelete = index;
      this.deleteDialogVisible = true;
    },
    updataCart() {
      let productdatas = [];
      // console.log(this.productIds);
      for (let i = 0; i < this.productIds.length; i++) {
        productdatas.push({
          id: this.productIds[i],
          quantity: this.quantities[i],
        });
      }
      axios
        .post(
          this.$URL + "/user/" + this.$store.state.user.id + "/updateCart",
          {
            cart: productdatas,
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },
    purchase() {
      axios
        .post(
          this.$URL + "/user/" + this.$store.state.user.id + "/purchase",
          {
            cart: this.productIds,
          }
        )
        .then((response) => {
          if (response.data.code == 1) {
            ElMessage.success("支付成功");
            this.payDialogVisible = false;
            this.cart = [];
            this.productIds = [];
            this.quantities = [];
            this.updataCart();
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
        this.payDialogVisible = false;
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    window.addEventListener("beforeunload", this.updataCart);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.updataCart);
  },
};
</script>

<style scoped>
.products {
  max-width: 1200px;
  min-width: 900px;
  min-height: 550px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #5b5b5b;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product {
  display: grid;
  grid-template-columns: 1fr 140px 50px;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
}

.total {
  position: fixed;
  bottom: 0px;
  height: 80px;
  width: 100%;
  background-color: #f5f5f5;
  display: grid;
  align-items: center;
  grid-template-columns: 400px 1fr 120px;
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  color: crimson;
  box-sizing: border-box;
  margin-left: 30px;
}
</style>
