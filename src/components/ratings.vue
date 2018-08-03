<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{datas.seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{datas.seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="datas.seller.foodScore"></star>
            <span class="num">{{datas.seller.foodScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="datas.seller.foodScore"></star>
            <span class="num">{{datas.seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{datas.seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item" v-for="(item,index) in classArr" :key="index" :class="{'active': item.active, 'bad': index==2, 'badActive': index==2&&item.active}" @click="showColor(item)">{{item.name}}
            <span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="flag=!flag">
          <span class="icon-check_circle" :class="{'on':flag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="(item, index) in showComment" :key="index">
              <div class="avatar">
                <img :src="item.avatar" width="28" height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <span class="rateTime">{{item.rateTime}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="item.score"></star>
                  <span class="deliveryTime">{{item.deliveryTime | time}}分钟送达</span>
                </div>
                <div class="text">
                  {{item.text}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import star from './mod/star.vue'
import Scroll from 'better-scroll'
export default {
  props: ['datas'],
  data () {
    return {
      ratings: [],
      classArr: [
        {name: '全部', count: 0, active: true, comment: []},
        {name: '推荐', count: 0, active: false, comment: []},
        {name: '吐槽', count: 0, active: false, comment: []}
      ],
      comments: [],
      flag: true
    }
  },
  mounted () {
    axios.get('./static/data.json').then(res => {
      this.comments = res.data.ratings
      res.data.ratings.forEach(val => {
        this.classArr[0].count += 1
        this.classArr[0].comment.push(val)
        if (val.score <= 3) {
          this.classArr[2].count += 1
          this.classArr[2].comment.push(val)
        } else {
          this.classArr[1].count += 1
          this.classArr[1].comment.push(val)
        }
      })
    })
    // 滚动插件
    this.$nextTick(() => {
      /* eslint-disable no-new */
      this.sc = new Scroll(this.$refs['ratingsWrapper'], {
        click: true
      })
    })
  },
  methods: {
    showColor (item) {
      this.comments = item.comment
      this.classArr.forEach(val => {
        val.active = false
      })
      item.active = true
    }
    // updatasc () {
    //   this.$nextTick(() => {
    //     this.sc.refresh()
    //   })
    // }
  },
  computed: {
    showComment () {
      // this.updatasc()
      if (this.flag) {
        var arr = []
        this.comments.forEach(val => {
          if (val.text.length > 0) {
            arr.push(val)
          }
        })
        return arr
      } else {
        return this.comments
      }
    }
  },
  components: {
    star
  },
  filters: {
    time (value) {
      return value || 0
    }
  }
}
</script>
