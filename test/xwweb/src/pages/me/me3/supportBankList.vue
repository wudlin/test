<template>
  <div>
      <div id="supportBankList">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external close-panel" style='width:2.4rem'></a>
				<h1 class="title">支持银行</h1>
			</header>
			<div class="content">
				<div class="bluebanner">
					<div>支持银行</div>
					<div>充值限额</div>
				</div>
					
				<ul class="allbc">
					<li v-for='(ba,i) in bankList' :key='i'>
						<div class="allbc1">
							<img v-if="ba.name.bankIcon" :src="'/static/img/me/supportBankList/'+ba.name.bankIcon" alt="" />
							<span>{{ba.name.bankName}}</span>
						</div>
						<div v-if="ba.name.limit" class="allbc2">单笔{{ba.name.limit}}单日{{ba.name.dayLimit}}</div>
						<div v-else-if="ba.name.remark">{{ba.name.remark}}</div>
					</li>
					<!-- <li>
						<div class="allbc1">
							<img src="" alt="" />
							<span>中国银行</span>
						</div>
						<div class="allbc2">不支持快捷充值</div>
					</li> -->
				</ul>
					
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
				bankList:[],
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			banks(){
				let path = _path.getApiUrl('banks')
				this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							// $.alert(res.data.msg)
							this.bankList = data.data.records
							// console.log(this.bankList)	
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})
			}
		},
		mounted(){
			this.banks()
		}
  }
</script>
<style src='@/assets/css/me/supportBankList.css'>
</style>
