<template>
    <div class="container pt-3" v-if="setting!=null">
      <div class="wmaster" dir="rtl">
        <h2 @click="loadsetting" class="text-right" v-text="$t('commentsetting')"></h2>
        <hr>
        <form @submit.prevent="save" class="form text-right" dir="rtl">
          <div class="form-group">
            <label v-text="$t('description')"></label>
            <tisseditor
              :key="1"
              :keys="1"
              :componentkey="1"editsubject
              :height="500"
              :text="setting.comment"
              v-on:myevent="doSomething"
              :mode="'commentsetting'"></tisseditor>

          </div>
          <hr>
          <small v-text="$t('optionvalueforScoring')"></small>
          <hr>
          <div class="form-group">
            <label v-text="$t('subject')+1"></label>
            <input class="form-control" v-model="setting.subject1">
          </div>
          <div class="form-group">
            <label v-text="$t('subject')+2"></label>
            <input class="form-control" v-model="setting.subject2">
          </div>
          <div class="form-group">
            <label v-text="$t('subject')+3"></label>
            <input class="form-control" v-model="setting.subject3">
          </div>
          <div class="form-group">
            <label v-text="$t('subject')+4"></label>
            <input class="form-control" v-model="setting.subject4">
          </div>
          <input type="submit" class="btn btn-sm btn-success" :value="$t('save')">
        </form>
      </div>

    </div>
</template>

<script>
  import  tisseditor from '../../../components/admin/tools/Tisseditor';
    export default {
      layout:'dashboard',
        name: "commentsetting",
        components:{
            tisseditor
        },

        data(){
            return{
                setting:null,
                text:null
            }
        },
        methods:{
            doSomething(e){

                    this.setting.comment=e;


            },
            save(){
                let that=this;

              this.$axios.put(this.$url+'user/commentsertting/1',this.setting,{
                  headers:{
                      Authorization:localStorage.token
                  }
              }).then(function (res) {
                  that.$swal.fire(that.$t('saved'));
              })
            },
            loadsetting(){
                let self=this;
                this.$axios.get(this.$url+'user/commentsertting',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (res) {
                    self.setting=res.data;
                })
            }
        },
        mounted() {
        this.loadsetting();
        }
    }
</script>

<style scoped>

</style>
