<template>
  <div class="innerbox">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" >
      <el-form-item label="账号">
        <el-input style="width: auto" v-model="form.username" maxlength="7" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input style="width: auto" v-model="form.name" maxlength="4" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input style="width: auto" v-model="form.phone" :disabled="true" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="outtime">
        <el-date-picker
            v-model="form.outtime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="intime">
        <el-date-picker
            v-model="form.intime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
      </el-form-item>


      <el-form-item label="请假类型" prop="typename">
        <el-radio-group v-model="form.typename">
          <el-radio label="事假"></el-radio>
          <el-radio label="病假"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" style="width: auto" prop="content">
        <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 20}"
            placeholder="请输入内容"
            v-model="form.remark">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentLeave",
  data() {
    var validateOuttime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("开始时间不能为空"));
      } else {
        callback();
      }
    };
    var validateIntime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("结束时间不能为空"));
      } else {
        callback();
      }
    };
    var validateTypename = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("请选择类型"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        outtime: [{validator: validateOuttime, trigger: 'blur'}],
        intime: [{validator: validateIntime, trigger: 'blur'}],
        typename: [{validator: validateTypename, trigger: 'blur'}],

      },
      form: {
        username: '',
        name: '',
        phone: '',
        address: '',
        outtime: '',
        intime:'',
        typename:'',
        remark:'',
      },
    }
  },
  mounted() {
    this.selectAll();
  },
  methods: {

    //查询学生详情
    selectAll() {
      this.axios({
        methods: "get",
        url: "/student/getDetails",

      }).then(resp => {
        if (resp.data.code == 200) {
          this.form.username = resp.data.data.username;
          this.form.name = resp.data.data.name;
          this.form.phone = resp.data.data.phone;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    //提交信息
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/student/leave",
              data: this.form,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.selectTime();
              } else if (resp.data.code == 400) {
                this.$message.error('提交失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
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
  }
}
</script>

<style scoped>
.innerbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
}

.map {
  width: 100%;
  height: 250px;
}
</style>