<template>
  <div>

    <!--  //表格-->
    <el-table
        :data="tableData"
        border
        style="width: 100%">

      <el-table-column
          align="center"
          fixed
          label="编号"
          prop="id"
          width="55">
      </el-table-column>
      <el-table-column
          align="center"
          label="学号"
          prop="username"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="姓名"
          prop="name"
      >
      </el-table-column>

      <el-table-column
          align="center"
          label="手机"
          prop="phone"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="核酸状态码"
          prop="symptom"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="是否在校"
          prop="inschool"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="申报地址"
          prop="address"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="申报时间"
          prop="createtime"
      >
      </el-table-column>

    </el-table>
    <!--//分页工具条-->
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "StudentHealthRecord",
  data() {
    return {

      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,

      //表格数据
      tableData: [{
        id: '',
        username: '',
        name: '',
        phone: '',
        symptom: '',
        inschool: '',
        createtime: '',
      }
      ]
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {

    //查询分页
    selectAll() {

      this.axios({
        method: "get",
        url: "/student/health/selectByPageAndUsername/" + this.currentPage + "/" + this.pageSize,
      }).then(resp => {
        if (resp.data.code == 200) {
          this.tableData = resp.data.data.rows;
          this.totalCount = resp.data.data.totalCount;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectAll();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAll();
    },
  }
}
</script>

<style scoped>

</style>