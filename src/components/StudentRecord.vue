<template>
  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="编号">
        <el-input v-model="record.id" placeholder="编号" maxlength="7"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="record.title" placeholder="标题" maxlength="4"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="record.adminname" placeholder="发布人" maxlength="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!--  //更新数据对话框-->
    <el-dialog
        title="公告详情"
        :visible.sync="dialogUpdateVisible"
        width="30%">

      <el-form ref="addrecord" :model="addrecord" label-width="100px">
        <el-form-item label="标题" style="width: auto" prop="title">
          <el-input style="width: auto" v-model="addrecord.title" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 20}"
              v-model="addrecord.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogUpdateVisible = false">关闭</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
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
          prop="title"
          label="标题"
          align="center"
          width="250">
      </el-table-column>
      <el-table-column
          prop="adminname"
          label="发布人"
          align="center"
          width="120">
      </el-table-column>

      <el-table-column
          prop="createtime"
          label="创建时间"
          align="center"
          width="250">
      </el-table-column>
      <el-table-column
          prop="content"
          label="内容"
          align="center"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">查看详情</el-button>
        </template>
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
  name: "StudentRecord",
  data() {
    return {
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //更新数据对话框是否展示标记
      dialogUpdateVisible: false,
      //学生公告模型数据
      record: {
        id: '',
        title: '',
        adminname: '',
      },
      addrecord: {
        id: '',
        title: '',
        content: ''
      },
      //表格数据
      tableData: [{
        id: '',
        title: '',
        adminname: '',
        createtime: '',
        content: '',
      }
      ]
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {
    //弹出编辑窗口
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/student/record/selectById/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogUpdateVisible = true;
          this.addrecord = resp.data.data;
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


    //重置表单
    resetForm() {
      this.addrecord = {
        title: '',
        content: ''
      };
    },

    //查询分页
    selectAll() {

      this.axios({
        method: "post",
        url: "/student/studentRecord/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
        data: this.record
      }).then(resp => {
        if (resp.data.code == 200) {
          this.tableData = resp.data.data.rows;
          this.totalCount = resp.data.data.totalCount;
        } else if (resp.data.code == 404) {
          this.$message.error("连接超时");
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