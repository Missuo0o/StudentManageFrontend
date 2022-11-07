<template>

  <div>
    <el-form v-if="record.flag=='' || record.flag=='1'" :inline="true" :model="record" class="demo-form-inline">
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
      <el-form-item label="是否在校">
        <el-input v-model="record.inschool" maxlength="4" placeholder="是或否"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="record.flag=='2'" :inline="true" :model="record" class="demo-form-inline">
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
      <el-button type="primary" @click="onSubmit">查询</el-button>

    </el-form>
    <!--  //表格-->
    <el-table v-if="record.flag=='' || record.flag=='1'"
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
    <el-table v-if="record.flag=='2'"
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
          label="手机"
          prop="phone"
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
  name: "StudentHealthRecordTeacher",
  data() {
    return {
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,

      record: {
        username: '',
        name: '',
        inschool: '',
        flag: '',
      },
      options: [{
        value: '1',
        label: '今日已打卡学生'
      }, {
        value: '2',
        label: '今日未打卡学生'
      }],
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
        symptom: '',
        inschool: '',
        createtime: '',
      }
      ]
    },
    //查询分页
    selectAll() {
      if (this.record.flag == '') {
        this.axios({
          method: "post",
          url: "/teacher/health/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
          url: "/teacher/health/selectValidByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
      if (this.record.flag == '2') {
        this.axios({
          method: "post",
          url: "/teacher/health/selectNotValidByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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