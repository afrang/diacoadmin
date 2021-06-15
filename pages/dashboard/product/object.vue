<template>
    <div class="container-fluid pt-3">
      <div class="wmaster text-right">
        <h1 @click="loadlist" v-text="$t('objectmanager')"></h1>
          <hr>
          <div class="btn btn-primary" @click="add">
            <span class="icofont-ui-add"></span>
            <span v-text="$t('add')"></span>
          </div>
        <template>
          <form @submit.prevent="save" class="mt-5" dir="rtl">
            <div class="form-group w-50">
              <label v-text="$t('name')"></label>
              <input type="text" v-model="object.name" class="form-control" >
            </div>
            <div class="form-group w-50">
              <label v-text="$t('pos')"></label>
              <select class="form-control" v-model="object.pos">
                <option v-for="item in postlist" :value="item.id" v-text="$t(item.pos)"></option>
              </select>
            </div>
              <template v-if="object.id!=null">
                <div class="form-group w-25">
                  <label v-text="$t('width')"></label>
                  <input type="number" v-model="object.width" class="form-control" >
                </div>
                <div class="form-group w-25">
                  <label v-text="$t('height')"></label>
                  <input type="number" v-model="object.height" class="form-control" >
                </div>
                <label v-text="$t('upload')"></label>
                <file-uploader class="col-sm-3"
                  mode="object"
                  v-on:filename="filenames"
                  :id='object.id'
                  name="image"
                  :file="object.file"
                ></file-uploader>
             </template>
            <input type="submit"  class="btn btn-success" :value="$t('save')">

          </form>

        </template>
        <div class="row m-0">
          <div class="card col-sm-3" v-for="(item,i) in list">
            <div class="card-header" v-text="item.name">
            </div>
            <div class="card-body">
            <template v-if="item.file!=null">
              <img :src="$storage+'media/object/'+item.id+'/thump/'+item.file" class="w-100 ">
            </template>
              <template v-else>
                <img :src="$storage+'media/Other/noimage.png'" class="w-100 ">

              </template>

            </div>
            <div class="card-footer">
              <h5 class="card-title badge-dark p-3 mt-4" v-text="$t(item.topos.pos)"></h5>
              <a  @click="edit(i)" class="btn btn-primary"><span class="icofont-edit"></span></a>
              <a  @click="del(item.id)" class="btn btn-danger"><span class="icofont-trash"></span></a>

            </div>
            </div>
        </div>
      </div>

      </div>
    </div>
</template>

<script>
  import FileUploader from "~/components/admin/tools/FileUploader";

  export default {
    components:{
      FileUploader
    },
        name: "object",
      layout:'dashboard',
      data(){
          return{
            object:{
              id:null,
              name:null,
              file:null,
              width:null,
              height:null,
              pos:null
            },
            list:null,
            postlist:null
          }
      },
      watch:{

      },
      methods:{
        del(id){
          let self=this;
          self.$axios.delete(this.$url+'user/objectdetail/'+id,{
            headers:{
              Authorization: localStorage.token
            }
          })
          .then(function (data) {
            self.loadlist();
          })

        },
        add(){
          this.object={
            id:null,
              name:null,
              file:null,
              pos:null
          };
        },
        filenames(e){
          this.object.file=e;

        },
        edit(i){
          this.object=this.list[i];
        },
          loadlist(){
            let self=this;
            self.$axios.get(this.$url+'user/objectdetail',{
              headers:{
                Authorization: localStorage.token
             }
            }).then(function (res) {
                self.list=res.data;
              self.loadlist();


            })
          },
        save(){

          let self=this;
          if(this.object.id==null){
            this.$axios.post(this.$url+'user/objectdetail',this.object, {
                headers: {
                  Authorization: localStorage.token
                }
              }
            )
            .then(function (res) {
               self.object=res.data;
              self.loadlist();
            }).catch(function (er){

            });
          }else{
            this.$axios.put(this.$url+'user/objectdetail/'+this.object.id,this.object, {
                headers: {
                  Authorization: localStorage.token
                }
              }
            )
              .then(function (res) {
                self.object=res.data;
                self.loadlist();

              }).catch(function (er){

            });
          }
        },
        loadobj(){
          let self=this;
          self.$axios.get(this.$url+'user/objectgroup',{
            headers:{
              Authorization: localStorage.token

            }
          }).then(function (res) {
            self.postlist=res.data;
          })

        }
       // 3754113989
      },
      beforeMount() {
          this.loadobj();
          this.loadlist();
      }
    }
</script>

<style scoped>

</style>
