<template>
  <div>
        <div class="page page-inited page-current" id="phoneAuth">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">邮箱认证</h1>
				<!-- <a href="view/me/modifyPhone.html"  class="external button button-link pull-right">修改</a> -->
			</header>
			<div class="content">
				<div class="marL padd ea1">邮箱可以帮助您找回密码</div>
				<div class="bg ea2">
					<div class="marL padd borderb ve">
						<span class="f075 color333">邮箱认证</span>
						<span class="f075 color333" v-if="emailstatus=='y'">{{email}}</span>
						<input type="text" id="email" name="email"  placeholder="输入您的邮箱帐号" v-model="inputEmail" v-else/>
					</div>
					<div class="marL padd">
						<span class="f075 color333">认证状态</span>
						<span class="f075 orange"></span>
					</div>
				</div>
				
				<div class="button sure" v-if="emailstatus!='y'" @click="getData()">确定</div>
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
				email:'',
				inputEmail:'',
				emailstatus:'',
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			status(){
				if(this.emailstatus=='y'){
					$('.orange').html('已认证')
				}else if(this.emailstatus=='n'){
					$('.orange').html('未认证')
					
				}else{
					$('.orange').html('认证失败')
				}
			},
			getData(){//
				let obj = {email:this.inputEmail}
				if(_reg.regEmail(this.inputEmail)){
					// console.log('yes')
					let path = _path.getApiUrl('setEmail')
					this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
						if(status == 200){
							if(data.status=='000000'){
								// $.alert("认证"+data.msg)
								$.alert("已发送认证邮件到注册邮箱，请打开进行认证")
							}else{
								_path.dealStatusCode(data.status, data.msg, this);
							}
							
						}
					})
					
				}
			},
			getUserInfo(){
				let path = _path.getApiUrl('getUserInfo');
				this.$axios.get(path,{withCredentials: true}).then((res)=>{
				if(res.status == 200){
					if(res.data.status == '000000'){
						let data = res.data.data;
						// this.email = data.email
						this.$set(this,'email',data.email)
						this.phone = '*****'+data.email.substr(5);
						this.emailstatus = data.emailstatus
						this.status()
						}
					}
				})
			}
		},
		mounted(){
			this.getUserInfo()

		}
  }
</script>
<style src='@/assets/css/me/emailPhoneAuthentication.css'>
</style>
