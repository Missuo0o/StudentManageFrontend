<template>
  <div class="innerbox">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div class="demo-image">
        <div v-for="fit in fits" :key="fit" class="block">
          <span class="demonstration"></span>
          <el-image
              :fit="fit"
              :src="form.profile"
              style="width: 100px; height: 100px"></el-image>
        </div>
      </div>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" maxlength="7" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" maxlength="4" style="width: auto"></el-input>
      </el-form-item>
      
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" maxlength="11" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input v-model="form.address" style="width: auto"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminInformation",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("账号不能为空"));
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
        sex: [{validator: validateSex, trigger: 'blur'}],
        phone: [{validator: validatePhone, trigger: 'blur'}],
      },
      form: {
        username: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        profile: '',
        oldusername: '',
      },
      fits: ['fill'],
    }
  },
  mounted() {
    this.selectAll();
    this.$bus.$on('changeProfile1', (args) => {
      this.form.profile = args;
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeProfile1');
  },
  methods: {
    //查询管理员详情
    selectAll() {
      this.axios({
        methods: "get",
        url: "/admin/getDetails",

      }).then(resp => {
        if (resp.data.code == 200) {
          this.form = resp.data.data;
          this.form.oldusername = resp.data.data.username;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    //修改管理员详情
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "put",
              url: "/admin/updateDetails",
              data: this.form,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.selectAll();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });

                let parse = JSON.parse(localStorage.getItem('userdata'));
                parse.name = this.form.name;
                this.$bus.$emit('changeUserName', parse.name)

                localStorage.setItem("userdata", JSON.stringify(parse));

              } else if (resp.data.code == 400) {
                this.$message.error('修改失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });
          });
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      })
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