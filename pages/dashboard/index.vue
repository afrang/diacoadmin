<template>
  <div>
    <v-row>
      <v-col cols="4">
        <a class="mylink"  href="/dashboard/product">
          <div class="mybox  pt-5">
            <img class="mt-5" src="/asset/img/product.svg">
            <div class="mt-4 text-center">{{ $t('products') }}</div>
          </div>
        </a>
      </v-col>
<!--      <v-col cols="4">-->
<!--        <div class="mybox box3 pt-5">-->
<!--          <a class="mylink"  href="/dashboard/product">-->

<!--            <v-row>-->
<!--              <v-col cols="4">-->
<!--                <img class="mt-5" src="/asset/img/group.svg">-->
<!--              </v-col>-->
<!--              <v-col class="text-right  font-weight-bold"-->
<!--                     style="padding-top: 70px;"-->
<!--                     cols="8">{{ $t('users') }}</v-col>-->
<!--            </v-row>-->
<!--          </a>-->
<!--          <v-row>-->
<!--&lt;!&ndash;            <v-col cols="6">&ndash;&gt;-->
<!--&lt;!&ndash;              <a class="mylink" href="/dashboard/discount">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="mybox box4">&ndash;&gt;-->
<!--&lt;!&ndash;                  <img width="70" src="/asset/img/percentage.svg" />&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>{{ $t('discount') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <v-col cols="6">&ndash;&gt;-->
<!--&lt;!&ndash;              <a class="mylink" href="/dashboard/discount">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="mybox box4">&ndash;&gt;-->
<!--&lt;!&ndash;                  <img width="70" src="/asset/img/paper-plane.svg" />&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>{{ $t('citysetting') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-col>&ndash;&gt;-->
<!--          </v-row>-->
<!--        </div>-->
<!--      </v-col>-->
      <v-col cols="4">
        <a class="mylink"  href="/dashboard/articlelist">
          <div class="mybox  pt-5">
            <img class="mt-5" src="/asset/img/folders.svg">
            <div class="mt-4 text-center">{{ $t('textlist') }}</div>
          </div>
        </a>
      </v-col>
<!--      <v-col cols="4">-->
<!--        <a class="mylink"  href="/dashboard/articlelist">-->
<!--          <div class="mybox box5  pt-5">-->
<!--            <img class="mt-5" src="/asset/img/invocie.svg">-->
<!--            <div class="mt-4 text-center">{{ $t('invoices') }}</div>-->
<!--          </div>-->
<!--        </a>-->
<!--      </v-col>-->
      <v-col cols="4">
<!--        <a class="mylink"  href="/dashboard/comment/archivecomment">-->
<!--          <div class="mybox box6  pt-5">-->
<!--            <img class="mt-5" src="/asset/img/question.svg" height="100">-->
<!--            <div class="mt-4 text-center">{{ $t('archivecomment') }}</div>-->
<!--          </div>-->
<!--        </a>-->
        <a class="mylink"  href="/dashboard/comment/archivecomment">
          <div class="mybox box7 ma-2  ">
            <v-row class="mt-1 text-center ma-2 ">
              <v-col cols="2" class="text-center ">
                <img class="mt-5 " src="/asset/img/image.svg" height="50">
              </v-col>
              <v-col cols="10" class="pt-3">
                <div class="pt-2 text-right white--text" style="padding-top: 100px; margin-top: 30px;">{{ $t('gallery') }}</div>
              </v-col>
            </v-row>
          </div>
        </a>
      </v-col>
      <v-col cols="4">
        <a class="mylink" href="/dashboard/product/Attributes">
          <div class="mybox box8 ma-2  ">
            <v-row class="mt-1 text-right ma-2 pt-4 ">
              <v-col cols="12" >
                <div >{{ $t('Attributes') }}</div>
              </v-col>
            </v-row>
          </div>
        </a>
        <a class="mylink" href="/dashboard/product/color">
          <div class="mybox box8 ma-2  ">
            <v-row class="mt-1 text-right ma-2 pt-4 ">
              <v-col cols="12" >
                <div >{{ $t('colormanager') }}</div>
              </v-col>
            </v-row>
          </div>
        </a>
        <a class="mylink" href="/dashboard/product/feature">
          <div class="mybox box8 ma-2  ">
            <v-row class="mt-1 text-right ma-2 pt-4 ">
              <v-col cols="12" >
                <div >{{ $t('feature') }}</div>
              </v-col>
            </v-row>
          </div>
        </a>
        <a class="mylink" href="/dashboard/product/specailproducts">
          <div class="mybox box8 ma-2  ">
            <v-row class="mt-1 text-right ma-2 pt-4 ">
              <v-col cols="12" >
                <div >{{ $t('specilproducts') }}</div>
              </v-col>
            </v-row>
          </div>
        </a>


      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.mybox{
  width: 100%;
  height: 300px;
  background-color: #B0E1DF;
  -webkit-box-shadow: -1px 7px 8px -2px #CCCCCC;
  box-shadow: -1px 7px 8px -2px #CCCCCC;
  border-radius: 20px;
  text-align: center;

}
.box3{
  height: 150px;
  background-color: #DDFCFB;
}
.box4{
  height: 150px;
  background-color: #E8ECEC;
  padding-top: 20px;
  margin-top: 15px;
  height: 140px;
}
.box5{
  background: rgb(255,0,240);
  background: linear-gradient(90deg, rgba(255,0,240,1) 0%, rgba(255,3,112,1) 100%);

  padding-top: 20px;
  margin-top: 15px;

}
.box6{
  height: 200px;
  background-color: #DDFCFB;

}
.box7{
  background-color: red;
  color: #fff;
  height: 110px;
}
.box8{
  height: 70px;
  background: linear-gradient(90deg, #BCBCBC 0%, #E1E4E1 );
  color: #333333;


}
</style>
