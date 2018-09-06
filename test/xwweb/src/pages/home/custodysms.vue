<template>
	<div ref="input">
		<span @click="countdown" v-if="codeshow" class="info">
			{{msginfo}}
		</span>
		<span v-else class="codeinfo">
			{{codeTime+'s后重发'}}
		</span>
	</div>
</template>
<script>
// import $ from "jquery";
import _path from "@/assets/js/md5";
import _reg from "@/assets/js/Regular";

export default {
  name,
  data() {
    return {
      msginfo: "获取验证码",
      codeTime: 60, //倒计时
      codeshow: true,
      code: "",
      // ,cardNo:''//银行卡绑定时必填
      authCode: "" //授权码
      // ,getphones:''
    };
  },
  methods: {
    countdown() {
      this.codeshow = !this.codeshow;
      this.gainVcode(this.type);
      this.gainVcodes();
    },
    gainVcode(ty) {
      //获取验证码
      let obj = {};
      if (ty == "cardBindPlus") {
        if (_reg.regBank(this.cardNo)) {
          obj = { type: this.type, cardNo: this.cardNo };
        } else {
          this.codeshow = true;
          return false;
        }
      } else {
        obj = { type: this.type };
      }
      let path = _path.getApiUrl("custodysms");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              //   $.alert("验证码获取" + res.data.msg);
              this.authCode = data.data.authCode;
              this.$emit("authCode", this.authCode);
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    gainVcodes() {
      var setInt = setInterval(() => {
        if (this.codeTime == 0) {
          clearInterval(setInt);
          this.codeshow = !this.codeshow;
          this.codeTime = 60;
        }
        this.codeTime--;
      }, 1000);
    },
    getphone() {
      let path = _path.getApiUrl("getUserInfo");
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              let phone = data.data.phone;
              // this.$set(this,'phone',data.data.phone)
              this.gainVcode(phone);
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    }
  },
  mounted() {
    // console.log(this.msgType)
    if (!!this.border_l) {
      this.$refs.input.style.borderLeft = "1px solid " + this.border_l;
    }

    let span1 = document.querySelector(".info");
    let span2 = document.querySelector(".codeinfo");
    if (!!this.color) {
      // this.$refs.input.style.borderLeft='1px solid '+this.border_l
      span1.style.color = this.color;
      span1.style.padding = 0;
    } else {
      span1.style.color = "#3096FD";
      span1.style.padding = 0;
      span2.style.color = "gray";
    }
  },
  props: ["type", "cardNo", "border_l", "color"]
};
</script>
<style scoped>
div {
  display: inline-block;
}
.info {
  /* color: #3096FD; */
  cursor: pointer;
}
.codeinfo {
  /* color:gray; */
  cursor: pointer;
}
span {
  font-size: 0.75rem;
  /* border-left: 1px solid #8B8B8B; */
  padding-left: 0.5rem;
  text-align: center;
  display: inline-block;
  width: 5rem;
}
</style>