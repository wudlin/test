<template>
  <div>
      <div id="debt">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">债权详情</h1>
			</header>
			<div class="content">
				<div class="pinfo">
					<div class="pname">
						<span class="picon"></span>
						<span class="nameT">
							{{res.title}}
							<!--20180802打折标识-->
							<span v-if="Number(res.pdRate)<0" style="position: absolute; left: 9.5rem; top: .75rem;background-color: #F77226;font-size: 0.6rem;color: #fff;padding: 1px 4px; border-radius: 3px;line-height: .8rem;">
								{{10-Math.abs(res.pdRate*10)}}折
							</span>
							<!--20180802奖励标识-->
						</span>
					</div>
					<div class="rtext" v-if="res.oddRepaymentStyle== 'monthpay' ">年化利率(按月付息)</div>
					<div class="rtext" v-else>年化利率(等额本息)</div>
					<div class="rnum" style="position: relative;">
						{{res.oddYearRate| percentFormat}}<small>%</small>
					</div>
					<div class="pbid">
						<div>
							<div class="num">{{res.money}}</div>
							<div class="text">债权本金(元)</div>
						</div>
						<div>
							<div class="num">{{res.remainDay}}天</div>
							<div class="text">剩余计息天数</div>
						</div>
						<div>
							<div class="num">{{res.moneyLast}}</div>
							<div class="text">剩余可买(元)</div>
						</div>
					</div>
					<div class="progress">
						<div class="fill" :style="{'width':res.schedule<0 ? res.schedule=0 : res.schedule && res.schedule>100 ? res.schedule=100 : res.schedule + '%'}"></div>
					</div>
					<div class="repayment">
						<span class="typeT">还款方式</span>
						<span class="type" v-if="res.oddRepaymentStyle== 'monthpay' ">按月付息</span>
						<span class="type" v-else>等额本息</span>
						<span class="rate">{{res.schedule<0 ? res.schedule=0 : res.schedule && res.schedule>100 ? res.schedule=100 : res.schedule }}%</span>
					</div>
				</div>
				<div class="pr">
					<span class="pr-icon"></span>
					<span class="pr-text">债权介绍</span>
				</div>
				<div class="pr-content sec1">
					<div class="leftArea">
						<div><span class="color666 paddR">债转用途</span>个人资金周转</div>
					</div>
					<div class="rightArea"><span class="color666 paddR">借款用途 </span>个人资金周转</div>
				</div>
				<div class="pr">
					<span class="pr-icon"></span>
					<span class="pr-text">购买记录</span>
				</div>
				<div class="pr-content">
					<dl>
						<dt>
							<div>购买用户</div>
							<div>购买金额</div>
							<div>购买时间</div>
						</dt>
						<div>
							<dd v-for="(rec,i) in buyrecords" :key="i">
								<div>{{rec.username}}</div>
								<div>{{rec.money}}元</div>
								<div class="bt">
									<div>{{rec.time.split(' ')[0]}}</div>
									<div>{{rec.time.split(' ')[1]}}</div>
								</div>
							</dd>
							<div v-if="totalPage>currentPage" @click='viewm()' class="viewm">查看更多</div>
						</div>
						<div v-if='buyrecordsNull' class='Null'>暂无 数 据</div>
					</dl>
				</div>
				<template v-if="!!res.progress">
					<a class="inventI" v-if="res.progress=='start'&&res.moneyLast!=0" @click="immCast()">承接</a>
					<a class="inventI gray" v-else-if="res.progress=='start'&&res.moneyLast==0" >复审中</a>
					<a class="inventI gray" v-else>已出售</a>
				</template>
			</div>
		</div>
  </div>
</template>
<script>
	import _path from '@/assets/js/md5'
	import filters from '@/assets/js/formatAll'

    export default{
		name:'app',
		data(){
			return {
				res:{},//详细信息
				buyrecords:[],//购买记录
				page:1,
				pageSize:3,
				totalPage:0,//总页面数
				isNowLogin:false,//登录标识
				currentPage:1,//当前页码
				buyrecordsNull:false,//数据是否为空
				dcDetail:'',
				project:'',//
			}
		},
		methods:{
			routerback(){
				if(this.dcDetail=='sell'){
					this.$router.push({ name: 'debtCession', params: { dcDetailGo:'sell'}})
				}else if(this.project=="debt"){
					// this.$router.push({ name: 'crtrs'})
					this.$router.go(-1)
				}else{
					let ids = window.sessionStorage.getItem('crtrsid')
					this.$router.push({ name: 'crtrs',params:{id:ids}})
				}
			},
			getData() {
				let path = '',pid = this.$route.params.pid,
				dataObj = {
					id:pid
				};
				path = _path.getObj('crtr',dataObj)
				this.$axios.get(path,{withCredentials: true}).then((res)=>{
					if(res.status == 200){
						if(res.data.status == "000000"){
							let data = res.data.data;
							this.res = data
							//window.sessionStorage.setItem('debtid',data.id);//传入下个页面的债权id
						}else{
				      _path.dealStatusCode(res.data.status,res.data.msg,this)
				    }
					}
				})
			},
			getRecords(pageNum){
				let path='',pid = this.$route.params.pid,
				dataObj = {
					page:pageNum,
					pageSize:this.pageSize,
					id:pid
				};
				path = _path.getObj('buyrecords',dataObj)
				this.$axios.get(path,{withCredentials: true}).then(res=>{
					if(res.status == 200){
						if(res.data.status == "000000"){
							let data = res.data.data;
							if(data.records.length>0){
								let buyrecords = this.buyrecords.concat(data.records);
								this.$set(this, "buyrecords", buyrecords);
								this.buyrecordsNull = false;
							}else{
								this.buyrecordsNull = true;
							}
							this.totalPage = Math.ceil(data.count/this.pageSize);
							this.currentPage = data.count;
						}else{
				      _path.dealStatusCode(res.data.status,res.data.msg,this)
				    }
					}
				})
			},
			viewm(){
				this.page = this.page + 1;
				this.getRecords(this.page)
			},
			immCast() {
				let path = _path.getApiUrl('islogin')
				this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
	      	if(status==200){
	      		if (data.status == "000000"&&data.data.isLogin==1) {
	      		  this.isNowLogin = true;
	      		  this.$router.push('/continueDebt/'+this.res.id)
	      		}else{
		    			this.$router.push('/login/1')
		    		}
	      	}
	      });
			}
		},
		mounted(){
			this.getData()
			this.getRecords(1)
			this.dcDetail = this.$route.params.dcDetail
			this.project = this.$route.params.project
		},
	
		filters
    }
</script>

<style src='@/assets/css/projects/debt.css'>
</style>
