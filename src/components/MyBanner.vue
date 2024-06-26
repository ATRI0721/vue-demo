<template>
  <div class="main">
  <div class="my-banner">
    <div class="category-list">
      <div v-for="(category, index) in categorylist" :key="index" style="margin-bottom: 5px;">
        <i        
        :class="'iconfont icon-' + iconlist[index]" 
        :style="'font-size: '+ (index === 1 || index === 10? 22 : 24) +'px; margin-right: 10px;'"></i>
        <span
          class="category-item"
          v-for="(item, index) in category"
          :key="index"
          style="text-decoration: none;color: #181818;"
        >
          <a :href="item.url">{{ item.name }}</a>
          <span v-if="index < category.length - 1" style="margin: 0px 5px">/</span>
        </span>
      </div>
    </div>
    <div class="carousel">
      <el-carousel height="450px" width="510px" trigger="click" arrow="always" motion-blur>
        <el-carousel-item
          class="item"
          v-for="(item, index) in carouselList"
          :key="index"
        >
          <a :href="item.href"><img :src="item.url" fit="contain" /></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="others">
      <el-row> </el-row>
      <el-row> </el-row>
      <el-row> </el-row>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "MyBanner",
  data() {
    return {
      categorylist: [],
       iconlist : [
        'diannao',
        'tongxinyuan',
        'shouji',
        'shafa',
        'yifu',
        'xiezi',
        'qiche',
        'pingguo',
        'naiping',
        'meizhuang',
        'tushu'
      ],
      carouselList: [
        {
          url: "https://picsum.photos//510/450",
          href: "https://www.baidu.com",
        },
        {
          url: "https://picsum.photos//510/450",
          href: "https://www.baidu.com",
        },
        {
          url: "https://picsum.photos//510/450",
          href: "https://www.baidu.com",
        },
        {
          url: "https://picsum.photos//510/450",
          href: "https://www.baidu.com",
        },
      ],
    };
  },
  methods: {
    initData() {
      const categoriestmp = [
        ["电脑", "办公", "文具"],
        ["工业品", "商业", "定制"],
        ["家电", "手机", "数码"],
        ["家具", "家装", "家居"],
        ["女装", "男装", "内衣"],
        ["女鞋", "男鞋", "运动"],
        ["汽车", "珠宝", "箱包"],
        ["食品", "生鲜", "健康"],
        ["母婴", "童装", "潮玩"],
        ["美妆", "洗护", "宠物"],
        ["娱乐", "图书", "鲜花"],
      ];
      for (let i = 0; i < categoriestmp.length; i++) {
        let tmp = [];
        for (let j = 0; j < categoriestmp[i].length; j++) {
          tmp.push({
            name: categoriestmp[i][j],
            url: "https://www.baidu.com",
          });
        }
        this.categorylist.push(tmp);
      }
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style scoped>

.my-banner {
  height: 450px;
  padding: 8px 0px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  min-width: 1000px;
  margin: 0 auto;
}

.category-item a:hover {
  color: red;
  text-decoration: none;
}

.carousel .item {
  display: flex;
  justify-content: center;
  align-items: center;
}


.category-list {
  height: 100%;
  width: 15%;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: #F3F6F8;
  border-radius: 10px;
  overflow: hidden;
  min-width: 200px;
}

.carousel {
  width: 510px;
  height: 100%;
  background-color: #F3F6F8;
}

.others {
  width: 24%;
  min-width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.others .el-row {
  height: 30%;
  width: 100%;
  background-color: #F3F6F8;
  border-radius: 10px;
}
</style>
