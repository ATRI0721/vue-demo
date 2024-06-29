<template>
  <div
    class="showcase"
    :style="{ 'background-color': '#' + bgc, 'max-height': getHeight }"
  >
    <div v-if="this.products.length === 0" style="color: darkgrey;">
      {{ message }}
    </div>
    <span v-for="product in products" :key="product.id">
      <ProductCard
        :image="product.image"
        :title="product.title"
        :price="product.price"
        :id="product.id"
      />
    </span>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ShowCase",
  props: {
    bgc: {
      type: String,
      default: "FFFFFF",
    },
    contenturl: {
      type: String,
      default: () => {
        return this.getDefaultUrl();
      },
    },
    amount: {
      type: Number,
      default: 0,
    },
    maxlines: {
      type: Number,
      default: 99,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    }
  },
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProducts();
    // this.createTempProduct();
  },
  computed: {
    getHeight() {
      return this.maxlines * 320 + (this.maxlines - 1) * 20 + "px";
    },
  },
  methods: {
    getDefaultUrl() {
      return this.$store.state.url + "/user/0";
    },
    getProducts() {
      fetch(this.contenturl)
        .then((response) => response.json())
        .then((data) => {
          const tempproducts =
            this.amount === 0 ? data : data.slice(0, this.amount);
          for (let i = 0; i < tempproducts.length; i++) {
            this.products.push({
              title: tempproducts[i].productName,
              price: tempproducts[i].productPrice,
              image: tempproducts[i].productImage,
              id: tempproducts[i].productId,
            });
          }
          if (this.reverse) {
            this.products.reverse();
          }
        })
        .catch((error) => console.error(error));
    },
    // createTempProduct() {
    //   for (let i = 0; i < this.amount; i++) {
    //     this.products.push({
    //       title: `Product ${i + 1}`,
    //       price: i * 100,
    //       image: `https://picsum.photos/230`,
    //       id: i,
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
.showcase {
  border-radius: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-template-rows: max-content;
  justify-content: space-around;
  row-gap: 20px;
  padding: 20px;
  min-width: 790px;
  box-sizing: border-box;
  overflow: hidden;
}



</style>
