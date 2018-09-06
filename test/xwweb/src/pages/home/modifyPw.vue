<template>
  <div>
      <div id="modifyPw"> 
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left pull-left" style='width:2.4rem'></a>
				<h1 class="title">找回登录密码</h1>
			</header>
			<div class="content">
				<form action="#" method="post" class="list-block">
				    <ul>
				      <li>
				        <div class="item-content">
				          <div class="item-inner">
				            <div class="item-title label">手机号码</div>
				            <div class="item-input">
				              <input type="tel" v-model='phone' placeholder="请输入注册手机号" >
				            </div>
				          </div>
				        </div>
				      </li>
				      <li>
				        <div class="item-content">
				          <div class="item-inner">
				            <div class="item-title label">设置密码</div>
				            <div class="item-input">
				              <input type="password" v-model='loginpass' placeholder="请设置新登录密码" >
				            </div>
				          </div>
				        </div>
				      </li>
				      <li>
				        <div class="item-content">
				          <div class="item-inner">
				            <div class="item-title label">确认密码</div>
				            <div class="item-input">
				              <input type="password" v-model='loginpassSure' placeholder="再次输入新登录密码" >
				            </div>
				          </div>
				        </div>
				      </li>
				      <li>
				        <div class="item-content">
				          <div class="item-inner">
				            <div class="item-title label vcodeT">验证码</div>
				            <div class="item-input vcodeI">
				              <input type="text" v-model='phoneCode' placeholder="请输入验证码">
				            </div>
				            <!-- <div class="gainT">获取验证码</div> -->
										<div @click="gainVcode" class="gainT gainVcode">获取验证码</div>
										<div v-model="codeTime" class=" gainVcodes" style='display:none;font-size: .75rem'>重新获取{{codeTime}}S</div>
				          </div>
				        </div>
				      </li>
				    </ul>
				    <div class="content-block"><a href="#" class="button button-big button-fill" @click.prevent='forgetLoginpass'>确认</a></div>
				</form>
			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import _reg from "@/assets/js/Regular";
export default {
  name: "app",
  data() {
    return {
      phone: "", //手机号
      phoneCode: "", //短信验证码
      loginpass: "", //新密码
      loginpassSure: "", //确认密码
      codeTime: "60",
      code: "" //phoneCode
    };
  },
  methods: {
    routerback() {
      this.$router.push("/settings");
    },
    forgetLoginpass() {
      //修改登入密码
      if (_reg.regPw(this.loginpass)) {
        if (this.loginpass == this.loginpassSure) {
          if (this.code == this.phoneCode) {
            let dataObj = {
                phone: this.phone,
                phoneCode: this.phoneCode,
                loginpass: this.loginpass,
                loginpassSure: this.loginpassSure
              },
              path = _path.getApiUrl("forgetLoginpass");
            this.$axios
              .post(path, _path.postObj(dataObj), {
                emulateJSON: true,
                withCredentials: true
              })
              .then(res => {
                if (res.status == 200) {
                  if (res.data.status == "000000") {
                    $.alert(
                      "登入密码修改"+res.data.msg,
                      function() {
                        this.$router.push("/login");
                      }.bind(this)
                    );
                  }else{
                  	_path.dealStatusCode(res.data.status,res.data.msg,this)
                  }
                }
              });
          } else {
            $.alert("验证码错误");
          }
        } else {
          $.alert("两次密码不一致，请重新输入");
        }
      }
    },
    gainVcode() {
      //获取验证码
      let obj = { msgType: "forget", phone: this.phone },
        path = _path.getApiUrl("sms");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              $.alert("验证码获取"+res.data.msg);
              this.code = res.data.data.code;
            }else{
            	_path.dealStatusCode(res.data.status,res.data.msg,this)
            }
          }
        });
      $(".gainVcode").css("display", "none");
      $(".gainVcodes").css("display", "block");
      this.gainV();
    },
    gainV() {
      var setInt = setInterval(() => {
        if (this.codeTime == 0) {
          clearInterval(setInt);
          $(".gainVcode").css("display", "block");
          $(".gainVcodes").css("display", "none");
          return (this.codeTime = 60);
        }
        this.codeTime--;
      }, 1000);
    }
  }
};
</script>
<style>
@import "../../../static/css/index/modifyPw.css";
</style>
