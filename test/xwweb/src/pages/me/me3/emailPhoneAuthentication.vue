<template>
  <div>
        <div class="page page-inited page-current" id="phoneAuth">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">手机认证</h1>
                <router-link to='modifyPhone' class="external button button-link pull-right">修改</router-link>
				<!-- <a href="view/me/modifyPhone.html"  class="external button button-link pull-right">修改</a> -->
			</header>
			<div class="content">
				<div class="marL padd ea1">手机号是您在小微时贷重要的身份证</div>
				<div class="bg ea2">
					<div class="marL padd borderb">
						<span class="f075 color333">手机认证</span>
						<span class="f075 color333">{{phone}}</span>
					</div>
					<div class="marL padd">
						<span class="f075 color333">认证状态</span>
						<span class="f075 orange">已认证</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
	import _path from '@/assets/js/md5'
  export default{
		name,
		data(){
			return {
				phone:'',
			}
		},
		methods:{
			routerback(){
				this.$router.push('/settings')
			}
		},
		mounted(){
			let path = _path.getApiUrl('getUserInfo');
			this.$axios.get(path,{withCredentials: true}).then((res)=>{
				if(res.status == 200){
					let data = res.data.data;
					this.phone = data.phone.substr(0,3)+'****'+data.phone.substr(7,10);
					this.phone =this.phone.substr(0,3)+'****'+this.phone.substr(7,10)
				}
			})
		}
  }
</script>
<style src='@/assets/css/me/emailPhoneAuthentication.css'>
</style>
