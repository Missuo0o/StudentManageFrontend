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
    <!--  //按钮-->
    <el-button type="danger" plain @click="deleteByIds">批量删除</el-button>
    <el-button type="primary" plain @click="handleCreate">新增</el-button>

    <!--  //添加数据对话框-->
    <el-dialog
        title="新增公告"
        :visible.sync="dialogVisible"
        width="30%">

      <el-form ref="addrecord" :model="addrecord" label-width="100px" :rules="rules">
        <el-form-item label="标题" style="width: auto" prop="title">
          <el-input style="width: auto" v-model="addrecord.title" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="内容" style="width: auto" prop="content">
          <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 20}"
              placeholder="请输入内容"
              v-model="addrecord.content">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addRecord('addrecord')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  //更新数据对话框-->
    <el-dialog
        title="更新公告"
        :visible.sync="dialogUpdateVisible"
        width="30%">

      <el-form ref="addrecord" :model="addrecord" label-width="100px" :rules="rules">
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
          <el-button type="primary" @click="updateRecord('addrecord')">提交</el-button>
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!--  //表格-->
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
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
          <el-button @click="handleClick(scope.row)" type="text">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
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
  name: "StudentRecordManage",
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("标题不能为空"));
      } else {
        callback();
      }
    };
    var validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('内容不能为空'))
      } else {
        callback()
      }
    };

    return {
      rules: {
        title: [{validator: validateTitle, trigger: 'blur'}],
        content: [{validator: validateContent, trigger: 'blur'}],
      },
      //被选中复选框的数组
      selectedIds: [],
      // 上传头像地址
      imageUrl: '',
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //添加数据对话框是否展示标记
      dialogVisible: false,
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
      //复选框选中数据集合
      multipleSelection: [],
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
    //更新老师数据
    updateRecord(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "put",
              url: "/admin/record",
              data: this.addrecord,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });

                //关闭弹窗
                this.dialogUpdateVisible = false;

                //重新查询
                this.selectAll();

              } else if (resp.data.code == 400) {
                this.$message.error('更新失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消更新'
            });
          });
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    },
    //弹出编辑窗口
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/admin/record/selectById/" + row.id,
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
    //删除老师
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/admin/record/" + row.id,
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            //重新查询
            this.selectAll();
          } else if (resp.data.code == 400) {
            this.$message.error("数据同步失败,自动刷新");
          } else {
            this.$message.error(resp.data.msg);
          }
        }).finally(() => {
          this.selectAll()
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    //重置表单
    resetForm() {
      this.addrecord = {
        title: '',
        content: ''
      };
    },
    //点击新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
    },
    //查询分页
    selectAll() {

      this.axios({
        method: "post",
        url: "/admin/studentRecord/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
    //批量删除
    deleteByIds() {
      //弹出确定提示框
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let multipleSelectionElement = this.multipleSelection[i];
          this.selectedIds[i] = multipleSelectionElement.id;
        }
        this.axios({
          method: "delete",
          url: "/admin/record/deleteRecords",
          data: this.selectedIds
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            //重新查询
            this.selectAll();
          } else if (resp.data.code == 404) {
            this.$message.error("删除失败");
          } else {
            this.$message.error(resp.data.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //复选框选中执行方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查询方法
    onSubmit() {
      this.selectAll();
    },
    addRecord(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/admin/studentRecord",
              data: this.addrecord,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });

                //关闭弹窗
                this.dialogVisible = false;

                //重新查询
                this.selectAll();

              } else if (resp.data.code == 400) {
                this.$message.error('添加失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>