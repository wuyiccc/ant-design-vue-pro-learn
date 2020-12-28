<template>
  <div style="text-align: center">
    <icon-font type="icon-icon-404" style="font-size: 100px"></icon-font>
    <img :src="logo" alt="">
  </div>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "404",
  data() {
    return {
      logo
    };
  }
};
</script>

<style scoped></style>
