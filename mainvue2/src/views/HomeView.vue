<template>
<section class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  
  <button type="button" @click="downloadPage()">下载</button>
</section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import {
  loadByUrl,
  loadByBase64,
} from "remote_libs/file/download.js";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    downloadPage(){
      loadByUrl(location.href, document.title);
    },
  },
}
</script>
