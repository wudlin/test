<template>
  <div
      <div id="vip">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
				<h1 class="title">VIP</h1>
			</header>
			<div class="content">
				<div class="vip-bg mar">
					<div class="vip-padd borderb flex">
						<div class="fz075 color333">您的专属客服</div>
						<div class="fz06 color666" v-if='isVip==0'>无</div>
						<div class="fz06 color666" v-if='isVip==1'>{{customService}}</div>
					</div>
					<div class="vip-padd flex">
						<div class="fz075 color333">会员到期时间</div>
						<div class="fz06 color666" v-if='endTime'>{{endTime}}</div>
						<div class="fz06 color666" v-else>无</div>
					</div>
				</div>
				<div>
					<div class="color666 vip-padd fz06">温馨提示</div>
					<p class="color666 vip-paddL fz05 tip">小微时贷VIP，享受更加贴心的专属客服服务。期限一年，目前免收VIP费</p>
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
				userV:'',
				isVip:'',
				customService:'',//客服名
				endTime:'',//到期时间
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			userVip(){
				let path = _path.getApiUrl('userVip')
				this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
					if(status == 200){
						if(data.status == '000000'){
							this.userV = data.data
							this.isVip = this.userV.isVip
							this.endTime = this.userV.endTime
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})
			}
		},
		mounted(){
			this.userVip()
		}
    }
</script>
<style src='@/assets/css/me/VIP.css'>
</style>
