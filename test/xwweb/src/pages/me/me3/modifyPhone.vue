<template>
  <div>
      <div id="modifyPhone">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">修改手机号码</h1>
			</header>
			<div class="content">
				<div class="mp">
					<div class="fc075">新手机号</div>
					<input type="text" v-model='phone' placeholder="请输入新手机号码" class="fc06 marL"/>
				</div>
				<a href="#" class="button button-fill sure" @click.prevent='updatePhone'>确认</a>
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
			return {
				phone:''
			}
		},
		methods:{
			routerback(){
				this.$router.push('/settings')
			},
			updatePhone(){//修改手机号
				let obj = {phone:this.phone}
				let path = _path.getObj('updatePhone',obj)
				window.location.href = path
				// this.$axios.get(_path.getObj('updatePhone',obj),{withCredentials: true}).then(res=>{
				// 	console.log(res)
				// 	// $.alert(res.data.msg)
				// 	if(res.status == 200){
				// 		$('body').html(res.data)
				// 		// window.location.href = res.data
				// 		window.sessionStorage.setItem('phone',this.phone)
				// 	}
				// })
				
			}
		},
    }
</script>
<style src='@/assets/css/me/modifyPhone.css'>
</style>
