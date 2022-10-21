<template>
  <div>
  <el-form :inline="true" :model="student" class="demo-form-inline">
      <el-form-item label="学号">
          <el-input v-model="student.username" placeholder="学号" maxlength="7"></el-input>
        </el-form-item>
      <el-form-item label="姓名">
          <el-input v-model="student.name" placeholder="姓名" maxlength="4"></el-input>
        </el-form-item>
      <el-form-item label="性别">
          <el-input v-model="student.sex" placeholder="男或女" maxlength="4"></el-input>
        </el-form-item>
      <el-form-item label="是否返校">
          <el-input v-model="student.status" placeholder="是或否" maxlength="4"></el-input>
        </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
<!--  按钮-->
    <el-button type="danger" plain @click="deleteByIds" >批量删除</el-button>
    <el-button type="primary" plain @click="handleCreate">新增</el-button>
<!--  //添加数据对话框-->
  <el-dialog
    title="新增学生"
    :visible.sync="dialogVisible"
    width="30%">

  <el-form ref="addstudent" :model="addstudent" label-width="100px" :rules="rules">
      <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="/admin/student/uploadProfile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      v-model="addstudent.profile">

        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        </el-form-item>
      <el-form-item label="学号" prop="username">
          <el-input style="width: auto" v-model="addstudent.username" maxlength="7"></el-input>
        </el-form-item>
      <el-form-item label="姓名" prop="name">
          <el-input style="width: auto"  v-model="addstudent.name" maxlength="4" ></el-input>
        </el-form-item>
      <el-form-item label="在校状态" prop="status">
          <el-radio-group v-model="addstudent.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addstudent.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item label="学院">
           <el-input style="width: auto" v-model="addstudent.college" maxlength="10"  ></el-input>
        </el-form-item>
      <el-form-item label="专业">
           <el-input style="width: auto" v-model="addstudent.major" maxlength="10" ></el-input>
        </el-form-item>
      <el-form-item label="班级">
           <el-input style="width: auto" v-model="addstudent.classname" maxlength="10" ></el-input>
        </el-form-item>
      <el-form-item label="手机">
           <el-input style="width: auto" v-model="addstudent.phone" maxlength="11"></el-input>
        </el-form-item>
      <el-form-item label="家庭地址">
           <el-input style="width: auto" v-model="addstudent.address"></el-input>
        </el-form-item>
     <el-form-item>
          <el-button type="primary" @click="addStudent('addstudent')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

<!--  //更新数据对话框-->
  <el-dialog
    title="更新学生"
    :visible.sync="dialogUpdateVisible"
    width="30%">

  <el-form ref="addstudent" :model="addstudent" label-width="100px" rules="rules">
      <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="/admin/student/uploadProfile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      v-model="addstudent.profile">

        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        </el-form-item>
      <el-form-item label="账号" prop="username">
          <el-input style="width: auto" v-model="addstudent.username" maxlength="7"></el-input>
        </el-form-item>
      <el-form-item label="姓名" prop="name">
          <el-input style="width: auto"  v-model="addstudent.name" maxlength="4" ></el-input>
        </el-form-item>
      <el-form-item label="在校状态" prop="status">
          <el-radio-group v-model="addstudent.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addstudent.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item label="学院">
           <el-input style="width: auto" v-model="addstudent.college" maxlength="10"  ></el-input>
        </el-form-item>
      <el-form-item label="专业">
           <el-input style="width: auto" v-model="addstudent.major" maxlength="10" ></el-input>
        </el-form-item>
      <el-form-item label="班级">
           <el-input style="width: auto" v-model="addstudent.classname" maxlength="10" ></el-input>
        </el-form-item>
      <el-form-item label="手机">
           <el-input style="width: auto" v-model="addstudent.phone" maxlength="11"></el-input>
        </el-form-item>
      <el-form-item label="家庭地址">
           <el-input style="width: auto" v-model="addstudent.address"></el-input>
        </el-form-item>
     <el-form-item>
          <el-button type="primary" @click="updateStudent('addstudent')">提交</el-button>
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
        prop="username"
        label="学号"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="profile"
        label="头像"
        align="center"
        >
  <template slot-scope="scope">
    <img :src="scope.row.profile" width="55" height="55"/></template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否在校"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="college"
        label="学院"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="classname"
        label="班级"
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
        prop="address"
        label="地址"
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
            <el-button  @click="handleDelete(scope.row)" type="text" >删除</el-button>
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
  name: "StudentInformationManage",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("学号不能为空"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    };
    var validateStatus = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("状态不能为空"));
      } else {
        callback();
      }
    };
    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓别不能为空'))
      } else {
        callback()
      }
    };

    return {
      rules: {
        username: [{validator: validateUsername, trigger: 'blur'}],
        name: [{validator: validateName, trigger: 'blur'}],
        status: [{validator: validateStatus, trigger: 'blur'}],
        sex: [{validator: validateSex, trigger: 'blur'}],
      },
      //被选中复选框的数组
      selectedIds: [],
      // 上传头像地址
      imageUrl: '',
      //总记录数
      totalCount: '',
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //添加数据对话框是否展示标记
      dialogVisible: false,
      //更新数据对话框是否展示标记
      dialogUpdateVisible: false,
      //学生模型数据
      student: {
        username: '',
        name: '',
        sex: '',
        status: '',
      },
      addstudent: {
        username: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        classname: '',
        phone: '',
        address: '',
        profile: '',
        status: '',
        oldusername: '',
      },
      //复选框选中数据集合
      multipleSelection: [],
      //表格数据
      tableData: [{
        username: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        classname: '',
        phone: '',
        address: '',
        profile: '',
        status: ''
      }
      ]
    }
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    //更新学生数据
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
          url: "/admin/student",
          data: this.addstudent,
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
    }else {
              this.$message({
                message: '请检查格式',
                type: 'warning'
              });
            }
            });
    }
  },
    //弹出编辑窗口
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/admin/student/selectByUsername/" + row.username,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogUpdateVisible = true;
          this.addstudent = resp.data.data;
          //若改用户名 将原用户名保存到oldusername中,sql where使用这个username
          this.addstudent.oldusername = resp.data.data.username;
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
    //删除学生
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/admin/student/" + row.username,
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
      this.addstudent = {};
    },
    //点击新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
      this.imageUrl = '';
    },
    //查询分页
    selectAll() {
      this.axios({
        method: "post",
        url: "/admin/student/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
        data: this.student
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
    //头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 201) {

        this.addstudent.profile = res.data;
      } else {
        this.$message.error(res.data.msg);
      }

    },
    handleAvatarError() {
      this.$message.error('连接超时');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
          this.selectedIds[i] = multipleSelectionElement.username;
        }
        this.axios({
          method: "delete",
          url: "/admin/student/deleteStudents",
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
          url: "/admin/student",
          data: this.addstudent,
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
    }else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    }
}
</script>

<style scoped>

</style>