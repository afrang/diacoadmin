<template>
  <div class="container pt-4" dir="rtl">
    <div class="text-right wmaster">
      <h4 @click="loadgroup" v-text="$t('groupnamegallery')+': '+group.name"></h4>

      <v-btn @click="additem">  <span  class="btn btn-success icofont-plus"></span></v-btn>


      <div class="mt-3" v-if="item.id!=null">

        <div >
          <div class="mt-4">

            <v-row>
              <v-col cols="6">
                <v-text-field     v-model="item.name" :label="$t('name')"></v-text-field>
                <v-text-field     v-model="item.text" :label="$t('tags')"></v-text-field>
                <small>flat gift fabric</small>
                <label v-text="$t('bgcolor')"></label>
                <input type="color" class="form-control" v-model="item.bgcolor" placeholder="subtitle" >
                <label v-text="$t('publish')"></label>
                <v-select     item-text="label"    item-value="data"      :items="[{data:1,label:$t('yes')},{data:0,label:$t('no')}]"
                              v-model="item.publish"        menu-props="auto"      :label="$t('blog')"          hide-details  single-line  > </v-select>
              </v-col>
              <v-col cols="6">
                <img v-if="item.file!=null" class="card-img-top" :src="$storage+'media/gallery/'+item.id+'/thump/'+item.file" :alt="item.name">

                <file-uploader
                  mode="gallery"
                  v-on:filename="filenames"
                  :id='item.id'
                  name="image"
                  :showthump="false"
                  :deletefile="false"
                ></file-uploader>


              </v-col>
            </v-row>
            <v-btn   @click="update" type="button" class="btn btn-primary mt-4">{{  $t('save') }}</v-btn>
          </div>
        </div>
      </div>

    </div>
    <hr>
    <div class="ma-4" v-if="item.id==null">
      <v-row>
        <v-card v-for="(item,index) in group.todetail" :key="index"  >

          <v-card-text> {{ item.name }}     </v-card-text>

          <v-img
            :lazy-src="$storage+'media/Other/noimage.png'"
            max-height="150"
            max-width="250"
            :src="$storage+'media/gallery/'+item.id+'/thump/'+item.file"
          ></v-img>

          <v-card-actions>
            <div class="card-footer text-muted text-center">
              <v-btn   x-small color="accent" @click="del(item.id)"><span  class=" icofont-ui-delete  "></span></v-btn>
              <v-btn   x-small color="primary" @click="edit(index)"><span  class=" icofont-ui-edit  "></span></v-btn>
              <hr>
              <v-btn rounded @click="up(item.id)"><span  class=" icofont-arrow-right  "></span></v-btn>
              <v-btn rounded @click="down(item.id)"><span  class=" icofont-arrow-left  "></span></v-btn>
            </div>
          </v-card-actions>
        </v-card>

      </v-row>
    </div>
  </div>
</template>

<script>
import FileUploader from "~/components/admin/tools/FileUploader";

export default {
  layout:'dashboard',

  name: "gallerydetail",
  data(){
    return{
      id:null,
      group:[],
      itemadd:false,
      item:{
        id:null,
        name:null,
        file:null,
        orders:null,
        publish:null,
        text:null,
        parent:null

      }
    }
  },
  components: {
    FileUploader
  },
  methods: {
    reset(){
      this.item={
        id:null,
        name:null,
        file:null,
        orders:null,
        publish:null,
        text:null,
        parent:this.group.id

      }
    },
    additem(){
      this.reset();
      let that=this;
      this.$axios.post(this.$url + 'user/GalleryDetail',this.item,
        {
          headers: {
            Authorization: localStorage.token
          }
        }
      ).then(function(res){
        that.item=res.data;
        that.itemadd=false;

      });
    },
    edit(index){
      this.reset();
      console.log(this.group);
      this.item=this.group.todetail[index];
      this.itemadd=false;
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;

    },
    update(){
      let that=this;
      if(that.item.file==null){
        this.$swal.fire(that.$t('Youmustuploadfile'));
        return false;
      }
      this.$axios.put(this.$url + 'user/GalleryDetail/'+this.item.id,this.item,
        {
          headers: {
            Authorization: localStorage.token
          }
        }
      ).then(function(res){
        that.item=res.data;
        that.loadgroup();
        that.reset();

      });
    },
    del(id){
      let that=this;
      this.$axios.delete(this.$url+'user/GalleryDetail/'+id,{
        headers: {
          Authorization: localStorage.token
        }
      }).then(function (res) {
        that.loadgroup();

      });

    },
    updatepic(){
      let that=this;
      if(that.item.file==null){
        this.$swal.fire(that.$t('Youmustuploadfile'));
        return false;
      }
      this.$axios.put(this.$url + 'user/GalleryDetail/'+this.item.id,this.item,
        {
          headers: {
            Authorization: localStorage.token
          }
        }
      ).then(function(res){
        that.item=res.data;
        that.loadgroup();


      });
    },
    up(e){
      let that=this;
      this.$axios.get(this.$url+'user/GalleryDetailup/'+e,
        {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res){
          that.loadgroup();


        });
    },
    down(e){
      let that=this;
      this.$axios.get(this.$url+'user/GalleryDetaildown/'+e,
        {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res){
          that.loadgroup();


        });
    },
    filenames(e){
      let that=this;
      that.item.file=e;
      that.updatepic()


    },
    loadgroup() {
      this.id =this.$route.params.id;

      let that = this;
      this.$axios.get(this.$url + 'user/GalleryGroup/' + this.id, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(function (response) {
        that.group=response.data;
        that.item.parent=response.data.id;

      });

    }

  },
  mounted() {
    this.loadgroup();
  }
}
</script>

<style scoped>

</style>
