<template>
  <div>
    <Chart :option="chartOption" style="height: 300px;"></Chart>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import random from "lodash/random";
export default {
  name: "Analysis",
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped></style>
