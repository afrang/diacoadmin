<template>
    <div>
      <template v-if="listgallery!=null">
        <v-select v-model="data" :items="listgallery" item-value="url" item-text="name"></v-select>
        <v-btn @click="save" >{{ $t('save') }}</v-btn>
      </template>
    </div>
</template>

<script>
export default {
name: "gallery",
  data(){
    return{
      listgallery:null,
      data:null,
      url:null
    }
  },
  props:{
    backdata: {
      default: null
    }
  },
  watch: {
    data: function (val) {
     this.url='/gallery/'+val;
    },
  },
  methods:{
    save(){
      let data={
        mode:'gallery',
        url:this.url,
        data:this.data
      };
      this.$emit('myevent',data);

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'user/GalleryGroup',{
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
