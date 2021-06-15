<template>
  <div class="pt-5">
    <div class="container  text-right wmaster " dir="rtl" v-if="contacus!=null">
      <h4 v-text="$t('contactus')"></h4>
      <hr>
      <label>{{ $t('lang') }}</label>
      <v-select :items="list" v-model="langdefault"    item-value="lang" item-text="lang"></v-select>
      <v-form  @submit.prevent="save" v-if="contacus!=null">
            <v-text-field v-model="contacus.webname" :label="$t('webname')"></v-text-field>
            <v-text-field v-model="contacus.title" :label="$t('title')"></v-text-field>
            <v-textarea v-model="contacus.keywords" :label="$t('keywords')"></v-textarea>
            <v-textarea v-model="contacus.description" :label="$t('description')"></v-textarea>
        <div >
          <v-btn type="submit"  >{{ $t('save') }}</v-btn>

        </div>

        <div class="w-100" >

          <file-uploader class="col-sm-3 float-right"
                         mode="setting"
                         v-on:filename="filenames"
                         :id='contacus.id'
                         name="logo"
                         :file="contacus.logo"
                         :deletefile="true"
          ></file-uploader>
        </div>

      </v-form>

    </div>
  </div>
</template>

<script>
    import FileUploader from "~/components/admin/tools/FileUploader";

    export default {
        name: "setting",
        data() {
            return {
                lang:[],
                list:[],
                langdefault:'fa',

            }
        },
      layout:'dashboard',

      components: {
            FileUploader
        },
        computed: {
            contacus:function() {
                let that=this;
                let backdata;
                this.list.map(function(item) {
                    if(that.langdefault==item.lang){

                        backdata=item;

                    }
                });
                return backdata;
          }
        },
        methods: {
            filenames(e){
                this.contacus.logo=e;


            },
            save(){
                let that=this;
                this.$axios.put(this.$url+'user/SettingController/'+this.contacus.id,this.contacus,
                    {

                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.$swal.fire(that.$t('Saved'));

                    });
            },
            loadsetting(){
                let that=this;
                this.$axios.get(this.$url+'user/SettingController',{

                    headers:{Authorization:localStorage.token}
                })   .then(function (response) {
              console.log(response.data);
               that.list=response.data;


                });
            }
        },
        mounted() {
            //this.show();
            this.loadsetting();


        },
        head () {
            return {
                title: this.$t('setting'),

            }
        }

    }
</script>

<style scoped>
</style>
