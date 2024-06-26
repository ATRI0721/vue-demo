<template>
    <div class="searcher-main">
    <div class="my-searcher">
        <div class="icon"><img src="../assets/logo.png" /></div>
        <div class="input-box">
            <el-input v-model="input" :placeholder="placeholder" style="width: 350px;"/>
            <el-button type="primary" color="red" @click="search">
                <i class="iconfont icon-search"></i>
            </el-button>
        </div>
    </div>
    </div>
</template>


<script>


export default {
    name: 'MySearcher',
    created() {
        this.timer = setInterval(this.changePlaceholder, 3000);
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
    data() {
        return {
            input: '',
            placeholder: '请输入搜索内容',
            placeholderList: ['请输入搜索内容', 'please input', '搜索一下吧']
        }
    },
    methods: {
        search() {
            console.log(this.input);
        },
        changePlaceholder() {
            let index = Math.floor(Math.random() * this.placeholderList.length);
            if (this.placeholder === this.placeholderList[index]) {
                index = (index + 1) % this.placeholderList.length;
            }
            this.placeholder = this.placeholderList[index];
        }
    }
}
</script>


<style scoped>
.searcher-main {
    background-color: #f5f5f5;
}

.my-searcher {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    min-width: 1000px;
    max-width: 84%;
    margin: 0 auto;
}

.icon {
    height: 100px;
    width: 136px;
}

.icon img {
    height: 100%;
    width: 100%;
}

.input-box {
    width: 40%;
    height: 24px;
    display: flex;
    align-items: center;
}

.input-box el-input {
    border-color: red;
}
</style>
