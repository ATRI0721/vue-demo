<template>
  <div class="home comment-layout">
    <div class="header">
      <MyHeader />
        <MySearcher />
        <MyBanner />
    </div>
    <div class="content">
      <div class="title">
        <img src="../assets/left.png" />
        <span>为你推荐</span>
        <img src="../assets/right.png" />
      </div>
      <div class="showcase">
        <ShowCase :amount= "20" :contenturl= "this.$URL + '/user/0'" :bgc="'e4e4e4'"/>
      </div>
    </div>
  </div>
</template>

<script>
import MySearcher from '../components/MySearcher'
import MyBanner from '../components/MyBanner'
import ShowCase from '@/components/ShowCase.vue';

export default {
  name: 'HomeView',
  components: {
    MySearcher,
    MyBanner,
    ShowCase
  }
}
</script>

<style>
:root {
  --proportion: 80%;
  --bgc-first: #fff;
  --bgc-second: #e4e4e4;
}

.header {
  height: 616px;
  background-color: var(--bgc-first);
}


.title {
  height: 65px;
  line-height: 45px;
  padding: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;

}

.title img {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.content {
  background-color: var(--bgc-first);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 1000px;
  margin: 0 auto;
}

.showcase {
  width: var(--proportion);
}
</style>
