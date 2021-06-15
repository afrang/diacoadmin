<template>
  <div class="container-fluid">
    <div class="wmaster text-right" dir="rtl">
      <div class="p-3">
        <h3 v-text="$t('specilproducts')"></h3>
        <hr>
        <div v-if="list!=null">
          <div class="row">
            <div class="col-sm-4">
              <label v-text="$t('selectgroup')"></label>
              <v-select v-model="currentgroup"  dir="rtl" :options="list.data" label="name" ></v-select>

            </div>
            <div class="col-sm-4">
              <button @click="saveitem"  v-text="$t('save')" class="btn btn-info mt-4"></button>
            </div>
            </div>

        </div>
        <template v-if="currentgroup!=null">
          <h4 v-text="currentgroup.name" class="m-3"></h4>
          <hr>

          <div class="row" dir="rtl">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div>
                    <file-uploader
                      :key="'f5'+uploadkey"

                      mode="SpecialProduct"
                      v-on:filename="menuimage3"
                      :id='currentgroup.id'
                      :name="'thump'+currentgroup.id+'3'"
                      :file="files[3].image"
                    ></file-uploader>
                    <div class="m-3">
                      <label v-text="$t('label')"></label>
                      <input type="text" v-model="files[3].label" class="form-control">
                      <label v-text="$t('icon')"></label>
                      <input type="text" v-model="files[3].icons" class="form-control text-left">
                      <label v-text="$t('product')"></label>
                      <template v-if="listproduct!=null">
                        <v-select v-model="files[3].idproduct"  dir="rtl" :options="listproduct" label="name" ></v-select>
                      </template>

                    </div>

                  </div>
                </div>
                <div class="col-sm-6">

                  <div>
                    <file-uploader
                      :key="'f6'+uploadkey"

                      mode="SpecialProduct"
                      v-on:filename="menuimage2"
                      :id='currentgroup.id'
                      :name="'thump'+currentgroup.id+'2'"
                      :file="files[2].image"
                    ></file-uploader>
                    <div class="m-3">
                      <label v-text="$t('label')"></label>
                      <input type="text" v-model="files[2].label" class="form-control">
                      <label v-text="$t('icon')"></label>
                      <input type="text" v-model="files[2].icons" class="form-control text-left">
                      <label v-text="$t('product')"></label>
                      <template v-if="listproduct!=null">
                        <v-select v-model="files[2].idproduct"  dir="rtl" :options="listproduct" label="name" ></v-select>
                      </template>

                    </div>

                  </div>
                </div>
                <div class="col-sm-6">

                  <div>
                    <file-uploader
                      :key="'f1'+uploadkey"
                      mode="SpecialProduct"
                      v-on:filename="menuimage4"
                      :id='currentgroup.id'
                      :name="'thump'+currentgroup.id+'4'"
                      :file="files[4].image"
                    ></file-uploader>
                    <div class="m-3">
                      <label v-text="$t('label')"></label>
                      <input type="text" v-model="files[4].label" class="form-control">
                      <label v-text="$t('icon')"></label>
                      <input type="text" v-model="files[4].icons" class="form-control text-left">
                      <label v-text="$t('product')"></label>
                      <template v-if="listproduct!=null">
                        <v-select v-model="files[4].idproduct"  dir="rtl" :options="listproduct" label="name" ></v-select>
                      </template>

                    </div>

                  </div>
                </div>
                <div class="col-sm-6">
                  <div>
                    <file-uploader
                      :key="'f2'+uploadkey"

                      mode="SpecialProduct"
                      v-on:filename="menuimage5"
                      :id='currentgroup.id'
                      :name="'thump'+currentgroup.id+'5'"
                      :file="files[5].image"
                    ></file-uploader>
                    <div class="m-3">
                      <label v-text="$t('label')"></label>
                      <input type="text" v-model="files[5].label" class="form-control">
                      <label v-text="$t('icon')"></label>
                      <input type="text" v-model="files[5].icons" class="form-control text-left">
                      <label v-text="$t('product')"></label>
                      <template v-if="listproduct!=null">
                        <v-select v-model="files[5].idproduct"  dir="rtl" :options="listproduct" label="name" ></v-select>
                      </template>

                    </div>

                  </div>

                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <file-uploader
                :key="'f3'+uploadkey"

                mode="SpecialProduct"
                v-on:filename="menuimage1"
                :id='currentgroup.id'
                :name="'thump'+currentgroup.id+'1'"
                :file="files[1].image"
              ></file-uploader>
              <div class="m-3">
                <label v-text="$t('label')"></label>
                <input type="text" v-model="files[1].label" class="form-control">
                <label v-text="$t('icon')"></label>
                <input type="text" v-model="files[1].icons" class="form-control text-left">
                <label v-text="$t('product')"></label>
                <template v-if="listproduct!=null">
                  <v-select v-model="files[1].idproduct"  dir="rtl" :options="listproduct" label="name" ></v-select>
                </template>

              </div>

            </div>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from "../../../components/admin/tools/FileUploader";

export default {
  name: "specailproducts",
  layout:'dashboard',
  components:{
    FileUploader
  },
  data(){
    return{
      sub:0,
      list:null,
      uploadkey:1,
      listproduct:null,
      ecitdata:null,
      currentgroup:null,
      files:{
        1:{
          idproduct:null,
          label:null,
          image:null,
          icons:null,
          category:null,
          location:1,
        },
        2:{
          idproduct:null,
          label:null,
          image:null,
          icons:null,
          category:null,
          location:2,
        },
        3:{
          idproduct:null,
          label:null,
          image:null,
          icons:null,
          category:null,
          location:3,
        },
        4:{
          idproduct:null,
          label:null,
          image:null,
          icons:null,
          catgory:null,
          location:4,
        },
        5:{
          idproduct:null,
          label:null,
          image:null,
          icons:null,
          category:null,
          location:5,
        },

      },

    }
  },
  watch:{
    ecitdata:function (data){
      this.uploadkey=this.uploadkey+1;
      if(data.length!=0){
        for(let i = 0; i < data.length; i++) {
          let item=data[i];
              this.files[item.location].category=item.category;
              this.files[item.location].icons=item.icons;
              this.files[item.location].image=item.image;
              this.files[item.location].label=item.label;
              this.files[item.location].location=item.location;
              this.files[item.location].idproduct=item.to_product;
        }

      }

      },
    currentgroup:function(data){
      if(data!=null){
        let that=this;

        try {
          this.files = {
            1: {
              idproduct: null,
              label: null,
              image: null,
              icons: null,
              category: null,
              location: 1,
            },
            2: {
              idproduct: null,
              label: null,
              image: null,
              icons: null,
              category: null,
              location: 2,
            },
            3: {
              idproduct: null,
              label: null,
              image: null,
              icons: null,
              category: null,
              location: 3,
            },
            4: {
              idproduct: null,
              label: null,
              image: null,
              icons: null,
              catgory: null,
              location: 4,
            },
            5: {
              idproduct: null,
              label: null,
              image: null,
              icons: null,
              category: null,
              location: 5,
            },

          };

        }finally {
          this.files[1].category=this.currentgroup.id;
          this.files[2].category=this.currentgroup.id;
          this.files[3].category=this.currentgroup.id;
          this.files[4].category=this.currentgroup.id;
          this.files[5].category=this.currentgroup.id;
          let that=this;
              this.$axios.get(this.$url+'user/SpecialProducts/'+data.id,{
                headers: {
                  Authorization:localStorage.token
                }
              }).then(function (res){
                that.ecitdata=res.data;
              });
        }
      }

    }
  },
  methods:{
    saveitem(){
      let that=this;
      if(this.currentgroup==null){
        this.$swal.fire(this.$t('pleaseselectgroup'));
        return  false;
      }
      this.$axios.post(this.$url+'user/SpecialProducts',this.files,{
        headers: {
          Authorization:localStorage.token
        }
      })
      .then(function (res){
          that.$swal.fire(this.$t('saved'));
      });

    },
    menuimage1(e){
      this.files['1'].image=e;
    },
    menuimage2(e){
      this.files['2'].image=e;
    },
    menuimage3(e){
      this.files['3'].image=e;
    },
    menuimage4(e){
      this.files['4'].image=e;
    },
    menuimage5(e){
      this.files['5'].image=e;
    },
    loadgroups(){

      let that=this;
      this.$axios.get(this.$url+'user/pgroup',{
        params: {
          page: 1,
          sub:that.sub
        },
        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.list=res.data;
      })
      this.$axios.get(this.$url+'user/pdetail/create',{
        headers: {
          Authorization:localStorage.token
        }
      })
        .then(function (res){
          that.listproduct=res.data;
        });


    }
  },
  mounted() {
    this.loadgroups();
  }
}
</script>

<style scoped>

</style>
