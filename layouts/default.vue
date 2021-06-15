<template>
  <v-app >
      <nuxt />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style>
@import "~/assets/icofont/icofont.min.css";
::-webkit-scrollbar {
  width: 13px;
  height: 13px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(13deg, #f9d4ff 14%,#c7ceff 64%);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover{
  background: linear-gradient(13deg, #c7ceff 14%,#f9d4ff 64%);
}
::-webkit-scrollbar-track{
  background: #ffffff;
  border-radius: 10px;
  box-shadow: inset 7px 10px 12px #f0f0f0;
}
</style>
