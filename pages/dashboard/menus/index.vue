<template>
    <div>
      <h3>{{ $t('menus') }}</h3>
      <hr>
      <v-container>
        <v-btn to="/dashboard/menus/editgroup">{{ $t('addgroup') }}</v-btn>
        <v-btn @click="loaddata">{{ $t('reload') }}</v-btn>
      </v-container>
      <template  v-if="menus!=null">
        <v-data-table
          :headers="headers"
          :items="menus"
          :hide-default-footer="true"
        >
          <template v-slot:item.edit="{ item }">
            <a :href="'/dashboard/menus/sub/'+item.id" class="icofont  icofont-edit icofont-1x"></a>
          </template>
          <template v-slot:item.delete="{ item }">
            <a  @click="remove(item.id)" class="icofont  icofont-delete-alt icofont-1x"></a>
          </template>
          <template v-slot:item.sub="{ item }">
            <a :href="'/dashboard/menus/sub/'+item.id" class="icofont  icofont-sub-listing icofont-1x"></a>
          </template>
        </v-data-table>
      </template>

    </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      headers: [
        {
          text: this.$t('name'),
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: this.$t('url'),
          value: 'url',
        },
        {
          text: this.$t('lang'),
          value: 'lang',
        },

        {
          text: this.$t('edit'),
          value: 'edit',
        },
        {
          text: this.$t('sub'),
          value: 'sub',
        },
        {
          text: this.$t('del'),
          value: 'delete',
        },

      ],
      menus:null
    }
  },
  methods:{
    headers: [
     {
        text: 'delete',
        align: 'start',
        sortable: false,
        value: 'delete',
      },

    ],
    loaddata(){
      let that=this;
      this.$axios.get(this.$url+'user/Groupmenu',{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
       that.menus=res.data;
      })
    },
    remove(id){
      let that=this;
      this.$axios.delete(this.$url+'user/Groupmenu/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.loaddata();
      })
        .catch((error) => {

          that.$swal.fire(that.$t('thisemnuhavesubmenu'));
        });
    }
  },

  mounted() {
    this.loaddata();
  }
}
</script>

<style scoped>

</style>
