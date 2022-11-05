<template>

  <div>
    <el-form v-if="record.flag=='' || record.flag=='1'" :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="筛选">
        <el-select @change="change" v-model="record.flag" clearable placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教工号">
        <el-input v-model="record.username" placeholder="教工号" maxlength="7"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="record.name" placeholder="姓名" maxlength="4"></el-input>
      </el-form-item>
      <el-form-item label="是否在校">
        <el-input v-model="record.inschool" placeholder="是或否" maxlength="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="record.flag=='2'" :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="筛选">
        <el-select v-model="record.flag" @change="change" clearable placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教工号">
        <el-input v-model="record.username" placeholder="教工号" maxlength="7"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="record.name" placeholder="姓名" maxlength="4"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>

    </el-form>
    <!--  //表格-->
    <el-button type="primary" plain @click="handleCreate">新增</el-button>
    <el-button type="danger" plain @click="deleteByIds">批量删除</el-button>
    <el-table v-if="record.flag=='' || record.flag=='1'"
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
             >
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
          prop="username"
          label="教工号"
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

    <el-table v-if="record.flag==='2'"
              :data="tableData"
              border
              style="width: 100%"
              key="table1">

      <el-table-column
          prop="username"
          label="教工号"
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

    </el-table>

    <el-dialog
        title="更新申报记录"
        :visible.sync="dialogUpdateVisible"
        width="30%">

      <el-form ref="table" :model="table" label-width="100px" :rules="rules">

        <el-form-item label="教工号">
          <el-input style="width: auto" v-model="table.username" maxlength="7" prop="username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style="width: auto" v-model="table.name" maxlength="4"  prop="name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input style="width: auto" v-model="table.phone" maxlength="11"  prop="phone"></el-input>
        </el-form-item>
        <el-form-item label="健康状况" prop="symptom">
        <el-select v-model="table.symptom" clearable placeholder="请选择">
          <el-option
              v-for="item in healthoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="是否在校" prop="inschool">
          <el-radio-group v-model="table.inschool">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="table.inschool=='否'" label="申报地址" prop="address">
          <el-input style="width: auto" v-model="table.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateStudent('table')">提交</el-button>
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--    添加数据对话框-->
    <el-dialog
        title="新增申报记录"
        :visible.sync="dialogVisible"
        width="30%">

      <el-form ref="table" :model="table" label-width="100px" :rules="rules">

        <el-form-item label="教工号" prop="username">
          <el-input style="width: auto" v-model="table.username" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="健康状况" prop="symptom">
          <el-select v-model="table.symptom" clearable placeholder="请选择">
            <el-option
                v-for="item in healthoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在校" prop="inschool">
          <el-radio-group v-model="table.inschool">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="table.inschool=='否'" label="申报地址" prop="address">
          <el-input style="width: auto" v-model="table.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addStudent('table')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  name: "TeacherHealthRecordManage",
  data() {
    var validateInschool = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("状态不能为空"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("学号不能为空"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("手机不能为空"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var validateSymptom = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("健康状态不能为空"));
      } else {
        callback();
      }
    };
    return {
      healthoptions: [{
        value: '绿码',
        label: '绿码'
      }, {
        value: '黄码',
        label: '黄码'
      }, {
        value: '红码',
        label: '红码'
      }],
      multipleSelection:[],
      dialogVisible: false,
      dialogUpdateVisible: false,
      rules: {
        inschool: [{validator: validateInschool, trigger: 'blur'}],
        username: [{validator: validateUsername, trigger: 'blur'}],
        phone: [{validator: validatePhone, trigger: 'blur'}],
        name: [{validator: validateName, trigger: 'blur'}],
        symptom: [{validator: validateSymptom, trigger: 'blur'}],
      },
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
        symptom: '',
        inschool: '',
        address: '',
      },
      record: {
        username: '',
        name: '',
        inschool: '',
        flag: '',
      },
      options: [{
        value: '1',
        label: '今日已打卡老师'
      }, {
        value: '2',
        label: '今日未打卡老师'
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
      ],
      //被选中复选框的数组
      selectedIds: [],
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {
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
          url: "/admin/delete",
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
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();

    },
    resetForm() {
      this.table = {
        id: '',
        username: '',
        name: '',
        phone: '',
        symptom: '',
        inschool: '',
        address: '',
      }
    },
    addStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/admin/addTeacherHealth",
              data: this.table,
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
    },
    updateStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$confirm('是否确认更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "put",
              url: "/admin/health",
              data: this.table,
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
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/admin/health/" + row.id,
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
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/admin/health/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogUpdateVisible = true;
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
          url: "/admin/health/selectAllTeacherByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
          url: "/admin/health/selectAllTeacherValidByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
          url: "/admin/health/selectNotAllTeacherValidByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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