<template>
  <v-row>
    <v-col cols="12">
    <div class="headertitle"></div>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="2">
        <v-navigation-drawer

          permanent
          right
          class="mymenus"
        >
          <template v-slot:prepend>
            <v-list-item two-line >
              <v-list-item-avatar>
                <img src="/asset/img/logo.png">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>TissEnigne 3.0</v-list-item-title>
                <v-list-item-subtitle>Market Edition</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider></v-divider>
          <v-list>
            <template    v-for="(item, i) in menu"    >
              <template v-if="item.children.length==0">
                <v-list-item   v-if="item.active==true" :to="item.href"  :key="i"  >
                  <v-list-item-icon >
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-group
                  :value="false"
                  no-action
                  sub-group
                  v-if="item.active==true"
                >
                  <template v-slot:activator>
                    <v-list-item-content>

                      <v-list-item-title>{{  $t(item.name)  }}</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="(items, ii) in item.children"
                    :key="ii"
                    link
                    :to="items.href"
                    v-if="items.active==true"
                  >
                    <v-list-item-title v-text="$t(items.name)"></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon v-text="icon"></v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </template>

            </template>


          </v-list>

        </v-navigation-drawer>
        </v-col>

        <v-col cols="10">
          <v-container>
            <nuxt-child></nuxt-child>

          </v-container>

        </v-col>
      </v-row>
    </v-col>
    <v-col>
    </v-col>
    <v-col cols="12">
      <div class="headertitle">
        AfrangArt Desing Studio
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      menu: require('~/locales/menudashboard'),
      items: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
        },
      ],
    }
  }
}
</script>

<style >

.boxadmin{
  background-color: rgba(0,42,74,0.7);
  color: #fff;
  font-size: 12px;
  direction: rtl;
  text-align: right;
  padding: 15px;
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 25px;
  height: 100%;

  position: absolute;

}
.pbox{
  border-radius: 5px;
}
.boxtext{
  background-color: #dbdbdb;
  width: 100%;
  list-style: none;
  text-decoration: none;
  height: 20px;
  padding: 15px;
  text-align: right;
  color: #4a4a4a !important;
  display: inline-table;
  margin-top: 5px;
  -webkit-box-shadow: -1px 7px 8px -1px #000000;
  box-shadow: -1px 7px 8px -1px #000000;
  border-radius: 15px;
}

.mylink *{
  color: #333333;
  text-decoration: none;
}
.mylink{
  text-decoration: none;
  color: #225D00;
}
.mymenus *{
  font-size:12px;
}
.headertitle{
  width: 100%;
  height:30px;
  padding:5px;
  padding-bottom: 5px !important;
  text-align:center;
  color: #333;
  background: linear-gradient(13deg, #c7ceff 14%,#f9d4ff 64%);
}
</style>
