<template>
    <div>
        <MyHeader />
        <MySearcher />
        <ShopCart />
    </div>
</template>


<script>
import MySearcher from '../components/MySearcher.vue'
import ShopCart from '../components/ShopCart.vue'

export default {
        name: 'CartView',
        components: {
            MySearcher,
            ShopCart
        },
        created() {
            if(this.$store.getters.loginstatue === false){
                this.$router.push('/login')
            }
        }
}
</script>


<style scoped></style>