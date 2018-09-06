<template>
  <div> 
	<div id="login">
		<div class="content">
			<div class="screenTip" v-if="screenTipFee">
				<div class="til"></div>
				<div class="st1">
					<div>江西银行</div>
					<div>缴费授权</div>
				</div>
				<div class="st2">
					<button @click="feeauth">立即授权</button>
				</div>
			</div>
			<div class="screenTip" v-if="screenTipRepay">
				<div class="til"></div>
				<div class="st1">
					<div>江西银行</div>
					<div>还款授权</div>
				</div>
				<div class="st2">
					<button @click="repayauth">立即授权</button>
				</div>
			</div>
			<div class="screen" v-if="screen"></div>
      <template v-if="screen==false">
        <div @click.prevent="routerback"  class="del"></div>
        <div class="login-title">登录小微时贷</div>
        <div class="login-main">
          <form action="#" method="post">
            <div class="username underline">
              <div class="icon"></div>
              <input v-model='username' type="text" name="username" placeholder="请输入手机号码"/>
            </div>
            <div class="password underline">
              <div class="icon"></div>
              <input v-model='password' type="password" name="password" placeholder="请输入登录密码" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/>
            </div>
            <div class="vcode underline">
              <div class="icon"></div>
              <input v-model='vcode' type="text" name="vcode" placeholder="验证码"/>
              <!-- <Verificationcode :phone="username" @code="codes" msgType="login" border_l="#8B8B8B"></Verificationcode> -->
              <!-- <a class="vcodeBor"><img id="captcha-img" src="https://user.xwsd.com/common/captcha" @click="changVcode($event)"></a> -->
              <a class="vcodeBor"><img id="captcha-img" :src="captcha" @click="changVcode($event)" alt="验证码"></a>
            </div>
            <div>
              <!-- <a href="#" class="button button-big button-fill login-btn">登录</a> -->
              <div @click='getData' class="button button-big button-fill login-btn">登录</div>
            </div>
            <div class="rft">
              <router-link to='modifyPw' class="reg">忘记密码?</router-link>
            </div>

            <div class="rf">
              <router-link to='register' class="reg">投资注册</router-link>
              <router-link to='registerBorrowing' class="reg">借款注册</router-link>
              <!-- 2018 4 8 移除忘记密码 -->
            </div>
          </form>
        </div>
      </template>
		</div>
	</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import Verificationcode from "@/pages/home/Verificationcode";
import bus from "@/bus";
export default {
  name,
  data() {
    return {
      username: "", //用户名
      phone: "手机号", //手机号
      password: "", //密码
      userId: "", //
      vcode: "", //验证码
      code: "", //得到的验证码
      custodyId: "", //存管账号
      custodyPwd:"",//存管密码
      screenTipFee: false, //缴费
      screenTipRepay: false, //还款
      screen: false,
      authList: "" //授权列表
      ,identity:""//身份
      ,captcha:"#"
    };
  },
  methods: {
    routerback() {
      this.$router.push("/");
    },
    changVcode(event) {
      // event.currentTarget.src += "?" + Math.random();
      this.captcha =process.env.LOGIN_URL+ "?" + Math.random();
    },
    getData() {
      // if(!!this.code&&this.code==this.vcode){}else{$.alert('验证码错误')}
      //smsCode:短语验证码参数名 captcha:图形验证码参数名
      let obj = {
          password: this.password,
          username: this.username,
          captcha: this.vcode
        },
        path = _path.getApiUrl("login");

      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              let data = res.data.data;
              //债权转让页面
               window.sessionStorage.setItem('phone',data.phone)
              //  window.sessionStorage.setItem('name',data.name)
              //  window.sessionStorage.setItem('fundMoney',data.fundMoney)
              //  window.sessionStorage.setItem('custodyId',data.custodyId)
              // let phone = data.phone.substr(-8)
              // console.log(phone)
              // let getphone = this.getCookie(phone)
              // if(!!getphone&&getphone==phone){
              // console.log('登入过')
              $.alert(
                "登录成功",
                function() {
                  this.getUserInfo();
                }.bind(this)
              );
              // }else{
              // 	// console.log('没登入')
              // 	$.alert("登录成功",function(){
              // 		this.setCookie("vote_phone",phone)
              // 		this.$router.push({name:'vote0',params:{path:'wap'}})
              // 	}.bind(this))
              // }
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          } else {
            $.alert(res.data.msg);
          }
        });
    },
    getUserInfo() {
      //获取用户信息
      let path = _path.getApiUrl("getUserInfo");
      this.$axios
        .post(path, undefined, { emulateJSON: true, withCredentials: true })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              let r = res.data.data;
              this.custodyId = r.custodyId;
              this.custodyPwd = r.custodyPwd;//存管密码
              this.authList = r.authList; //授权列表
              this.identity = r.identity//身份
              //screenTip screen
              // if(this.custodyPwd=="1"){
                if (this.custodyId.length != 0) {
                  //this.$router.push('/')
                  let go = this.$route.params.go;
                  // console.log(go)
                  if (!!go) {
                    this.$router.go(-1);
                  } else {
                    if(this.custodyPwd=="1"){
                      let num = Math.ceil(this.authList.length / 2);
                      let ary = [];
                      for (let i = 0; i < num; i++) {
                        ary.push(this.authList.split("|")[i]);
                      }
                      if (this.isInArray("fee", ary)) {
                        // 缴费授权
                        if(this.identity!=1){
                          if (this.isInArray("repay", ary)){

                          }else{
                            this.screenTipRepay = true;
                            this.screen = true;
                          }
                        }else{
                          // 还款授权 (identity=1 投资人没有还款授权)
                          this.$router.push("/");
                        }
                      } else {
                        this.screenTipFee = true;
                        this.screen = true;
                      }
                    }else{
                      _path.dealDialog('您还未设置存管密码',1,_this,'setCustodypass',go)
                    }
                    //bid 自动投标 credit 自动债转 fee 缴费 repay 还款  如： bid|credit|repay|fee
                  }
                } else {
                  this.$router.push("openDepository1");
                }
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
    },
    codes(co) {
      this.code = this.co;
      // console.log(this.code)
    },
    setCookie(name, value) {
      // console.log(name)
      var Days = 1;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      //2018 3 23 domain=.xwsd.com 改为 domain=.xwshidai.com
      document.cookie =
        name +
        "=" +
        escape(value) +
        ";expires=" +
        exp.toGMTString() +
        ";path=/;domain=.xwshidai.com";
      // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=.xwsd.com";
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    feeauth() {
      window.location.href = _path.getObj("feeauth");
    },
    repayauth() {
      window.location.href = _path.getObj("repayauth");
    },
    isInArray(value, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    }
  },
  components: {
    Verificationcode
  },
  mounted(){
    //验证码地址
    this.captcha = process.env.LOGIN_URL
  }
};
</script>
<style src="@/assets/css/index/login.css">
</style>
