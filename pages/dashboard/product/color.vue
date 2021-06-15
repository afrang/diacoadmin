<template>
  <div class="container pt-5 ">
    <div class="text-right wmaster dir-rtl text-right">
      <h4 @click="loaditem" v-text="$t('colormanager')"></h4>
      <hr>
      <v-btn @click="additem"><span class="icofont-ui-add"></span></v-btn>
      <div class="mt-4">
        <v-form @submit.prevent="save"  dir="rtl">
          <v-row>
            <v-col cols="5"><v-text-field :label="$t('name')" v-model="color.name"></v-text-field></v-col>
            <v-col cols="5">
              <label>{{ $t('color') }}</label>
              <input tems="modes" style="height: 20px; width: 80%;" type="color" :label="$t('code')" v-model="color.code" /></v-col>
            <v-col cols="2"><v-btn  type="submit" :label="$t('code')" >{{ myevent }}</v-btn></v-col>
          </v-row>

        </v-form>
      </div>
      <Showerror v-if="error!=null"  :errors="error"></Showerror>

      <div class="mt-4" v-if="list!=null">
        <v-chip
          color="green"
          close="pa-3 ma-2"
          v-for="(item,index) in list" :key="index"
          :color="item.code"
          outlined
          pill

        >
          <span v-text="item.name"></span> |
          <span class="icofont-edit " @click="edit(index)"></span> |
          <span class="icofont-delete-alt" @click="del(item.id)"></span>

        </v-chip>


      </div>
    </div>


  </div>
</template>

<script>
    import Showerror from "~/components/admin/tools/Showerror";
    export default {
        components: {Showerror},
        component:{
            Showerror
        },
        name: "color",
      layout:'dashboard',

      data(){
            return{
                error:null,
                color:{
                    id:null,
                    code:null,
                    name:null,
                    pattern:null
                },
                list:null,
                myevent:this.$t('Add')
            }
        },
        methods:{
            additem(){
                this.resetitem();
            },
            edit(x){
                this.color=this.list[x];
                this.myevent=this.$t('edit')
            },
            del(item){
                let that=this;
                this.$axios.delete(this.$url+'user/color/'+item,{
                    headers:{
                        Authorization:localStorage.token
                    }
                }) .then(function (res) {
                    that.loaditem();
                })
            },
            resetitem(){
                this.color={
                    id:null,
                    color:null,
                    name:null,
                    pattern:null
                };
                this.myevent=this.$t('Add');
            },
            loaditem(){
                let that=this;
                this.$axios.get(this.$url+'user/color',{ headers:{Authorization:localStorage.token}})
                    .then(function (res) {
                        that.list=res.data;
                    })
            },
            save(){
                let that=this;
                if(this.color.id==null){
                    this.$axios.post(this.$url+'user/color',this.color,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.resetitem();
                            that.loaditem();
                        }) .catch((error) => {
                        that.error = error.response.data.errors;
                    });
                }else{
                    this.$axios.put(this.$url+'user/color/'+this.color.id,this.color,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.resetitem();
                            that.loaditem();
                        }) .catch((error) => {
                        that.error = error.response.data.errors;
                    });
                }

            }
        },
        mounted() {
            this.loaditem();
        }
    }
</script>

<style scoped>

</style>
