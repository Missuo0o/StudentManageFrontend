<template>
  <div id="app" style="width: 50%;margin: auto">

    <el-card shadow="always">
      <div slot="header" style="text-align: center">
        <h2>忘记密码</h2>
      </div>

      <el-form :label-position="labelPosition" ref="formLabelAlign" label-width="80px" :model="formLabelAlign"
               :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formLabelAlign.username" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formLabelAlign.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="formLabelAlign.code" maxlength="6"></el-input>
        </el-form-item>

        <br>
        <br>

        <div class="box">
          <el-button icon="el-icon-back" type="primary" round @click="back">返回</el-button>
          <el-button icon="el-icon-key" type="primary" round @click="forget('formLabelAlign')">找回</el-button>
          <el-button icon="el-icon-phone" type="primary" round @click="sendcode">发送验证码</el-button>
        </div>
      </el-form>
    </el-card>


  </div>
</template>

<script>
export default {
  name: "FogetPassword",

  methods: {
    back() {
      this.$router.push('/')
    },
    sendcode() {
      this.axios({
        method: "post",
        url: "/sms/sendcode",
        data: this.formLabelAlign,
      }).then(resp => {
        if (resp.data.code == 201) {
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          });
        } else if (resp.data.code == 400) {
          this.$message({
            message: '验证码发送失败',
            type: 'warning'
          });
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    forget(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/sms/checkcode",
            data: this.formLabelAlign,
          }).then(resp => {
            if (resp.data.code == 200) {
              this.$message({
                message: '您的密码是' + resp.data.data.password,
                type: 'success'
              });
            } else if (resp.data.code == 404) {
              this.$message({
                message: resp.data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(resp.data.msg);
            }
          })
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    }
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    };


    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        phone: '',
        code: '',

      },
      rules: {
        username: [{validator: validateAccount, trigger: 'blur'}],
        phone: [{validator: validatePass, trigger: 'blur'}],
        code: [{validator: validatePass1, trigger: 'blur'}],
      }
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  height: 95%;
}
</style>