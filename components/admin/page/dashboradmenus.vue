<template>
  <div>
    <div class="row m-0" >
      <div class="col-sm-11 row m-0">
        <widgets  v-for="(item,index) in $parent.menu" :key="13000+index" :menu="item" class="col-sm-3"></widgets>
      </div>
      <hr>
    </div>
  </div>

</template>

<script>
    import widgets from "../tools/widgets";
    export default {
        name: "dashboradmenus",
        components: {
            widgets},

    }
</script>

<style scoped>

</style>
