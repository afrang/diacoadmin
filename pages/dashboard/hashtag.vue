<template>
  <div class="pt-4">
    <div class="container pt-4 text-right dir-rtl wmaster">
      <h4 v-text="$t('hashtagmanager')"></h4>
      <hr>
      <v-chip  @click="deleted(item.id)"    v-for="(item,index) in tag" :key="index" >
        <span  class="tiss-cursur" v-text="item.name"></span>

        <span @click="deleted(item.id)"    class="icofont-close "></span>

      </v-chip>



    </div>
  </div>
</template>

<script>
    export default {
        name: "hashtag",
        data() {
            return {
                tag:[]
            }
        },
      layout:'dashboard',
        methods:{
            deleted(id){
                let that=this;
                that.$axios.delete(this.$url+'user/Tag/'+id,{
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    that.loadtags();

                });
            },
            loadtags() {
                let that = this;
                this.$axios.get(this.$url + 'user/Tag', {
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    that.tag = res.data;

                });
            }

        },
        watch: {

        },
        mounted() {
            this.loadtags();
        },
        head () {
            return {
                title: this.$t('tags'),

            }
        }
    }
</script>

<style scoped>

</style>
