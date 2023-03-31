<template>
  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">

      <el-form-item label="单元号">
        <el-input v-model="record.building" maxlength="10" placeholder="单元号"></el-input>
      </el-form-item>
      <el-form-item label="层数">
        <el-input v-model="record.floor" maxlength="2" placeholder="层数"></el-input>
      </el-form-item>
      <el-form-item label="室">
        <el-input v-model="record.room" maxlength="2" placeholder="室"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  //按钮-->

    <el-button plain type="danger" @click="deleteByIds">批量删除</el-button>
    <el-button plain type="primary" @click="handleCreate">新增</el-button>
    <el-button plain type="primary" @click="handleDownload">下载模板</el-button>

    <el-upload
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        action="/admin/upload/dormitory">
      <el-button plain type="primary">点击上传</el-button>
    </el-upload>
    <!--  //添加数据对话框-->
    <el-dialog
        :visible.sync="dialogVisible"
        title="新增宿舍"
        width="30%">

      <el-form ref="addcourse" :model="addcourse" :rules="rules" label-width="100px">
        <el-form-item label="单元名" prop="building">
          <el-input v-model="addcourse.building" maxlength="5" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="楼层数" prop="floor">
          <el-input v-model="addcourse.floor" maxlength="2" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="室号" prop="room">
          <el-input v-model="addcourse.room" maxlength="2" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addcourse.price" maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" prop="limited">
          <el-input v-model="addcourse.limited" maxlength="3" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTeacher('addcourse')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  //更新数据对话框-->
    <el-dialog
        :visible.sync="dialogUpdateVisible"
        title="更新宿舍"
        width="30%">

      <el-form ref="addcourse" :model="addcourse" :rules="rules" label-width="100px">
        <el-form-item label="单元名" prop="building">
          <el-input v-model="addcourse.building" maxlength="5" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="楼层数" prop="floor">
          <el-input v-model="addcourse.floor" maxlength="2" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="室号" prop="room">
          <el-input v-model="addcourse.room" maxlength="2" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addcourse.price" maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" prop="limited">
          <el-input v-model="addcourse.limited" maxlength="3" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCourse('addcourse')">提交</el-button>
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--    分配学生穿梭框-->
    <el-dialog

        :visible.sync="dialogStudentVisible"
        title="名下学生"
        width="50%"
    >

      <template>
        <el-transfer
            v-model="value"
            :data="data"
            :titles="['空余学生', '该宿舍学生']"
            filter-placeholder="请输入学生姓名" filterable>
        </el-transfer>
      </template>

      <el-button @click="dialogStudentVisible = false">取消</el-button>
      <el-button type="primary" @click="updateStudent">确定</el-button>
    </el-dialog>

    <!--  //表格-->
    <el-table
        :key="Date.now()"
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
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
          <el-button type="text" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)">学生分配</el-button>
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
  name: "StudentDormitoryManage",
  data() {
    var validateBuilding = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("单元名不能为空"));
      } else {
        callback();
      }
    };
    var validateFloor = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('楼层数不能为空'))
      } else {
        callback()
      }
    };
    var validateRoom = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('室号不能为空'))
      } else {
        callback()
      }
    };
    var validateLimited = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('最大人数不能为空'))
      } else {
        callback()
      }
    };
    var validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('价格不能为空'))
      } else {
        callback()
      }
    };
    return {
      loading: true,
      record: {
        building: '',
        floor: '',
        room: ''
      },
      data: [],
      value: [],
      rules: {
        building: [{validator: validateBuilding, trigger: 'blur'}],
        floor: [{validator: validateFloor, trigger: 'blur'}],
        room: [{validator: validateRoom, trigger: 'blur'}],
        limited: [{validator: validateLimited, trigger: 'blur'}],
        price: [{validator: validatePrice, trigger: 'blur'}],
      },
      //被选中复选框的数组
      selectedIds: [],
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
      //分配学生是否展示标记
      dialogStudentVisible: false,
      //学生模型数据
      teacher: {
        username: '',
        name: '',
      },
      addcourse: {
        building: '',
        floor: '',
        room: '',
        price: '',
        limited: '',
      },
      //复选框选中数据集合
      multipleSelection: [],
      //表格数据
      tableData: [{
        id: '',
        building: '',
        floor: '',
        room: '',
        price: '',
        limited: '',
        current: '',
      }
      ],
      data_update: {
        //左侧数组
        usernameNull: [],
        //右侧数组
        usernameNotNull: [],
        dormitoryid: '',
      }
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {
    handleSuccess(res) {
      if (res.code == 201) {
        this.$message.success("新增成功");
        this.selectAll();
      } else if (res.code == 400) {
        this.$message.error("新增失败");
      } else {
        this.$message.error(res.msg);
      }

    },

    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件`);/**/
    },
    handleDownload() {
      location.href = "http://localhost/admin/download/dormitory"
    },
    //确认更新辅导员名下学生
    updateStudent() {
      this.data_update.usernameNull = []
      this.data_update.usernameNotNull = []
      // 从 value 获取 notNull 的学生信息
      for (let i = 0; i < this.value.length; i++) {
        // value 索引 --> this.data 去要数据
        this.data_update.usernameNotNull[i] = this.data[this.value[i]].username;
      }
      let i = 0;
      Reflect.ownKeys(this.data).forEach((index) => {
        // console.log("index " + index)
        if (this.data_update.usernameNotNull.indexOf(this.data[index].username) == -1 && index != "length" && index != "__ob__") {
          // console.log(i + " notnull " + this.data[index].username + " index " + index)
          this.data_update.usernameNull[i] = this.data[index].username
          i++
        }
      })

      this.$confirm('是否确认更新?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "post",
          url: "/admin/updateDormitoryStudent",
          data: this.data_update,
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });

            //关闭弹窗
            this.dialogStudentVisible = false;

          } else if (resp.data.code == 400) {
            this.$message.error('更新失败');
          } else {
            this.$message.error(resp.data.msg);
          }
        })
      }).finally(() => {
        this.selectAll()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更新'
        });
      });
    },
    //弹出分配学生窗口
    handleUpdate(row) {
      this.data_update.dormitoryid = row.id;
      this.data = [];
      this.value = [];

      this.axios({
        method: "get",
        url: "/admin/selectDormitoryStudent/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200) {
          this.dialogStudentVisible = true;
          // 将数据放入 data
          var nullLength = resp.data.data.null.length
          Reflect.ownKeys(resp.data.data.null).forEach((index) => {
            if (index != "length") {
              this.data.push({
                    key: parseInt(index),
                    label: `${resp.data.data.null[index].username} ${resp.data.data.null[index].name}`,
                    username: `${resp.data.data.null[index].username}`,
                  },
              )

            }
          })
          Reflect.ownKeys(resp.data.data.notNull).forEach((index) => {
            if (index != "length") {
              this.data.push({
                    key: nullLength + parseInt(index),
                    label: `${resp.data.data.notNull[index].username} ${resp.data.data.notNull[index].name}`,
                    username: `${resp.data.data.notNull[index].username}`,
                  },
              )
              // console.log(nullLength + parseInt(index))
              this.value.push(nullLength + parseInt(index))
            }
          })
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
    //更新课程数据
    updateCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "put",
              url: "/admin/dormitory",
              data: this.addcourse,
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
        url: "/admin/dormitory/" + row.id,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogUpdateVisible = true;
          this.addcourse = resp.data.data;

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


    //删除课程
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/admin/dormitory/" + row.id,
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
      this.addcourse = {
        building: '',
        floor: '',
        room: '',
        price: '',
        limited: '',
      };
    },
    //点击新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
    },
    //查询分页
    selectAll() {
      this.loading = true;
      this.axios({
        method: "post",
        url: "/admin/dormitory/selectAllByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
        data: this.record
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
          url: "/admin/dormitory/deleteDormitory",
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
    addTeacher(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/admin/dormitory",
              data: this.addcourse,
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