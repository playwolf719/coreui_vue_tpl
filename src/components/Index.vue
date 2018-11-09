<template>
<div>欢迎来到数据平台</div>
</template>

<script>

export default {
  name: 'Index',
  computed:{
    flag: function () {
      // `this` 指向 vm 实例
      return this.$route.name
    }
  }
}

</script>
<style>
</style>
