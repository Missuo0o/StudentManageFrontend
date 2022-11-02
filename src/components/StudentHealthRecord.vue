<template>
  <div>

    <!--  //表格-->
    <el-table
        :data="tableData"
        border
        style="width: 100%">

      <el-table-column
          fixed
          prop="id"
          label="编号"
          align="center"
          width="55">
      </el-table-column>
      <el-table-column
          prop="username"
          label="学号"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          align="center"
      >
      </el-table-column>

      <el-table-column
          prop="phone"
          label="手机"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="symptom"
          label="核酸状态码"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="inschool"
          label="是否在校"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="address"
          label="申报地址"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="createtime"
          label="申报时间"
          align="center"
      >
      </el-table-column>

    </el-table>
    <!--//分页工具条-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
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

    //查询方法
    onSubmit() {
      this.selectAll();
    },
  }
}
</script>

<style scoped>

</style>