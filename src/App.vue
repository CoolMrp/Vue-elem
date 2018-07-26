<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">详情</router-link>
      </div>
    </div>
    <!-- 使用路由 -->
    <!-- 把加载过的组件缓存起来 -->
    <keep-alive>
      <router-view :datas="datas" ref="sol"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// 引入头部模板
import vheader from './components/mod/header.vue'
// 引入axios(先在package.json文件的dependencies下添加axios)
import axios from 'axios'
export default {
  data () {
    return {
      datas: {
        // 商户的信息
        seller: {},
        // 商品数据
        goods: [],
        // 评论
        ratings: []
      }
    }
  },
  // 请求数据
  mounted () {
    // ajax 请求数据
    // 上传服务器json路径'/dist/static/data.json'
    axios.get('../static/data.json').then(res => {
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratings = res.data.ratings
      setTimeout(function () {
      }, 3000)
      // console.log(this.$refs.sol) // 是一个goods的vue组件
      // this.$nextTick(() => { // 在Dom页面加载完成后实例化滚动插件
      //   this.$refs.sol.scroll()
      // })
    })
  },
  components: {
    vheader
  }
}
</script>
