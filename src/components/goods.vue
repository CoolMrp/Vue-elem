<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in datas.goods" :key="index">
          <span class="text">
            <!-- type大于0显示 否则隐藏 -->
            <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item,index) in datas.goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="(food,index) in item.foods" :key="index" @click="detail(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}</span>
                  <div class="price">
                    <span class="newPrice">${{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice" :food="food"></shopcart>
    <!-- 使用ref绑定子元素 可以使用子元素的方法和内容 -->
    <foodDetail :foodDatas="foodMessage" ref="foodDetail"></foodDetail>
  </div>
</template>
<script>
import icon from './mod/icon.js'
import shopcart from './mod/shopcart.vue'
import Scroll from 'better-scroll'
import cartcontrol from './mod/cartcontrol.vue'
// 引入详情页
import foodDetail from './mod/foodDetail.vue'
export default {
  props: ['datas'],
  data () {
    return {
      icon: icon,
      // 存放食物详情信息
      foodMessage: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Scroll(this.$refs['menuWrapper'], {
        click: true
      })
      new Scroll(this.$refs['foodsWrapper'], {
        click: true
      })
    })
  },
  computed: {
    // 计算所选商品
    food () {
      // 计算出已选的商品传递给shopcart
      var arr = []
      this.datas.goods.forEach(goods => {
        goods.foods.forEach(food => {
          if (food.count > 0) {
            arr.push(food)
          }
        })
      })
      return arr
    }
  },
  methods: {
    // 滚动功能
    // scroll () {
    // /* eslint-disable no-new */
    // new Scroll(this.$refs['menuWrapper'], {
    //   click: true
    // })
    // new Scroll(this.$refs['foodsWrapper'], {
    //   click: true
    // })
    // },
    // 详情
    detail (food) {
      // 将食物传递过去
      this.foodMessage = food
      this.$refs['foodDetail'].showFood()
    }
  },
  components: {
    shopcart,
    cartcontrol,
    foodDetail
  }
}
</script>
