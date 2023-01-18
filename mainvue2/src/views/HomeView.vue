<template>
<section class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  
  <button type="button" @click="downloadPage()">下载</button>
</section>
</template>

<script>

import {
  loadByUrl,
  loadByBase64,
} from "remote_libs/file/download.js";

export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    downloadPage(){
      loadByUrl(location.href, document.title);
    },
  },
}
</script>
