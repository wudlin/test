<template>
  <div>
    <div id="openDepository">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
			<h1 class="title">开通存管</h1>
		</header>
		<div class="content">
			<div class="step">
				<div class="step-bg"></div>
				<div class="flex step-text">
					<div v-if="identity==1">投资注册</div>
					<div v-if="identity==2">借款注册</div>
					<div>开通银行存管</div>
					<div>注册成功</div>
				</div>
			</div>
			<div class="od-main">
				<form action="#" method="post">
					<div class="username underline">
						<div class="icon"></div>
						<input type="text" name="username" v-model='name' placeholder="请输入真实姓名" />
					</div>
					<div class="id underline">
						<div class="icon"></div>
						<input type="text" name="cardnum" v-model='cardnum' placeholder="请输入身份证号" />
					</div>
					<!-- <div class="bankCard underline">
						<div class="icon"></div>
						<input type="tel" name="text" v-model="bankNum" placeholder="请绑定银行卡" />
					</div> -->
					<!-- <div class="phone underline">
						<div class="icon"></div>
						<input type="password" name="password" placeholder="请输入手机号" pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$"/>
					</div>
					<div class="vcode underline">
						<div class="icon"></div>
						<input type="text" name="vcode" placeholder="验证码" maxlength="6"/>
						<div class="gainVcode">获取验证码</div>
					</div> -->
					<!-- <a href="#" class="button button-big button-fill register-btn">下一步</a> -->
					<a @click.prevent="register" class="button button-big button-fill register-btn">下一步</a>
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
		name,
		data(){
			return{
				name:''
				,cardnum:''
				,bankNum:''
				,identity:''
				,title1:'投资注册'
				,title2:'借款注册'
			}
		},
		methods:{
			routerback(){
				this.$router.push('/register')
			},
			register(){
				if(_reg.regName(this.name)&&_reg.regCard(this.cardnum)
				// &&_reg.regBank(this.bankNum)
				){
					let obj = {name:this.name,cardnum:this.cardnum,
					// bankNum:this.bankNum,
					ret:'/registerSuccess'};
					// path = _path.getObj('openCustody',obj);
					window.location.href = _path.getObj('openCustody',obj);
					// this.$axios.get(_path.getObj('openCustody',obj),{withCredentials: true}).then(res=>{
					// 	console.log(res)
					// 	// $('body').html(res.data)
					// 	console.log(res.data)
					// 	// window.location.href = res.data
					// })
				}
			}
		},
		mounted(){
			this.identity = this.$route.params.id
		}
    }
</script>
<style src='@/assets/css/index/openDepository.css'>
</style>