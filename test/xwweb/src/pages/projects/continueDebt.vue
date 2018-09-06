<template>
	<div id="continueDebt">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
			<h1 class="title">{{debtTitle}}</h1>
			<!--<router-link to="/recharge" class="pull-right rr ">-->
			<a class="pull-right rr button" @click.prevent="routerT">
				充值
			</a>
			<!--</router-link>-->
		</header>
		<div class="content">
			<div class="bg paddLr">
				<div class="sec1 paddTb">
					<div class="flex">
						<div class="fc1">剩余可投金额</div>
						<div class="fc2">{{debtMoneyLast | formatNumber2}}元</div>
					</div>
					<div class="flex">
						<div class="fc1">账户可投金额</div>
						<div class="fc2">{{fundMoney | formatNumber2}}元</div>
					</div>
				</div>
				<div class="sec2 paddTb">
					<div>
						<span class="fc3">购买金额</span>
						<span class="fc1">（50元起投，限额2000000.00元）</span>
					</div>
					<div class="flex numArea">
						<div>
							<span class="fc4">￥</span>
							<input type="text" placeholder="0.00" class="fc5" id="moneyNum" v-model.number="moneyNum" @input="profit"/>
						</div>
						<div class="fc6 tl" @click="maxNum()">最大</div>
					</div>
				</div>
			</div>
			<div class="Payment">
				<span class="text fc7">支付利息：</span>
				<span class="num">{{profits | formatNumber2}}</span><span>&nbsp;元</span>
				<div class="totalPay fc7">
					<span class="text">实际支付：</span>
					<span class="num">{{totalPay | formatNumber2}}</span>
					<span class="text fc8">元&nbsp;
						<!-- 20180720移除 -->
						<!-- (债权本息{{moneyNum + profits | formatNumber2}}元+债权差价{{priceSpread | formatNumber2}}元) -->
					</span>
				</div>
			</div>
			<div class="invesBtn button" @click="sureInvest()">确定</div>
		</div>
	</div>
</template>

<script>
	import filters from '@/assets/js/formatAll'
	import _path from '@/assets/js/md5.js'
	export default {
		name:'continueDebt',
		data() {
			return {
				debtTitle:'',//标题
				debtMoneyLast:0,//剩余可投
				fundMoney:0,//账户余额
				debtAmount:0,//转让的债权金额
				investedInterest:0,//未结利息
				moneyNum:'',//确认投资
				isNowLogin:false,
				debtid:'',//债权id
				profits:0,//支付利息
				maxM:0,//最大可投
				pdRate: '',//折价/溢价比例
				priceSpread: '',//差价
				totalPay: '',//实际支付
			}
		},
		methods:{
			routerback() {
				this.$router.push({ name: "debt", params: { pid: this.debtid} })
			},
			routerT() {
				this.$router.push('/recharge')
			},
			//判断登录状态
		    isLogin() {
		    	let path = _path.getApiUrl('islogin')
		    	this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
			      	if(status==200){
			      		if (data.status == "000000"&&data.data.isLogin==1) {
			      		  this.isNowLogin = true;
			      		  this.getData()
			      		}
			      	}
			    });
		    },
		    setCustodypass(){
				//是否设置存管密码
				let tellPath = this.$route.params.id
				$.confirm(
			        "您还未设置存管密码！</br>设置存管密码",
			        function() {
			            let dataObj = {ret: "/debt/"+tellPath},path = _path.getObj("setCustodypass", dataObj);
			        	window.location.href = path;
			        },function(){
			        	this.$router.go(-1);
			        }.bind(this)
			    );
			},
			getData() {
				this.debtid = this.$route.params.id;//债权标识
				let dataObj = {
						type:'crtr',
						id:this.debtid
					},
					path = _path.getObj('bidpage',dataObj)
				this.$axios.get(path,{withCredentials: true,emulateJSON:true}).then((res) => {
					//console.log(res)
					if(res.status == 200){
						if(res.data.status == "000000") {
							let data = res.data.data;
							this.debtTitle = data.title;
							this.debtMoneyLast = data.remain;
							this.fundMoney = data.fundMoney;
							this.investedInterest = data.investedInterest;
							this.debtAmount = data.debtAmount;
							this.pdRate = data.pdRate;
							let isCustodyPwd = data.isCustodyPwd;
							if(isCustodyPwd=="0") {
								this.setCustodypass();
							}
						}else{
				        	_path.dealStatusCode(res.data.status,res.data.msg,this)
				        }
					}
				})
				
				//获取最大可购买
				let id = this.debtid,
					dataObjM = {
						id:id
					},
					paths = _path.getObj('getMaxBuy',dataObjM);
				this.$axios.get(paths,{withCredentials: true}).then((res)=>{
					if(res.status == 200){
						if(res.data.status == "000000"){
							let	data = res.data.data,maxM = Number(data.money).toFixed(2);
							this.maxM = maxM
						}else{
				        	_path.dealStatusCode(res.data.status,res.data.msg,this)
				        }
					}
				})
			},
			maxNum() {
				this.moneyNum = Number(this.maxM);
				this.cal()
			},
			profit() {
//				console.log(Number(this.moneyNum),Number(this.maxM))
				this.cal()
			},
			cal(){
				this.$nextTick(()=>{
					if(Number(this.moneyNum)>Number(this.maxM)){
						this.moneyNum = Number(this.maxM)
					}
					//支付利息=（输入投资金额/债权金额）*未结利息【未结利息是按天计算即从转让那天起到承接所得利息】
					let profits = (Number(this.moneyNum) / Number(this.debtAmount)) * this.investedInterest;
					this.profits = Number(profits);
					//console.log(profits)
					//差价 = (输入的承接本金【债权金额】+ 未结利息【用户承接金额对应的支付利息】)*折比
					let priceSpread = this.pdRate * (this.moneyNum + profits);
					this.priceSpread = Number(priceSpread)
					
					//实付支付 = （本金+未结利息【用户承接金额对应的支付利息】）*（1+折比）= 本金+未结利息【用户承接金额对应的支付利息】+差价
					let totalPay = this.moneyNum + profits + priceSpread
					this.totalPay = totalPay;
				})
				
			},
			sureInvest() {
				//承接
				let dataObj = {
					id:this.debtid,
					money:this.moneyNum
				},
				path = _path.getObj('buy',dataObj);
				if(Number(this.moneyNum)>Number(this.maxM)){
					// console.log(Number(this.moneyNum)>Number(this.maxM))
					$.toast('您最大可投'+this.maxM+'元')
				}else if( Number(this.debtMoneyLast) - Number(this.moneyNum)<50&&Number(this.debtMoneyLast) - Number(this.moneyNum)>0){
					$.toast('剩余金额不能低于50元')
				}else{
					window.location.href = path;
				}
			}
		},
		created() {
			this.getData()
		},
		filters,
	}
</script>

<style scoped>
	#continueDebt ::-webkit-input-placeholder {
		color: #666;
	}
	#continueDebt :-moz-placeholder{
		color: #666;
	}
	#continueDebt ::-moz-placeholder{
		color: #666;
	}
	#continueDebt :-ms-input-placeholder{
		color: #666;
	}
	#continueDebt input{
		width: 85%;
		padding: 0;
		border: none;
		outline: none;
		background-color: transparent;
	}
	#continueDebt  .button{
		border: none;
		padding: 0;
		top: 0;
	}
	#continueDebt header{
		height: 2.4rem;
		background-color: #3096FD;
	}
	#continueDebt header a{
		color: #fff;
		height: 2.4rem;
		line-height: 1.4rem;
	}
	#continueDebt header h1.title{
		height: 2.4rem;
		line-height: 2.4rem;
		font-size: .9rem;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0 4.3rem;
		margin-right: .5rem;
		z-index: 1;
	}
	#continueDebt  header a.rr{
		font-size: .9rem;
		line-height: 2.4rem;
		vertical-align: middle;
		z-index: 1000;
	}
	#continueDebt .content .bg{
		background-color: #fff;
	}
	#continueDebt .content .paddLr{
		padding: 0 .6rem;
	}
	#continueDebt .content .paddTb{
		padding: .6rem 0;
	}
	#continueDebt .content .flex{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
	}
	#continueDebt .content  .pull-right{
		color: #666;
	}
	#continueDebt .content .tl{
		text-align: right;
	}
	#continueDebt .content .sec1{
		border-bottom: 1px solid #DCDCDC;
	}
	#continueDebt .content .fc1{
		font-size: .6rem;
		color: #666;
	}
	#continueDebt .content .fc2{
		font-size: .75rem;
		color: #FF7031;
	}
	#continueDebt .content .fc3{
		font-size: .75rem;
		color: #333;
	}
	#continueDebt .content .fc4{
		font-size: .85rem;
		color: #333;
	}
	#continueDebt .content .fc5{
		font-size: 1.2rem;
		color: #333;
	}
	#continueDebt .content .fc6{
		font-size: .75rem;
		color: #3096FD;
	}
	#continueDebt .content .fc7{
		font-size: .65rem;
		color: #333;
	}
	#continueDebt .content .fc8{
		font-size: .65rem;
		color: #666;
	}
	#continueDebt .content .sec2 .numArea{
		margin-top: 1rem;
	}
	#continueDebt .content .sec2 .numArea>div{
		width: 50%;
	}
	#continueDebt .content .Payment{
		padding: .5rem;
		font-size: .6rem;
	}
	#continueDebt .content .Payment .num{
		color: #FF7031;
	}
	#continueDebt .content .invesBtn{
		height: 1.75rem;
		font-size: .75rem;
		color: #fff;
		text-align: center;
		line-height: 1.75rem;
		margin: 1.2rem .6rem 0;
		background-color: #3096FD;
		border-radius: .875rem;
	}
</style>