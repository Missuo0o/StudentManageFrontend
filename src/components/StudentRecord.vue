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

    <!--  //更新数据对话框-->
    <el-dialog
        :visible.sync="dialogUpdateVisible"
        title="公告详情"
        width="30%"
    >

      <el-form ref="addrecord" :model="addrecord" label-width="100px">
        <el-form-item label="标题" prop="title" style="width: auto">
          <el-input v-model="addrecord.title" disabled maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <v-form-render :key="Date.now()" ref="vFormRef" :form-data="formData" :form-json="formJson"
                       :option-data="optionData">
        </v-form-render>
        <el-form-item>
          <el-button @click="dialogUpdateVisible = false">关闭</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!--  //表格-->
    <el-table
        v-loading="loading"
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
  </div>
</template>

<script>
export default {
  name: "StudentRecord",
  data() {
    return {
      loading: true,
      formJson: {
        "widgetList": [{
          "type": "rich-editor",
          "icon": "rich-editor-field",
          "formItemFlag": true,
          "options": {
            "name": "content",
            "label": "",
            "placeholder": "",
            "labelWidth": null,
            "labelHidden": false,
            "columnWidth": "200px",
            "disabled": true,
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


    //查询分页
    selectAll() {
      this.loading = true,
          this.axios({
            method: "post",
            url: "/student/studentRecord/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
            data: this.record
          }).then(resp => {
            if (resp.data.code == 200) {
              this.tableData = resp.data.data.rows;
              this.totalCount = resp.data.data.totalCount;
              this.formData.content = this.addrecord.content;
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

    //查询方法
    onSubmit() {
      this.selectAll();
    },
  }
}
</script>

<style scoped>

</style>