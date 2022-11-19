<template>

  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">

      <el-form-item label="楼栋号">
        <el-input v-model="record.building" maxlength="10" placeholder="楼栋号"></el-input>
      </el-form-item>
      <el-form-item label="层数">
        <el-input v-model="record.floor" maxlength="1" placeholder="层数"></el-input>
      </el-form-item>
      <el-form-item label="室">
        <el-input v-model="record.room" maxlength="1" placeholder="室"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="选取宿舍" name="1">
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
              label="单元"
              prop="building"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="楼层"
              prop="floor"
          >
          </el-table-column>

          <el-table-column
              align="center"
              label="室"
              prop="room"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="价格"
              prop="price"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="最大人数"
              prop="limited"
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
              <el-button key="pass" type="text" @click="handleSuccessClick(scope.row)">
                选宿舍
              </el-button>
            </template>


          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已选宿舍" name="2">
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
              label="单元"
              prop="building"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="楼层"
              prop="floor"
          >
          </el-table-column>

          <el-table-column
              align="center"
              label="室"
              prop="room"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="价格"
              prop="price"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="最大人数"
              prop="limited"
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
              <el-button key="pass" type="text" @click="handleFailClick(scope.row)">
                退宿舍
              </el-button>
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
  name: "StudentDormitory",
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
        building: '',
        floor: '',
        room: ''
      },

      //表格数据
      course: [{
        id: '',
        building: '',
        floor: '',
        room: '',
        price: '',
        limited: '',
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
      this.course = [{
        id: '',
        building: '',
        floor: '',
        room: '',
        price: '',
        limited: '',
        current: '',
      }
      ]
    },
    handleClick() {
      this.resetForm();
      this.selectAll();
    },
    handleSuccessClick(row) {
      this.axios({
        method: "post",
        url: "/student/addDormitory/" + row.id,
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
        url: "/student/deleteDormitory/" + row.id,
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
          url: "/student/dormitory/selectAllByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
          url: "/student/dormitory/selectAlreadyByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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