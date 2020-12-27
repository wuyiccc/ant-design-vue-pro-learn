<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  name: "Chart",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // 浅层监听option的变化，但是当option内部值变化时，在外部组件重新给option赋予一个新对象
    option(val) {
      this.chart.setOption(val);
    }
    // 深度监听val的变化
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },

  created() {
    // 对resize方法的调用进行过滤处理，防止调用频率过高
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    // 在挂载的时候渲染组件并设置监听器
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁实例, 防止内存泄漏
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("####resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped></style>
