<template>
	<div id="investBid">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
			<h1 class="title">{{oddTitle}}</h1>
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
						<div class="fc2">{{oddMoneyLast | formatNumber2}}元</div>
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
							<input type="tel" placeholder="0.00" class="fc5" id="moneyNum" v-model="moneyNum" @input="changeMoney"/>
						</div>
						<div class="fc6 tl" @click="maxNum()">最大</div>
					</div>
				</div>
			</div>
			<!--<div class="bg flex  giftArea">-->
			<div class="bg flex  giftArea"  @click="whoUseCoupon()">
			
				<div class="fc1">选择红包</div>
				<div class="giftArea2">
					<!--<input type="text" id="picker" placeholder="查看红包" class="fc7 selectGift" v-model="lotteryName" @click="clicPicker"/>-->
					<input type="text" id="picker" placeholder="查看红包" class="fc7 selectGift" v-model.number="lotteryName" readonly/>
					
					<a class="icon icon-right pull-right"></a>
				</div>
			</div>
			<!--<div class="flex  giftArea fs6" v-if="yutou">
				<label><input type="checkbox" >同意并阅读<a href="#">《智能一键投标协议》</a></label>
			</div>-->
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
				oddNumber:'',//标的标识
				oddTitle:'',//标题
				oddMoneyLast:0,//剩余可投资金额
				fundMoney:0,//账户金额
				oddPeriod:'',//标的期限
				moneyNum:0,//输入的金额
				lotteryId:0,//传回来的券id
				maxM:0,//最大投资
				lotteryName:'',
				values:[],//用来存放红包加息券id
				//yutou:false,
				is:false,
			}
		},
		methods: {
			routerback() {
//				this.$router.go('/detail/'+this.oddNumber)
				this.$router.go(-1)
				window.sessionStorage.setItem('investBid',3)
				window.sessionStorage.removeItem('inputMoneyNum')//清除输入的金额
			},
			changeMoney(){
				window.sessionStorage.setItem('inputMoneyNum',this.moneyNum)
				this.$nextTick(()=>{
					if(Number(this.moneyNum)>Number(this.maxM)){
						this.moneyNum = Number(this.maxM)
					}
				})
			},
			whoUseCoupon(){
				if(this.moneyNum!=0&&this.moneyNum!=''){
					
					let oddMoneyLast = Number(this.oddMoneyLast),moneyNum = Number(this.moneyNum);
					if(moneyNum>oddMoneyLast){
						$.toast('您最大可投'+this.maxM+'元')
						return;
					}else if(moneyNum<50){
						$.toast('起投金额不能小于50元')
						return ;
					}else if(moneyNum%50!=0){
						$.toast('起投金额为50的倍数')
						return;
					}else{
						//window.sessionStorage.setItem('oddPeriod',this.oddPeriod)
						window.sessionStorage.setItem('whoUseCoupon','investBid')
						this.$router.push({name: 'giftCouponUse',query: {id: this.oddNumber}})
					}
				}else{
					$.alert('请先输入购买金额')
				}
			},
			routerT() {
				this.$router.push('/recharge')
			},
			clicPicker() {
				if(this.values.length==0){
					$.alert('无可使用的优惠券')
				}
			},
			setCustodypass(){
				//是否设置存管密码
				let tellPath = this.$route.params.id
				$.confirm(
			        "您还未设置存管密码！</br>是否设置存管密码？",
			        function() {
			            let dataObj = {ret: "/detail/"+tellPath},path = _path.getObj("setCustodypass", dataObj);
			        	window.location.href = path;
			        },function(){
			        	this.$router.go(-1);
			        }.bind(this)
			    );
			},
			getData() {
				this.oddNumber = this.$route.params.id;
				let dataObj = {
						type:'odd',
						id:this.oddNumber
					},
					path = _path.getObj('bidpage',dataObj)
				this.$axios.get(path,{withCredentials: true,emulateJSON:true}).then((res) => {
					//console.log(res)
					if(res.status == 200){
						if(res.data.status == "000000") {
							let data = res.data.data;
							this.oddTitle = data.title;
							this.oddMoneyLast = data.remain;
							this.fundMoney = data.fundMoney;
							this.oddPeriod = data.period;
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
				let dataObjM = {
					oddNumber:this.oddNumber
				},
				paths = _path.getObj('getMaxInvest',dataObjM);
				this.$axios.get(paths,{withCredentials: true}).then((res) => {
					// console.log(res)
					if(res.status === 200){
						let data = res.data;
						if(data.status === "000000"){
							var	dataContent = data.data,maxM = Number(dataContent.money).toFixed(2);
							this.maxM = maxM
						}else{
					      _path.dealStatusCode(data.status,data.msg,this)
					    }
					}
				})
					
			},
			maxNum() {
				this.moneyNum = this.maxM;
			},
			sureInvest() {
				let obj=false,
					moneyNum = Number(this.moneyNum);
					//redVal = $("#picker").data("val");
				
				let oddMoneyLast = this.oddMoneyLast
				if(moneyNum>oddMoneyLast){
					$.toast('您最大可投'+this.maxM+'元')
					return;
				}else if(moneyNum<50){
					$.toast('起投金额不能小于50元')
					return ;
				}else if(moneyNum%50!=0){
					$.toast('起投金额为50的倍数')
					return;
				}
//				if(!!redVal){
//					this.values.find((v,i)=>{
//						if(v.id == redVal){
//							obj = v 
//							return false;
//						}
//					})
//					if(obj.money_lower!=null && obj.money_lower>moneyNum){
//						$.toast('您选择的券要求投资金额大于'+obj.money_lower+'元')
//						return;
//					}else if(obj.money_uper!=null && obj.money_uper<moneyNum){
//						$.toast('您选择的券要求投资金额小于'+obj.money_uper+'元')
//						return;
//					}
//				}
				//console.log([this.oddNumber,this.lotteryId,this.moneyNum])
				let	dataObj = {
						oddNumber: this.oddNumber,
						couponInsId: this.lotteryId || 0,
						money: this.moneyNum,
					},
				path = _path.getObj('bid',dataObj);
				window.location.href = path;
//					this.$axios.get(path,{withCredentials: true}).then((res)=>{
//						$('body').html(res.data)
//						console.log(res)
//					})

			},
			redCoupon() {
				let dataObj = {
						status:'available',
						pageType:0,
						page:1,
						pageSize:100
					},
					path = _path.getObj('moneyLotteries',dataObj)
				this.$axios.get(path,{withCredentials: true}).then((res)=>{
					if(res.status == 200){
						if(res.data.status == "000000"){
							let id = [],name = [],data = res.data.data,oddPeriod = window.sessionStorage.getItem('oddPeriod');
							this.values = data.records;
							oddPeriod = oddPeriod.split('个月')[0]
							// console.log(oddPeriod)
							data.records.forEach((v,i)=>{
								if(v.period_lower != null && oddPeriod < v.period_lower){
									return;
								}
								if(v.period_uper != null && oddPeriod > v.period_uper){
									return;
								}
								let dateVal = v.endtime.split(" ");
								id.push(v.id);
								name.push(v.name + "(" + dateVal[0] + ")")
							})
							//this.values = id;
							//this.displayValues = name;
							if(this.values.length==0){
								return;
							}else{
								$("#picker").picker({
								  toolbarTemplate: '<header class="bar bar-nav">\
								  <button class="button button-link pull-right close-picker">确定</button>\
								  <h1 class="title">请选择券</h1>\
								  </header>',
								  cols: [
								    {
								      textAlign: 'center',
								      values: id,
								      displayValues: name,
								      //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
								    },
							    
								  ],
								  formatValue:function(p, values, displayValues){
								  	// console.log([p, values, displayValues])
								  	$(p.input).data("val",values[0])
								  	return displayValues[0]
								  },
									rotateEffect:true,
									inputReadOnly:true,
									cssClass:"myPicker"
								});
							}
							//this.$picker.picker("setValue", id, name)
							//console.log(id);
							//console.log(name)
						}
					}
				})
			}
		},
		created() {
			this.getData();
//			this.redCoupon()
		},
		mounted() {
			let tellInvestBid = window.sessionStorage.getItem('tellInvestBid')||0,
				inputMoneyNum = window.sessionStorage.getItem('inputMoneyNum')||'';
				//console.log(inputMoneyNum)
			this.moneyNum = inputMoneyNum;
			if(tellInvestBid==1){//1是从红包页面选择了红包后跳转过来
				//console.log(this.moneyNum)
				this.lotteryName = window.sessionStorage.getItem('lotteryName')
				this.lotteryId = window.sessionStorage.getItem('lotteryId')
				window.sessionStorage.setItem('tellInvestBid',0)
			}
		},
		updated(){
			var srceen = document.querySelector('.modal-overlay')
			if(!!srceen&&this.is==false){
			    srceen.addEventListener('click',function(e){
			    	//e.stopImmediatePropagation();
					this.is = true;
			    	e.stopPropagation()
			    }.bind(this))
			}
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
	#investBid input{
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
	.fs6{
		font-size: .6rem;
		padding-bottom: 0!important;
	}
	.fs6 input{
		width: auto!important;
	}
</style>