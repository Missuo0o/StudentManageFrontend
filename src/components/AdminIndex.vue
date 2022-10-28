<template>
  <el-container style="height: 705px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

      <el-menu
          router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user-solid"></i>入学管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">分配宿舍</el-menu-item>
            <el-menu-item index="1-2">分配课程</el-menu-item>
            <el-menu-item index="1-3">学生缴费</el-menu-item>
            <el-menu-item index="1-3">学生返校</el-menu-item>

          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-user"></i>人员管理</template>
          <el-menu-item-group>
            <el-menu-item index="/AdminIndex/StudentInformationManage">学生管理</el-menu-item>
            <el-menu-item index="/AdminIndex/TeacherInformationManage">辅导员管理</el-menu-item>
            <el-menu-item index="/AdminIndex/AdminInformationManage">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-info"></i>公告管理</template>
          <el-menu-item-group>
            <el-menu-item index="/AdminIndex/StudentRecordManage">学生公告</el-menu-item>
            <el-menu-item index="/AdminIndex/TeacherRecordManage">辅导员公告</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-s-home"></i>请假系统</template>
          <el-menu-item-group>
            <el-menu-item index="4-1">学生请假</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><i class="el-icon-s-opportunity"></i>健康系统</template>
          <el-menu-item-group>
            <el-menu-item index="5-1">学生申报记录</el-menu-item>
            <el-menu-item index="5-1">老师申报记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="6">
          <template slot="title"><i class="el-icon-s-tools"></i>设置</template>
          <el-menu-item-group>
            <el-menu-item index="/AdminIndex/UpdatePassword">修改密码</el-menu-item>
            <el-menu-item index="/AdminIndex/MyInformation">修改信息</el-menu-item>
            <el-menu-item index="6-3" @click="logout"> 退出登录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            <el-dropdown-item @click.native="updateprofile">修改头像</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ name.name }}</span>
      </el-header>

      <el-dialog
          title="请上传图像"
          :visible.sync="dialogVisible"
          width="17%"
      >
        <el-upload
            class="avatar-uploader"
            action="/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-dialog>
      <router-view>
        <el-main>

        </el-main>
      </router-view>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "AdminIndex",
  mounted() {

    this.$message({
      message: '管理员登录成功',
      type: 'success'
    });
    this.name = JSON.parse(localStorage.getItem('userdata'))
  },
  data() {
    return {
      name: '',
      dialogVisible: false,
      imageUrl: ''
    }
  },
  methods: {
    updateprofile() {
      this.dialogVisible = true;
      this.imageUrl = ''
    },
    logout() {
      this.axios({
        method: "get",
        url: "/logout",
        // eslint-disable-next-line no-unused-vars
      }).then(resp => {
        this.$router.push('/')
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 201) {

        this.$message({
          message: '头像修改成功',
          type: 'success'
        });

      } else if (res.code == 400) {
        this.$message.error("头像修改失败");
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleAvatarError() {
      this.$message.error('头像修改失败');
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

  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>