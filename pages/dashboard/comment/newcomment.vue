<template>
    <div class="container">
      <div class="wmaster" v-if="setting!=null">
        <div class="w-100 text-right p-2">
          <a class="btn btn-primary text-white" @click="loadwebsite"><span class="icofont-refresh"></span></a>

        </div>

        <b-table
          responsive
          dir="rtl"
          class="text-right"
          :items="items"
          :fields="fields"
          responsive="sm"
        >
          <template v-slot:thead-top="data">
            <b-tr dir="rtl">
              <b-th colspan="2" variant="secondary"><span class="icofont-comment"></span> {{ $t('comment') }}</b-th>
              <b-th variant="primary"><span class="icofont-box"></span>{{ $t('product') }}  </b-th>
              <b-th variant="danger" colspan="4"><span class="icofont-score-board"></span> {{ $t('score') }}  </b-th>
              <b-th variant="primary" colspan="2"><span class="icofont-user"></span>  {{ $t('UserDetail') }} </b-th>
              <b-th variant="" colspan="1"><span class="icofont-user"></span>  {{ $t('status') }} </b-th>
            </b-tr>
          </template>
          <template v-slot:cell(user)="data">
            <!-- `data.value` is the value after formatted by the Formatter -->
            <span class="btn btn-primary text-white  icofont-tick-boxed icofont-2x text-primary" style="color: #fff !important;" @click="publish(data.value)"></span>
            <span class="btn btn-danger  text-white icofont-ui-delete icofont-2x text-primary" style="color: #fff !important;" @click="deleteded(data.value)"></span>
          </template>

        </b-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "newcomment",
      layout:'dashboard',
        data(){
          return{
            list:{},
            items:{},
            setting:null,



          }
        },
      computed:{
     fields:function () {
       if(this.setting!=null){
         let myitem=[
           { key: 'comment.subject', label: this.$t('subject'),},
           { key: 'comment.text', label: this.$t('text') },
           { key: 'product.name', label: this.$t('product'), sortable: true },
           { key: 'subject1', label: this.setting.subject1},
           { key: 'subject2', label: this.setting.subject2 },
           { key: 'subject3', label: this.setting.subject3},
           { key: 'subject4', label: this.setting.subject4 },
           { key: 'user.name', label: this.$t('name') },
           { key: 'user.phone', label: this.$t('phone') },
           {
             key: 'user',
             label: this.$t('activities'),
             formatter: (value, key, item) => {
               return item;
             }
           },


         ];
         return myitem;
       }else {
         return  [];
       }

        }
      },
      methods:{
        publish(id){
          let self=this;
          self.$swal.mixin({
            input: 'textarea',
            confirmButtonText: self.$t('Next')+' &rarr;',
            showCancelButton: true,
            cancelButtonText:self.$t('cancel'),
            customClass: {
              input:'text-right'
            },
              progressSteps: ['1', '2']
          }).queue([
            {
              title: self.$t('subject'),
              text: self.$t('editsubject'),
             inputValue:id.comment.subject
            },
            {
              title: self.$t('comment'),
              text:  self.$t('editcomment'),
              inputValue:id.comment.text
            },

          ]).then((result) => {
            console.log(result);
          id.comment.subject=result.value[0];
          id.comment.text=result.value[1];
            self.$axios.put(this.$url+'user/commentshow/update',id,{
              headers:{
                Authorization:localStorage.token

              }
            }).then(function (res) {
              self.loadwebsite();
            })

          })


        },
        deleteded(myid){
      //    alert(myid.user);
          console.log(myid.product['id']);
       let self=this;
        self.$axios.delete(this.$url+'user/commentshow/'+myid.user.id,{
            headers:{
              Authorization:localStorage.token

            },
            params:{
              product:myid.product['id']
            }
          }).then(function (res) {
            self.loadwebsite();
          });

        },
        loadsetting(){
          let self=this;
          this.$axios.get(this.$url+'user/commentsertting',{
            headers:{
              Authorization:localStorage.token
            }
          }).then(function (res) {
            self.setting=res.data;
          })
        },
          loadwebsite(){
            let that=this;

            that.$axios.get(this.$url+'user/commentshow',{
              params:{
                show:0
              },
              headers:{
                Authorization:localStorage.token
              }
            }).then(function (res) {
                that.items=res.data;
            })
          }
      },
      mounted() {
          this.loadwebsite();
          this.loadsetting();
      }

    }
</script>

<style scoped>

</style>
