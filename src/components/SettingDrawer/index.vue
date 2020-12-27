<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <template>
          <div>
            <h1>整体风格定制</h1>
            <a-radio-group
              @change="e => handleSettingChange('navTheme', e.target.value)"
              :value="$route.query.navTheme || 'dark'"
            >
              <a-radio value="dark">黑色</a-radio>
              <a-radio value="light">白色</a-radio>
            </a-radio-group>
            <h1>导航模式</h1>
            <a-radio-group
              @change="e => handleSettingChange('navLayout', e.target.value)"
              :value="$route.query.navLayout || 'left'"
            >
              <a-radio value="left">左侧</a-radio>
              <a-radio value="top">顶部</a-radio>
            </a-radio-group>
          </div>
        </template>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      // 将配置同步到路由的信息中，方便在BasicLayout中进行获取
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>

<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
