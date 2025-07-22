<template>
  <!-- header -->
  <HeaderComponent />
  <part1 />
  <scrollMap />
  <part2 />
  <part3 />
  <part4 />

  <!-- <Acknowledgement /> -->

  <FooterComponent />
</template>

<script setup>

// 组件引入
import HeaderComponent from './paragraph/header.vue';
import FooterComponent from './paragraph/footer.vue';
// import Acknowledgement from './paragraph/acknowledgement.vue';

import part1 from './paragraph/part1.vue';
import part2 from './paragraph/part2.vue';
import part3 from './paragraph/part3.vue';
import part4 from './paragraph/part4.vue';
import scrollMap from './map.vue';

</script>