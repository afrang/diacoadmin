<template>
  <div>
    <a href="/dashboard/articlelist" class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"  type="submit" >{{ $t('back') }}</a>


  <form @submit.prevent="saveform" dir="rtl">

    <div class="row m-0">
      <div class="col-sm-6 col-xs-12" v-if="list!=null">
        <v-text-field :label="$t('name')" v-model="blog.name" ></v-text-field>
        <v-text-field :label="$t('url')" v-model="blog.url" ></v-text-field>
        <v-text-field :label="$t('title')" v-model="blog.title" ></v-text-field>
        <label>{{ $t('Group') }}</label>
        <v-select     item-text="name"     item-value="id"          :items="list"
                      v-model="blog.group"        menu-props="auto"      :label="$t('blog')"
                      hide-details  single-line  >        </v-select>
      </div>
      <div class="col-sm-6 col-xs-12" v-if="blog.id!=null">
        <file-uploader     :key="1"      mode="blog"  v-on:filename="filename"
                           :id='blog.id'    :showthump="true"       :name='"thump"'
                           :deletefile="true"     :file="blog.image"          ></file-uploader>
      </div>
    </div>
    <hr>
    <template v-if="blog.id">

      <client-only>

        <tisseditor
          :advanced="true"
          :id="blog.id"
          :text="blog.text"
          v-on:myevent="doSomething"
          :mode="'Blog'"></tisseditor>
      </client-only>
      <v-textarea :label="$t('keywords')"  v-model="blog.keywords"></v-textarea>
      <v-textarea :label="$t('description')"  v-model="blog.description"></v-textarea>
      <label v-text="$t('tag')"></label>
<!--      <pre>{{ tag }}</pre>-->
<!--      <vue-tags-input class="col-xs-12"   v-model="tag"      :tags="tags"           @tags-changed="newTags => tags = newTags"    :autocomplete-items="filteredItems" />-->
    </template>
    <showerror :errors="error"></showerror>
    <div class="mt-3">
      <v-btn  type="submit" >{{ $t('submit') }}</v-btn>
      <a href="/dashboard/articlelist" class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"  type="submit" >{{ $t('back') }}</a>

    </div>
  </form>
  </div>
</template>

<script>
import Tisseditor from "~/components/admin/tools/Tisseditor";
import Showerror from "~/components/admin/tools/Showerror";
import FileUploader from "~/components/admin/tools/FileUploader";

export default {
  components:{
    Showerror,
    Tisseditor,
    FileUploader,


  },
name: "articleedit",
  props: {
    id: {
       default: null
    }
  },
  data(){
    return {

      tags:[],
      tag:'',
      error:[],
      list:null,

      blog:{
        id:null,
        name:null,
        image:null,
        publish:1,
        text:null,
        url:null,
        keywords:null,
        description:null,
        title:null,
        tag:null,
        group:null,
        ordered:null
      },
    }
  },
  taglist:[],
  computed: {

    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    autocompleteItems(){
      let b=[];
      this.taglist.forEach(function (item) {
        b.push({text:item.name});

      });
      return b;
    },

    loadgroup(){

    },
    taggenerator(){
      let b=[];
      this.blog.totags.forEach(function(item){
        b.push(item.name);
      });
      return b;
    }
  },
      methods:{
        doSomething(e){

          this.blog.text=e;
        },
        listitem(){
          this.method='list';
          let that=this;
          this.$axios.get(this.$url+'user/Bloggroup',
            {headers:{Authorization:localStorage.token}}
          ).then(function(res){
            that.list=res.data.data;
            that.$forceUpdate();
          })
        },
        filename(e){
          this.blog.image=e;

        },
        loadtag(){
          let that=this;
          this.$axios.get(this.$url+'user/Tag',
            {headers:{Authorization:localStorage.token}}
          ).then(function(res){
            that.taglist=res.data;

          })
        },
        loadarticle(){
          let that=this;
          this.$axios.get(this.$url+'user/BlogArticle/'+this.id,{
            headers:{Authorization:localStorage.token}
        }).then(function (res){
          console.log(res);
            that.blog=res.data;
            that.tags=that.taggenerator;
          })
        },
    saveform(){
      let that=this;
     // this.blog.groups=this.groupselect.id;
     this.blog.tag=JSON.stringify(this.tags);
      if(this.blog.id==null){
        this.$axios.post( this.$url+'user/BlogArticle',
          that.blog,
          {
            headers: {
              Authorization:localStorage.token
            }
          }
        ).then(function(res){
         //   that.blog=res.data;
          window.location.replace('/dashboard/articlelist/edit/'+res.data);

        })
          .catch((error) => {
            that.error = error.response.data.errors;

          });
      }else{
        this.$axios.put( this.$url+'user/BlogArticle/'+that.blog.id,
          that.blog,
          {
            headers: {
              Authorization:localStorage.token
            }
          }
        ).then(function(res){
          that.$swal.fire(that.$t('Saved'));
        })
          .catch((error) => {
            that.error = error.response.data.errors;
          });
      }
    }
  },
  mounted() {
    this.loadtag();
    this.listitem();
    if(this.id!=null){
      this.loadarticle();
    }
  }
}
</script>

<style scoped>

</style>
