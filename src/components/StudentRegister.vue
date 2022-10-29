<template>
  <div class="map">
    <baidu-map v-if="status=='否'" class="map" center="上海" :scroll-wheel-zoom="true">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                      :showAddressBar="true"
                      :autoLocation="true"
                      @locationSuccess="success">
      </bm-geolocation>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>

    <div class="innerbox">
      <el-result v-if="status=='是'" icon="success" title="成功提示" subTitle="您已完成入校登记">
      </el-result>
    </div>
  </div>
</template>
<script>

export default {
  name: "StudentRegister",
  mounted() {
    this.axios({
      method: "get",
      url: "/student/register",
    }).then(resp => {
      if (resp.data.code == 200) {
        this.status = resp.data.data;
      } else if (resp.data.code == 404) {
        this.$message.error("连接超时");
      } else {
        this.$message.error(resp.data.msg);
      }
    })
  },
  data() {
    return {
      status: '',
      data: {
        schooladdress: ''
      }
    }
  },
  methods: {
    success(point) {
      if (point.addressComponent.district == "") {
        this.$message({
          message: '请打开浏览器定位权限以及电脑权限',
          type: 'warning'
        });
      } else {
        this.data.schooladdress = point.addressComponent.city + point.addressComponent.district + point.addressComponent.province + point.addressComponent.street + point.addressComponent.streetNumber
        this.axios({
          method: "put",
          url: "/student/register",
          data: this.data
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message.success("登记成功");
          } else if (resp.data.code == 400) {
            this.$message.error("登记失败");
          } else {
            this.$message.error(resp.data.msg);
          }
        })
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
  height: 100%;
  width: 100%;
  margin: 10px 0;
}
</style>