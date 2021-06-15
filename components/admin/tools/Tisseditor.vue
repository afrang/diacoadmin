<template>
  <div>
    <client-only>
      <v-dialog  :key="keys+10"    v-model="dialogdialog"   width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <span class="icofont-code text-danger"></span> CODE
          </v-card-title>
          <v-card-text>
            <template v-if="code!=null">
              <div v-html="code"></div>
            </template>
            <v-textarea v-model="code" ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn  @click="addcode"> {{ $t('addtotext')}}</v-btn>
            <v-btn  @click="codehide"> {{ $t('close')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog  :key="keys+20"    v-model="dialogaparat"   width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <span class="icofont-code text-danger"></span> APARAT
          </v-card-title>
          <v-card-text>
            <template v-if="aparat!=null">
              <div class="h_iframe-aparat_embed_frame"><span style="display: block;"></span><iframe :src="'https://www.aparat.com/video/video/embed/videohash/'+aparat+'/vt/frame'" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
            </template>
            <v-text-field placeholder="Aparat Code" v-model="aparat"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn  @click="addaparat" > {{ $t('addtotext')}}</v-btn>
            <v-btn   @click="aparathide" > {{ $t('close')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog  :key="keys+30"    v-model="duploader">
        <v-card>
          <v-card-title class=" grey lighten-2" >
            {{ $t('filemanager') }}  <span class="icofont-folder text-danger"></span>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-4 mb-3 pa-3">
              <v-row cols="4">
                <dropzone   @vdropzone-complete="showitem"  ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></dropzone>
              </v-row>
              <template  v-for="(item,index) in files"  >
                <v-col cols="2"  v-if="item.mode=='pic'" :key="index">
                  <div  >
                    <div class="imginsert">
                      <v-badge     :content="item.ext"></v-badge>
                      <img @click="insertimage($storage+'filemanager/'+item.file)" :src="$storage+'filemanager/'+item.file" width="100%">
                      <v-btn @click="detitem(item.file)"  ><span class="icofont-ui-delete"></span></v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2"  v-if="item.mode!='pic'"  :key="index">
                  <template v-if="item.mode=='archive'">
                    <div class="">
                      <div @click="inserarchive($storage+'filemanager/'+item.file)" class="icofont-archive icofont-3x" ></div>
                    </div>
                  </template>
                  <template v-if="item.mode=='pdf'">
                    <div class="">
                      <span   @click="inseerpdf($storage+'filemanager/'+item.file)" class="icofont-file-pdf icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='doc'">
                    <div class="">
                      <span @click="insertdoc($storage+'filemanager/'+item.file)" class="icofont-file-word icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='powerpoint'">
                    <div class="">
                      <span @click="insertslide($storage+'filemanager/'+item.file)" class="icofont-file-powerpoint icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='otherfile'">
                    <span   @click="insertotherfile($storage+'filemanager/'+item.file)" class="icofont-ui-file  icofont-3x" ></span>
                  </template>
                  <template v-if="item.mode=='excel'">
                    <span @click="insertexcel($storage+'filemanager/'+item.file)" class="icofont-file-excel  icofont-3x" ></span>
                  </template>
                  <h6 class="mt-4">
                    <a class="btn">{{ item.ext }}</a>
                    <div>
                      <a target="_blank" class="badge badge-dark " :href="$storage+'filemanager/'+item.file"><span class="icofont-download"></span></a>
                      <a  @click="detitem(item.file)" class=" badge badge-danger  mr-1" ><span class="icofont-ui-delete"></span></a>
                    </div>
                  </h6>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

        </v-card>
      </v-dialog>
      <v-dialog  :key="keys+30"    v-model="duploader2">
        <v-card>
          <v-card-title class=" grey lighten-2" >
            {{ $t('filemanager') }}  <span class="icofont-folder text-danger"></span>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-4 mb-3 pa-3">
              <v-row cols="4">
                <dropzone   @vdropzone-complete="showitem"  ref="myVueDropzone" id="dropzone2" :options="dropzoneOptions2"></dropzone>
              </v-row>
              <template  v-for="(item,index) in files"  >
                <v-col cols="2"  v-if="item.mode=='pic'" :key="index">
                  <div  >
                    <div class="imginsert">
                      <v-badge     :content="item.ext"></v-badge>
                      <img @click="insertimage($storage+'filemanager/'+item.file)" :src="$storage+'filemanager/'+item.file" width="100%">
                      <v-btn @click="detitem(item.file)"  ><span class="icofont-ui-delete"></span></v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2"  v-if="item.mode!='pic'"  :key="index">
                  <template v-if="item.mode=='archive'">
                    <div class="">
                      <div @click="inserarchive($storage+'filemanager/'+item.file)" class="icofont-archive icofont-3x" ></div>
                    </div>
                  </template>
                  <template v-if="item.mode=='pdf'">
                    <div class="">
                      <span   @click="inseerpdf($storage+'filemanager/'+item.file)" class="icofont-file-pdf icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='doc'">
                    <div class="">
                      <span @click="insertdoc($storage+'filemanager/'+item.file)" class="icofont-file-word icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='powerpoint'">
                    <div class="">
                      <span @click="insertslide($storage+'filemanager/'+item.file)" class="icofont-file-powerpoint icofont-3x" ></span>
                    </div>
                  </template>
                  <template v-if="item.mode=='otherfile'">
                    <span   @click="insertotherfile($storage+'filemanager/'+item.file)" class="icofont-ui-file  icofont-3x" ></span>
                  </template>
                  <template v-if="item.mode=='excel'">
                    <span @click="insertexcel($storage+'filemanager/'+item.file)" class="icofont-file-excel  icofont-3x" ></span>
                  </template>
                  <h6 class="mt-4">
                    <a class="btn">{{ item.ext }}</a>
                    <div>
                      <a target="_blank" class="badge badge-dark " :href="$storage+'filemanager/'+item.file"><span class="icofont-download"></span></a>
                      <a  @click="detitem(item.file)" class=" badge badge-danger  mr-1" ><span class="icofont-ui-delete"></span></a>
                    </div>
                  </h6>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

        </v-card>
      </v-dialog>
      <client-only>
        <template v-if="advanced==true">
          <ckeditor  :key="keys+100" @input="onEditorInput"  v-model="vtext" :config="editorConfig"></ckeditor>
        </template>
        <template v-else>
          <ckeditor :key="keys+100"  @input="onEditorInput" :config="editorConfig2"  v-model="vtext"></ckeditor>
        </template>
      </client-only>
      <v-btn @click="apartshow">{{ $t('Aparat')}} | <span class="icofont-ui-movie"></span></v-btn>
      <v-btn @click="codeshow">{{ $t('embedcode')}} | <span class="icofont-code"></span></v-btn>
      <v-btn @click="show">{{ $t('filemanager')}} | <span class="icofont-folder-open"></span></v-btn>
      <v-btn @click="showslide">{{ $t('sliders')}} | <span class="icofont-ui-image"></span></v-btn>
    </client-only>
    <hr>
  </div>

</template>


<script>
import Dropzone from 'nuxt-dropzone'

export default {
  components: {
    Dropzone,


  },
  computed: {

    // a computed getter
    files: function () {
      let item;
      let myobject=[];
      for(item in this.listfile){
        let model='otherfile';
        let mode=this.listfile[item].substr(this.listfile[item].lastIndexOf('.') + 1).toUpperCase();
        if( mode=='JPG' || mode=='BMP' || mode=='PNG' || mode=='JPEG' || mode=='TIFF'){
          model='pic';
        }
        if( mode=='PDF' ){
          model='pdf';
        }
        if( mode=='DOCX' || mode=='DOC' || mode=='ODT' || mode=='RTF' || mode=='TEXT' || mode=='TXT'  ){
          model='doc';
        }
        if( mode=='ZIP' || mode=='RAR' || mode=='7ZIP' || mode=='ISO'  ){
          model='archive';
        }
        if( mode=='PPTX' || mode=='PPT' || mode=='ODP' || mode=='PPS' || mode=='PPSX'  ){
          model='powerpoint';
        }
        if( mode=='XLSX' || mode=='XLS' || mode=='CSV' || mode=='ODS' || mode=='XLSB'  ){
          model='excel';
        }
        if( mode=='PUB'  ){
          model='publisher';
        }
        myobject.push({
          file:this.listfile[item],
          ext:mode,
          mode:model
        });

      }
      return myobject;
    }

  },
  name: "Tisseditor",
  props:{
    height: {
      type: Number,
      default: 200
    },
    componentkey: {
      type: Number,
      default: 1
    },
    advanced: {
      type: Boolean,
      default: false
    },
    text:{
      type:String,
      default:''

    },
    keys:{
      type:Number,
      default:1

    },
    backdata:{
      type:String,
      default:'text'

    },
    mode:{
      type:String,
      default: 'Public'
    },
    id:{
      type:Number,
      default: 1
    }

  },
  watch: {
  },
  data() {
    return {
      editorConfig: {
        language:'fa',
        allowedContent: true,
        stylesSet :  [
          // Block-level styles.
          { name: 'قاسم', element: 'span', attributes:{ 'class': 'qasem' } },
          { name: 'کشیده', element: 'span', attributes:{ 'class': 'KASH' } },
          { name: 'persian number', element: 'span', attributes:{ 'class': 'persiannumber' } },
          { name: 'قرمز',  element: 'h3', styles: { color: 'Red' } },
          { name: 'سمت راست',  element: 'span', attributes:{ 'class': 'imagesideright' }  },
          { name: 'سمت چپ',  element: 'span', attributes:{ 'class': 'imagesideleft' }  },
          { name: 'fadeInLeft',  element: 'span', attributes:{ 'class': 'fadeInLeft' }  },
          { name: 'flip',  element: 'span', attributes:{ 'class': 'flip' }  },
          { name: 'box',  element: 'div', attributes:{ 'class': 'box' }  },
          { name: 'boxradius',  element: 'div', attributes:{ 'class': 'boxradus' }  },
          { name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
          { name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
        ],
        contentsCss:'/ckeditor.css',

        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;div;qasem',
        format_h6: {
          element: 'h5',
          attributes: {
            'class': 'contentHeaderh5'
          }
        },
        format_qasem: {
          element: 'a',
          attributes: {
            'class': 'contentqasem'
          }
        },
        format_myfont: {
          element: 'div',
          attributes: {
            'class': 'qasem'
          }
        },
        format_h4: {
          element: 'h4',
          attributes: {
            'class': 'contentHeaderh4'
          }
        },
        format_h5: {
          element: 'h6',
          attributes: {
            'class': 'contentHeaderh4'
          }
        },
        extraPlugins: ['justify','colorbutton','autoembed','balloontoolbar','bidi']
      },
      editorConfig2: {
        language:'fa',
        allowedContent: true,
        stylesSet :  [
          // Block-level styles.
          { name: 'قاسم', element: 'span', attributes:{ 'class': 'qasem' } },
          { name: 'کشیده', element: 'span', attributes:{ 'class': 'KASH' } },
          { name: 'persian number', element: 'span', attributes:{ 'class': 'persiannumber' } },
          { name: 'قرمز',  element: 'h3', styles: { color: 'Red' } },
          { name: 'سمت راست',  element: 'span', attributes:{ 'class': 'imagesideright' }  },
          { name: 'سمت چپ',  element: 'span', attributes:{ 'class': 'imagesideleft' }  },
          { name: 'fadeInLeft',  element: 'span', attributes:{ 'class': 'fadeInLeft' }  },
          { name: 'flip',  element: 'span', attributes:{ 'class': 'flip' }  },
          { name: 'box',  element: 'div', attributes:{ 'class': 'box' }  },
          { name: 'boxradius',  element: 'div', attributes:{ 'class': 'boxradus' }  },

          // Inline styles.
          { name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
          { name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
        ],
        contentsCss:'/ckeditor.css',
        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;div;qasem',
        format_h6: {
          element: 'h5',
          attributes: {
            'class': 'contentHeaderh5'
          }
        },
        format_qasem: {
          element: 'a',
          attributes: {
            'class': 'contentqasem'
          }
        },
        format_myfont: {
          element: 'div',
          attributes: {
            'class': 'qasem'
          }
        },
        format_h4: {
          element: 'h4',
          attributes: {
            'class': 'contentHeaderh4'
          }
        },
        format_h5: {
          element: 'h6',
          attributes: {
            'class': 'contentHeaderh4'
          }
        },
        extraPlugins: ['justify','colorbutton','autoembed','balloontoolbar']
      },
      vtext:null,
      aparat:null,
      dialogdialog:false,
      duploader:false,
      duploader2:false,
      dialogaparat:false,
      code:null,
      listfile:{},
      showeditors:true,
      dropzoneOptions: {
        scrollable:true,
        width:'100%',
        minWidth:'100%',
        height:'100%',
        minHeight:'100%',
        resizable:true,
        url: this.$url+'user/Filemanager',
        maxFilesize: 20.0,
        params:{
          mode:this.mode,
          id:this.id
        },
        dictDefaultMessage:this.$t('uploadyourfile'),
        headers: {
          Authorization: localStorage.token
        }
      },
      dropzoneOptions2: {
        scrollable:true,
        width:'100%',
        minWidth:'100%',
        height:'100%',
        minHeight:'100%',
        resizable:true,
        url: this.$url+'user/Filemanager',
        maxFilesize: 20.0,
        params:{
          mode:this.mode+'slider',
          id:this.id
        },
        dictDefaultMessage:this.$t('uploadyourfile'),
        headers: {
          Authorization: localStorage.token
        }
      },
      config: {
        placeholderText: this.$t('Plesetypeyourtext'),
        charCounterCount: false,
        direction: 'rtl',
        heightMin: this.height,
        events: {
          'initialized': function(initControls) {
          }
        }
      },
    }
  },
  methods: {

    onEditorInput(){
      if(this.vtext!=null){
        this.$emit('myevent', this.vtext);
        // this.$emit('myevent', this.vtext.replace(this.$storage,'%url%'));
        //  (/%url%/g,this.$storage)
      }

    },

    initialize: function(initControls) {
      this.initControls = initControls;

    },
    converttoUrladdress() {

      this.text = this.text;

    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },
    show () {
      // this.$modal.show('uploader');

      this.duploader=true;

    },
    showslide() {
      // this.$modal.show('uploader');

      this.duploader2=true;

    },
    hide () {
      //this.$modal.hide('uploader');
      this.duploader=false;

    },
    apartshow(){

      //this.$modal.show('aparat');
      this.dialogaparat=true;

    },
    aparathide(){
      //  this.$modal.hide('aparat');
      this.dialogaparat=false;

    },
    codeshow(){
      // this.$modal.show('code');
      this.dialogdialog=true;
    },
    codehide(){
      this.dialogdialog=false;
    },
    addcode(){
      this.vtext=this.vtext+this.code;
      this.code=null;
      this.codehide();


    },
    insertimage(item){
      this.vtext=this.vtext+'<img  width="100%" src='+item+'>';
      this.hide();
    },
    inserarchive(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/zip.png"></a>';
      this.hide();
    },
    insertslide(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/powerpoint.png"></a>';
      this.hide();
    },
    insertexcel(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/excel.png"></a>';
      this.hide();
    },
    insertdoc(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/word.png"></a>';
      this.hide();
    },
    addaparat(){

      this.vtext=this.vtext+'<div class="h_iframe-aparat_embed_frame" style="height: 700px"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/'+this.aparat+'/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>';
      this.aparathide();
    },
    insertotherfile(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/other.png"></a>';
      this.hide();

    },
    inseerpdf(item){
      this.vtext=this.vtext+'<a href='+item+'><img  width="50px" src="'+this.$storage+'asset/icon/pdf.png"></a>';
      this.hide();
    },
    detitem(item){
      let that=this;
      this.$axios.delete(this.$url+'user/Filemanager/1',
        {
          params: {
            file: item
          },
          headers: {Authorization: localStorage.token}
        }).then(function (res) {
        that.showitem();

      })

    },
    showitem(){
      let that=this;
      this.$axios.get(this.$url+'user/Filemanager',{
        params: {
          id: this.id,
          mode:this.mode

        },
        headers:{Authorization:localStorage.token}
      })
        .then(function (response) {

          that.listfile=response.data;
        });

    }
  },
  mounted() {
    //this.show();
    this.showitem();


  },
  beforeMount: function () {

    if(this.text!=null){

      this.vtext=this.text;
      this.$emit('myevent', this.vtext);

    }

  }

}
</script>

<style >
.contentqasem{
  color: red;
}
.v--modal{
  width: 100%;
  overflow: scroll !important;
}
</style>
