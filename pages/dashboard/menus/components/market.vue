<template>
    <div>
      <template v-if="listgallery!=null">
        <v-select v-model="data" :items="listgallery" item-value="url" item-text="name"></v-select>
        <v-btn   color="secondary"
                 elevation="11"
                  @click="save" >{{ $t('save') }}</v-btn>
      </template>
    </div>
</template>

<script>
export default {
name: "pgroup",
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
     this.url='/market/'+val;
    },
  },
  methods:{
    save(){
      let data={
        mode:'market',
        url:this.url,
        data:this.data
      };
      this.$emit('myevent',data);

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'user/pgroup',{
        params:{
          mode:'menu'
        },
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
