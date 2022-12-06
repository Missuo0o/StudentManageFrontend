<template>
  <div class="innerbox" ref="chart"></div>
</template>

<script>
export default {
  name: "DashBoard",
  mounted() {
    this.myChart = this.echarts.init(this.$refs.chart);
    this.createChart();
  },
  data(){
    return{
      myChart:'',
      getData:[],
    }
  },
  methods:{
    async selectAll(){
       await this.axios({
        method: "get",
        url: "/admin/getData",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.getData = resp.data.data
        }

      })
    },
    createChart() {
      this.$nextTick(async function () {
        await this.selectAll()
        let option = {
          xAxis: {
            type: 'category',
            data: ['未选课学生', '未选宿舍学生', '未分配辅导员学生', '未打卡学生', '未打卡老师', '未处理请假', '未返校学生']
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