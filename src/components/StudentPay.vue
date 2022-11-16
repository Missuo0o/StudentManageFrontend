<template>
  <div class="innerbox">
    <el-result v-if="!selected && !paid" icon="error" subTitle="请先选择宿舍" title="警告信息"></el-result>
    <div v-if="selected && !paid">
      <el-descriptions :column="4" border direction="vertical" title="宿舍信息">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            楼栋号
          </template>
          {{ tableData.building }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            层数
          </template>
          {{ tableData.floor }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            室
          </template>
          {{ tableData.room }}
        </el-descriptions-item>
      </el-descriptions>
      <el-dialog
          ref="dia"
          :visible.sync="dialogShow"
          title="付款界面"
          width="15%">
        <div ref="qrCodeUrl" class="qrcode"></div>

      </el-dialog>

      <el-button plain type="primary" @click="showPaymentWindow">前往支付</el-button>

    </div>


    <el-result v-if="selected && paid" icon="success" subTitle="您已完成支付" title="成功提示">
    </el-result>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: "StudentPay",
  data() {
    return {
      timer: 0,
      "url": '',
      "tradeid":'',
      "selected": false,
      "paid": false,
      "dialogShow": false,
      tableData: {
        building: '',
        floor: '',
        room: ''
      }
    }
  },
  methods: {
    async getQrMsg() {
      await this.axios({
        method: "get",
        url: "/student/getPaymentQRCode",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.url = resp.data.data
          this.tradeid=resp.data.msg
        }
      })
    },

    creatQrCode() {
      this.$nextTick(async function () {
        this.$refs.qrCodeUrl.innerHTML = ""
        await this.getQrMsg()
        new QRCode(this.$refs.qrCodeUrl, {
          text: this.url,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      })
    },
    showPaymentWindow() {
      this.dialogShow = true
      this.creatQrCode()
    },
    async checkDomStatus() {
      await this.axios({
        method: "get",
        url: "/student/getDomInfo",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.tableData = resp.data.data;
          this.selected = true
          return true
        }
      })
      return false
    },
    async checkDomPaid() {
      await this.axios({
        method: "get",
        url: "/student/myDormitory",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.paid = true
        }
      })
    },
  },
  mounted() {
    this.checkDomStatus()
    this.checkDomPaid()
    this.timer = setInterval(() => {

      if (this.tradeid != "") {
        this.axios({
          method: "get",
          url: "/student/getPaymentStatus/" + this.tradeid,
        }).then(resp => {
          if (resp.data.code == 200) {
            this.$message.success("支付成功")
            this.dialogShow = false
            this.paid = true
          }
        })
      }
    },3000)
  },
  watch: {
    paid: {
      handler() {
        clearInterval(this.timer)
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