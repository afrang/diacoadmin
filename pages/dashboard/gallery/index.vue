<template>
  <div >
    <div >
      <div>
        <v-btn  @click="addgroup"><span class="icofont-ui-add text-white"></span></v-btn>
        <v-btn  @click="listgroup"><span class="icofont-list text-white"></span></v-btn>
      </div>
      <div class="mt-4">
        <template v-if="mode=='listgroup'">
          <div class="row m-0">
            <v-card v-for="(item,index) in list" :key="index" class="card border-light mb-3 mr-1" style="max-width: 18rem;">
              <div class="card-body">
                <v-img
                  :lazy-src="$storage+'media/Other/noimage.png'"
                  max-height="150"
                  max-width="250"
                  :src="$storage+'media/gallerygroup/'+item.id+'/thump/'+item.image"
                ></v-img>
                <v-card-title>{{ item.name }}</v-card-title>
              </div>
              <v-card-actions>

              <v-btn :to="'/dashboard/gallery/'+item.id"  ><span class="icofont-ui-image "></span></v-btn>
              <v-btn @click="edit(index)"   ><span class="icofont-ui-edit "></span></v-btn>
              <v-btn @click="edit(index)"   ><span class="icofont-ui-delete "></span></v-btn>
              </v-card-actions>
            </v-card>

          </div>

        </template>
        <template v-if="mode=='editgroup'">
          <v-form @submit.prevent="save">
          <v-text-field     v-model="group.name" :label="$t('name')"></v-text-field>
          <v-text-field     v-model="group.url" :label="$t('url')"></v-text-field>


            <template v-if="group.id!=null">
              <div class="row m-0">
                <div class="col-xs-12 col-sm-3">
                  <file-uploader
                    mode="gallerygroup"
                    v-on:filename="filenames"
                    :id='group.id'
                    name="thump"
                    :file="group.image"
                  ></file-uploader>
                </div>
                <div class="col-xs-12 col-sm-9">
                  <tisseditor
                    :height="500"
                    :text="group.text"
                    v-on:myevent="doSomething"
                    :mode="'GalleryGroup'"></tisseditor>
                </div>
              </div>


            </template>
            <hr>
            <v-btn type="submit"  >{{ $t('save') }}</v-btn>
          </v-form>
          <showerror v-if="error" :errors="error"></showerror>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import showerror from '~/components/admin/tools/Showerror';

  import Tisseditor from "~/components/admin/tools/Tisseditor";

  import FileUploader from "~/components/admin/tools/FileUploader";

  export default {
    name: "gallerygroup",
    components: {
      showerror,
      Tisseditor,
      FileUploader
    },
    layout:'dashboard',

    data() {
      return {
        mode:'listgroup',
        list:[],
        group:{
          id:null,
          name:null,
          urlname:null,
          text:null,
          image:null,

        },
        error:[]
      }
    },

    computed: {

    },

    methods: {
      filenames(e){
        this.group.image=e;

      },
      doSomething(e){
        this.group.text=e;
      },
      resetform(){
        this.group={
          id:null,
          name:null,
          urlname:null,
          text:null,
          image:null,

        };
        this.error=[];
      },
      addgroup(){
        this.mode='editgroup';
        this.resetform();
      },
      listgroup(){
        this.mode='listgroup';
        this.loadlist();
      },
      edit(id){

        this.group=this.list[id];


        this.mode='editgroup';
      },
      loadlist(){
        let that=this;
        this.$axios.get(this.$url+'user/GalleryGroup',{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
          that.list=response.data;
        });
      },
      save(){
        let that=this;
        ;
        if(this.group.id==null){
          this.$axios.post(this.$url+'user/GalleryGroup',this.group,{
            headers:{
              Authorization:localStorage.token
            }
          })
            .then(function (response) {
              that.$swal.fire(that.$t('Saved'));
              that.error=[];

            })
            .catch((error) => {
              that.error = error.response.data.errors;

            });;

        }else {
          this.$axios.put(this.$url+'user/GalleryGroup/'+this.group.id,this.group,{
            headers:{
              Authorization:localStorage.token
            }
          })
            .then(function (response) {
              that.$swal.fire(that.$t('Saved'));
              that.error=[];

            })
            .catch((error) => {
              that.error = error.response.data.errors;

            });;
        }

      }
    },
    mounted() {
      this.listgroup();
    }
  }
</script>

<style scoped>

</style>
