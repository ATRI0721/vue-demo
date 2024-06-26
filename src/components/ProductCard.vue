<template>
  <div class="product-card">
    <a :href="'/product/' + id" class="product-link" style="text-decoration: none;">
      <el-image :src="image" fit="fill" class="product-image" lazy>
        <template #placeholder>
          <div class="image-slot">
            <i class="iconfont icon-image"></i>
          </div>
        </template>
        <template #error>
          <div class="image-slot">
            <i class="iconfont icon-image-failed-filled"></i>
          </div>
        </template>
      </el-image>
      <el-text class="product-title" line-clamp="2">{{ title }}</el-text>
      <div class="product-price">
        <i>￥</i>
        <i>{{ parseInt(price) }}</i>
        <i>{{ "." + (price - parseInt(price)).toFixed(2).split(".")[1] }}</i>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 230px;
  height: 320px; 
  border-radius: 10px;
}

.product-link {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
}

.product-image {
  height: 230px;
  width: 230px;
  padding: 0px;
  margin: 0px;
  border-radius: 10px;
  background-color: #ffffff;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 230px;
  font-size: 24px;
  color: #999;
}

.product-title {
  height: 48px;
  line-height: 24px;
  margin: 6px 15px;
  width: 200px;
  font-size: 14px;
  color:#666666;
}


.product-price {
  box-sizing: border-box;
  height: 30px;
  color: rgb(225, 37, 27);
}

.product-price i {
  font-style: normal;
  font-size: 14px;
}

.product-price i:first-child {
  margin-left: 20px;
}

.product-price i:nth-child(2) {
  font-size: 24px;
  font-weight: bold;
}


</style>
