<template>
  <div>
    <v-text-field v-model="data"></v-text-field>
    <v-btn   color="secondary"
             elevation="11"
             @click="save" >{{ $t('save') }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "gallery",
  props:{
    backdata: {
      default: null
    }
  },
  data(){
    return{
      listgallery:null,
      data:null,
      url:null
    }
  },
  watch: {

    data: function (val) {
      this.url=val;
    },
  },
  methods:{
    save(){
      let data={
        mode:'url',
        url:this.url,
        data:this.data
      };
      this.$emit('myevent',data);

    },
    loaditem(){

    }
  },
  mounted() {
    this.loaditem();
    if(this.backdata!=null){
      this.data=this.backdata;
    }

  }

}
</script>

<style scoped>

</style>
