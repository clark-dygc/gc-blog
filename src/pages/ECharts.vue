<template>
  <div>
    <div style="width: 80%;margin: 20px 10%">
      <el-table :data="infoList" sytle="width:80%;" border>
        <el-table-column prop="hostname" label="名称" width="80px"></el-table-column>
        <el-table-column prop="type" label="操作系统类型" width="120px"></el-table-column>
        <el-table-column prop="platform" label="操作系统平台" width="120px"></el-table-column>
        <el-table-column prop="arch" label="CPU架构" width="120px"></el-table-column>
        <el-table-column prop="release" label="操作系统版本号" width="130px"></el-table-column>
        <el-table-column prop="uptime" label="运行时间"></el-table-column>
        <el-table-column prop="totalmem" label="计算机总内存" width="120px"></el-table-column>
        <el-table-column prop="freemem" label="空闲内存" width="120px"></el-table-column>
      </el-table>
    </div>
    <div id="app">
      <v-chart ref="cpuChart" class="my-chart" :options="bar" />
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/pie";
import { mapGetters } from "vuex";
import { formatCoutndown } from "@/utils/utils";

export default {
  name: "App",
  components: {
    "v-chart": ECharts,
  },
  created() {
    // this.$store
    //   .dispatch("system/getSystemInfo")
    //   .then((resp) => {
    //     const info = this.$store.getters.systemInfo;
    //     const source = this.buildSource(info.cpus);
    //     const series = this.buildCpuSeries(info.cpus);
    //     this.$refs["cpuChart"].setOptions({
    //       legend: {},
    //       tooltip: {},
    //       dataset: {
    //         source,
    //       },
    //       series,
    //     }, true);
    //   })
    //   .catch((err) => {});
  },
  computed: {
    ...mapGetters(["systemInfo"]),
    infoList() {
      return [
        {
          hostname: this.systemInfo.hostname,
          type: this.systemInfo.type,
          platform: this.systemInfo.platform,
          arch: this.systemInfo.arch,
          release: this.systemInfo.release,
          uptime: formatCoutndown(this.systemInfo.uptime),
          totalmem: this.formatMem(this.systemInfo.totalmem),
          freemem: this.formatMem(this.systemInfo.freemem),
        },
      ];
    },
  },
  data: function () {
    return {
      bar: {
        legend: {
          show: true
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
            ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
          ],
        },
        series: [
          {
            type: "pie",
            radius: 60,
            center: ["25%", "30%"],
            // No encode specified, by default, it is '2012'.
          },
          {
            type: "pie",
            radius: 60,
            center: ["75%", "30%"],
            encode: {
              itemName: "product",
              value: "2013",
            },
          },
          {
            type: "pie",
            radius: 60,
            center: ["25%", "75%"],
            encode: {
              itemName: "product",
              value: "2014",
            },
          },
          {
            type: "pie",
            radius: 60,
            center: ["75%", "75%"],
            encode: {
              itemName: "product",
              value: "2015",
            },
          },
        ],
      },
      timerId: -1,
    };
  },
  activated() {
    this._setupTimer();
  },
  deactivated() {
    this._cancelTimer();
  },
  beforeDestroy() {
    this._cancelTimer();
  },
  methods: {
    buildSource(cpus) {
      const source = [];
      const firstRow = ["product"];
      for (let i = 0; i < cpus.length; i++) {
        firstRow.push(i + "");
      }
      source.push(firstRow);
      const products = ["idle", "irq", "nice", "sys", "user"];

      for (let p of products) {
        const item = [p];

        for (let cpu of cpus) {
          item.push(cpu.times[p]);
        }
        source.push(item);
      }
      return source;
    },
    buildCpuSeries(cpus) {
      if (cpus.length === 0) {
        return;
      }

      const series = [];
      const colCount = 4;
      const rowCount = Math.floor((cpus.length - 1) / colCount) + 1;
      console.log(`rowCount: ${rowCount}`);
      for (let i = 0; i < cpus.length; i++) {
        const cpu = cpus[i];
        const col = i % colCount;
        const row = Math.floor(i / colCount);
        series.push({
          type: "pie",
          radius: 60,
          center: [
            ((col + 0.5) * 100) / colCount + "%",
            ((row + 0.5) * 60) / rowCount + "%",
          ],
          encode: {
            itemName: "cpu",
            value: i + "",
          },
        });
      }
      return series;
    },
    formatMem(bytes) {
      return (bytes / (1 << 30)).toFixed(2) + "G";
    },
    _setupTimer() {
      if (this.timerId !== -1) {
        return;
      }
      // 5秒钟更新一次
      this.timerId = setInterval(() => {
        this.$store.dispatch("system/updateSystemInfo");
      }, 1000 * 5);
    },
    _cancelTimer() {
      if (this.timerId === -1) {
        return;
      }
      clearInterval(this.timerId);
      this.timerId = -1;
    },
  },
};
</script>
<style>
.my-chart {
  width: 100%;
  height: 600px;
}
</style>
