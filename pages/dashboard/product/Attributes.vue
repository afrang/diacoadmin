<template>
  <div >
    <div >
      <div class="right text-right pt-4">
        <h4 @click="loadmodel" v-text="$t('feature')"></h4>
        <v-btn @click="loadlist" > <span class="icofont-list"></span><span v-text="$t('List')"></span> </v-btn>
        <v-btn @click="addlist" > <span class="icofont-ui-add"></span><span v-text="$t('Add')"></span> </v-btn>
      </div>
      <template v-if="mode=='itemedit'">
        <h4 class="ma-2" v-text="$t('itemfor')+detail.name"></h4>
        <form @submit.prevent="saveitem">
          <v-btn type="submit" >{{ $t('save') }}</v-btn>
          <v-btn @click="backtomain" >{{ $t('back') }}</v-btn>
          <v-text-field   v-model="item.name" :label="$t('name')"></v-text-field>
          <template v-if="item.id!=null">
            <v-text-field   v-model="item.icon" :label="$t('icon')"></v-text-field>
            <v-row>
              <v-col cols="3">
                <label   v-text="$t('picture')"></label>
                <file-uploader  :key="1"  mode="AttrProductitem"  v-on:filename="filenamesitem" :id='item.id' name="thump"  :file="item.image"></file-uploader>
              </v-col>
              <v-col cols="8">
                <label  v-text="$t('help')"></label>
                  <tisseditor :key="2"  :text="item.help" v-on:myevent="doSomethingitem"  :mode="'AttrProductitem'"></tisseditor>
              </v-col>
          </v-row>
          </template>
          <showerror :errors="error"></showerror>
        </form>
      </template>
      <template v-if="mode=='list'">
        <div class="list-group" v-if="list!=null">
          <v-data-table :headers="headers"  :items="list" :hide-default-footer="true">
            <template v-slot:item.edit="{ item ,index}">
              <a  @click="edit(index)" class="icofont  icofont-edit icofont-1x"></a>
            </template>
          </v-data-table>
        </div>
      </template>
      <template v-if="mode=='edit'">
        <form @submit.prevent="save" class="ma-3">
          <v-btn color="primary" type="submit">{{ $t('save') }}</v-btn>
          <v-text-field v-model="detail.name" :label="$t('name')"></v-text-field>
          <v-row>
              <v-col cols="6">
                <v-text-field v-model="detail.unit" :label="$t('unit')"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="detail.icon" :label="$t('icon')"></v-text-field>
              </v-col>
              <v-col cols="6" v-if="model!=null">
                <label>{{ $t('blog') }}</label>
                <v-select item-text="name"  item-value="id" :items="model"  v-model="detail.mode" menu-props="auto" :label="$t('blog')" hide-details  single-line></v-select>
              </v-col>
              <template v-if="detail.id!=null">
              <v-col cols="6">
                <label>{{ $t('filtermode') }}</label>
                <v-select item-text="label" item-value="data" :items="[{data:1,label:$t('yes')},{data:0,label:$t('no')}]" v-model="detail.filtered" menu-props="auto" :label="$t('filtered')" hide-details  single-line ></v-select>

              </v-col>
                <v-col cols="6">
                <label>{{ $t('pricemode') }}</label>
                <v-select item-text="label" item-value="data" :items="[{data:1,label:$t('addtoprice')},{data:0,label:$t('mainprice')}]" v-model="detail.filtered"        menu-props="auto"      :label="$t('filtered')"
                              hide-details  single-line  >        </v-select>

              </v-col>
            <v-col cols="12">
              <template v-if="detail.mode==4">
                <label   v-text="$t('options')"></label>
                <div>
                  <v-btn @click="additem(item.id)" >{{ $t('additem') }}</v-btn>
                  <hr>
                  <v-data-table :headers="headers2"  :items="detail.to_options"   :hide-default-footer="true">
                    <template v-slot:item.edit="{ item ,index}">
                      <a   @click="edititem(index)" class="icofont icofont-edit icofont-1x"></a>
                    </template>
                    <template v-slot:item.delete="{ item ,index}">
                      <a  @click="deleteitem(index)" class="icofont icofont-ui-delete icofont-1x"></a>
                    </template>
                  </v-data-table>
                </div>
              </template>
            </v-col>
              </template>
            </v-row>
          <template v-if="detail.id!=null">
            <hr>
            <div class="row m-0">
              <div class="col-sm-3">
                <label  v-text="$t('picture')"></label>
                <file-uploader
                  :key="2"
                  mode="Attrprodcut"
                  v-on:filename="filenames"
                  :id='detail.id'
                  name="thump"
                  :file="detail.image">
                </file-uploader>
              </div>
              <div class="col-sm-8">
                <label   v-text="$t('help')"></label>
                <tisseditor
                  :key="2"
                  :text="detail.help"
                  v-on:myevent="doSomething"
                  :mode="'Attrprodcut'"></tisseditor>
              </div>
            </div>
          </template>
          <showerror :errors="error"></showerror>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
    import Tisseditor from "~/components/admin/tools/Tisseditor";
    import FileUploader from "~/components/admin/tools/FileUploader";
    import showerror from "~/components/admin/tools/Showerror";
    export default {
        name: "Attributes",
      layout:'dashboard',

      data() {
            return {
              headers: [
                {
                  text: this.$t('name'),
                  align: 'start',
                  sortable: false,
                  value: 'name',
                },
                {
                  text: this.$t('edit'),
                  align: 'start',
                  sortable: false,
                  value: 'edit',
                },

                ],
              headers2: [
                {
                  text: this.$t('name'),
                  align: 'start',
                  sortable: false,
                  value: 'name',
                },
                {
                  text: this.$t('edit'),
                  align: 'start',
                  sortable: false,
                  value: 'edit',
                },
                {
                  text: this.$t('delete'),
                  align: 'start',
                  sortable: false,
                  value: 'delete',
                },

                ],

                mode:'list',
                error:[],
                list:null,
                model:null,
                detail:{
                    id:null,
                    name:null,
                    mode:4,
                    icon:null,
                    unit:null,
                    image:null,
                    help:null,
                    pricemode:null,

                },
                itemlist:null,
                item:{
                    id:null,
                    parent:null,
                    icon:null,
                    image:null,
                    help:null,
                }
            }
        },
        components: {
            showerror,Tisseditor,FileUploader
        },
        methods: {
            /* Item Option */
            deleteitem(e,index){
                let that=this;
                this.$axios.delete(this.$url+'user/AttrProductitem/'+e,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    }).then(function (response) {

                    that.reloaddetail();


                });
            },
            reloaddetail(){
                let that=this;
                this.$axios(this.$url+'user/Attrprodcut/'+this.detail.id,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.detail=response.data;
                    });
            },
            backtomain(){
                this.mode='edit';
            },
            edititem(e){
                this.item=this.detail.to_options[e];
                this.mode='itemedit';
            },
            additem(){
                this.itemreset();
                this.item.parent=this.detail.id;
                this.mode='itemedit';

            },
            itemreset(){
                this.item={
                    id:null,
                    parent:null,
                    icon:null,
                    image:null,
                    help:null,
                }
            },
            filenamesitem(e){
                this.item.image=e;

            },
            doSomethingitem(e){
                this.item.help=e;
            },
            /* End Item Option */
            doSomething(e){
                this.detail.help=e;
            },
            filenames(e){
                this.detail.image=e;

            },
            saveitem(){
                let that=this;
                if(this.item.id==null){

                    this.$axios.post(this.$url+'user/AttrProductitem',this.item,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                        that.error=[];
                        that.item=response.data;
                        that.reloaddetail();

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }else{
                    this.$axios.put(this.$url+'user/AttrProductitem/'+this.item.id,this.item,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {

                        that.error=[];
                        that.item=response.data;
                        that.$swal.fire(that.$t('Saved'));


                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }

            },
            save(){
                let that=this;
                if(this.detail.id==null){

                    this.$axios.post(this.$url+'user/Attrprodcut',this.detail,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                        that.error=[];

                        that.resetlist();
                        that.loadlist();
                        that.mode='list';

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }else{
                    this.$axios.put(this.$url+'user/Attrprodcut/'+this.detail.id,this.detail,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                      that.error=[];
                        that.detail=response.data;

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }

            },
            loadlistall(){
                let that=this;
                this.$axios.get(this.$url+'user/Attrprodcut',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }) .then(function (response) {
                    that.list=response.data;

                });
            },
            loadlist(){
                this.loadlistall();
                this.mode='list';

            },
            addlist(){
                this.resetlist();
                this.mode='edit';

            },
            edit(x){
                this.resetlist();
                this.mode='edit';
                this.detail=this.list[x];

            },
            resetlist(){
                this.detail={
                    id:null,
                    name:null,
                    mode:4,
                    icon:null,
                    unit:null,
                    image:null,
                    help:null,

                }
            },
            loadmodel(){
                let that=this;
                this.$axios.get(this.$url+'user/ModelAttrController',{

                    headers:{
                        Authorization:localStorage.token
                    }
                })
                    .then(function (response) {
                        that.model=response.data;
                    });

            }


        },
        mounted() {
            this.mode='list';
            this.loadmodel();
            this.loadlist();
        }
    }
</script>

<style scoped>

</style>
