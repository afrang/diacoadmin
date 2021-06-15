<template>
    <div>
      <v-btn to="/dashboard/product">{{ $t('back')}}</v-btn>
      <v-btn @click="listgroup">{{ $t('relaod')}}</v-btn>
      <v-container>

        <template v-if="groups!=null">
          <v-form>
            <v-select v-model="data.group"  :items="groups" item-value="id" item-text="name"></v-select>
            <v-file-input accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  v-model="data.file"></v-file-input>

          </v-form>
        </template>
        <pre>{{ groups }}</pre>

        <v-form>
        </v-form>
      </v-container>

    </div>
</template>

<script>
export default {
name: "excel",
  data(){
    return{
      groups:null,
      data:{
        name:null,
        file:null,
        group:null,

      }
    }
  },
  methods:{

    listgroup(){

      let that=this;

      this.$axios.get(this.$url+'pgroup/create',{

        headers: {
          Authorization:localStorage.token
        }
      }).then(function(res){
        that.groups=res.data;
      })
        .catch((error) => {

        });
    }
  },
  mounted() {
  this.listgroup();
  }
}
</script>

<style scoped>

</style>
