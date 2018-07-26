<template>
  <transition name="move">
    <div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back" @click="showDetail=!showDetail">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="foodDatas.image" height="425" width="100%" alt="">
        <div class="info">
          <div class="title">{{foodDatas.name}}</div>
          <div class="desc">
            <span>月售{{foodDatas.sellCount}}</span>
            <span>好评率{{foodDatas.rating}}</span>
          </div>
          <div class="price">￥{{foodDatas.price}}</div>
          <transition>
            <div class="shopCart" v-show="foodDatas.count === 0 || foodDatas.count == undefined" ref="cartcontrol" @click="add(foodDatas)">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol :food="foodDatas" ref="cartcontrol"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{foodDatas.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span class="item" v-for="(item,index) in classify" :key="index" :class="{'active': item.active, 'bad': index===2, 'badActive': index===2&&item.active}"  @click="showColor(item)">{{item.name}}
              <span class="count">({{item.count}})</span>
            </span>
          </div>
          <div class="switch" @click="flag=!flag">
            <span class="icon-check_circle" :class="{'on': flag}"></span>
            <span class="text">只看有评价的内容</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="(item,index) in showComment" :key="index">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.rateTime}}</span>
                    <img :src="item.avatar" width="12" height="12" alt="">
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import cartcontrol from './cartcontrol.vue'
import Scroll from 'better-scroll'
export default {
  props: ['foodDatas'],
  data () {
    return {
      showDetail: false,
      classify: [
        {name: '全部', count: 0, comment: [], active: true},
        {name: '推荐', count: 0, comment: [], active: false},
        {name: '吐槽', count: 0, comment: [], active: false}
      ],
      // 存储评论数据
      comments: [],
      flag: true
    }
  },
  methods: {
    // 点击食物显示食物详情
    showFood () {
      this.showDetail = true
      // Dom更新完之后
      this.$nextTick(() => {
        this.comments = this.foodDatas.ratings
        this.foodDatas.ratings.forEach(val => {
          this.classify[0].count++
          this.classify[0].comment.push(val)
          if (val.rateType) {
            this.classify[2].count++
            this.classify[2].comment.push(val)
          } else {
            this.classify[1].count++
            this.classify[1].comment.push(val)
          }
        })
        this.$nextTick(() => {
          // 防止多次创建滚动(点击依次累加)
          if (!this.sc) { // 第一次滚动
            this.sc = new Scroll(this.$refs['detailWrapper'], {
              click: true
            })
          } else {
            // 强制重新计算
            this.sc.refresh()
          }
        })
      })
    },
    // 详情页的购物功能
    add (food) {
      // 调用cartcontrol组件的addCart方法
      this.$refs['cartcontrol'].addCart(event)
    },
    // 点击标签显示高亮显示
    showColor (item) {
      this.comments = item.comment
      // 先去掉其他标签的类名
      this.classify.forEach(val => {
        val.active = false
      })
      // 给本标签添加类名
      item.active = true
    }
    // updatecs () {
    //   this.$nextTick(() => {
    //     this.sc.refresh()
    //   })
    // }
  },
  computed: {
    showComment () {
      // 1.注册了一个$nextTick 2. 更新dom 3. 检测到dom更新完 执行$nextTick里的回调
      // this.updatecs()
      var arr = []
      // 选择只看有内容的
      if (this.flag) {
        this.comments.forEach(val => { // 依次遍历
          if (val.text.length > 0) {
            arr.push(val)
          }
        })
        return arr
      } else {
        // 未选中则返回全部评论
        return this.comments
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>
