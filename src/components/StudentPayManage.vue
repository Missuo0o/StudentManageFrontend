<template>

  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="筛选">
        <el-select v-model="record.flag" clearable placeholder="请选择" @change="change">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="record.username" maxlength="7" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="record.name" maxlength="4" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  //表格-->
    <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%">

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
          label="宿舍id"
          prop="dormitoryid"
      >
      </el-table-column>

      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="180">

        <template slot-scope="scope">
          <el-button v-if="scope.row.paied==0" key="pass" type="text" @click="handleSuccessClick(scope.row)">通过
          </el-button>

          <el-button v-if="scope.row.paied==1" key="alreadyPass" disabled type="text">已支付</el-button>
          <el-button v-if="scope.row.paied==1" type="text" @click="handleFailClick(scope.row)">撤销</el-button>

        </template>


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
  name: "StudentPayManage",
  data() {
    return {
      loading: true,
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,

      record: {
        username: '',
        name: '',
        flag: '',
      },
      options: [{
        value: '1',
        label: '未缴费学生'
      }],
      //表格数据
      tableData: [{
        username: '',
        name: '',
        dormitoryid: '',
        paied: '',
      }
      ]
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {

    handleSuccessClick(row) {
      this.axios({
        method: "put",
        url: "/admin/dormitory/success/" + row.username,
      }).then(resp => {
        if (resp.data.code == 201) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          //重新查询
          this.selectAll();
        } else if (resp.data.code == 400) {
          this.$message.error('操作失败');
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    handleFailClick(row) {
      this.axios({
        method: "put",
        url: "/admin/dormitory/fail/" + row.username,
      }).then(resp => {
        if (resp.data.code == 201) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          //重新查询
          this.selectAll();
        } else if (resp.data.code == 400) {
          this.$message.error('操作失败');
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    change() {
      this.resetTableData();
      this.selectAll();
    },
    resetTableData() {
      this.tableData = [{
        username: '',
        name: '',
        dormitory: '',
        paied: '',
      }
      ]
    },
    //查询分页
    selectAll() {
      this.loading = true;
      if (this.record.flag == '') {
        this.axios({
          method: "post",
          url: "/admin/dormitory/selectPayByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
          data: this.record,
        }).then(resp => {
          if (resp.data.code == 200) {
            this.tableData = resp.data.data.rows;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].dormitoryid == 0) {
                this.tableData[i].dormitoryid = '未选择'
              }
            }


            this.totalCount = resp.data.data.totalCount;
          } else if (resp.data.code == 404) {
            this.$message.error("查询失败");
          } else {
            this.$message.error(resp.data.msg);
          }
          this.loading = false;
        })
      }
      if (this.record.flag == '1') {
        this.axios({
          method: "post",
          url: "/admin/dormitory/selectNotPayByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
          data: this.record,
        }).then(resp => {
          if (resp.data.code == 200) {
            this.tableData = resp.data.data.rows;
            this.totalCount = resp.data.data.totalCount;
          } else if (resp.data.code == 404) {
            this.$message.error("查询失败");
          } else {
            this.$message.error(resp.data.msg);
          }
          this.loading = false;
        })
      }
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