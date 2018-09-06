<template>
  <div>
      <div id="withdraw">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">提现</h1>
			</header>
			<div class="content">
				<ul class="wmain" v-if="!!withdrawpage">
					<li>
						<div class="accountT left">开户名</div>
						<div class="accountName right">{{name}}</div>
					</li>
					<li>
						<div class="left">提入账户</div>
						<div class="right">{{bankName+'('+bankNum+')'}}</div>
					</li>
					<li>
						<div class="left">当前余额</div>
						<div class="right">{{fundMoney|formatNumber2}} &#x2000; 元</div>
					</li>
					<li class="wdm">
						<div class="wdmT left">提现金额</div>
						<div class="wdmN right">
							<input type="tel" name="withdraw" id="withdraw" placeholder="请输入提现金额" v-model="money" @input='withdrawFee'/>
							<span class="yuan">元</span>
							<span class="max" @click='monneyMax'>最大</span>
						</div>
					</li>
					<li>
						<div class="left">手续费用</div>
						<div class="right">{{fee}} &#x2000; 元</div>	
					</li>
					<li>
						<div class="left">实得金额</div>
						<div class="right">{{practice}} &#x2000; 元</div>	
					</li>
					<li v-if='money>=50000'>
						<div class="left">联行号</div>
						<input type="tel" class='cash' name="cash" id="cash" placeholder="请输入联行号" v-model="cashBankNum" />
						<router-link class="cashBank" to='cashBank' tag='span'>?</router-link>
					</li>
					<li v-if="couponNum>0">
						<div class="left">使用提现券</div>
						<div class="right">
							<div class="item-input">
								<label class="label-switch">
									<input type="checkbox" class='autos' @click='autos'>
									<!-- <input v-if='autostatus==1' type="checkbox" checked="checked" class='autos' @click='autost'> -->
									<div class="checkbox"></div>
								</label>
							</div>
						</div>
					</li>
				</ul>
				<p class="tip">提现金额小于1,提现将失败！</p>
				<a href="#" class="button button-fill sure" @click.prevent='withdraw'>确认</a>
			</div>
			
		</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5'
import filters from '@/assets/js/formatAll'

    export default{
		name,
		data(){
			return{
				fee:'',//手续费
				money:'',
				practice:'',//实得金额
				type:'0',
				bankNum:'',
				binInfo:'',
				cashBankNum:'',//联行号
				withdrawpage:[]//提现页面
				,name:''
				,bankName:''
				,bankNum:''//銀行卡
				,fundMoney:''//余額
				,lotteryNum:0
				,couponNum:0//20180629 lotteryNum 修改为 couponNum
				,isLottery:0
				,useCoupon:0//20180629 isLottery 修改为 useCoupon
				,isCustodyPwd:''//存管密码
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			withdrawFee(){//手续费
				this.money==''?this.money=0:this.money
				let obj = {money:this.money,useCoupon:this.useCoupon},
						path = _path.getApiUrl('withdrawFee');
				this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							if(this.money==0){
								this.$set(this,"fee", '')
								this.$set(this,"money", '')
							}else{
								this.$set(this,"fee", data.data.fee)
								this.practice = this.money - this.fee
							}
						}else{
							_path.dealStatusCode(data.status,data.msg,this)
						}
					}
				})

			},
			withdraw(){
				if(this.money<50000){
					var obj = {money:this.money,type:0,useCoupon:this.useCoupon}
				}else{
					var obj = {money:this.money,type:1,cashBankNum:this.cashBankNum,useCoupon:this.useCoupon}
					if(this.cashBankNum==''){
						$.alert('联行号不能为空')
						return false;
					}
				}
				this.$axios.get(_path.getObj('withdraw',obj),{withCredentials: true}).then(res=>{
					if(res.status==200){
						$('.content').html(res.data)
					}else{
						$.alert(res.data.msg)
					}
				})
			},
			monneyMax(){
				this.money = this.fundMoney
				this.withdrawFee()
			},
			getwithdrawpage(){
				let path = _path.getApiUrl('withdrawpage') 
				this.$axios.post(path,{},{withCredentials: true}).then(({status,data})=>{
					if(status == 200){
						if(data.status=='000000'){
							this.withdrawpage = data.data
							this.name = this.withdrawpage.name
							this.bankName = this.withdrawpage.bankName
							this.bankNum = this.withdrawpage.bankNum
							this.fundMoney = this.withdrawpage.fundMoney
							this.couponNum = this.withdrawpage.couponNum
							this.couponNum = this.withdrawpage.couponNum
							// this.isCustodyPwd = this.withdrawpage.isCustodyPwd
							// if(!this.isCustodyPwd){
							// 	$.confirm(
							// 		"您还未设置存管密码！</br>设置存管密码",
							// 		function() {
							// 			let obj = {ret: "/withdraw" };
							// 			window.location.href = _path.getObj("setCustodypass", obj);
							// 		},function(){
							// 			this.$router.go(-1)
							// 		}.bind(this)
							// 	);
							// }
						}else{
            				_path.dealStatusCode(data.status,data.msg,this,1)
						}
					}
				})
			},
			autos(){
				if($('.autos').is(':checked')==true){
					this.useCoupon = 1
				}else{
					this.useCoupon = 0
				}
				this.withdrawFee()
			},
			setCustodypass(){
			//存管密码
			 $.confirm(
				"您还未设置存管密码！</br>设置存管密码",
				function() {
					let obj = {ret: "/withdraw" };
					window.location.href = _path.getObj("setCustodypass", obj);
				},function(){
					this.$router.go(-1)
				}.bind(this)
			);
		}
		},
		mounted(){
			this.getwithdrawpage()
		},
		filters,
    }
</script>
<style src='@/assets/css/me/withdraw.css'>
</style>
