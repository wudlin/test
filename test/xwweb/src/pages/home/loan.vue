<template>
  <div>
	<pageNav v-if='navigation' @navshow="navigation=!navigation"></pageNav>
    <div id="loan" >
		<header class="bar bar-nav">
			<a @click.prevent="routerback"  class="icon icon-left pull-left" style='width:2.4rem'></a>
			<h1 class="title">申请贷款</h1>
			<a class="icon xwsd-menu pull-right open-panel "  @click.prevent="navigation=true"></a>
		</header>
		<!--内容区-->
		<div class="content">
			<div class="list-block">
				<ul>
					<!-- 姓名 -->
					<li>
						<div class="item-content">
							<div class="item-inner">
							<div class="item-title label">姓名</div>
							<div class="item-input">
								<input type="text" id="username" name="username" v-model='name' placeholder="未填写">
							</div>
							</div>
						</div>
					</li>
					<!--手机号码-->
					<li>
						<div class="item-content">
							<div class="item-inner">
							<div class="item-title label">手机号码</div>
							<div class="item-input">
								<input type="tel" id="tel" name="tel" v-model='phone'  placeholder="未填写" pattern="/^1(3|4|5|7|8)\d{9}$/">
							</div>
							</div>
						</div>
					</li>
					<!-- 居住地 -->
					<li>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title label">居住地</div>
								<div class="item-input">
									<input type="text" id="city-picker" name="address" placeholder="未填写" readonly>
								</div>
							</div>  
						</div>
					</li>
					<!-- 借款金额 -->
					<li>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title label">借款金额</div>
								<div class="item-input">
									<input type="number" id="money" name="money" v-model='money'  placeholder="请输入50的整数倍">
								</div>
							</div>  
						</div>
					</li>
					<!-- 验证码 -->
					<li>
						<div class="item-content vcode">
							<div class="item-inner">
								<div class="item-title label">验证码</div>
								<div class="item-input">
									<input type="text" id="vcode" v-model='codes' placeholder="请输入验证码">
													<div @click="gainVcode" class="gainVcode">获取验证码</div>
									<div v-model="codeTime" class="gainVcodes reset" style='display:none'>重新获取{{codeTime}}S</div>
								</div>
							</div>  
						</div>
					</li>
				</ul>
			</div>
			<div class="content-block">
				<a href="#" class="button button-big button-fill sure" @click.prevent='order'>确认</a>
			</div>
		</div>
	</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5';
import _reg from '@/assets/js/Regular'
import jquery from "@/assets/js/jquery.js";
import light7 from '../../../static/light7/js/light7.min.js'
import light7City from '@/assets/js/light7-city-picker.js'

import pageNav from '@/pages/page-nav'
    export default{
		name,
		data(){
			return{
				phone:'',
				name:'',
				money:'',
				province:'',
				city:'',
				code:'',//验证码
				codes:'',//输入验证码
				codeTime:'60',
				navigation:false,
				isNowLogin:false,//登录标识

			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			order(){
				let cit = $("#city-picker").data('val')
				if(_reg.regName(this.name)&&_reg.regPhone(this.phone)&&_reg.regCity(cit)&&_reg.regCode(this.code,this.codes)){
					let obj = {phone:this.phone,name:this.name,money:this.money,province:cit[0],city:cit[1],smsCode:this.code},
							path = _path.getApiUrl('order');
					this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(res=>{
						if(res.status==200){
							if(res.data.status == "000000"){
								$.alert("贷款申请"+res.data.msg)
							}else{
								_path.dealStatusCode(res.data.status,res.data.msg,this)
							}
						}
					})
				}
			},
			gainVcode(){//获取验证码
				let obj = {phone:this.phone,msgType:'orderLoan',},
						path = _path.getApiUrl('sms');
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
			btns(){
				this.navigation=!this.navigation
			}
		},
		mounted() {
			 $("#city-picker").cityPicker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择居住地址</h1>\
				</header>'
				,
				rotateEffect:true,
			});

			this.$store.state.loan = 0
			this.$store.state.newPage = 1
		},
		components:{
			pageNav
		}
  }
</script>
<style src="@/assets/css/index/loan.css">
</style>

