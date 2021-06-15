<template>
  <div class="container-fluid pt-5  text-right " >

    <div class="wmaster" dir="rtl" v-if="product!=null">
      <h2><span  v-text="$t('comment')"></span>:<span v-text="product.name"></span></h2>
      <a class="btn btn-primary" href="/dashboard/product"><span class="icofont-arrow-right text-white"></span></a>
      <a class="btn btn-primary" @click="loadporudct"><span class="icofont-refresh text-white"></span></a>
      <hr>

      <archivecomment :id="product.id"></archivecomment>




    </div>
  </div>
</template>

<script>
  import archivecomment from "~/pages/dashboard/comment/archivecomment";
  export default {
    name: "comment",
    layout:'dashboard',
    data(){
      return{
        data:{
          product:null
        }
      }
    },
    components:{ archivecomment },
    methods:{
        loadporudct(){
          let that=this;
          this.$axios.get(this.$url+'user/pdetail/'+this.$route.params.comment,{
            headers: {
              Authorization:localStorage.token
            }

          }).then(function(res){
            that.product=res.data;
            that.$forceUpdate();

            /**/
          });

        }
    },
    beforeMount() {
        this.loadporudct();
    }
  }
</script>

<style scoped>

</style>
