<template>
  <div class="innerbox">
    <el-descriptions :column="4" border direction="vertical" title="宿舍信息">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          楼栋号
        </template>
        {{ tableData.building }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          层数
        </template>
        {{ tableData.floor }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          室
        </template>
        {{ tableData.room }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "StudentMyDormitory",
  mounted() {
    this.axios({
      method: "get",
      url: "/student/myDormitory",
    }).then(resp => {
      if (resp.data.code == 200) {
        this.tableData = resp.data.data
      } else if (resp.data.code == 404) {
        this.$message.error("您还未选取宿舍或缴费成功");
      } else {
        this.$message.error(resp.data.msg);
      }
    })
  },
  data() {
    return {
      tableData: {
        building: '',
        floor: '',
        room: ''
      }
    }
  }
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