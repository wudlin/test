<template>
  <div>
      <div id="bankCard">
			<header class="bar bar-nav">
				<!-- <a @click.prevent="routerback" class="icon icon-left button button-link pull-left external back"></a> -->
				<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
				<h1 class="title">银行卡</h1>
			</header>
			<div class="content">
				<div class="bcInfo bg">
					<div>
						<div class="bc-color fz09">{{binInfo.split('-')[0]}}</div>
						<div class="bc-color fz075 marT">{{binInfo.split('-')[1]}}</div>
					</div>
					<!-- 633 **** **** 8923 -->
					<div class="bc-color bc-num">{{bankNums}}</div>
				</div>
				<a href="#" class="button button-fill bc-color sync" @click.prevent='cardRefresh'>同步</a>
				<a href="#" class="button button-fill bc-color unbundle" @click.prevent='cardUnbind'>解绑</a>
				<p class="bc-tip">提示：当账户余额为0且无债权关系时可取消绑定</p>
			</div>
		</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5'
import filters from '@/assets/js/Regular'
    export default{
		name,
		data(){
			return {
				BankCard:'',
				binInfo:'',//银行卡信息
				bankNum:'',//卡号
				bankNums:'',//卡号
			}
		},
		methods:{
			routerback(){
				this.$router.push('/settings')
			},
			userBankCard(){//获取银行卡信息
				let path = _path.getApiUrl('userBankCard')
				this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							this.BankCard = data.data
							this.binInfo = this.BankCard.binInfo			
							this.bankNum = this.BankCard.bankNum;//用来上传					
							this.bankNums = filters.hidebank(this.bankNum);//过滤显示							
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})	

			},
			cardRefresh(){//同步 msg:"必填项不能为空"
			  let path = _path.getApiUrl('cardRefresh')
				this.$axios.post(path,undefined,{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status == "000000"){
							$.alert("同步"+data.msg);
							this.userBankCard()
						}else{
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})
			},
			cardUnbind(){
				let obj = {bankNum:this.bankNum},path = _path.getApiUrl('cardUnbind');
				this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
								// window.sessionStorage.setItem('bankCard',0)
								$.toast("解绑"+data.msg);
								setTimeout(() => {
									this.$router.push('/')
								}, 1000);
						} else {
							_path.dealStatusCode(data.status, data.msg,this);
						}
					}
				})
			}
		},
		mounted(){
			this.userBankCard()
		},
		filters
  }
</script>
<style src='@/assets/css/me/bankCard.css'>
</style>
