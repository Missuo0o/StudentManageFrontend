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
      <el-form-item label="请假类型">
        <el-input v-model="record.typename" maxlength="4" placeholder="病假或事假"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
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
          label="请假开始时间"
          prop="outtime"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="请假结束时间"
          prop="intime"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="请假类型"
          prop="typename"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="请假内容"
          prop="remark"
      >
      </el-table-column>
      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="180">

        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">查看详情</el-button>
          <el-button v-if="scope.row.status==0" key="pass" type="text" @click="handleSuccessClick(scope.row)">通过
          </el-button>
          <el-button v-if="scope.row.status==0" key="deny" type="text" @click="handleFailClick(scope.row)">拒绝
          </el-button>

          <el-button v-if="scope.row.status==1" key="alreadyPass" disabled type="text">已通过</el-button>
          <el-button v-if="scope.row.status==1" type="text" @click="handleOriginClick(scope.row)">撤销</el-button>

          <el-button v-if="scope.row.status==2" type="text" @click="handleOriginClick(scope.row)">撤销</el-button>
          <el-button v-if="scope.row.status==2" disabled type="text">已拒绝</el-button>
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

    <el-dialog
        :visible.sync="dialogVisible"
        title="请假详情"
        width="30%">

      <el-form ref="table" :model="table" label-width="100px">

        <el-form-item label="学号">
          <el-input v-model="table.username" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="table.name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="table.outtime" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="table.intime" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="请假类型">
          <el-radio-group v-model="table.typename" disabled>
            <el-radio label="事假"></el-radio>
            <el-radio label="病假"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" style="width: auto">
          <el-input
              v-model="table.remark"
              :autosize="{ minRows: 8, maxRows: 20}"
              disabled
              placeholder="请输入内容"
              type="textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentLeaveRecordAdmin",
  data() {
    return {
      dialogVisible: false,
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      table: {
        id: '',
        username: '',
        name: '',
        phone: '',
        outtime: '',
        intime: '',
        typename: '',
        remark: '',
      },
      record: {
        username: '',
        name: '',
        typename: '',
        flag: '',
      },
      options: [{
        value: '1',
        label: '未审批学生'
      }],
      //表格数据
      tableData: [{
        id: '',
        username: '',
        name: '',
        phone: '',
        outtime: '',
        intime: '',
        typename: '',
        remark: '',
        status: '',
      }
      ]
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/admin/leave/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogVisible = true;
          this.table = resp.data.data;
        } else if (resp.data.code == 404) {
          this.$message.error("数据同步失败,自动刷新");
        } else {
          this.$message.error(resp.data.msg);
        }
      }).finally(() => {
        //重新加载数据
        this.selectAll()
      });
    },
    handleSuccessClick(row) {
      this.axios({
        method: "put",
        url: "/admin/leave/success/" + row.id,
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
        url: "/admin/leave/fail/" + row.id,
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
    handleOriginClick(row) {
      this.axios({
        method: "put",
        url: "/admin/leave/origin/" + row.id,
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
        id: '',
        username: '',
        name: '',
        phone: '',
        outtime: '',
        intime: '',
        typename: '',
        remark: '',
        status: '',
      }
      ]
    },
    //查询分页
    selectAll() {
      if (this.record.flag == '') {
        this.axios({
          method: "post",
          url: "/admin/leave/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
        })
      }
      if (this.record.flag == '1') {
        this.axios({
          method: "post",
          url: "/admin/leave/selectAllNotApprovedByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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