<template>
    <div class=" pt-5">
      <div class="container wmaster text-right" dir="rtl" v-if="list!=null">
          <h4 v-text="$t('contactus')"></h4>
          <hr>
        <v-select v-model="langdefault" :items="list" item-value="lang" item-text="lang"></v-select>

          <v-form dir="rtl" @submit.prevent="save">
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="contacus.address" :label="$t('address')"></v-textarea>

              </v-col>
              <v-col cols="6"> <v-text-field append-icon="icofont icofont-phone"  v-model="contacus.phone" :label="$t('phone')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-fax"  v-model="contacus.fax" :label="$t('fax')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-support"           v-model="contacus.supportphone" :label="$t('supportphone')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-phone"             v-model="contacus.otherphone" :label="$t('otherphone')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-facebook"          v-model="contacus.facbook" :label="$t('facbook')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-map"             v-model="contacus.googlemap" :label="$t('Open Street Map')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-instagram"     v-model="contacus.instagram" :label="$t('instagram')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-telegram"     v-model="contacus.telegram" :label="$t('telegram')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-telegram"     v-model="contacus.telegramchanal" :label="$t('telegramchanal')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-whatsapp"     v-model="contacus.whatsapp" :label="$t('whatsapp')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-youtube"     v-model="contacus.youtube" :label="$t('youtube')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-youtube-play"     v-model="contacus.aparat" :label="$t('aparat')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-soundcloud"     v-model="contacus.soundcloud" :label="$t('soundcloud')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-twitter"     v-model="contacus.twitter" :label="$t('twitter')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-pinterest"     v-model="contacus.pinterest" :label="$t('pinterest')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-google-plus"     v-model="contacus.googleplus" :label="$t('googleplus')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-linkedin"     v-model="contacus.linkedin" :label="$t('linkedin')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-qq"     v-model="contacus.qq" :label="$t('qq')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-tumblr"     v-model="contacus.tumblr" :label="$t('tumblr')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-baidu-tieba"     v-model="contacus.baidu" :label="$t('baidu')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-skype"     v-model="contacus.skype" :label="$t('skype')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-line"     v-model="contacus.line" :label="$t('line')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-weibo"     v-model="contacus.sinaweibo" :label="$t('sinaweibo')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-vk"     v-model="contacus.vk" :label="$t('vk')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-reddit"     v-model="contacus.reddit" :label="$t('reddit')"></v-text-field></v-col>
              <v-col cols="6"><v-text-field append-icon="icofont icofont-imac"     v-model="contacus.tiktok" :label="$t('tiktok')"></v-text-field></v-col>

            </v-row>


                <v-btn type="submit"  >{{ $t('save') }}</v-btn>


          </v-form>

      </div>
    </div>
</template>

<script>
    export default {
        name: "contactus",
      layout:'dashboard',
        data() {
            return {
                lang:[],
                list:null,
                langdefault:'fa',

            }
        },
        computed: {
            contacus:function() {
                    let that=this
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
            save(){
              let that=this;
              this.$axios.put(this.$url+'user/ContactusController/'+this.contacus.id,this.contacus,
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
                this.$axios.get(this.$url+'user/ContactusController',{

                    headers:{Authorization:localStorage.token}
                })   .then(function (response) {

                    that.list=response.data;


                });
            }
        },
        beforeMount() {
            //this.show();
            this.loadsetting();


        }

    }
</script>

<style scoped>
</style>
