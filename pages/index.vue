<template>
 <div>

   <div class="headertitle"></div>

  <div class="loginpage">
   <div class="logobox">
     <img width="100%" src="/asset/img/logo.png">

   </div>
    <v-container>
      <v-form @submit.prevent="save"     align="center"
      >
        <v-text-field
          label="UserName"
          placeholder="Email"
          type="email"
          v-model="user.email"
          filled
          rounded
          dense
        ></v-text-field>
        <v-text-field
          label="Password"
          placeholder="*******"
          type="password"
          v-model="user.password"

          filled
          rounded
          dense
        ></v-text-field>
        <v-btn
          style="z-index: 100"
          class="primary text-black"
          elevation="2"
          type="submit"
          rounded
        >Login</v-btn>

      </v-form>
    </v-container>
    <div class=" loginpage3">
      <div>Powered  Afrang Art Design Studio</div>
      <div>TissEnigne 2.5</div>
    </div>
  </div>

   <div>.</div>
 </div>
</template>

<style>

.loginpage{
  width: 40%;
  height: 320px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  background-color: #F2F5EF;
  margin-bottom: 300px;
  box-shadow: rgba(0,0,0,0.2)  0px 6px 0px;


}
.loginpage3{
  text-align: center;
  z-index: 1 !important;
  width: 100%;
  height: 100px;
  padding-top: 20px;
  font-size: 14px;
  border-radius: 15px;
  position: relative;
  line-height: 20px;
  background-color: #F6A9EB;
  margin-top: -20px;

}
.logobox{
  top: -20px;
  margin-left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  position: relative;
  box-shadow: -1px -1px 3px 3px #9f9d9d;
  background-color: #EFEFEF;
  z-index: 2 !important;
}
.text-black{
  padding-right: 30px !important;
  padding-left: 30px !important;
  color: #fff !important;
  background-color: #020254 !important;
}

</style>
<script>

export default {
  components: {},
  layout:'login',
  data() {
    return {
      location:'bgtop',
      token:null,
      user:{
        email:null,
        password:null
      },
      error:null,
      type:'password'
    }
  },
  watch: {
    token(newName) {

      localStorage.token ='Bearer '+newName;
      if(localStorage.token){
        window.location.replace('/dashboard');
      }
    }
  },
  methods:{
    save(){
      let that=this;
      this.$axios.post(this.$url+'loginuser',this.user)
        .then(function (response) {

         that.token=response.data.data.token;
        } ) .catch((error) => {
        that.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'نام کاربری و رمز عبور اشتباه می باشد',
          showConfirmButton: false,
          timer: 1500
        })

      });
    },

  },
  mounted() {
    if(localStorage.token){
      window.location.replace('/dashboard');
     // this.$router.push({name: 'dashboard'});

    }
  }
}
</script>
<style>
.headertitle{
  width:100%;
  height:10px;
  overflow: hidden;

}
</style>
