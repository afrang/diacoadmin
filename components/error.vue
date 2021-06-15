<template>
  <div>
    <template v-if="errors!=null">
      <template   v-for="(i,index) in errors">
        <v-alert    v-for="(n,index2) in i" :key="i"  type="warning" >{{ $t(n) }}</v-alert>
      </template>

    </template>

  </div>
</template>

<script>
export default {
  name: "error",
  props:{
    errors:{
      type:String,
      default: null
    },
  },
}
</script>

<style scoped>

</style>
