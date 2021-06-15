<template>
  <div class="container pt-4">
    <!-- Modal -->

    <div class="wmaster text-right" dir="rtl">
      <v-dialog   width="500" v-model="extramoney">
        <v-card class="pa-3">
          <div class="modal-content" v-if="editprice!=null">
            <div class="modal-body text-right">
              <label v-text="$t('price')"></label>

              <Money dir="ltr"  class="form-control" v-model="editprice.price" v-bind="money"></Money>

              <label v-text="$t('discount')"></label>

              <Money dir="ltr"  class="form-control" v-model="editprice.discount" v-bind="money"></Money>

              <label v-text="$t('percent')"></label>
              <v-text-field  type="number" min="0" max="100" v-model="editprice.percent" ></v-text-field>
              <v-btn  @click="savepriceattr" >{{ $t('save') }}</v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog   width="500" v-model="modaleditfeature">
        <v-card class="pa-3"  v-if="editfeature!=null">
          <h4 v-text="editfeature.to_attr.name" ></h4>
          <hr/>
          <template v-if="editfeature.to_attr.mode==1">
            <tisseditor  :key="'esmailso'+4"  :text="editfeature.value" v-on:myevent="featurevalue"   :mode="'Product'"></tisseditor>
          </template>

        </v-card>
      </v-dialog>

      <modal   :scrollable="true"   height="auto" name="editfeature" dir="ltr" :key="'mi2'"  >
        <div class="modal-content" v-if="editfeature!=null">
          <div class="modal-header text-right" dir="rtl" >
            <span v-text="editfeature.to_attr.name" ></span>
          </div>
          <div class="modal-body">
            <template v-if="editfeature.to_attr.mode==1">
              <tisseditor  :key="'esmailso'+4"  :text="editfeature.value" v-on:myevent="featurevalue"   :mode="'Product'"></tisseditor>
            </template>
            <template v-if="editfeature.to_attr.mode==2">
              <input type="number" class="form-control" v-model="editfeature.value">
            </template>
            <template v-if="editfeature.to_attr.mode==3">
              <template v-if="booleanhave">
                <select class="form-control" v-model="editfeature.value" dir="rtl">
                  <option v-for="(item,index) in booleanhave" :key="'per'+index" :value="index" v-text="item"></option>
                </select>
              </template>

            </template>

            <template v-if="editfeature.to_attr.mode==4">
              <template v-if="editfeature!=null">
                <select class="form-control" v-model="editfeature.value" dir="rtl">
                  <option v-for="(item,index) in editfeature.to_attr.to_options" :key="'pser'+index" :value="item.id" v-text="item.name"></option>
                </select>
              </template>

            </template>
            <input @click="savevaluefeature" type="button" class="btn mt-4 btn-primary" :value="$t('save')">
          </div>
        </div>
      </modal>
      <modal   :scrollable="true"   height="auto" name="hello-world" dir="ltr" :key="'mi'"  >
        <div class="modal-content">
          <div class="modal-header text-right" >
          </div>
          <div class="modal-body">
            <form  @submit.prevent="savecolor"  dir="rtl" v-if="coloredit!=null" class="form text-right row" >
              <div class="form-group col-sm-12">
                <a   class="btn   text-white m-1 w-100 text-right" >
                  <div  class="btncolor" :style="{ 'background-color': coloredit['to_color']['code'] }"></div>
                  <a v-text="coloredit['to_color']['name']" style="color: #333;" class="text-black"></a>
                </a>
              </div>
              <div class="form-group container col-sm-6 ">
                <label v-text="$t('existing')"></label>
                <select v-model="coloredit.existing" class="form-control">
                  <option value="1" v-text="$t('yes')"></option>
                  <option value="0" v-text="$t('no')"></option>
                </select>
                <hr>
                <button  type="submit" class="btn btn-primary" v-text="$t('save')"></button>
              </div>
              <div class="form-group col-sm-6">
                <file-uploader
                  :key="'fa'+1"
                  mode="Product"
                  v-on:filename="iamgemanagers"
                  :id='product.id'
                  :showthump="true"
                  :name=coloredit.color
                  :deletefile="true"
                  :file="coloredit.image"
                ></file-uploader>
              </div>
            </form>
          </div>
        </div>
      </modal>

      <h5 v-text="$t('product')"></h5>

      <v-btn @click="add">{{ $t('add')}}</v-btn>
      <v-btn to="/dashboard/product/excel">{{ $t('editoraddfromexcel')}}</v-btn>
      <v-btn @click="listproduct">{{ $t('list')}}</v-btn>


      <template v-if="mode=='list'">
        <template v-if="listitems!=null">
          <v-data-table
            hide-default-footer
            :items="listitems.data"
            :headers="[
              { text: this.$t('name'), align: 'start', value: 'name' },
              { text: this.$t('model'), align: 'start', value: 'model' },
              { text: this.$t('group'), align: 'start', value: 'group' },
              { text: this.$t('edit'), align: 'start', value: 'edit' },
              { text: this.$t('remove'), align: 'start', value: 'remove' },
              ]">
            <template v-slot:item.edit="{ item ,index}">
              <a  @click="edit(item.id)" class="icofont icofont-edit icofont-1x"></a>
            </template>
            <template v-slot:item.remove="{ item ,index}">
              <a   @click="del(item.id)" class="icofont icofont-ui-delete icofont-1x"></a>
            </template>
          </v-data-table>
        </template>
        <v-pagination v-if="listitems!=null"  v-model="page"  :length="listitems.meta.last_page"  circle ></v-pagination>
      </template>
      <template v-if="mode=='edit'">

        <v-form @submit.prevent="save" >
          <v-row>
            <v-col cols="6">
              <v-text-field  @keyup="urlcreate" v-model="product.name" :label="$t('name')"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field  v-model="product.url" :label="$t('url')"></v-text-field>
            </v-col>
            <template v-if="product.id==null">
              <v-col cols="6">
                <template v-if="selectgroup!=null">
                  <v-select
                    v-model="product.parent"
                    :items="selectgroup"
                    :label="$t('group')"
                    outlined
                    item-value="id"
                    item-text="name"
                  >
                    <template v-slot:selection="{ item, index }">
                      <template v-if="item.mode=='sub'">
                        <strong>{{ item.name }}</strong>
                      </template>
                      <template v-else>
                        <small>{{ item.sub }} : {{ item.name }}</small>
                      </template>
                    </template>
                    <template v-slot:item="{ item, index }">
                      <template v-if="item.mode=='sub'">
                        <strong>{{ item.name }}</strong>
                      </template>
                      <template v-else>
                        <small>{{ item.sub }} : {{ item.name }}</small>
                      </template>
                    </template>
                  </v-select>
                </template>
              </v-col>

            </template>
          </v-row>
          <template v-if="product.id!=null">
            <v-card color="basil">

              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
              >
                <v-tab  :key="1" >{{ $t('specifications') }} </v-tab>
                <v-tab  :key="2" >{{ $t('images') }} </v-tab>
                <v-tab  :key="3" >{{ $t('PricingFeature') }} </v-tab>
                <v-tab  :key="4" >{{ $t('Attribute') }} </v-tab>
                <v-tab  :key="5" >{{ $t('colormanager') }} </v-tab>
                <v-tab  :key="6" >{{ $t('description') }} </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item  :key="1">
                  <v-card    color="basil"    flat  >
                    <v-card-text>
                      <div><br>
                        <h5  v-text="$t('specifications')"></h5>
                        <v-row >
                          <v-col cols="6">
                            <v-text-field :label="$t('title')" v-model="product.title"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field :label="$t('model')" v-model="product.model"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-select :label="$t('status')"  outlined
                                      item-text="text" item-value="value" :items="status" v-model="product.status"></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-select :label="$t('special')"  outlined
                                      item-text="text" item-value="value" :items="special" v-model="product.special"></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-select :label="$t('discount')"  outlined
                                      item-text="text" item-value="value" :items="booleanarray" v-model="product.discount"></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-select :label="$t('expressdelivery')"  outlined
                                      item-text="text" item-value="value" :items="booleanarray" v-model="product.expressdelivery"></v-select>
                          </v-col>
                          <v-col cols="6">
                            <vue-tags-input
                              class="col-xs-12"
                              :key="'pers'+1"
                              v-model="tag"
                              :tags="tags"
                              @tags-changed="newTags => tags = newTags"
                              :autocomplete-items="filteredItems"
                            />
                          </v-col>
                          <div class="form-group col-sm-12 col-xs-12">

                            <h5 v-text="$t('abstract')"></h5>
                            <p>
                              <tisseditor  :key="'pers'+1"  :text="product.morecomment" v-on:myevent="morecommentedit"   :mode="'Product'"></tisseditor>
                            </p>
                          </div>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item  :key="2">
                  <v-row>
                    <v-col cols="4">
                      <h5  @click="loadimage" v-text="$t('images')" class="mt-2"></h5>
                      <hr>
                      <file-uploader
                        :key="'persi'+1"
                        mode="Product"
                        v-on:filename="addpicture"
                        :id='product.id'
                        :showthump="false"
                        name="random"
                        :deletefile="false"
                        :file="group.thump"
                      ></file-uploader>
                    </v-col>
                    <v-col cols="8">
                      <div class="row m-0">

                        <template v-if="imagelist!=null">
                          <div  v-for="(item,index) in imagelist" :key="'persia'+index" class="col-sm-4  mt-2 col-xs-12">
                            <div class="card"  >
                              <img class="card-img-top" :src="$storage+'media/Product/'+product.id+'/thump/'+item.file" alt="Card image cap">
                              <div class="card-body">
                                <v-btn @click="delimage(item.id)"  ><span class="icofont-2x icofont-ui-delete"> </span></v-btn>

                                <v-btn v-if="item.master==0" @click="masterimg(item.id)" :title="$t('masteriamge')" class=" btn btn-danger  "><span class="icofont-2x icofont-toggle-off"> </span></v-btn>
                                <v-btn   v-if="item.master==1"   :title="$t('masteriamge')" class=" btn btn-primary "><span class=" icofont-2x icofont-toggle-on"> </span></v-btn>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </v-col>
                  </v-row>
                  <div ><br>
                    <div class="row m-0" v-if="product!=null">

                      <div class="col-sm-12">
                        <h5  @click="loadimage" v-text="$t('images')" class="mt-2"></h5>
                        <hr>
                      </div>

                      <br>

                      <div class="col-sm-3">

                      </div>
                      <div class="col-sm-8 pb-5 ">

                      </div>
                    </div>

                    <div >
                      <template v-if="product.to_group.pricemode==2">
                        <h5  @click="loadimage" v-text="$t('pattern')" class="mt-2"></h5>

                        <file-uploader
                          style="width: 300px"
                          :key="'persis'"
                          mode="Product"
                          v-on:filename="addpattern"
                          :id='product.id'
                          name="pattern"
                          :file="product.pattern"
                        ></file-uploader>
                      </template>

                    </div>
                  </div>

                </v-tab-item>
                <v-tab-item :key="3">
                  <div class="pa-4">
                    <h5 class="pa-5" v-text="$t('fatureandprice')"></h5>
                    <hr>
                    <div class="row">
                      <div class="col-sm-5 col-xs-12 v-text-field__slot">
                        <label v-text="$t('price')"></label>
                        <Money dir="ltr"   class="form-control" :key="100"  v-model="price" v-bind="money"></Money>

                      </div>
                      <div class="col-sm-5 col-xs-12">
                        <label v-text="$t('pricediscount')"></label>

                        <Money dir="ltr" :key="101"   class="form-control" v-model="discount" v-bind="money"></Money>

                      </div>
                      <div class="col-sm-2 col-xs-12">
                        <label v-text="$t('percent')"></label>
                        %  <input class="form-control w-100" type="number" min="0" max="100" v-model="percent">

                        <v-btn type="button" class="btn btn-primary mt-4" @click="newpricesubmit" >{{ $t('save') }}</v-btn>

                      </div>
                    </div>
                    <hr>
                    <div class="container mt-4" >
                      <h5 class="mb-4" v-text="$t('otherprice')"></h5>
                      <div class="row" v-if="product.to_group.to_attr.length!=0">
                        <template v-for="(item,index) in product.to_group.to_attr">
                          <v-btn v-if="featurepriceselected.includes(item.id)==false" @click="addpriceattr(item.id)" :key="'feat'+index" class="tiss-cursur   m-4">
                            <span class="icofont-plus-square"></span>  <span>{{ item.name }}</span>
                          </v-btn>
                        </template>
                        <hr>
                      </div>
                      <div class=""  style="margin-top: 20px;">
                        <h5 v-text="$t('include')"></h5>
                        <hr>
                        <ul v-if="listporductattr!=null">
                          <li v-for="(my,index) in listporductattr" :key="'attr'+index" class="mt-4" >
                            <label class="text-success mt-4">
                              <v-btn @click="delattrprice(my.id)">
                                <span  class="icofont-ui-delete"></span>
                              </v-btn> |
                              <span v-text="my.to_attr.name"></span>
                              <template v-if="pricemode==0">
                                | <i class="text-white" v-text="$t('mainprice')"></i>
                              </template>
                              <template v-else>
                                | <i class="text-white" v-text="$t('addtoprice')"></i>
                              </template>
                            </label>
                            <v-data-table
                              :items="my.to_attr.to_options"
                              hide-default-footer
                              :headers="[
              { text: $t('name'), align: 'start', value: 'name' },
              { text: $t('status'), align: 'start', value: 'status' },
              { text: $t('price'), align: 'start', value: 'price' },
              { text:$t('discount'), align: 'start', value: 'discount' },
              { text: $t('percent'), align: 'start', value: 'percent' },
              { text: $t('edit'), align: 'start', value: 'edit' },
              { text: $t('remove'), align: 'start', value: 'delete' },
              ]">
                              <template v-slot:item.name="{ item ,index}">
                                <div>
                                  {{ item.name }}
                                  <template  v-if="!my.to_option_value.find(obj => obj.parent == item.id)" >
                                    | <span @click="addfeatureopt(my.id,item)" class="icofont-plus-square"></span>
                                  </template>

                                </div>
                              </template>
                              <template v-slot:item.status="{ item ,index}">
                                <template v-if="my.to_option_value.find(obj => obj.parent == item.id)">

                                  <span class="icofont-check"></span>
                                </template>
                                <template v-else>
                                  <span class="icofont-not-allowed"></span>
                                </template>
                              </template>
                              <template v-slot:item.price="{ item ,index}">
                                <div>
                                  <template  v-if="my.to_option_value.find(obj => obj.parent == item.id)" >
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="my.to_option_value.find(obj => obj.parent == item.id).to_price.price"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </template>
                                </div>
                              </template>
                              <template v-slot:item.discount="{ item ,index}">
                                <div>
                                  <template  v-if="my.to_option_value.find(obj => obj.parent == item.id)" >
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="my.to_option_value.find(obj => obj.parent == item.id).to_price.discount"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </template>
                                </div>
                              </template>
                              <template v-slot:item.percent="{ item ,index}">
                                <div>
                                  <template  v-if="my.to_option_value.find(obj => obj.parent == item.id)" >
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="my.to_option_value.find(obj => obj.parent == item.id).to_price.percent"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </template>
                                </div>
                              </template>
                              <template v-slot:item.edit="{ item ,index}">
                                <div>
                                  <template  v-if="my.to_option_value.find(obj => obj.parent == item.id)" >
                                    <span  @click="edititemprice(my.to_option_value.find(obj => obj.parent == item.id)['to_price'])" class="icofont-edit-alt" ></span>

                                  </template>
                                </div>
                              </template>
                              <template v-slot:item.delete="{ item ,index}">
                                <div>
                                  <template  v-if="my.to_option_value.find(obj => obj.parent == item.id)" >
                                    <span  @click="delitemprice(my.to_option_value.find(obj => obj.parent == item.id)['id'])" class=" icofont-delete-alt"></span>

                                  </template>
                                </div>
                              </template>

                            </v-data-table>
                          </li>
                        </ul>

                      </div>
                    </div>
                  </div>
                </v-tab-item>
                <v-tab-item :key="4">
                  <v-container>
                    <v-row>
                      <v-col  v-if="product.id!=null">
                        <h5 v-text="$t('feature')"></h5>
                        <hr>
                        <v-container>
                          <template v-if="product.to_group.to_feature.length!=0">
                            <template v-for="(item,index) in product.to_group.to_feature">
                              <div v-if="!featureselected.includes(item.id)"  @click="addattr(item.id)" :key="'esmai'+index" class="tiss-cursur   m-4">
                                <span class="icofont-plus-square"></span>  <span>{{ item.name }}</span>
                              </div>
                            </template>
                          </template>
                        </v-container>

                      </v-col>
                    </v-row>
                    <div>
                      <h5 v-text="$t('include')"></h5>
                      <hr>
                      <ul v-if="listporductdetail!=null">
                        <li v-for="(item,index) in listporductdetail" :key="'attr'+index" >
                          <label class="text-success">
                            <span @click="editattr(index)" class="icofont-ui-edit"></span> |
                            <span @click="delattr(item.id)" class="icofont-ui-delete"></span> |
                            <span  v-text="item.to_attr.name"></span></label>
                          <template v-if="item.to_attr.mode==1">
                            <div v-html="item.value" class="box-text"></div>
                          </template>
                          <template v-if="item.to_attr.mode==2">
                            :  <span  v-text="item.value"></span><span v-text="item.unit"></span>
                          </template>
                          <template v-if="item.to_attr.mode==3">
                            :  <span v-if='item.value=="1"' v-text="$t('have')"></span>
                            <span v-if='item.value=="0"' v-text="$t('nothaving')"></span>
                          </template>
                          <template v-if="item.to_attr.mode==4" >
                            <template v-if="item.value!=null">
                              : {{ item.to_attr.to_options.find( obj => obj.id ==item.value).name }}

                            </template>
                          </template>

                        </li>
                      </ul>
                    </div>

                  </v-container>
                </v-tab-item>
                <v-tab-item :key="5">
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-select  :label="$t('modecolor')" v-model="product.colormode" :items="['includedcolor','colortypecolor']" ></v-select>
                        <h5  v-text="$t('listcolor')"></h5>
                        <ul class="row  m-0 mylistcolor">
                          <template v-if="product.to_group.to_color">
                            <li class="col-sm-3  "  @click="addtocolorexist(item.id)"  v-for="(item,index) in product.to_group.to_color" :key="'persian'+index"  >
                              <v-btn   >
                                <div  class="btncolor" :style="{ 'background-color': item.code }"></div>

                                <a v-text="item.name"></a>
                              </v-btn>
                            </li>
                          </template>

                        </ul>

                      </v-col>
                      <hr>
                      <v-container>
                        <v-row class=" mylistcolor" >
                          <v-col cols="4"  v-for="(item,index) in listcolor" :key="'es'+index"  >

                            <v-btn @click="colororderup(item.id)" class="btn  float-right btn text-white m-1">
                              <span class=" icofont icofont-arrow-right"></span>
                            </v-btn>
                            <v-btn>
                              <span  class="btncolor" :style="{ 'background-color': item.to_color.code }"></span>
                              <a v-text="item.to_color.name"></a>
                            </v-btn>
                            <v-btn @click="deletecolor(item.id)" class="btn  float-right btn text-white m-1">
                              <span class=" icofont icofont-ui-delete"></span>
                            </v-btn>


                            <v-btn @click="colororderdown(item.id)" class="btn  float-right btn text-white m-1">
                              <span class=" icofont icofont-arrow-left"></span>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>

                    </v-row>
                  </v-container>
                </v-tab-item>
                <v-tab-item :key="6">
                  <v-container>
                    <h5 v-text="$t('review')"></h5>
                    <p>
                      <tisseditor :key="'esmail'+2" :text="product.review" v-on:myevent="reviewedit"   :mode="'Product'"></tisseditor>
                    </p>
                    <h5 v-text="$t('description')"></h5>
                    <p>
                      <tisseditor   :key="'esmails'+1"  :text="product.description" v-on:myevent="descriptionedit"   :mode="'Product'"></tisseditor>
                    </p>
                    <h5 v-text="$t('help')"></h5>
                    <p>
                      <tisseditor  :key="'esmailso'+4"  :text="product.help" v-on:myevent="helpedit"   :mode="'Product'"></tisseditor>
                    </p>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </template>
          <div class="container" v-if="product.id!=null">
            <div class="tab-content  " v-if="product.id!=null">
              <div id="menu3" class="container tab-pane fade"><br>
                <h5 v-text="$t('feature')"></h5>
                <hr>
                <div class="container">
                  <h5 v-text="$t('youcanuse')"></h5>

                  <div class="row">
                    <template v-if="product.to_group.to_feature.length!=0">
                      <template v-for="(item,index) in product.to_group.to_feature">
                        <div v-if="!featureselected.includes(item.id)"  @click="addattr(item.id)" :key="'esmai'+index" class="tiss-cursur   m-4">
                          <span class="icofont-plus-square"></span>  <span>{{ item.name }}</span>
                        </div>
                      </template>
                    </template>
                  </div>
                  <div>
                    <h5 v-text="$t('include')"></h5>
                    <hr>
                    <ul v-if="listporductdetail!=null">
                      <li v-for="(item,index) in listporductdetail" :key="'attr'+index" >
                        <label class="text-success">
                          <span @click="editattr(index)" class="icofont-ui-edit"></span> |
                          <span @click="delattr(item.id)" class="icofont-ui-delete"></span> |
                          <span  v-text="item.to_attr.name"></span></label>
                        <template v-if="item.to_attr.mode==1">
                          <div v-html="item.value" class="box-text"></div>
                        </template>
                        <template v-if="item.to_attr.mode==2">
                          :  <span  v-text="item.value"></span><span v-text="item.unit"></span>
                        </template>
                        <template v-if="item.to_attr.mode==3">
                          :  <span v-if='item.value=="1"' v-text="$t('have')"></span>
                          <span v-if='item.value=="0"' v-text="$t('nothaving')"></span>
                        </template>
                        <template v-if="item.to_attr.mode==4" >
                          <template v-if="item.value!=null">
                            : {{ item.to_attr.to_options.find( obj => obj.id ==item.value).name }}

                          </template>
                        </template>

                      </li>
                    </ul>
                  </div>


                </div>
              </div>
              <div id="review" class="container tab-pane fade"><br>


              </div>

            </div>
          </div>
          <div class="col-sm-12">
            <input type="submit" class="btn btn-primary" :value="$t('save')">
          </div>
        </v-form>

      </template>
    </div>
    <showerror v-if="error!=null" :errors="error"></showerror>
  </div>
</template>

<script>
import Showerror from "~/components/admin/tools/Showerror";
import Tisseditor from "~/components/admin/tools/Tisseditor";
import FileUploader from "~/components/admin/tools/FileUploader";
import {Money} from 'v-money';
import VueNumeric from 'vue-numeric';

export default {
  name: "productdetail",
  layout:'dashboard',

  components:{
    Showerror,
    Tisseditor,
    FileUploader,
    Money,
    //  VueVueTagsInput,
    VueNumeric
  },
  data() {
    return {
      tab: null,

      headers:[

      ],
      tags:[],
      tag:'',
      extramoney:false,
      modaleditfeature:false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false
      },
      taglist:null,
      page:1,
      price:0,
      discount:0,
      mode:'edit',
      selectgroup:null,
      listcolor:[],
      pricelist:'',
      group:null,
      attr:[],
      coloredit:null,
      fea:[],
      optionsfea:[],
      optionattr:[],
      error:null,
      listitems:null,
      optionsattr:[],
      imagelist:null,
      editfeature:null,

      product:{
        id:null,
        name:null,
        url:null,
        parent:null
      },
      status:[
        {value:0,text:this.$t('inactive')},
        {value:1,text:this.$t('active')},
        {value:2,text:this.$t('unavailable')},
      ],
      special:[
        {value:0,text:this.$t('normal')},
        {value:1,text:this.$t('special')},
      ],
      booleanarray:[
        {value:0,text:this.$t('no')},
        {value:1,text:this.$t('yes')},

      ],
      booleanhave:{
        0:this.$t('nothaving'),
        1:this.$t('have'),

      },
      listporductdetail:null,
      listporductattr:null,
      editprice:null

    }
  },


  watch: {
    page:function (){
      this.listproduct();
    },
    group:function (data){
      this.selectgroup=[];
      let that=this;
      try {
        data.map(function (item) {
          let add = {
            id: item.id, name: item.name,mode:'sub'
          };
          that.selectgroup.push(add);
          if(item.to_sub.length!=0){
            item.to_sub.map(function (res){
              let addto = {
                id: res.id, name: res.name,mode:'subitem',sub:add.name
              };
              that.selectgroup.push(addto);
            });
          }

        });

      }finally {

      }

    },
    product:function (data) {
      let that=this;
      if(data.to_price){
        data.to_price.filter(function (attr) {
          if(attr.attr==0){
            that.price=attr.price;
            that.discount=attr.discount;
            that.percent=attr.percent;
          }
        })
      }

    }
  },
  computed:{
    featurepriceselected(){
      let marray=[];
      try {
        this.listporductattr.map(function (item){
          marray.push(item.to_attr.id);
        });
      }finally {
        return marray;

      }


    },
    featureselected(){
      let marray=[];
      if(this.listporductdetail!=null){
        if(this.listporductdetail.length!=0){
          this.listporductdetail.map(function (item){
            marray.push(item.to_attr.id);
          });
        }

      }
      return marray;
    },
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
      if(this.product.to_tag!=null){
        this.product.to_tag.forEach(function(item){
          b.push(item.name);
        });
      }

      return b;
    },
  },

  methods:{
    del(id){
      let that=this;
      this.$axios.delete(this.$url+'user/pdetail/'+id,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.listproduct();
      })

    },
    addfeatureopt(parent,myoption){
      let that=this;
      let data={
        attr:parent,
        id:myoption.id,
      };
      this.$axios.post(this.$url+'user/popt',data,{
        headers:{
          Authorization: localStorage.token
        }
      }).then(function () {
        that.loadattrprice();
      })
    },
    colororderup(id){
      let self=this;
      this.$axios.get(this.$url+'user/colororderup/'+id,{
        headers:{
          Authorization: localStorage.token
        }
      }).then(function (res) {
        self.loadcolor();
      });
    },
    deletecolor(id){
      let self=this;
      this.$axios.delete(this.$url+'user/pcolor/'+id,{
        headers:{
          Authorization: localStorage.token
        }
      }).then(function (res) {
        self.loadcolor();
      });
    },
    colororderdown(id){
      let self=this;
      this.$axios.get(this.$url+'user/colororderdown/'+id,{
        headers:{
          Authorization: localStorage.token
        }
      }).then(function (res) {
        self.loadcolor();
      });
    },
    editcolor(id){
      this.coloredit=this.listcolor[id];
      console.log(this.coloredit);
      this.$forceUpdate();  // Notice we have to use a $ here
      //  this.$modal.show('hello-world');

    },
    addtocolorexist(color){
      let data= {
        color: color,
        id: this.product.id
      };
      let that=this;
      this.$axios.post(this.$url+'user/pcolor',data,{
        headers: {
          Authorization: localStorage.token
        }
      }).then(function(res){
        that.loadcolor();
      })
    },
    loadcolor(){
      let self=this;
      this.$axios.get(this.$url+'user/pcolor/'+this.product.id,{
        headers:{
          Authorization: localStorage.token

        }
      }).then(function (res) {
        self.listcolor=res.data;
      });

    },
    newpricesubmit(){
      let data={
        id:this.product.id,
        price:this.price,
        discount:this.discount,
        percent:this.percent,
        attr:0,
      };
      this.$axios.post(this.$url+'user/pprice',data, {
        headers: {
          Authorization: localStorage.token
        }
      });
    },
    // Attr Controller

    clickoptattr(id,parent,event){

      let data={
        attr:parent,
        options:id,
        product:this.product.id
      };
      if(this.$refs['opt'+id][1]['checked']==true){
        data.value=1;
      }else{
        data.value=0;
      }

      this.$axios.post(this.$url+'user/popt',data, {
        headers: {
          Authorization: localStorage.token
        }
      });
    },

    // End Attr Controller
    iamgemanagers(e){
      this.coloredit.image=e;
    },
    savecolor(){
      let that=this;
      this.$axios.put(this.$url+'user/pcolor/'+this.product.id,this.coloredit,{
        headers:{
          Authorization: localStorage.token

        }
      }) .then(function (res) {
      });
    },
    addpattern(e){
      this.product.pattern=e;
    },
    addpicture(e){
      let that=this;
      let data={
        product:this.product.id,
        image:e
      }

      this.$axios.post(this.$url+'user/pimage',data,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.loadimage();
      })
    },
    masterimg(id){
      let that=this;
      let data={

      };
      this.$axios.put(this.$url+'user/pimage/'+id,data,
        {
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (response) {
        that.loadimage();

      });

    },
    delimage(id){
      let that=this;
      this.$axios.delete(this.$url+'user/pimage/'+id,{
        headers:{
          Authorization:localStorage.token

        }
      }).then(function(res){
        that.loadimage();
      });
    },
    loadimage(){
      let that=this;

      this.$axios.get(this.$url+'user/pimage',{
        params:{
          id:that.product.id
        },
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.imagelist=res.data;
      })
    },
    reviewedit(e){
      this.product.review=e;
    },
    morecommentedit(e){
      this.product.morecomment=e;
    },
    descriptionedit(e){
      this.product.description=e;
    },
    helpedit(e){
      this.product.help=e;
    },
    featurevalue(e){
      this.editfeature.value=e;
    },
    urlcreate(){
      if(this.product.id==null){
        if(this.product.name!=null){
          let str=this.product.name;
          this.product.url=str.replace(/#| /g,'_');

        }

      };
    },
    save(){
      let that=this;
      if(this.product.id==null){
        this.$axios.post(this.$url+'user/pdetail',this.product,{
          headers: {
            Authorization:localStorage.token
          }
        }).then(function(res){
          that.mode='list';
          that.listproduct();
        })
          .catch((error) => {
            that.error = error.response.data.errors;

          });
      }else{

      }
      if(this.product.id!=null){
        this.product.tag=this.tags;

        this.$axios.put(this.$url+'user/pdetail/'+this.product.id,this.product,{
          headers: {
            Authorization:localStorage.token
          }
        }).then(function(res){
          that.$swal.fire(that.$t('Saved'));
        })
          .catch((error) => {
            that.error = error.response.data.errors;

          });
      }

    },
    addattr(id){
      let that=this;
      let data={
        id:id,
        product:this.product.id,
        value:null
      }
      this.$axios.post(this.$url+'user/pfeature',data,{
        headers: {
          Authorization:localStorage.token
        }

      })
        .then(function (res) {
          that.loadattr();
        });
    },
    addpriceattr(id){
      let that=this;
      let data={
        id:id,
        product:this.product.id,
        value:null
      }
      this.$axios.post(this.$url+'user/pattr',data,{
        headers: {
          Authorization:localStorage.token
        }

      })
        .then(function (res) {
          that.loadattrprice();
        });
    },
    editattr(index){
      this.editfeature=this.listporductdetail[index];
      this.editfeature=true;
      //this.$modal.show('editfeature');

    },
    delattr(id){
      let that=this;
      this.$axios.delete(this.$url+'user/pfeature/'+id,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res) {
        that.loadattr();
      })
    },
    delattrprice(id){
      let that=this;
      this.$axios.delete(this.$url+'user/pattr/'+id,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res) {
        that.loadattrprice();
      });
    },
    loadattr(){
      let that=this;
      this.$axios.get(this.$url+'user/pfeature/'+this.product.id,{
        headers: {
          Authorization:localStorage.token
        }

      })
        .then(function (res) {
          console.log(res.data);
          that.listporductdetail=res.data;
        })
    },
    loadattrprice(){
      let that=this;
      this.$axios.get(this.$url+'user/pattr/'+this.product.id,{
        headers: {
          Authorization:localStorage.token
        }

      })
        .then(function (res) {
          that.listporductattr=res.data;
        })
    },
    edititemprice(price){
      this.editprice=price;
      this.extramoney=true;

    },
    delitemprice(id){
      let that=this;
      this.$axios.delete(this.$url+'user/popt/'+id,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (red) {
        that.loadattrprice();
      })
    },
    savepriceattr(){
      let that=this;
      this.$axios.put(this.$url+'user/pprice/'+this.editprice.id,this.editprice,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res) {
        that.extramoney=false;
      })
    },
    savevaluefeature(){
      let that=this;
      this.$axios.put(this.$url+'user/pfeature/'+this.editfeature.id,this.editfeature,{
        headers: {
          Authorization:localStorage.token
        }

      }).then(function (res) {
        that.loadattr();
        that.$modal.hide('editfeature');
      })
    },
    resetform(){
      this.product={
        id:null,
        name:null,
        url:null,
        parent:null
      };
      this.price=0;
      this.discount=0;
      this.percent=0;
    },
    add(){
      this.resetform();
      this.mode='edit';

    },
    edit(id){
      let that=this;
      this.$axios.get(this.$url+'user/pdetail/'+id,{
        headers: {
          Authorization:localStorage.token
        }

      }).then(function(res){
        that.product=res.data;
        that.imagelist=res.data.to_image;
        that.tags=that.taggenerator;

        that.mode='edit';
        /**/
      });
    },

    listgroup(){

      let that=this;
      this.$axios.get(this.$url+'user/Tag',{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.taglist=res.data;
      });
      this.$axios.get(this.$url+'user/pgroup/create',{

        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.group=res.data;
      })
        .catch((error) => {
          that.error = error.response.data.errors;

        });
    },
    clickCallback(){
      this.listproduct();
    },
    listproduct(name='',group=''){
      this.resetform();
      this.mode='list';
      let that=this;
      this.$axios.get(this.$url+'user/pdetail',{
        params:{
          page: this.page,
          name: name,
          group: group,
        },
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.listitems=res.data;

      })
        .catch((error) => {
          that.error = error.response.data.errors;

        });
    },
  },
  mounted() {
    this.mode='list';
    this.listgroup();
    this.listproduct();

  }
}
</script>

<style scoped>

/* The container */
.mychecker {
  display: block;
  position: relative;
  padding-right: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: rtl;
}

/* Hide the browser's default checkbox */
.mychecker input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.mychecker:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.mychecker input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.mychecker input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.mychecker .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.btncolor{
  display:inline-block;width: 10px; height: 10px; overflow: hidden;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 45px;
}
.mylistcolor li{
  list-style: none;
}
.tiss-cursur:hover{
  font-weight: bold;
}
.box-text{
  border: solid 1px rgba(255, 255, 255, 0.02);
  padding: 15px;
  margin-top: 5px;
  border-radius: 45px;

}
.form-control{
  flex: 1 1 auto;
  line-height: 20px;
  color: #666;
  max-width: 100%;
  min-width: 0px;
  width: 100%;
  border: solid 1px #818181;
  padding: 15px;
  border-radius: 15px;
}
</style>
