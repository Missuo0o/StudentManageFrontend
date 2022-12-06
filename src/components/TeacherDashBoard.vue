<template>
  <div class="innerbox" ref="chart"></div>
</template>

<script>
export default {
  name: "AdminDashBoard",
  mounted() {
    this.myChart = this.echarts.init(this.$refs.chart);
    this.createChart();
  },
  data() {
    return {
      myChart: '',
      getData: [],
    }
  },
  methods: {
    //axios要到请求返回时间后才会执行then后的方法，避免方法直接跑完，先等到返回有结果后在执行后面
    //都不加async就会log 2-3-1 下面加了async上面不加async则会log 2-3-1 上面加了async下面不加async则会log 3-1-2
    async selectAll() {
      await this.axios({
        method: "get",
        url: "/teacher/getData",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.getData = resp.data.data
          // console.log("111")
        } else {
          this.$message.error(resp.data.msg);
        }

      })
      // console.log("2222")
    },
    createChart() {
      this.$nextTick(async function () {
        //由于20行加入了async 代表这个方法是异步方法，所以要等这个方法跑完，才执行后面
        await this.selectAll()
        // console.log("333")
        let option = {
          xAxis: {
            type: 'category',
            data: ['未选课学生', '未选宿舍学生','未处理请假']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.getData,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        };
        this.myChart.setOption(option);
      })
    }
  },
}

</script>

<style scoped>
.innerbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
}
</style>