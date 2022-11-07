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
              :autosize="{ minRows: 3, maxRows: 20}"
              disabled
              placeholder="请输入内容"
              type="textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-timeline :reverse=true>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
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
  name: "StudentLeaveRecord",
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
        status: '',
      },
      activities: [],
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
        url: "/student/leave/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogVisible = true;
          this.table = resp.data.data;
          this.activities = []
          switch (this.table.status) {
            case 2:
              // 审核不通过
              this.activities.push({content: "审核不通过"})
              break
            case 1:
              this.activities.push({content: "审核通过"})
              break
          }
          this.activities.push({content: "审核中"})
          console.log(this.activities)
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

    //查询分页
    selectAll() {
      this.axios({
        method: "get",
        url: "/student/leave/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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