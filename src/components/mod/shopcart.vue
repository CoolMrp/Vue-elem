<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left" @click="showList">
        <div class="logo-wrapper">
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <!-- 总价大于0显示商品数量 -->
          <div class="badge" v-show="totalPrice>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active': totalPrice}">￥{{totalPrice}}</div>
        <div class="desc" v-show="totalPrice < 99">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <transition>
      <div class="shopcart-list" v-show="totalPrice>0&&show">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content" ref="cartList">
          <ul>
            <li class="food" v-for="(item,i) in food" :key="i">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>${{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- 将已选商品传给结算栏 -->
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import cartcontrol from './cartcontrol.vue'
import Scroll from 'better-scroll'
export default {
  props: ['deliveryPrice', 'minPrice', 'food'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    // 计算总价
    totalPrice () {
      var totalPrice = 0
      this.food.forEach(food => {
        totalPrice += food.price * food.count
      })
      return totalPrice
    },
    // 选择商品总数
    totalCount () {
      var totalCount = 0
      this.food.forEach(food => {
        totalCount += food.count
      })
      return totalCount
    },
    // 配送费
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    // 清空购物车
    clearCart () {
      this.food.forEach(item => {
        item.count = 0
      })
    },
    // 购物车列表的显示隐藏
    showList () {
      this.show = !this.show
      this.$nextTick(() => {
        if (!this.sc) { // this.sc属性为假则为第一次滚动
          this.sc = new Scroll(this.$refs['cartList'], {
            click: true
          })
        } else {
          // 强制重新计算高度
          this.sc.refresh()
        }
      })
    }
  },
  components: {
    cartcontrol
  }
}
</script>
