<template>
  <div class="map">
    <baidu-map v-if="status=='否'" :scroll-wheel-zoom="true" center="上海" class="map">
      <bm-geolocation :autoLocation="true"
                      :showAddressBar="true"
                      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                      @locationSuccess="success">
      </bm-geolocation>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>

    <div class="innerbox">
      <el-result v-if="status=='是'" icon="success" subTitle="您已完成入校登记" title="成功提示">
      </el-result>
    </div>
  </div>
</template>
<script>

export default {
  name: "StudentRegister",
  mounted() {
    this.selectAll();
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
    selectAll() {
      this.axios({
        method: "get",
        url: "/student/register",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.status = resp.data.data;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    success(point) {
      if (point.addressComponent.district == "") {
        this.$message({
          message: '请打开浏览器定位权限以及电脑权限',
          type: 'warning'
        });
      } else {
        this.data.schooladdress = point.addressComponent.city + point.addressComponent.district + point.addressComponent.province + point.addressComponent.street + point.addressComponent.streetNumber
        this.axios({
          method: "post",
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