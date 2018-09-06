<template>
  <div>
      <div id="registerSuccess">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">注册成功</h1>
			</header>
			<div class="content">
				<div class="step">
					<div class="step-bg"></div>
					<div class="flex step-text">
						<div>新手注册</div>
						<div>开通银行存管</div>
						<div>注册成功</div>
					</div>
				</div>
				<div class="reden"><img src="../../../static/img/index/nre.png" alt="新手红包" /></div>
				<div class="rs-tip">
					<h4>账户注册成功</h4>
					<p>你已成功注册江西银行存管账户，获得380元新手红包，已放入您的账户，设置交易密码后即可正常投标操作。</p>
				</div>
				<a href="#" @click="setPas" class="button setPass">设置交易密码</a>
				<router-link to='/' class="button stroll">先去逛逛</router-link>
			</div>
		</div>
  </div>
</template>
<script>
	import _path from '@/assets/js/md5'
  export default{
    name,
		methods:{
			routerback(){
				this.$router.push('/')
			},
			setPas(){
				let path = _path.getApiUrl('setCustodypass');
				window.location.href = path ;
				// let online = 'https://onlineuat.cupdata.com:50005/dbesbuat/app/pinsettingN.html'
				// window.location.href = online;
//				this.$axios.get(path,{withCredentials: true}).then(res=>{
//					if(res.status==200){ 
//						 console.log(res)
//						$('.content').html(res.data)
//					}
//				})
			}
		}
  }
</script>
<style src='@/assets/css/index/registerSuccess.css'>
</style>
