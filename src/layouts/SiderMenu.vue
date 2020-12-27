<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <!--如果没有子菜单-->
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="$router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <!--如果有子菜单-->
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import {check} from "../utils/auth";

export default {
  name: "SiderMenu",
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    SubMenu
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  watch: {
    "$route.path": function(val) {
      console.log("path:" + val);
      this.selectedKeys = this.selectedKeysMap[val];
      console.log("selectedKeys:" + this.selectedKeys);
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
      console.log("openKeys:" + this.openKeys);
    }
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      console.log("execute getMenuData...");
      const menuData = [];
      for (let item of routes) {
        if (item.name && !item.hideInMenu) {

          if (item.meta && item.meta.authority && !check(item.meta.authority)) {
            break;
          }

          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          console.log("selectedKey " + selectedKey);
          console.log("item.path " + item.path);
          console.log(
            "selectedKeysMap[item.path] " + this.selectedKeysMap[item.path]
          );
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          // 根路由组件没有名字，但是有children
          menuData.push(...this.getMenuData(item.children));
        }
      }

      return menuData;
    }
  }
};
</script>
