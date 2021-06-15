<template>
    <div>
      <template v-if="listgallery!=null">
        <v-select v-model="data" :items="listgallery.data" item-value="url" item-text="name"></v-select>
        <v-btn   color="secondary"
                 elevation="11"
                 @click="save" >{{ $t('save') }}</v-btn>
      </template>
    </div>
</template>

<script>
export default {
name: "blogauto",
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
     this.url='blogauto';
    },
  },
  methods:{
    save(){
      let data={
        mode:'blogauto',
        url:this.url,
        data:this.data
      };
      this.$emit('myevent',data);

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'user/Bloggroup',{
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
