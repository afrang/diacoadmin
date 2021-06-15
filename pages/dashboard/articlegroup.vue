<template>
  <div class="container pt-5  ">
    <div class="wmaster dir-rtl text-right">

      <h3 v-text="$t('articlegroup')">  </h3>
      <v-btn     color="accent"   @click="listitem"     elevation="2"    ><span class="icofont-list"></span></v-btn>

      <v-btn       color="primary"     @click="additem"     elevation="2"    ><span class="icofont-plus"></span></v-btn>
    <hr>
      <div v-if="method=='list'">
        <template v-if="list!=null">
          <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"

            class="elevation-1"
          >

            <template v-slot:item.edit="{ item,index }">
              <a  @click="edit(index)" class="icofont  icofont-edit icofont-1x"></a>
            </template>
            <template v-slot:item.delete="{ item }">
              <a  @click="edit(item.id)" class="icofont  icofont-delete-alt icofont-1x"></a>
            </template>

          </v-data-table>
        </template>
      </div>
      <div v-if="method=='additem'" class="mt-2">

        <form @submit.prevent="saveform" dir="rtl">
          <div class="row">
            <div class="col-sm-6 col-xs-12">

              <v-text-field @keyup="urlcreate"  :label="$t('name')"   v-model="blog.name"  filled    rounded    dense       ></v-text-field>
              <v-text-field    :label="$t('url')"   v-model="blog.url"  filled    rounded    dense    ></v-text-field>
              <label>{{ $t('blog') }}</label>
              <v-select     item-text="label"    item-value="data"      :items="[{data:1,label:$t('yes')},{data:0,label:$t('no')}]"
                            v-model="blog.publish"        menu-props="auto"      :label="$t('blog')"          hide-details  single-line  >

              </v-select>


            </div>
            <div class="mt-3">

              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              <template v-if="blog.image=='1'">
                <img :src="$storage+'media/BlogGroup/'+blog.id+'/thump.png'" class="img-thumbnail w-50">
              </template>

            </div>
          </div>
          <hr>

          <template v-if="method=='additem'">
          <template v-if="blog.id">
            <tisseditor
              :key="componentkey"
              :keynumber="componentkey"
              :text="blog.text"
              v-on:myevent="doSomething"
              :mode="'BlogGroup'"></tisseditor>

          </template>
          </template>
          <v-textarea    :label="$t('keywords')"   v-model="blog.keywords"  filled    rounded    dense    ></v-textarea>
          <v-textarea    :label="$t('description')"   v-model="blog.description"  filled    rounded    dense    ></v-textarea>
          <label v-text="$t('tag')"></label>
          <vue-tags-input class="col-xs-12"
                          v-model="tag"
                          :tags="tags"
                          @tags-changed="newTags => tags = newTags"

                          :autocomplete-items="filteredItems"
          />
          <showerror :errors="error"></showerror>
          <v-btn type="submit">{{ $t('submit') }}</v-btn>

        </form>


      </div>
    </div>

  </div>
</template>

<script>

import Tisseditor from "~/components/admin/tools/Tisseditor";
import Showerror from "~/components/admin/tools/Showerror";
export default {
  name: "articlegroup",
  components:{
    Showerror,
    Tisseditor
  },
  layout: 'dashboard',
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
          text: this.$t('dcoument'),
          align: 'start',
          sortable: false,
          value: 'dcoument',
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

      componentkey:100,
      error:[],
      tag:'',
      groupselect:null,

      file:'',
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
        tag:null,
        ordered:null
      },
      list:null,
      tags:[]
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
        keywords:null,
        description:null,
        tag:null,
        ordered:null
      };
    },
    doSomething(e){
      this.blog.text=e;
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },

    urlcreate(){
      if(this.blog.id==null){

        let str=this.blog.name;
        if(str!=null){
          this.blog.url=str.replace(/#| /g,'_');

        }

      };
    },
    edit(id){
      this.componentkey=this.componentkey+1;

    this.blog=this.list[id];
     this.tags=this.taggenerator;
     this.method='additem';
    },
    saveform(){
      let that=this;
      this.blog.tag=this.tag;
        if(this.blog.id==null){
        this.$axios.post( this.$url+'user/Bloggroup',
          this.blog,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:localStorage.token
            }
          }
        ).then(function(){
          that.listitem();
        })
          .catch((error) => {
            that.error = error.response.data.errors;

          });
      }else{
          this.blog.tag=this.tags;

        this.$axios.put(this.$url+'user/Bloggroup/'+this.blog.id,
          this.blog,
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
      }


    },
    additem(){
      this.componentkey=this.componentkey+1;
      this.resetform();
      this.method='additem';

    },
    listitem(){
      // this.componentkey=this.componentkey+1;
    this.resetform();
      this.method='list';
      this.list=null;
      let that=this;
      this.$axios.get(this.$url+'user/Bloggroup',
        {headers:{Authorization:localStorage.token}}
      ).then(function(res){
        that.list=res.data.data;

      })

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
  mounted() {
    this.listitem();
    this.loadtag();
  },
  head () {
    return {
      title: this.$t('ArticleGroup'),

    }
  }

}
</script>

<style scoped>

</style>
