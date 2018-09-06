<template>
  <div>
      <div id="register">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">借款注册</h1>
			</header>
			<div class="content">
				<div class="step">
					<div class="step-bg"></div>
					<div class="flex step-text">
						<div>借款注册</div>
						<div>开通银行存管</div>
						<div>注册成功</div>
					</div>
				</div>
				<div class="register-main">
					<form action="#" method="post">
						<div class="username underline">
							<div class="icon"></div>
							<input type="tel" v-model='phone' name="username" placeholder="请输入手机号码" pattern="/^1(3|4|5|7|8)\d{9}$/"/>
						</div>
						<div class="password underline">
							<div class="icon"></div>
							<input type="password" v-model="password" name="password" placeholder="设置密码(6-16个字符,数字+字符)" pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$"/>
						</div>
						<div class="vcode underline">
							<div class="icon"></div>
							<input v-model='codes' type="tel" name="vcode" placeholder="验证码" maxlength="6"/>
							<div @click="gainVcode" class="gainVcode">获取验证码</div>
							<div v-model="codeTime" class="gainVcodes">重新获取{{codeTime}}S</div>
						</div>
						<!-- <div @click='referrer' class="referrer-text">推荐人</div>
						<div class="referrer underline">
							<input type="text" placeholder="请填写推荐人用户名" v-model="spreadUser"/>
						</div> -->
						<!-- <a href="#" class="button button-big button-fill register-btn">下一步</a> -->
						<a @click.prevent='nextStep' class="button button-big button-fill register-btn">下一步</a>
						<!-- <router-link to='openDepository'  class="button button-big button-fill register-btn">下一步</router-link> -->
						<div class="protocol">
							<span class="text">注册即表示您已同意</span>
							<!-- <a href="#">《小微时贷服务协议》</a> -->
							<router-link to='protocol'>《小微时贷服务协议》</router-link>
						</div>
						<div class="member">
							<span class="text">我已是小微时贷会员</span>
							<!-- <a href="#">立即登录</a> -->
							<router-link to='login'>立即登录</router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5'
import _reg from '@/assets/js/Regular'
    export default{
		name:'app',
		data(){
			return {
				smsCode:'register',
				phone:'',
				arr:[],
				code:'',//验证码
				codes:'',//输出验证码
				codeTime:60,
				password:'',
				spreadUser:'',
			}
		},
		methods:{
			routerback(){
				this.$router.push('/')
			},
			// http://app.xwsdvip.com/api/sms?msgType=register&phone=13114922668&sign=02eb072e3ce7840f647644c389c7a6ee
			gainVcode(){//获取验证码
				let obj = {phone:this.phone,msgType:'register',},
						path = _path.getApiUrl('sms')
				
				this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(res=>{
					if(res.status==200){
						if(res.data.status == "000000"){
							$.alert("验证码获取"+res.data.msg)
							this.code = res.data.data.code
						}else{
							_path.dealStatusCode(res.data.status,res.data.msg,this)
						}
					}
				})

				$('.gainVcode').css('display','none')
				$('.gainVcodes').css('display','block')
				this.gainVcodes()
			},
			gainVcodes(){
				var setInt = setInterval(()=> {
					if(this.codeTime==0){
						   clearInterval(setInt);
						   $('.gainVcode').css('display','block')
						   $('.gainVcodes').css('display','none')
               return this.codeTime=60;
					}
					this.codeTime --
				}, 1000);
			},
			referrer(){
				$('.referrer').slideToggle()
			},
			nextStep(){
				if(_reg.regPhone(this.phone)&&_reg.regPw(this.password)&&_reg.regCode(this.codes,this.code)){
				let obj = {phone:this.phone,password:this.password,smsCode:this.codes,identity:2},
						path = _path.getApiUrl('register')
				this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(res=>{
					if(res.status==200){
						if(res.data.status == "000000"){
							$.alert("注册"+res.data.msg,function(){
								this.$router.push({name:'openDepository',params:{id:2}})
								this.codes = 0
							}.bind(this))
						}else{
							_path.dealStatusCode(res.data.status,res.data.msg,this)
						}
						
					}
				})
				}
				
			}
		}
    }
</script>
<style src='@/assets/css/index/register.css'>
</style>

