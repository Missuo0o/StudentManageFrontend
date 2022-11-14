<template>

  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">

      <el-form-item label="课名">
        <el-input v-model="record.name" maxlength="10" placeholder="课名"></el-input>
      </el-form-item>
      <el-form-item label="星期">
        <el-input v-model="record.week" maxlength="1" placeholder="星期"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="选取课程" name="1">
        <el-table
            :key="Date.now()"
            v-loading="loading"
            :data="course"
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
              label="课名"
              prop="name"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="上课时间"
              prop="start"
          >
          </el-table-column>

          <el-table-column
              align="center"
              label="下课时间"
              prop="end"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="星期数"
              prop="week"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="最大人数"
              prop="limit"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="已选人数"
              prop="current"
          >
          </el-table-column>
          <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="180">

            <template slot-scope="scope">
              <el-button key="pass" :disabled="scope.row.available" type="text" @click="handleSuccessClick(scope.row)">
                选课
              </el-button>
            </template>


          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已选课程" name="2">
        <el-table
            :key="Date.now()"
            v-loading="loading"
            :data="course"
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
              label="课名"
              prop="name"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="上课时间"
              prop="start"
          >
          </el-table-column>

          <el-table-column
              align="center"
              label="下课时间"
              prop="end"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="星期数"
              prop="week"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="最大人数"
              prop="limit"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="已选人数"
              prop="current"
          >
          </el-table-column>
          <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="180">

            <template slot-scope="scope">
              <el-button type="text" @click="handleFailClick(scope.row)">退课</el-button>
            </template>

          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--  //表格-->

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
  name: "StudentCourse",
  data() {
    return {
      loading: true,
      activeName: '1',
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,

      record: {
        name: '',
        week: '',
      },

      //表格数据
      course: [{
        id: '',
        name: '',
        start: '',
        end: '',
        week: '',
        limit: '',
        current: '',
      }
      ]

    }
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    resetForm() {
      this.record = {
        id: '',
        name: '',
        start: '',
        end: '',
        week: '',
        limit: '',
        current: '',
      }
    },
    handleClick() {
      this.resetForm();
      this.selectAll();
    },
    handleSuccessClick(row) {
      this.axios({
        method: "post",
        url: "/student/addCourse/" + row.id,
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
        method: "post",
        url: "/student/deleteCourse/" + row.id,
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
    //查询分页
    selectAll() {
      this.loading = true
      if (this.activeName == '1') {
        this.axios({
          method: "post",
          url: "/student/course/selectAllByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
          data: this.record,
        }).then(resp => {
          if (resp.data.code == 200) {
            this.course = resp.data.data.rows;
            this.totalCount = resp.data.data.totalCount;
          } else if (resp.data.code == 404) {
            this.$message.error("查询失败");
          } else {
            this.$message.error(resp.data.msg);
          }
          this.loading = false
        })
      }
      if (this.activeName == '2') {
        this.axios({
          method: "post",
          url: "/student/course/selectAlreadyByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
          data: this.record,
        }).then(resp => {
          if (resp.data.code == 200) {
            this.course = resp.data.data.rows;
            this.totalCount = resp.data.data.totalCount;
          } else if (resp.data.code == 404) {
            this.$message.error("查询失败");
          } else {
            this.$message.error(resp.data.msg);
          }
          this.loading = false
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