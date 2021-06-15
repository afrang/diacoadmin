<template>
  <div class="container">
    <div class="wmaster  text-right pt-5 d" dir="rtl">
      <h5 v-text="$t('requestlist')"></h5>
      <hr>
      <div class="row">
        <div class="col-sm-4">
            <label v-text="$t('requestmode')"></label>
          <select v-model="group" class="form-control" v-if="methodss!=null">
            <option :value="null" v-text="$t('all')"></option>
            <option v-for="item in methodss" :value="item.modelname" v-text="$t(item.modelname)"></option>
          </select>
        </div>
        <div class="col-sm-4">
            <label v-text="$t('peygiri')"></label>
            <input v-model="peygiri" class="form-control">
        </div>
        <div class="col-sm-4">
          <label v-text="$t('_')"></label>
          <input @click="loaddata(1)"  type="button" class="w-100 btn btn-info"  :value="$t('filter')">

        </div>
      </div>

    </div>
    <hr>
  <b-row dir="rtl" class="text-right">
    <b-col>
      <span class="btn w-100 btn-dark" @click="statusmode=null; loaddata(1);" v-text="$t('all')"></span>
    </b-col>
    <b-col>
      <span class="btn w-100 btn-danger"  @click="statusmode=0; loaddata(1);" v-text="$t('new')"></span>

    </b-col>
    <b-col>
      <span class="btn  w-100 btn-primary"  @click="statusmode=1; loaddata(1);" v-text="$t('onprocess')"></span>
    </b-col>
    <b-col>
      <span class="btn  w-100 btn-success"  @click="statusmode=2; loaddata(1);" v-text="$t('success')"></span>
    </b-col>
    <b-col>
      <span class="btn  w-100 btn-info"  @click="statusmode=3; loaddata(1);" v-text="$t('reject')"></span>
    </b-col>
  </b-row>

    <div class="clearfix mt-4">
      <h5 dir="rtl" class="text-right" v-text="status[statusmode]"></h5>
      <b-table dir="rtl" striped hover :items="datas" class="text-right" :fields="fields">
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-slot:cell(model)="data">
          {{ $t(data.item.model) }}
        </template>
        <template v-slot:cell(status)="data">
          <span v-text="status[data.item.status]"></span>
        </template>
        <template v-slot:cell(id)="data">
          <span class="icofont-eye" v-b-modal.modal-1 @click="ishow(data.index)"></span>
        </template>

      </b-table>


      <b-modal   size="xl" v-if="show!=false && edit!=null" dir="rtl" id="modal-1" :title="'#'+-edit.peygiri">
        <p class="m-4" v-if="edit!=null">
          <b-form @submit="changestatus" class="row" >
            <b-form-group

              dir="rtl"
              class="text-right w-50"
              id="input-group-1"
              :label="$t('email')"
              label-for="input-1"
            >
              <div v-text="edit.email"></div>

              <hr>
            </b-form-group>
            <b-form-group
               dir="rtl"
               class="text-right w-50"
              id="input-group-2"
              :label="$t('model')"
              label-for="input-2"
            >


              <div v-text="$t(edit.model)"></div>
              <hr>
            </b-form-group>
            <b-form-group
               dir="rtl"
               class="text-right w-100"
              id="input-group-3"
              :label="edit.label1"
              label-for="input-3"
            >

              <div v-text="edit.data1"></div>
              <hr>

            </b-form-group>
            <b-form-group
              dir="rtl"
              class="text-right w-100"
              id="input-group-4"

              label-for="input-5"
              :label="$t(edit.label2)"
            >

              <div v-text="edit.data2"></div>
              <hr>

            </b-form-group>
            <b-form-group
              dir="rtl"
              class="text-right w-50"
              id="input-group-5"
              :label="$t('date')"
              label-for="input-6"
            >

              <div v-text="edit.jalali"></div>
              <hr>

            </b-form-group>
            <b-form-group
              dir="rtl"
              class="text-right w-50"
              id="input-group-6"
              :label="$t('status')"
              label-for="input-7"
            >
              <b-form-select v-model="edit.status" class="mb-3">
                <b-form-select-option :value="0" v-text="$t('new')"></b-form-select-option>
                <b-form-select-option :value="1" v-text="$t('onprocess')"></b-form-select-option>
                <b-form-select-option :value="2" v-text="$t('success')"></b-form-select-option>
                <b-form-select-option :value="3" v-text="$t('reject')"></b-form-select-option>

              </b-form-select>
            </b-form-group>
            <b-form-group
              dir="rtl"
              class="text-right w-100"
              id="input-group-7"
              :label="$t('answer')"
              label-for="input-8"
            >
              <b-form-textarea
                id="textarea-rows"
                v-model="edit.answer"
                :placeholder="$t('answer')"
                rows="8"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </p>
        <template v-slot:modal-footer>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
            v-text="$t('close')"
          >
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="changestatus"
            v-text="$t('save')"
          >
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>

</template>

<script>

export default {
name: "index",
  layout:'dashboard',
  data(){
  return{
    group:null,
    show:false,
    methodss:null,
    datas:null,
    edit:null,
    statusmode:null,
    status:{
      0:this.$t('new'),
      1:this.$t('onprocess'),
      2:this.$t('success'),
      3:this.$t('reject'),
    },


    fields: [
      {
        key:'index',

      },
      {
        key:'email',
        label:this.$t('email'),

        sortable: true
      },

      {
        key:'peygiri',
        label:this.$t('peygiri'),

      },
      {
        key:'model' ,
        label:this.$t('model'),

        sortable: true
      },

      {
        key: 'jalali',
        label: this.$t('date'),
        sortable: true,
        // Variant applies to the whole column, including the header and footer
        variant: 'primary'
      },
      {
        key:'status' ,
        label:this.$t('status'),
        variant: 'success',

        sortable: false
      },
      {
        key:'id' ,
        label:this.$t('show'),

        sortable: false
      },

    ],
    items: [

    ]

  }
  },
  methods:{

    changestatus(){
      let that=this;
      this.$axios.put(this.$url+'user/rclinet/'+this.edit.peygiri,this.edit,{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res){
       that.$swal.fire('success');
      });
    },
    ishow(id){
      this.show=true;
      this.edit=this.datas[id];
    },
  loaddata(page=1){
    let that=this;
      this.$axios.get(this.$url+'user/rclinet',{
        params:{
          page:page,
          peygiri:this.peygiri,
          group:this.group,
          status:this.statusmode,
        },
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.datas=res.data;
      });
  },
  loadmethode(){
    let that=this;
    this.$axios.get(this.$url+'contactus')
      .then(function (res){
        that.methodss=res.data;
      });
  }
  },
  mounted() {
  this.loadmethode()
    this.loaddata();
  }
}
</script>

<style scoped>

</style>
