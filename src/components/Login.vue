<template>
  <div id="app" style="width: 50%;margin: auto">

    <el-card shadow="always">
      <div slot="header" style="text-align: center">
        <h2>新生入学管理系统</h2>
      </div>

      <el-form ref="formLabelAlign" :model="formLabelAlign" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formLabelAlign.username" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" maxlength="10" type="password"></el-input>
        </el-form-item>

        <br>
        <br>

        <div class="box">
          <el-button icon="el-icon-success" round type="primary" @click="login('formLabelAlign')">登录</el-button>
          <el-button icon="el-icon-question" round type="primary" @click="forget">找回密码
          </el-button>
        </div>
      </el-form>
    </el-card>


  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  methods: {
    forget() {
      this.$router.push('/forget')
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/login",
            data: this.formLabelAlign
          }).then(resp => {
            if (resp.data.code == 200 && resp.data.data.identity == 1) {
              localStorage.setItem("userdata", JSON.stringify(resp.data.data))
              this.$router.push('/studentIndex')

            } else if (resp.data.code == 200 && resp.data.data.identity == 2) {
              localStorage.setItem("userdata", JSON.stringify(resp.data.data))
              this.$router.push('/teacherIndex')

            } else if (resp.data.code == 200 && resp.data.data.identity == 3) {
              localStorage.setItem("userdata", JSON.stringify(resp.data.data))
              this.$router.push('/adminIndex')

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
    {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error("账号不能为空"));
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


      return {
        formLabelAlign: {
          username: '',
          password: '',
        },
        rules: {
          username: [{validator: validateAccount, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
