<template>
  <div class="innerbox">
    <el-result v-if="flag==true" icon="success" title="成功提示" subTitle="今日您已完成申报">
    </el-result>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" v-if="flag==false">
      <el-form-item label="账号">
        <el-input style="width: auto" v-model="form.username" maxlength="7" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input style="width: auto" v-model="form.name" maxlength="4" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input style="width: auto" v-model="form.phone" :disabled="true" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="健康状况" prop="symptom">
        <el-select v-model="form.symptom" clearable placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="在校状态" prop="inschool">
        <el-radio-group v-model="form.inschool">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.inschool=='否'" label="当前地址" prop="address">
        <baidu-map class="map" center="上海" :scroll-wheel-zoom="true">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                          :showAddressBar="true"
                          :autoLocation="true"
                          @locationSuccess="success">
          </bm-geolocation>
        </baidu-map>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentHealth",
  data() {
    var validateInschool = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("状态不能为空"));
      } else {
        callback();
      }
    };
    var validateAddress = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("请定位"));
      } else {
        callback();
      }
    };
    var validateSymptom = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("请选择状态"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        inschool: [{validator: validateInschool, trigger: 'blur'}],
        address: [{validator: validateAddress, trigger: 'blur'}],
        symptom: [{validator: validateSymptom, trigger: 'blur'}],

      },
      form: {
        username: '',
        name: '',
        phone: '',
        symptom: '',
        inschool: '',
        address: '',
      },
      options: [{
        value: '绿码',
        label: '绿码'
      }, {
        value: '黄码',
        label: '黄码'
      }, {
        value: '红码',
        label: '红码'
      }],
      flag: ''
    }
  },
  mounted() {
    this.selectTime();
    this.selectAll();
  },
  methods: {
    //查询学生当日是否打卡
    selectTime() {
      this.axios({
        method: "get",
        url: "/student/health",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.flag = resp.data.data;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
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
              url: "/student/health",
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
    success(point) {
      if (point.addressComponent.district == "") {
        this.$message({
          message: '请打开浏览器定位权限以及电脑权限',
          type: 'warning'
        });
      } else {
        this.form.address = point.addressComponent.city + point.addressComponent.district + point.addressComponent.province + point.addressComponent.street + point.addressComponent.streetNumber
      }
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