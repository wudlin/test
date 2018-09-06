<template>
    <div id="dcDetail">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">明细</h1>
			</header>
				<div class="dcd-head">
					<div>期数</div>
					<div>还款时间</div>
					<div>应还本息</div>
					<div>实还本息</div>
				</div>
			<div class="content">
				<table border="0" cellspacing="0">
					<tr v-for='(dc,i) in dcDetail' :key='i'>
						<td>{{dc.qishu}}</td>
						<td>{{dc.endtime}}</td>
						<td>{{dc.amount|formatNumber2}}</td>
						<td>{{dc.realMoney|formatNumber2}}</td>
					</tr>
				</table>
			<div class="infinite-scroll-preloader" v-if="status=='loading'">
		        <div class="preloader"></div>
		        <div>玩命加载中...</div>
		    </div>
		    <div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
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
                dcDetail:[] ,
                page:1,//
				pageSize:25,//
				dcDetailFrom:'',
				content:'',
				status:'loading',//
      			isLoadingMore: false, //判断加载更多
            }
        },
        methods:{
            routerback(){
				if(this.dcDetailFrom=='can'){
					this.$router.push({name:'debtCession',params:{dcDetailGo:'can'}})
				}else if(this.dcDetailFrom=='repay'){
					this.$router.push({name:'debtCession',params:{dcDetailGo:'repay'}})
				}else if(this.dcDetailFrom=='over'){
					this.$router.push({name:'debtCession',params:{dcDetailGo:'over'}})
				}else if(this.dcDetailFrom=='investManage'){
					this.$router.push({name:'investManage',params:{dcDetailGo:'end'}})
				}else if(!!this.$route.params.planTradeNo){
					this.$router.push({name:'investManage',params:{dcDetailGo:'yutou'}})					
				}else{
					this.$router.go(-1)
				}
			},
            getDate(page){
     			let _this = this
				this.$axios.interceptors.request.use(function (config) {
					_this.status = 'loading'
					return config;
				}, function (error) {
					return Promise.reject(error);
				});
				let obj={}
				obj = {oddMoneyId:this.$route.params.ids,page:page,pageSize:this.pageSize}
				if(!!this.$route.params.planTradeNo){
					obj = {planTradeNo:this.$route.params.planTradeNo,page:this.page,pageSize:this.pageSize}
				}
				this.$axios.get(_path.getObj('repaymentDetail',obj),{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							if(data.data.records.length!=0){
								// this.dcDetail = data.data.records
	          					this.dcDetail = this.dcDetail.concat(data.data.records);
								// this.content='k'
								this.status = "fail";
							}else{
								this.status = 'hide'
							}
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})
			},
		didScroll() {
			var contentHeight = $("#dcDetail .content").height(); // 页面的文档高度
			var scrollTop = $("#dcDetail .content").scrollTop();// 浏览器的高度
			var scrollH = $("#dcDetail .content").prop("scrollHeight") - 10;
			if (this.isLoadingMore || this.status == 'hide') { return; }
			if (contentHeight + scrollTop >=  scrollH) {
				this.page += 1;
				this.getDate(this.page);
			}
    },
        },
        mounted(){
			this.getDate()
			this.dcDetailFrom = this.$route.params.dcInfo||this.$route.params.dcDetail
    		$("#dcDetail .content").scroll(this.didScroll);
			// console.log(this.dcDetailFrom)
		},
		filters,
    }
</script>
<style src='@/assets/css/me/dcDetail.css'>
</style>