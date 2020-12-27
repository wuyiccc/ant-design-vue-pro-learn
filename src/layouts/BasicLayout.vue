<!--核心页面布局-->
<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!--菜单栏-->
      <a-layout-sider :trigger="null" v-model="collapsed" collapsible>
        <div class="logo" />
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <!--核心布局-->
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";

export default {
  name: "BasicLayout",
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>

<style scoped></style>
