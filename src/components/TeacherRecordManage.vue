<template>
  <div>
    <el-form :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="编号">
        <el-input v-model="record.id" maxlength="7" placeholder="编号"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="record.title" maxlength="4" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="record.adminname" maxlength="4" placeholder="发布人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  //按钮-->
    <el-button plain type="danger" @click="deleteByIds">批量删除</el-button>
    <el-button plain type="primary" @click="handleCreate">新增</el-button>

    <!--  //添加数据对话框-->
    <el-dialog
        :visible.sync="dialogVisible"
        title="新增公告"
        width="30%">

      <el-form ref="addrecord" :model="addrecord" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title" style="width: auto">
          <el-input v-model="addrecord.title" maxlength="20" style="width: auto"></el-input>
        </el-form-item>

        <v-form-render :key="refresh" ref="vFormRef" :form-data="formData" :form-json="formJson"
                       :option-data="optionData">
        </v-form-render>

        <el-form-item>
          <el-button type="primary" @click="addRecord('addrecord')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  //更新数据对话框-->
    <el-dialog
        :visible.sync="dialogUpdateVisible"
        title="更新公告"
        width="30%">

      <el-form ref="addrecord" :model="addrecord" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title" style="width: auto">
          <el-input v-model="addrecord.title" maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <v-form-render :key="Date.now()" ref="vFormRef" :form-data="formData" :form-json="formJson"
                       :option-data="optionData">
        </v-form-render>
        <el-form-item>
          <el-button type="primary" @click="updateRecord('addrecord')">提交</el-button>
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!--  //表格-->
    <el-table
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
          label="标题"
          prop="title"
          width="250">
      </el-table-column>
      <el-table-column
          align="center"
          label="发布人"
          prop="adminname"
          width="120">
      </el-table-column>

      <el-table-column
          align="center"
          label="创建时间"
          prop="createtime"
          width="250">
      </el-table-column>
      <el-table-column
          align="center"
          label="内容"
          prop="content"
      >
        <template slot-scope="scope">
          <p v-html="scope.row.content"></p>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
  name: "TeacherRecordManage",
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
      loading: true,
      refresh: 0,
      formJson: {
        "widgetList": [{
          "type": "rich-editor",
          "icon": "rich-editor-field",
          "formItemFlag": true,
          "options": {
            "name": "content",
            "label": "阿、",
            "placeholder": "",
            "labelWidth": null,
            "labelHidden": true,
            "columnWidth": "200px",
            "disabled": false,
            "hidden": false,
            "required": true,
            "requiredHint": "请填写内容",
            "customRule": "",
            "customRuleHint": "",
            "customClass": [],
            "labelIconClass": null,
            "labelIconPosition": "rear",
            "labelTooltip": null,
            "minLength": null,
            "maxLength": null,
            "showWordLimit": false,
            "onCreated": "",
            "onMounted": "",
            "onValidate": ""
          },
          "id": "richeditor66955"
        }],
        "formConfig": {
          "modelName": "formData",
          "refName": "vForm",
          "rulesName": "rules",
          "labelWidth": 80,
          "labelPosition": "left",
          "size": "",
          "labelAlign": "label-left-align",
          "cssCode": "",
          "customClass": "",
          "functions": "",
          "layoutType": "PC",
          "onFormCreated": "",
          "onFormMounted": "",
          "onFormDataChange": ""
        }
      },
      formData: {},
      optionData: {},
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
      this.$refs.vFormRef.getFormData().then((f) => {
        this.addrecord.content = f.content
      })
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
          this.formData.content = this.addrecord.content;
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
      this.refresh = Date.now()

      this.formData = {}
      this.addrecord = {
        title: '',
        content: ''
      };
    },
    //点击新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
      this.formData.content = '';
    },
    //查询分页
    selectAll() {
      this.loading = true;
      this.axios({
        method: "post",
        url: "/admin/teacherRecord/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
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
      // promise 事件
      this.$refs.vFormRef.getFormData().then((f) => {
        this.addrecord.content = f.content
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/admin/teacherRecord",
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