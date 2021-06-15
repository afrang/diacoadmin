<template>
  <div>
    <v-btn  @click="loaddata"  color="primary" >{{ $t('reload') }}</v-btn>
    <v-btn  :to="'/dashboard/menus'"   color="accent">{{ $t('back') }}</v-btn>
    <hr>
    <div class="mt-4" v-if="list!=null">
      <ul>
        <v-list dense>
          <v-list-item-group   v-model="selectedItem"    color="primary"     >
            <template v-for="(i,index) in list.to_sub">
              <v-list-item  :key="index">
                <v-row>
                  <v-col cols="2">
                    <v-btn @click="up(i.id)" ><span  class="icofont icofont-arrow-up"></span></v-btn>
                    <v-btn  @click="down(i.id)" ><span class="icofont icofont-arrow-down"></span></v-btn>
                  </v-col>
                  <v-col cols="3"> {{ i.name }}</v-col>
                  <v-col cols="3"> {{ i.data }}</v-col>
                  <v-col cols="1"> {{ i.mode }}</v-col>
                  <v-col cols="1"><span @click="deletee(i.id)" class="icofont icofont-delete-alt"></span></v-col>
                  <v-col cols="1"><span @click="edit(i)"   class="icofont icofont-edit"></span></v-col>
                  <v-col cols="1"><span  @click="newitem(list.id,i.id)" class="icofont icofont-ui-add"></span></v-col>
               </v-row>
              </v-list-item>
              <v-list-item  v-for="b in i.to_sub" style="background-color: lightblue;">
                <v-row>
                  <v-col cols="1">
                    <v-btn @click="up(b.id)" ><span  class="icofont icofont-arrow-up"></span></v-btn>
                    <v-btn  @click="down(b.id)" ><span class="icofont icofont-arrow-down"></span></v-btn>

                  </v-col>
                  <v-col dir="rtl">{{ b.name }} <span class="icofont icofont-arrow-left"></span> </v-col>
                  <v-col> {{ b.data }}</v-col>
                  <v-col> {{ b.mode }}</v-col>
                  <v-col><span @click="deletee(b.id)" class="icofont icofont-delete-alt"></span></v-col>
                  <v-col><span   @click="edit(b.id)" class="icofont icofont-edit"></span></v-col>
                  <v-col>..</v-col>
                </v-row>
              </v-list-item>
            </template>

          </v-list-item-group>
        </v-list>
        <li><v-btn @click="newitem(list.id,0)"><span class="icofont icofont-plus"></span>{{  $t('addmenu') }}</v-btn></li>
      </ul>
    </div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-container>
          <v-form>
            <a>{{ $t('menudetail' )}}</a>
            <v-text-field :label="$t('name')" v-model="data.name"></v-text-field>
            <v-text-field readonly :label="$t('url')" v-model="data.url"></v-text-field>
            <v-select @change="changemode" v-model="data.mode" :label="$t('component')" :items="mode"></v-select>
            <component  :backdata="backdata"   v-on:myevent="doSomething" :key="key" :is="data.mode"></component>
            <v-btn   color="secondary" @click="closedapp">{{ $t('close') }}</v-btn>

          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import Gallery from "~/pages/dashboard/menus/components/gallery";
import blog from "~/pages/dashboard/menus/components/blog";
import articles from "~/pages/dashboard/menus/components/article";
import market from "~/pages/dashboard/menus/components/market";
import url from "~/pages/dashboard/menus/components/url";
import blogauto from "~/pages/dashboard/menus/components/blogauto";

export default {
  name: "index.vue",
  components: {Gallery,blog,articles,market,url,blogauto},
  data(){
    return{
      backdata:null,
      list:null,
      dialog:false,
      com:null,
      key:1,
      data:{
        name:null,
        parent:null,
        sub:null,
        url:null,
        mode:null,
        data:null,
        image:null,
        id:null,
      },

      mode:['gallery','url','blog','articles','market','blogauto']
    }
  },
  methods:{
    reset(){
      this.backdata=null,

        this.data={
        name:null,
        parent:null,
        sub:null,
        url:null,
        mode:null,
        data:null,
        id:null,
        image:null,

      };
    },
    up(id){
       let that=this;
      this.$axios.post(this.$url+'user/menuorder',
        {
          id:id,
          ordered:'up'
        },
        {
          headers:{
            Authorization:localStorage.token
          }

        }).then(function (res){
        that.loaddata();

      });

    },
    down(id){
      let that=this;
      this.$axios.post(this.$url+'user/menuorder',
        {
          id:id,
          ordered:'down'
        },
        {
          headers:{
            Authorization:localStorage.token
          }

        }).then(function (res){
        that.loaddata();

      });

    },

    closedapp(){
      this.dialog=false;
      this.reset();
    },
    doSomething(e){
      this.data.url=e.url;
      this.data.mode=e.mode;
      this.data.data=e.data;
      if(e.url==null){
        this.$swal.fire(this.$t('youcompleted'));
      }else {
        let that=this;
        if(this.backdata==null){
          this.$axios.post(this.$url+'user/Mednudetail',this.data,
            {
              headers:{
                Authorization:localStorage.token
              }

            }).then(function (res){
            that.loaddata();
            that.dialog=false;
            that.reset();
          });
        }else {
          this.$axios.put(this.$url+'user/Mednudetail/'+this.data.id,this.data,
            {
              headers:{
                Authorization:localStorage.token
              }

            }).then(function (res){
            that.loaddata();
            that.dialog=false;
            that.reset();
          });
        }

      }
    },
    changemode(){
      this.com=this.mode;
      this.key=this.key+1;
    },
    newitem(parent,sub){
      this.reset();
      this.data.parent=parent;
      this.data.sub=sub;
      this.dialog=true;

    },
    edit(id){
    //  this.reset();
      try{
        this.data.parent=id.parent;
        this.data.sub=id.sub;
        this.data.url=id.url;
        this.data.name=id.name;
        this.data.data=id.data;
        this.backdata=id.data;
        this.data.mode=id.mode;
        this.data.id=id.id;

        this.dialog=true;
      }finally {
        this.key=this.key+1;
      }



     console.log(id);
    },
    deletee(e){
      let that=this;
      this.$axios.delete(this.$url+'user/Mednudetail/'+e,
        {
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
        that.loaddata();
      })
    },
    loaddata(){
      let that=this;
      this.$axios.get(this.$url+'user/Mednudetail/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.list=res.data;
      })
    }
  },
  mounted() {
    this.loaddata();
  }

}
</script>

<style scoped>

</style>
