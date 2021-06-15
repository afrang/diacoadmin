<template>
  <div class="container pt-4" dir="rtl">
    <div class="text-right wmaster">
      <h4 v-text="$t('groupproducnt')"></h4>
      <hr>
      <v-btn  @click="add"><span class="icofont-ui-add"></span></v-btn>
      <v-btn  @click="listgroup"><span class="icofont-listing-box"></span></v-btn>
      <template v-if="pages.length!=1">

        <v-btn  @click="topitem(prev)"><span class="icofont-arrow-up"></span></v-btn>

      </template>

      <hr>
      <template v-if="mode=='list'">
        <template v-if="list!=null">
          <v-data-table
            hide-default-footer

            :items="list.data"
            :headers="headers"
          >
            <template v-slot:item.up="{ item ,index}">
              <a  @click="uped(item.id)" class="icofont  icofont-arrow-up icofont-1x"></a>
            </template>
            <template v-slot:item.down="{ item ,index}">
              <a  @click="downed(item.id)" class="icofont  icofont-arrow-down icofont-1x"></a>
            </template>
            <template v-slot:item.edit="{ item ,index}">
              <a  @click="edit(item.id)" class="icofont  icofont-edit icofont-1x"></a>
            </template>
            <template v-slot:item.sub="{ item ,index}">
              <a  @click="subitem(item.id)" class="icofont  icofont-sub-listing icofont-1x"></a>
            </template>
            <template v-slot:item.del="{ item ,index}">
              <a  @click="removeitem(item.id)" class="icofont  icofont-delete-alt icofont-1x"></a>
            </template>
          </v-data-table>
          <v-pagination
            v-model="pageNum"
            :length="list.last_page"
          ></v-pagination>
        </template>


      </template>


      <template v-if="mode=='add'">

        <h6 v-text="$t('EditGroup')"></h6>
        <v-form @submit.prevent="save">
        <v-card color="basil">
          <v-card-title class="text-center justify-center py-1">
            <h1 class="font-weight-bold text-h4 pa-2 basil--text">
              {{  group.name }}
            </h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab :key="1">{{  $t('detail') }}</v-tab>
            <v-tab :key="2">{{  $t('seo') }}</v-tab>
            <v-tab :key="3">{{  $t('priceitem') }}</v-tab>
            <v-tab :key="4">{{  $t('feature') }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item >
              <v-card color="basil"  :key="1" flat >
                <v-card-text>
                  <h3>{{  $t('detail') }}</h3>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field :label="$t('name')" v-model="group.name" ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field :label="$t('url')" v-model="group.url" ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field :label="$t('title')" v-model="group.title" ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea  :label="$t('keywords')"   v-model="group.keywords" :placeholder="$t('keywords')"></v-textarea>
                    </v-col>
                    <v-col cols="12">

                      <v-textarea :label="$t('description')"  v-model="group.description" :placeholder="$t('description')"></v-textarea>

                    </v-col>
                    <v-col cols="8">
                      <label v-text="$t('text')"></label>

                      <tisseditor  :text="group.text"
                                   :keys="1"

                                   :id="group.id"
                                   v-on:myevent="dotext"
                                   :mode="'GroupProduct'"></tisseditor>
                    </v-col>
                    <v-col cols="4">
                      <label v-text="$t('thump')"></label>
                      <file-uploader
                        :key="1"
                        mode="GroupProduct"
                        v-on:filename="thumpsave"
                        :id='group.id'
                        name="thump"
                        :file="group.thump"
                      ></file-uploader>
                    </v-col>
                  </v-row>

                </v-container>

              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-container>

                  <v-row>
                    <template v-if="group.id!=null">

                      <v-col cols="6">
                        <v-select :items="pricemode" item-value="id" item-text="name" :label="$t('pricemode')" v-model="group.pricemode" ></v-select>
                      </v-col>

                      <template v-if="group.pricemode==2">
                        <v-col cols="2">
                          <v-text-field  :hint="$t('CM')"    :label="$t('minwidth')" v-model="group.minwidth" ></v-text-field>
                        </v-col>
                        <v-col cols="1">      <span class="icofont icofont-text-width"></span> </v-col>
                        <v-col cols="2">
                          <v-text-field  :hint="$t('CM')"    :label="$t('maxwidth')" v-model="group.maxwidth" ></v-text-field>
                        </v-col>
                        <v-col cols="1"> <span class="icofont icofont-text-height"></span> </v-col>
                        <v-col cols="2">
                          <v-text-field  :hint="$t('CM')"    :label="$t('minheight')" v-model="group.minheight" ></v-text-field>
                        </v-col>
                        <v-col cols="1">      <span class="icofont icofont-text-width"></span> </v-col>
                        <v-col cols="2">
                          <v-text-field  :hint="$t('CM')"    :label="$t('maxheight')" v-model="group.maxheight" ></v-text-field>
                        </v-col>
                        <v-col cols="1"> <span class="icofont icofont-text-height"></span> </v-col>
                      </template>



                    </template>

                  </v-row>

              </v-container>


            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <label v-text="$t('color')"></label>
                    <v-select
                      v-model="colorselect"
                      multiple
                      :items="color"
                      item-text="name"
                      item-value="id"
                    ></v-select>

                  </v-col>
                  <v-col cols="6">
                    <label v-text="$t('features')"></label>

                    <vue-tags-input class="col-xs-12"
                                    :key="1"
                                    v-model="group.feas"
                                    :tags="feas"
                                    :placeholder="$t('addfeature')"
                                    @tags-changed="newTags => feas = newTags"
                                    :autocomplete-items="filteredItemsfeas"
                    />
                  </v-col>
                  <v-col cols="6">
                    <label v-text="$t('attrbiute')"></label>

                    <vue-tags-input class="col-xs-12"
                                    :placeholder="$t('addattr')"
                                    :key="2"
                                    v-model="attr"
                                    :tags="attrs"
                                    @tags-changed="newTags => attrs = newTags"
                                    :autocomplete-items="filteredItemsattr"
                    />
                  </v-col>
                </v-row>
              </v-container>

            </v-tab-item>
          </v-tabs-items>
        </v-card>
          <div class="row m-0">
            <v-row>


            </v-row>



            <div class="clearfix col-sm-12 text-center mt-3">
              <v-btn type="submit">{{ $t('save') }}</v-btn>

            </div>
          </div>
        </v-form>
      </template>
    </div>



    <showerror :errors="error"></showerror>



  </div>



</template>

<script>


    import FileUploader from "../../../components/admin/tools/FileUploader";
    import Tisseditor from "../../../components/admin/tools/Tisseditor";
  //  import Multiselect from 'vue-multiselect';

    import Showerror from "~/components/admin/tools/Showerror";
    export default {
        name: "productgroup",
        components: {Showerror,Tisseditor,FileUploader},
      layout:'dashboard',

      data(){
            return{
              pageNum:1,
              tab:null,
              headers:[
                { text: this.$t('name'), align: 'start',sortable: false,value: 'to_city.name' },
                { text: this.$t('url'), align: 'start', sortable: false,  value: 'url' },
                { text: this.$t('up'), value: 'up' },
                { text: this.$t('down'), value: 'down' },
                { text: this.$t('edit'),  value: 'edit' },
                {  text: this.$t('sub'), value: 'sub'  },
                { text: this.$t('del'),    value: 'del' },
              ],
                sub:0,
                prev:0,
                pages:[0],
                mode:null,
                colorselect:[],
                error:[],
                group: {
                    id: null,
                    name: null,
                    sub: 0,
                    url: null,
                    menuitem: 1,
                    keywords: null,
                    description: null,
                    text: null,
                    seotext: null,
                    icon: null,
                    thump: null,
                    title: null,
                    pricemode: 1,
                    minwidth: 100,
                    maxwidth: 500,
                    minheight: 500,
                    maxheight: 500,
                    arealimit: 50,
                    areaerror: null,
                },
                pricemode:[
                   {
                     id:1,
                     name:this.$t('normal')
                    },
                    {
                      id:2,
                        name:this.$t('metterbase')
                    }
                  ],

                list:[],
                color:[],
                options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],


                Attrlist:[],
                attrs:[],
                attr:'',

                taglist:[],
                tags:[],
                tag:'',

                fealist:[],
                feas:[],
                fea:null
            }
        },
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
                this.group.to_tags.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            },

            filteredItemsfeas() {
                return this.autocompleteItemsfeas.filter(i => {
                    return i.text;
                });
            },

            autocompleteItemsfeas(){
                let b=[];
                this.fealist.forEach(function (item) {
                    b.push({text:item.name});

                });
                return b;
            },
            feasgenerator(){
                let b=[];
                this.group.to_feature.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            },


            filteredItemsattr() {
                return this.autocompleteItemsattr.filter(i => {
                    return i.text.toLowerCase().indexOf(this.attr.toLowerCase()) !== -1;
                });
            },
            autocompleteItemsattr(){
                let b=[];
                this.Attrlist.forEach(function (item) {
                    b.push({text:item.name});

                });
                return b;
            },
            attrgenerator(){
                let b=[];
                this.group.to_attr.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            }
        },

      watch: {
        // whenever question changes, this function will run
        pageNum: function () {
            this.loadlist();
        }
      },

      methods:{
          test(){
            this.$axios.post('http://test.oxincare.com/api/test/cors');
          },
            topitem(id){

                let last=this.pages[this.pages.length - 2];
                this.sub=last;
                this.pages.pop();
                this.loadlist();

            },
            subitem(id){
                this.prev=this.sub;
                this.sub=id;
                this.pages.push(id);

                this.loadlist();
            },
            customLabel({name,code}){
                return `${name}`;

            },
            addTag (newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                }
                this.options.push(tag)
                this.value.push(tag)
            },
            resetform(){
                this.group={
                    id:null,
                    name:null,
                    sub:0,
                    url:null,
                    menuitem:1,
                    keywords:null,
                    description:null,
                    text:null,
                    seotext:null,
                    icon:null,
                    thump:null,
                    title:null,
                }
            },
            dotext(e){
                this.group.text=e;
            },
            doseotext(e){
                this.group.seotext=e;
            },
            add(){
                this.resetform();
                this.mode='add';

            },
            thumpsave(e){
                this.group.thump=e;
            },
          menuimage(e){
            this.group.menuimage=e;
          },
            save(){
                let that=this;
                if(this.group.id==null){
                    this.group.sub=that.sub;

                    this.$axios.post( this.$url+'user/pgroup',
                        this.group,
                        {
                            headers: {
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(res){
                        that.group=res.data;
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }else{
                    this.group.tag=JSON.stringify(this.tags);
                    this.group.fea=JSON.stringify(this.feas);
                    this.group.attrs=JSON.stringify(this.attrs);
                    this.group.color=JSON.stringify(this.colorselect);
                    this.group.sub=that.sub;
                    this.$axios.put( this.$url+'user/pgroup/'+this.group.id,
                        this.group,
                        {
                            headers: {
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(res){
                        //  that.group=res.data;
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;
                        });

                }
            },
            urlcreate(){
                if(this.group.id==null){
                    let str=this.group.name;
                    this.group.url=str.replace(/#| /g,'_');

                };
            },
            listgroup(){
                this.loadlist();
                this.mode='list';

            },
            clickCallback(pageNum){
                this.loadlist(pageNum);
            },
            edit(i){
                let that=this;
                this.resetform();
                this.$axios.get(this.$url+'user/pgroup/'+i,{

                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.group=res.data;
                    that.tags=that.taggenerator;
                    that.attrs=that.attrgenerator;
                    that.feas=that.feasgenerator;
                    that.colorselect=res.data.to_color;
                    that.mode='add';
                })

            },
            loadattr(){
                let that=this;
                this.$axios.get(this.$url+'user/Feature',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.fealist=res.data;
                });
                this.$axios.get(this.$url+'user/Attrprodcut',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.Attrlist=res.data;
                });
                this.$axios.get(this.$url+'user/color',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.color=res.data;
                });
                this.$axios.get(this.$url+'user/Tag',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.taglist=res.data;
                });
            },
            removeitem(id){
                let that=this;
                this.$axios.delete(this.$url+'user/pgroup/'+id,{
                    params:{
                        id:id
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.loadlist();
                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
            loadlist(){

                let that=this;
                this.$axios.get(this.$url+'user/pgroup',{
                    params: {
                        page: that.pageNum,
                        sub:that.sub
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.list=res.data;
                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
            uped(e){
                let that=this;
                this.$axios.get(this.$url+'user/pgroupDetailup/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadlist();


                    });
            },
            downed(e){
                let that=this;
                this.$axios.get(this.$url+'user/pgroupDetailup/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadlist();


                    });
            },
        },
        mounted() {
            this.mode='list';
            this.loadlist();
            this.loadattr();

        }
    }
</script>
<style src="~/node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>

<style  scoped>

</style>
