<template>
	<div id="investBid">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
			<h1 class="title">{{title}}</h1>
			<a class="pull-right rr button" @click.prevent="routerT">
				充值
			</a>
		</header>
		<div class="content">
			<div class="bg paddLr">
				<div class="sec1 paddTb">
					<div class="flex">
						<div class="fc1">剩余可投金额</div>
						<div class="fc2">{{remain | formatNumber2}}元</div>
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
						<div class="left">
							<span class="fc4">￥</span>
							<input type="tel" placeholder="0.00" class="fc5" id="moneyNum" v-model.number="moneyNum" @input="changeMoney"/>
						</div>
						<!--<div class="fc6 tl" @click="maxNum()">最大</div>-->
					</div>
				</div>
			</div>
			<!--<div class="bg flex  giftArea">-->
			<div class="bg flex  giftArea"  @click="whoUseCoupon()">
			
				<div class="fc1">选择红包</div>
				<div class="giftArea2">
					<input type="text" id="picker" placeholder="查看红包" class="fc7 selectGift" v-model="lotteryName" readonly/>
					<a class="icon icon-right pull-right"></a>
				</div>
			</div>
			<!--<ul class="protocolArea">
			  <li>
			    <label class="label-checkbox item-content">
			      <input type="checkbox"  id="protocolCheck">
			      <div class="item-media">
			      	<i class="icon icon-form-checkbox"></i>
			      	<span class="fz06 color666">同意并阅读</span>
			      	<router-link to="/agreementYuTou" class="fz06">《智能一键投标协议》</router-link>
			      </div>
			    </label>
			  </li>
			</ul>-->
			<div class="invesBtn button" @click="sureInvest">确认投资{{moneyNum | formatNumber2}}元</div>
		</div>
	</div>
</template>

<script>
	import filters from '@/assets/js/formatAll'
	import _path from '@/assets/js/md5.js'
	export default{
		name:'investBid',
		data() {
			return{
				planId:'',//标识
				title:'',//标题
				remain:0,//剩余可投
				fundMoney:0,//账户可投金额
				period:'',//投资期限
				moneyNum:0,//输入的金额
				lotteryId:0,//传回来的券id
				lotteryName:'',
				maxM:0,//最大投资
				yutou:false,
			}
		},
		methods: {
			routerback() {
				this.$router.go(-1)
				window.sessionStorage.removeItem('preInvestInputMoney');//清除掉用户在智投输入的金额
			},
			changeMoney(){
				let moneyNum = Number(this.moneyNum)
				window.sessionStorage.setItem('preInvestInputMoney',this.moneyNum)
				this.$nextTick(()=>{
					if(moneyNum>Number(this.remain)){
						this.moneyNum = Number(this.remain)
					}
				})
			},
			whoUseCoupon(){
				if(!!this.moneyNum){
					
					let remain = Number(this.remain),moneyNum = Number(this.moneyNum),fundMoney = Number(this.fundMoney);
					if(moneyNum>remain){
						$.toast('您剩余可投'+this.remain+'元')
						return;
					}else if(moneyNum>fundMoney){
						$.toast('您账户剩余可投'+this.fundMoney+'元')
						return ;
					}else if(moneyNum<50){
						$.toast('起投金额不能小于50元')
						return ;
					}else if(moneyNum%50!=0){
						$.toast('起投金额为50的倍数')
						return;
					}else{
						window.sessionStorage.setItem('preInvestPeriod',this.period)
						this.$router.push({name: 'planGiftCoupon',query: {id: this.planId}})
					}
				}else{
					$.alert('请先输入购买金额')
				}
			},
			routerT() {
				this.$router.push('/recharge')
			},
			setCustodypass(){
				//是否设置存管密码
				let tellPath = this.$route.params.id
				$.confirm(
			        "您还未设置存管密码！</br>设置存管密码",
			        function() {
			            let dataObj = {ret: "/preInvestDetail/"+tellPath},path = _path.getObj("setCustodypass", dataObj);
			        	window.location.href = path;
			        },function(){
			        	this.$router.go(-1);
			        }.bind(this)
			    );
			},
			getData() {
				this.planId = this.$route.params.id;
				let dataObj = {
						type:'plan',
						id:this.planId
					},
					path = _path.getObj('bidpage',dataObj)
				this.$axios.get(path,{withCredentials: true,emulateJSON:true}).then((res) => {
					// console.log(res)
					if(res.status == 200){
						if(res.data.status == "000000") {
							let data = res.data.data;
							this.title = data.title;
							this.remain = data.remain;
							this.fundMoney = data.fundMoney;
							this.period = data.period;
							let isCustodyPwd = data.isCustodyPwd;
//							if(!isCustodyPwd) {
//								this.setCustodypass();
//							}
						}else{
							_path.dealStatusCode(res.data.status,res.data.msg,this)
						}
					}
				})
				//console.log(this.planId)
				//获取最大可购买
//				let dataObj1 = {
//					oddNumber:this.planId
//				},
//				paths = _path.getObj('getMaxInvest',dataObj1);
//				this.$axios.get(paths,{withCredentials: true,emulateJSON:true}).then((res) => {
//					//  console.log(res)
//					if(res.status === 200){
//						let data = res.data;
//						if(data.status === "000000"){
//							let	dataContent = data.data,maxM = Number(dataContent.money).toFixed(2);
//							this.maxM = maxM
//						}else{
//							_path.dealStatusCode(data.status,data.msg,this)
//						}
//					}
//				})
			},
			maxNum() {
				this.moneyNum = this.maxM;
			},
			sureInvest() {
				let obj=false,
				//protocolCheck = $('#protocolCheck').is(':checked'),
					remain = Number(this.remain),moneyNum = Number(this.moneyNum),fundMoney = Number(this.fundMoney);
				if(moneyNum>remain){
					$.toast('您剩余可投'+this.remain+'元')
					return;
				}else if(moneyNum>fundMoney){
					$.toast('您账户剩余可投'+this.fundMoney+'元')
					return ;
				}else if(moneyNum<50){
					$.toast('起投金额不能小于50元')
					return ;
				}else if(moneyNum%50!=0){
					$.toast('起投金额为50的倍数')
					return;
				}
//				else if(!protocolCheck){
//					$.toast('请同意并阅读智能一键投标协议')
//					return;
//				}
				let	dataObj = {
						planId: this.planId,
						couponInsId: this.lotteryId || 0,
						money: this.moneyNum,
				},path = _path.getObj('bidplan',dataObj);
				this.$axios.get(path,{withCredentials: true,emulateJSON:true}).then((res)=>{
					// console.log(res)
					if(res.status == 200){
						if(res.data.status == "000000"){
							$.alert(res.data.msg,function() {
								window.sessionStorage.removeItem('preInvestInputMoney')
								window.sessionStorage.setItem('couponName','')
								window.sessionStorage.setItem('couponId',0)
								this.$router.push('/projects')
							}.bind(this))
						}else {
							_path.dealStatusCode(res.data.status,res.data.msg,this)
						}
					}
				})

			},
			
		},
		created() {
			this.getData()
			this.moneyNum = window.sessionStorage.getItem('preInvestInputMoney')
			this.lotteryName = window.sessionStorage.getItem('couponName');
			this.lotteryId = window.sessionStorage.getItem('couponId');
			//console.log([this.moneyNum,this.lotteryName,this.lotteryId])
		},
		filters
	}
</script>

<style scoped>
	#investBid ::-webkit-input-placeholder {
		color: #666;
	}
	#investBid :-moz-placeholder{
		color: #666;
	}
	#investBid ::-moz-placeholder{
		color: #666;
	}
	#investBid :-ms-input-placeholder{
		color: #666;
	}
	#investBid .sec2 input,#investBid .giftArea input{
		width: 85%;
		padding: 0;
		border: none;
		outline: none;
		background-color: transparent;
	}
	#investBid  .button{
		border: none;
		padding: 0;
		top: 0;
	}
	#investBid header{
		height: 2.4rem;
		background-color: #3096FD;
	}
	#investBid header a{
		color: #fff;
		height: 2.4rem;
		line-height: 1.4rem;
	}
	#investBid header h1.title{
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
	#investBid  header a.rr{
		font-size: .9rem;
		line-height: 2.4rem;
		vertical-align: middle;
		z-index: 1000;
	}
	#investBid .content .bg{
		background-color: #fff;
	}
	#investBid .content .paddLr{
		padding: 0 .6rem;
	}
	#investBid .content .paddTb{
		padding: .6rem 0;
	}
	#investBid .content .flex{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
	}
	#investBid .content  .pull-right{
		color: #666;
	}
	#investBid .content .tl{
		text-align: right;
	}
	#investBid .content .sec1{
		border-bottom: 1px solid #DCDCDC;
	}
	#investBid .content .fc1{
		font-size: .6rem;
		color: #666;
	}
	#investBid .content .fc2{
		font-size: .75rem;
		color: #FF7031;
	}
	#investBid .content .fc3{
		font-size: .75rem;
		color: #333;
	}
	#investBid .content .fc4{
		font-size: .85rem;
		color: #333;
	}
	#investBid .content .fc5{
		font-size: 1.2rem;
		color: #333;
	}
	#investBid .content .fc6{
		font-size: .75rem;
		color: #3096FD;
	}
	#investBid .content .fc7{
		font-size: .6rem;
		color: #333;
	}
	#investBid .content .sec2 .numArea{
		margin-top: 1rem;
	}
	#investBid .content .sec2 .numArea .left{
		width: 80%;
	}
	#investBid .content .giftArea{
		margin-top: .6rem;
		padding: .6rem 0 .6rem .6rem;
	}
	#investBid .content .giftArea2{
		width: 82%;
	}
	#investBid .content .giftArea .selectGift{
		width: 92%;
		text-align: right;
		/*padding-right: .6rem;*/
		position: relative;
		top: -.11rem;
	} 
	#investBid .content .invesBtn{
		height: 1.75rem;
		font-size: .75rem;
		color: #fff;
		text-align: center;
		line-height: 1.75rem;
		margin: 1.2rem .6rem 0;
		background-color: #3096FD;
		border-radius: .875rem;
	}
	.myPicker .picker-items-col {
		color:#f00;
		width:100%!important;
	}
	#investBid .content .protocolArea {
		padding: .6rem .6rem 0;
	}
	#investBid .content .protocolArea .fz06 {
		font-size: .6rem;
		line-height: .6rem;
	}
	#investBid .content .protocolArea .color666{
		color: #666;
	}
	#investBid .content .protocolArea  i.icon-form-checkbox{
		width: .7rem;
		height: .7rem;
		border-radius: .15rem;
	}
	#investBid .content .protocolArea  i.icon-form-checkbox:after {
		width: .6rem;
		height: .4rem;
	}
	#investBid .content .protocolArea label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox:after{
		background-size: 100% 100%;
	}
</style>