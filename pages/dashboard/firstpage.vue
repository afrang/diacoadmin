<template>
  <div class="container pt-4 text-right " dir="rtl">
    <div class="wmaster" v-if="mydata!=null">
      <form @submit.prevent="save" dir="rtl" >

    <pre>{{ mydata }}</pre>
        <v-btn type="submit" class="btn mt-4 btn-primary" >{{ $t('save') }}</v-btn>
      </form>
    </div>

  </div>
</template>

<script>
  import FileUploader from "~/components/admin/tools/FileUploader";
  import Tisseditor from "~/components/admin/tools/Tisseditor";
  export default {
    name: "firstpage",
    components: {
      FileUploader,Tisseditor,


    },
    layout:'dashboard',
    data() {
      return {
        kecomponent:0,
        rawdata:{},
        modelpage:'firstpage',
        taglist:null,
        mydata:{

          mode:'firstpage',
          lang:'fa',
          img1:{
            data:null,
            mode:'img'
          },
          img2:{
            data:null,
            mode:'img'
          },
          offsliders:{
            data:null,
            mode:'slider'
          },
          roll:{
            data:null,
            mode:'slider'
          },
          urlbox1:{
            data:null,
            mode:'text'
          },
          urlbox2:{
            data:null,
            mode:'text'
          },
          url1:{
            data:null,
            mode:'text'
          },
          url2:{
            data:null,
            mode:'text'
          },
          b1img:{
            data:null,
            mode:'img'
          },
          b2img:{
            data:null,
            mode:'img'
          },
          b3img:{
            data:null,
            mode:'img'
          },
          b4img:{
            data:null,
            mode:'img'
          },
          b1:{
            data:null,
            mode:'article'
          },
          b2:{
            data:null,
            mode:'article'
          },
          b3:{
            data:null,
            mode:'article'
          },
          b4:{
            data:null,
            mode:'article'
          },
          pr1:{
            data:null,
            mode:'product'
          },
          prs:{
            data:null,
            mode:'product'
          },
          pr2:{
            data:null,
            mode:'product'
          },
          pr3:{
            data:null,
            mode:'product'
          },
          special:{
            data:null,
            mode:'img'
          },
          pr4:{
            data:null,
            mode:'product'
          },
          aboutimg:{
            data:null,
            mode:'img'
          },
          about:{
            data:null,
            mode:'longtext'
          },
          footerimg:{
            data:null,
            mode:'img'
          },
          tagslider:{
            data:null,
            mode:'tag'
          },

          counter:{
            start:null,
            end:null,
            mode:'timepicker'
          },
          counter2:{
            start:null,
            end:null,
            mode:'timepicker'
          },
        },
        sliders:null,
        products:null,
        artilces:{}

      }
    },
    watch:{
      rawdata:function (item) {
        let that=this;
        item.map(function (items) {
          if(items.model=="slider"){
            that.sliders.map(function (m) {
              if(m.id==items.image){
                that.mydata[items.name].data=m;
              }

            });
          }
          if(items.model=="timepicker"){
            that.mydata[items.name].start=items.text;
            that.mydata[items.name].end=items.image;
          }
          if(items.model=="tag"){
            that.mydata[items.name].data=items.image;
          }
          if(items.model=="img"){
            that.mydata[items.name].data=items.image;
          }
          if(items.model=="text"){
            that.mydata[items.name].data=items.text;
          }
          if(items.model=="longtext"){
            that.mydata[items.name].data=items.text;
          }

          if(items.model=="product"){
            that.products.map(function (m) {

              if(m.id==items.image){
                that.mydata[items.name].data=m;
              }

            });
          }
          if(items.model=="article"){
            that.artilces.map(function (m) {

              if(m.id==items.image){
                that.mydata[items.name].data=m;
              }

            });
          }
        });
      }


    },

    methods:{
      pluskeycomponent(){

        this.kecomponent=this.kecomponent+1;
      },
      doSomething(e){

        this.mydata.about.data=e;
      },
      img1(e){

        this.mydata.img1.data=e;
      },
      img2(e){

        this.mydata.img2.data=e;
      },
      aboutimg(e){

        this.mydata.aboutimg.data=e;
      },
      special(e){

        this.mydata.special.data=e;
      },
      b1img(e){

        this.mydata.b1img.data=e;
      },
      b2img(e){

        this.mydata.b2img.data=e;
      },
      b3img(e){

        this.mydata.b3img.data=e;
      },
      b4img(e){

        this.mydata.b4img.data=e;
      },
      footerimg(e){

        this.mydata.footerimg.data=e;
      },
      loadadata(){
        let that=this;
        this.$axios.get(this.$url+'user/GalleryGroup',{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.sliders=response.data;
          that.$forceUpdate();
        });
        this.$axios.get(this.$url+'user/pdetail/create',{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.products=response.data;
        });
        this.$axios.get(this.$url+'user/BlogArticle/create',{

          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.artilces=response.data;
        });
        this.$axios.get(this.$url+'user/FirstPageSetting/'+this.modelpage,{
          params:{
            lang:that.mydata.lang
          },
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.rawdata=response.data;
        });
      },
      save(){
        let that=this;
        this.$axios.post(this.$url+'user/FirstPageSetting',this.mydata,{
          params:{
            lang:that.mydata.lang
          },
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.$swal.fire(that.$t('saved'));
        });

      },
      loadtag(){
        let that=this;
        this.$axios.get(this.$url+'user/Tag',
          {headers:{Authorization:localStorage.token}}
        ).then(function(res){
          that.taglist=res.data;

        })
      }
    },
    beforeMount() {
      this.loadadata();
      this.loadtag();
    }
  }
</script>

<style scoped>

</style>
