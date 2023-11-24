<template>
  <div class="title">
    <div class="triangle" />
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.88rem;
  font-weight: 500;
  color: #ffffff;
  // 标题三角形
 .triangle {
   display: inline-block;
   font-size: 0;
   overflow: hidden;
   margin-right: 0.6rem;
   &:before {
     content: "";
     position: relative;
     display: inline-block;
     border: 0.3rem solid transparent;
     right: 0.1rem;
     border-top-right-radius: 50%;
     border-bottom-right-radius: 50%;
     left: 0.1rem;
     border-right-width: 0;
     border-left-width: 0.6rem;
     border-left-color: rgb(181, 181, 181);
   }
 }
}
</style>
