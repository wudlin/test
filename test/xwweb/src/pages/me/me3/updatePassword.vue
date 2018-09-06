<template>
  <div>
      <div id="updatePass">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button button-link pull-left  back"></a>
				<h1 class="title">修改登录密码</h1>
			</header>
			<div class="content">
				<div class="list-block">
				    <ul>
				      <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">原始密码</div>
					            <div class="item-input forget">
					              <input type="text" v-model='oldpass' placeholder="请输入原登录密码">
				              	<router-link class="external forgetPass" to='modifyPw'>忘记密码？</router-link>
					            </div>
					        </div>
				        </div>
				      </li>
				      <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">设置密码</div>
					            <div class="item-input">
					              <input type="email" v-model='loginpass' placeholder="请设置新登录密码">
					            </div>
					        </div>
				        </div>
				      </li>
					  <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">确认密码</div>
					            <div class="item-input">
					              <input type="email" v-model='loginpassSure' placeholder="再次输入新登录密码">
					            </div>
					        </div>
				        </div>
				      </li>
				    </ul>
				</div>
				<a href="#" class="button button-fill sure" @click.prevent='updateLoginpass'>确认</a>
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
						oldpass:'',//旧密码
						loginpass:'',//新密码
						loginpassSure:'',//确认密码
					}
				},
				methods:{
					routerback(){
						this.$router.go(-1)
					},
					updateLoginpass(){
						// _reg.regPw(this.password)
						let obj = {oldpass:this.oldpass,loginpass:this.loginpass,loginpassSure:this.loginpassSure},
								path = _path.getApiUrl('updateLoginpass')
						if(_reg.regPw(this.loginpass)){
							if(this.loginpass == this.loginpassSure){
								this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(res=>{
									if(res.status == 200){
										$.alert(res.data.msg,this.logout(),function(){
											this.$router.push('/login')
										}.bind(this))
									}
								})
							}else{
								$.alert('两次密码不一致，请重新输入')
							}
						}
					},
					logout(){//退出登录
						let path = _path.getApiUrl('logout');
						this.$axios.post(path,undefined,{emulateJSON: true,withCredentials: true}).then(res=>{
								// console.log(res)
						})
					},
				},
				mounted(){

				}
    }
</script>
<style src='@/assets/css/me/updatePassword.css'>
</style>
