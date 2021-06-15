<template>
  <div>
    <div class="wmaster dir-rtl text-right" v-if="articlelist!=null">
      <h3 v-text="$t('articlegroup')">  </h3>

      <v-btn  href="/dashboard/articlelist/new"  elevation="2"><span class="icofont-plus"></span></v-btn>
      <v-btn
        @click="loadarticle"
        color="primary"
        elevation="2"

      >
        <span class="icofont-list"></span>
      </v-btn>
      <div v-if="method=='list'">
        <div class="text-right row m-0 " dir="rtl">
          <div class="col-sm-6 col-xs-12 right pb-3"  v-if="group!=null">
              <v-select     item-text="name"    item-value="id"         :items="list"
                         v-model="group"        menu-props="auto"      :label="$t('blog')"          hide-details  single-line  >
            </v-select>
          </div>
          <div class="col-sm-4 col-xs-12 right pb-3" >
            <v-text-field :label="$t('Search')" v-model="search"></v-text-field>
          </div>
          <div class="col-sm-2 col-xs-5">
            <label ></label>
            <div class="mt-2">
              <v-btn @click="loadarticle()">{{ $t('filter') }}</v-btn>
            </div>
          </div>
        </div>
        <template v-if="articlelist!=null">
          <v-data-table      :headers="headers"      :items="articlelist.data"       :hide-default-footer="true"  >
            <template v-slot:item.edit="{ item }">
              <v-btn rounded :to="'/dashboard/articlelist/edit/'+item.id"> <a  class="icofont   icofont-edit icofont-1x"></a></v-btn>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn  rounded @click="remove(item.id)">  <a  class="icofont   icofont-delete-alt icofont-1x"></a></v-btn>
            </template>
          </v-data-table>
        </template>
        <template v-if="articlelist!=null">
          <v-pagination        v-model="page"       :length="articlelist.meta.last_page"      circle  ></v-pagination>
        </template>
      </div>
      <div v-if="method=='additem'">
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
            <div class="col-sm-6 col-xs-12">
              <file-uploader     :key="1"      mode="blog"  v-on:filename="filename"
                                 :id='blog.id'    :showthump="true"       :name='"thump"'
                                 :deletefile="true"     :file="blog.image"          ></file-uploader>
            </div>
          </div>
          <hr>
          <template v-if="blog.id">
            <client-only>

            <tisseditor
              :id="blog.id"
              :text="blog.text"
              v-on:myevent="doSomething"
              :mode="'Blog'"></tisseditor>
            </client-only>
            <v-textarea :label="$t('keywords')"  v-model="blog.keywords"></v-textarea>
            <v-textarea :label="$t('description')"  v-model="blog.description"></v-textarea>
            <label v-text="$t('tag')"></label>
            <vue-tags-input class="col-xs-12"   v-model="tag"      :tags="tags"           @tags-changed="newTags => tags = newTags"    :autocomplete-items="filteredItems" />
          </template>
          <showerror :errors="error"></showerror>
          <v-btn  type="submit" >{{ $t('submit') }}</v-btn>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import Tisseditor from "~/components/admin/tools/Tisseditor";
import Showerror from "~/components/admin/tools/Showerror";
import FileUploader from "~/components/admin/tools/FileUploader";
export default {
  layout:'dashboard',
  name: "articlegroup",
  components:{
    Showerror,
    Tisseditor,
    FileUploader,
  },
  data(){
    return {
      headers: [
        {
          text: this.$t('name'),
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: this.$t('url'),
          align: 'start',
          sortable: false,
          value: 'url',
        },

        {
          text: this.$t('edit'),
          align: 'start',
          sortable: false,
          value: 'edit',
        }
        , {
          text: this.$t('delete'),
          align: 'start',
          sortable: false,
          value: 'delete',
        },

      ],
      error:[],
      tag:'',
      articlelist:null,
      group:null,
      file:'',
      groupselect:[],
      search:'',
      page:1,
      method:'list',
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
      list:{},
      tags:[],
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
    taggenerator(){
      let b=[];
      this.blog.totags.forEach(function(item){
        b.push(item.name);
      });
      return b;
    }
  },
  watch: {
    page:function (){
      this.loadarticle();
    }
  },
  methods: {
    resetform(){
      this.tags=[];
      this.blog={
        id:null,
        name:null,
        image:null,
        publish:1,
        text:null,
        url:null,
        title:null,
        keywords:null,
        group:null,
        description:null,
        tag:null,
        ordered:null
      };
    },
    doSomething(e){
      this.blog.text=e;
    },
    filename(e){
      this.blog.image=e;

    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    urlcreate(){
      if(this.blog.id==null){
        let str=this.blog.name;
        this.blog.url=str.replace(/#| /g,'_');

      };
    },
    edit(id){
      this.blog=this.articlelist.data[id];
      this.tags=this.taggenerator;
      this.method='additem';
    },
    saveform(){
      let that=this;
      //this.blog.groups=this.groupselect.id;
      this.blog.tag=JSON.stringify(this.tags);
      if(this.blog.id==null){
        this.$axios.post( this.$url+'user/BlogArticle',
          that.blog,
          {
            headers: {
              Authorization:localStorage.token
            }
          }
        ).then(function(){
          //  that.listitem();
        })
          .catch((error) => {
            that.error = error.response.data.errors;

          });
      }else{
        this.$axios.put( this.$url+'user/BlogArticle/'+this.blog.id,
          this.blog,
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
    },
    additem(){
      this.resetform();
      this.method='additem';
    },
    listitem(){
      this.method='list';
      let that=this;
      this.$axios.get(this.$url+'user/Bloggroup',
        {headers:{Authorization:localStorage.token}}
      ).then(function(res){
        that.list=res.data.data;

        that.loadgroup();
        that.loadarticle(1);
      })
    },
    loadgroup(){
      let that=this;

      this.list.map(function (el) {

        if(el.id==window.location.hash.substring(1).split('#')[1]){
          that.groupselect=el;
        }
      });
    },
    loadtag(){
      let that=this;
      this.$axios.get(this.$url+'user/Tag',
        {headers:{Authorization:localStorage.token}}
      ).then(function(res){
        that.taglist=res.data;

      })
    },
    remove(id){
      let that=this;
      this.$swal.fire({
        title: that.$t('Areyousure'),
        text: that.$t('Youwontbeabletorevertthis'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: that.$t('cancel'),
        confirmButtonText: that.$t('Yesdeleteit')
      }).then((result) => {
        if (result.value) {
          that.$axios.delete(this.$url + 'user/BlogArticle/' + id,
            {
              headers:
                {
                  Authorization: localStorage.token
                }
            })
            .then(function (res) {
              that.loadarticle(1);
            });
        }
      });
    },
    loadarticle(){
      this.method='list';
      let that=this;
      if(this.group==null){
        this.group='';
      };
      this.$axios.get(this.$url+'user/BlogArticle',
        {
          params: {
            page: this.page,
            group: this.group,
            search: that.search
          },
          headers:{Authorization:localStorage.token}}
      ).then(function(res){
        that.articlelist=res.data;
      })
    }
  },
  mounted() {
    this.listitem();
    this.loadtag();
    this.loadarticle(window.location.hash.substring(1).split('#')[1]);
  },
  head () {
    return {
      title: this.$t('ArticleList'),

    }
  }
}
</script>

<style scoped>

</style>
