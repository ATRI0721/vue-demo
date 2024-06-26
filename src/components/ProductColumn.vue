<template>
  <div class="product-column" :style="{ backgroundColor: bgc }">
    <a :href="'/product/' + id"><img :src="image" alt="product" /></a> 
    <el-text class="title" line-clamp="2">{{ title }}</el-text>
    <div class="product-price">
      <i>￥</i>
      <i style="font-size: 26px;">{{ parseInt(price) }}</i>
      <i>{{ "." + (price - parseInt(price)).toFixed(2).split(".")[1] }}</i>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductColumn",
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
    bgc: {
      type: String,
      default: "#f5f5f5",
    },
  },
};
</script>

<style scoped>
.product-column {
  height: 100px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
    line-height: 100px;
}

img {
  height: 80px;
  width: 80px;
  padding: 0;
  margin: 10px;
  border-radius: 8px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  height: fit-content;
  margin: 10px;
}

.product-price {
  color: rgb(225, 37, 27);
  margin-right: 10px;
}

.product-price i {
  font-style: normal;
  font-size: large;
}
</style>
