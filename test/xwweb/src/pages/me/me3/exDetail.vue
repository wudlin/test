<template>
    <div id="exDetail">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">详情</h1>
			</header>
			<div class="content" v-if="status=='000000'">
				<div class="card" v-if="!!userplandetail">
					<div class="card-header"><span class="blank">{{userplandetail.title}}</span>
					<!-- <span class="blue">【查看项目合同】</span> -->
					</div>
					<div class="card-content">
						<div class="card-content-inner">
							<div class="card-p"><span>预购买金额：{{userplandetail.amount|formatNumber0}}元</span><span>投资周期：{{userplandetail.period}}</span></div>
							<div class="card-p"><span>年化利率：{{userplandetail.yearRate|percentFormat1}}+{{userplandetail.reward|percentFormat1}}</span><span>发标时间：{{userplandetail.openTime}}</span></div>
							<div class="card-p"><span>还款方式：{{userplandetail.repayType}}</span><span>投资时间：{{userplandetail.time}}</span></div>
							<div class="card-p"><span>项目状态：{{userplandetail.status}}</span><span>到期时间：{{userplandetail.endTime?userplandetail.endTime:'--'}}</span></div>
						</div>
					</div>
				</div>
				<div v-if="!!records" v-for="rec in records" class="card mini">
					<div class="card-content">
						<div class="card-content-inner">
							<div class="card-p blank">标的名称：{{rec.oddTitle}}</div>
							<div class="card-p">
								<span>购买金额：{{rec.money|formatNumber0}}元</span>
								<!-- <span>发标时间：2017-10-29</span> -->
								<span class="blue"><a :href="rec.protocolUrl" target="_blank">【查看标的合同】</a></span>
							</div>
							<!-- <div class="card-p disf"></div> -->
						</div>
					</div>
				</div>
			</div>
			<div v-else class="content center">
				<span>项目复审中</span>
			</div>
		</div>
</template>
<script>
import _path from '@/assets/js/md5'
import filters from "@/assets/js/formatAll";

    export default {
		name,
		data(){
            return{
				userplandetail:{}//详情
				,records:[]//
				,status:''
				,info:''
            }
        },
        methods:{
            routerback(){
				this.$router.push({name:'investManage',params:{dcDetailGo:'yutou'}})					
			},
            getUserplandetail(){
				let obj = {tradeNo:this.$route.params.tradeNo}
				this.$axios.get(_path.getObj('userplandetail',obj),{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							this.status =data.status
							// console.log(data.data)
							this.$set(this,'userplandetail',data.data)
							this.$set(this,'records',data.data.records)
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})
            }
        },
        mounted(){
			this.getUserplandetail()
		},
		filters,
    }
</script>
<style src='@/assets/css/me/exDetail.css'>
</style>