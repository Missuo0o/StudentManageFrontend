<template>
  <div class="innerbox">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <span class="demonstration"></span>
          <el-image
              style="width: 100px; height: 100px"
              :src="form.profile"
              :fit="fit"></el-image>
        </div>
      </div>
      <el-form-item label="账号">
        <el-input style="width: auto" v-model="form.username" maxlength="7" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input style="width: auto" v-model="form.name" maxlength="4" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" value="男">男</el-radio>
          <el-radio label="女" value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input style="width: auto" v-model="form.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input style="width: auto" v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherInformation",
  data() {
    return {
      form: {
        username: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        profile: '',

      },
      fits: ['fill'],
    }
  },
  mounted() {
    this.selectAll();
  },
  methods: {

    //查询老师详情
    selectAll() {
      this.axios({
        methods: "get",
        url: "/teacher/getDetails",

      }).then(resp => {
        if (resp.data.code == 200) {
          this.form = resp.data.data;
        } else if (resp.data.code == 404) {
          this.$message.error("连接超时");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    //修改老师详情
    onSubmit() {
      this.$confirm('是否确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "put",
          url: "/teacher/updateDetails",
          data: this.form,
        }).then(resp => {
          if (resp.data.code == 201) {
            this.selectAll();
            this.$message({
              message: '修改成功',
              type: 'success'
            });
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
</style>