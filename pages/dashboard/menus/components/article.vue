<template>
    <div>
      <template v-if="listgallery!=null">
        <v-autocomplete v-model="data" :items="listgallery" item-value="url" item-text="name"></v-autocomplete>
        <v-btn   color="secondary"
                 elevation="11"
                 @click="save" >{{ $t('save') }}</v-btn>
      </template>
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
     this.url='/Article/'+val;
    },
  },
  methods:{
    save(){
      let data={
        mode:'articles',
        url:this.url,
        data:this.data
      };
      this.$emit('myevent',data);

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'user/showallaricle',{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (response) {
        try {
          that.listgallery=response.data;

        }finally {
          if(that.backdata!=null){
            that.data=that.backdata;
          }
        }
      });
    }
  },
  mounted() {
  this.loaditem();
  }

}
</script>

<style scoped>

</style>
