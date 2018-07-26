<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" @click.stop="decreaseCart()" v-show="food.count>0"> <!-- click.stop阻止冒泡 -->
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
export default {
  // 接收购物车传递过来的已选商品
  props: ['food'],
  computed: {
    ...mapState([
      'vxfood'
    ])
  },
  methods: {
    ...mapMutations([
      'vxaddCart',
      'vxdecreaseCart'
    ]),
    // 购物车加
    addCart (event) {
      // 解决pc端点击一次加两次的问题
      if (!event._constructed) {
        return false
      }
      if (typeof this.food.count === 'undefined') {
        // Vue.set 可以直接往data里或接收的数据中添加
        // this.$set 需要执行函数的时候传值过来 然后往传递的值里添加
        Vue.set(this.food, 'count', 0)
        Vue.set(this.food, 'active', true)
      }
      this.food.count++
      if (this.food.active) {
        this.vxaddCart(this.food)
        this.food.active = false
      }
    },
    // 购物车减
    decreaseCart () {
      this.food.count--
      if (this.food.count === 0) {
        this.vxdecreaseCart(this.food)
      }
    }
  }
}
</script>
