<template>
    <div>
      <v-btn to="/dashboard/menus">{{ $t('back') }}</v-btn>
      <br>
      <h3>{{ $t('menugroup') }}</h3>
      <hr>


      <v-container>
        <v-form @submit.prevent="save" >
          <v-row>
            <v-col md="2" xs="2">
              <v-select  v-model="data.lang" :label="$t('lang')" :items="list" item-value="lang" item-text="lang"></v-select>
            </v-col>
            <v-col  md="4" xs="12" >
              <v-text-field v-model="data.name" :label="$t('name')"></v-text-field>
            </v-col>
            <v-col md="4" xs="12">
              <v-text-field v-model="data.url" :label="$t('url')"></v-text-field>
            </v-col>
          </v-row>


          <v-btn type="submit" >{{ $t('save') }}</v-btn>
        </v-form>

      </v-container>
      <Errors :errors="errors"></Errors>
    </div>
</template>

<script>
import Errors from "~/components/error";
export default {
  name: "editgroup",
  components: {Errors},

  data(){
    return{
      errors:null,
      lang:[],
      list:[],

      data:{
        id:null,
        name:null,
        lang:null,
        url:null
      }
    }
  },
  methods:{
    loaddata(){
      let that=this;
      this.$axios.get(this.$url+'user/SettingController',{

        headers:{Authorization:localStorage.token}
      })   .then(function (response) {
       that.list=response.data;
      });

    },

    save(){
      let that=this;
      if(this.id==null){
        this.$axios.post(this.$url+'user/Groupmenu',this.data,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          window.location.replace('/dashboard/menus');
        }) .catch((error) => {
         that.errors = error.response.data.errors;

        });
      }else {
        this.$axios.put(this.$url+'user/Groupmenu/'+this.data.id,this.data,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          window.location.replace('/dashboard/menus');
        }) .catch((error) => {
          that.errors = error.response.data.errors;

        });
      }
    }
  },
  mounted() {
    this.loaddata();
  }
}
</script>

<style scoped>

</style>
