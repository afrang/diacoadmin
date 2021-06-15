<template>
  <div class=" container  pt-4 text-right " >
    <div class=" wmaster "  style="min-height: 500px;" dir="rtl">
      <h2 v-text="$t('cityoption')"></h2>
      <hr>
    <v-btn @click="loadlist"><span class="icofont-listing-box"></span> <span v-text="$t('listspecialcity')"></span> </v-btn>
      <v-container>
        <div class="mt-4" v-if="mode=='add'">
          <v-row>
            <v-col xs="12" sm="4">
              <template v-if="liststate!=null">
                <label v-text="$t('selectyourstate')"></label>
                <v-select     item-text="name"      item-value="id"           :items="liststate"
                              :label="$t('selectyourstate')"
                              v-model="savedata.state"   @change="changecitylist"     menu-props="auto"
                              hide-details  single-line  >        </v-select>
              </template>
            </v-col>
            <v-col xs="12" sm="4">
              <template v-if="listcounty!=null">
                <label v-text="$t('countyselect')"></label>
                <v-select     item-text="name"      item-value="id"           :items="listcounty"
                              :label="$t('countyselect')"
                              v-model="savedata.county"   @change="changecounty"     menu-props="auto"
                              hide-details  single-line  >        </v-select>

              </template>
            </v-col>
            <v-col xs="12" sm="4">
              <template v-if="listcity!=null">
                <label v-text="$t('cityselect')"></label>
                <v-select     item-text="name"      item-value="id"
                              :label="$t('cityselect')"
                              :items="listcity"
                              v-model="savedata.city"   @change="changecounty"     menu-props="auto"
                              hide-details  single-line  >        </v-select>

              </template>

            </v-col>
            <template v-if="savedata.city!=null">
              <v-col xs="12" sm="4">
                <label ><span class="icofont-free-delivery icofont-3x" style="font-size: 20px;"></span><span v-text="$t('fastsending')"></span></label>
                <v-select    :label="$t('fastsending')" item-text="text"      item-value="value"           :items="truefalse"
                             v-model="savedata.fastsending"       menu-props="auto"
                             hide-details  single-line  >        </v-select>
              </v-col>
              <v-col xs="12" sm="4">
                <label ><span class="icofont-free-delivery icofont-3x" style="font-size: 20px;"></span><span v-text="$t('freedelivery')"></span></label>
                <v-select    :label="$t('freedelivery')" item-text="text"      item-value="value"           :items="truefalse"
                             v-model="savedata.freedelivery"       menu-props="auto"
                             hide-details  single-line  >        </v-select>
              </v-col>
              <v-col xs="12" sm="4">


                <v-btn  class="mt-5" @click="addtolist" >{{ $t('Add') }}</v-btn>

              </v-col>
            </template>

          </v-row>





        </div>
      </v-container>

      <hr>
      <template v-if="listpost!=null">
        <v-data-table   :headers="headers" :items="listpost">
          <template v-slot:item.fastsending="{ item }">
            <span v-if="item['fastsending']==1" class="icofont-check-circled icofont-3x text-success" style="font-size: 20px;"></span>
          </template>
          <template v-slot:item.freedelivery="{ item }">
            <span v-if="item['freedelivery']==1" class="icofont-check-circled icofont-3x text-success" style="font-size: 20px;"></span>
          </template>
          <template v-slot:item.delete="{ item }">
            <span   @click="del(item.id)" class="icofont-delete-alt icofont-3x text-success" style="font-size: 20px;"></span>
          </template>
        </v-data-table>
      </template>


    </div>
    <hr>
  </div>
</template>

<script>

export default {
  name: "citypost",
  layout:'dashboard',

data(){
    return{
      headers:[

        {
          text: this.$t('name'),
          align: 'start',
          sortable: false,
          value: 'to_city.name',
        },
        {
          text: this.$t('city'),
          align: 'start',
          sortable: false,
          value: 'to_city.to_shahrestan.name',
        },
        {
          text: this.$t('county'),
          align: 'start',
          sortable: false,
          value: 'to_city.to_ostan.name',
        },
        {
          value: 'fastsending',
          text: this.$t('fastsending'),

        },
        {
          value: 'freedelivery',
          text: this.$t('freedelivery'),

        },
        {
          value: 'delete',
          text: this.$t('del'),

        },
      ],
      truefalse:[
        { value:0,text:this.$t('false')},
        { value:1,text:this.$t('true')}
      ],
      mode:'add',
      listpost:null,
      liststate:null,
      listcounty:null,
      listcity:null,
      savedata:{
        state:null,
        county:null,
        city:null,
        free:false,
        fastsending:false

      }
    }
  },

  methods:{
    del(id){
      let that=this;
      this.$axios.delete(this.$url+'user/delivery/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      }) .then(function (response) {
        that.loadlist();
      })
    },
    loadlist(){
      let that=this;
      this.$axios.get(this.$url+'user/delivery',{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (response) {
          that.listpost=response.data;
        })
    },
    addtolist(){
      let that=this;
      this.$axios.post(this.$url+'user/delivery',this.savedata,{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (response) {
          that.loadlist();
        })
    },
    changecitylist(){
      let that=this;


      this.$axios.post(this.$url+'countylist',{
        id:this.savedata.state,
      },
        {
          headers:{
            Authorization:localStorage.token
          }
        })
        .then(function (response) {
          that.listcounty=response.data;
          that.$forceUpdate();
        })
    },

    changecounty(){
      let that=this;

      this.$axios.post(this.$url+'citylist',{
        id:this.savedata.county,
      },
        {
          headers:{
            Authorization:localStorage.token
          }
        })
        .then(function (response) {
          that.listcity=response.data;
          that.$forceUpdate();
        })
    },
    getstate(){
      let that=this;

      this.$axios.post(this.$url+'statelist',null,
        {
          headers:{
            Authorization:localStorage.token
          }
        })
        .then(function (response) {
          that.liststate=response.data;
        })
    }
  },
  mounted() {
    this.getstate();
    this.loadlist();
  }
}
</script>

<style scoped>

</style>
