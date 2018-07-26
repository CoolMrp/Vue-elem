<template>
  <div class="star" :class="starType">
    <span class="star-item" :class="item" v-for="(item,i) in grade" :key="i"></span>
  </div>
</template>
<script>
export default {
  props: ['size', 'score'],
  computed: {
    grade () {
      let arr = []
      // 整数部分
      let integer = Math.floor(this.score)
      // 小数部分
      let decimal = (this.score - integer) >= 0.5
      for (var i = 0; i < integer; i++) {
        arr.push('on')
      }
      if (decimal) {
        arr.push('half')
      }
      while (arr.length < 5) {
        arr.push('off')
      }
      return arr
    },
    starType () {
      return `star-${this.size}`
    }
  }
}
</script>
