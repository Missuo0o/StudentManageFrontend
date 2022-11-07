<template>
  <div class="innerbox">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" status-icon>
      <el-form-item label="原密码" prop="oldpass">
        <el-input v-model="ruleForm.oldpass" maxlength="10" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="ruleForm.password" maxlength="10" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" maxlength="10" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {

  name: "UpdatePassword",

  methods: {

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/updatePwd",
            data: this.ruleForm
          }).then(resp => {
            if (resp.data.code == 201) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else if (resp.data.code == 400) {
              this.$message.error(resp.data.msg);
            } else {
              this.$message.error(resp.data.msg);
            }
          })
        } else {
          this.$message.error('请检查格式');
          return false;
        }
      });
    },
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("原密码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: '',
        password: '',
        checkPass: ''
      },
      rules: {
        oldpass: [{validator: validateAccount, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        checkPass: [{validator: validatePass2, trigger: 'blur'}],
      }
    }
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
</style>