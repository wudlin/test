<template>
  <div>
		<pageNav v-if='navigation' @navshow="navigation=!navigation"></pageNav>
    <div id="news">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
			<h1 class="title">资讯</h1>
			<!--<router-link to="/pageNav">-->
				<a class="icon pull-right xwsd-menu open-panel" data-panel='#panel-right1' @click.prevent="navigation=true"></a>
			<!--</router-link>-->
		</header>
		<div class="content">
			<div class="information">
				<div class="head">
					<span class="h-icon"></span>
					<span class="h-text">网站公告</span>
				</div>
				<ul class="info-content">
						<!--<router-link to="/" v-for="(record,i) in records" tag="li" class="info-list" >-->
							<li v-for="(record,i) in records" class="info-list" :key='i' @click="(e) => getInfoContent(e,record.id)">
								<a v-html = "record.title">{{record.title}}</a>
							</li>
						<!--</router-link>-->
				</ul>
			</div>
			<div class="infinite-scroll-preloader" v-if="status=='loading'">
	        <div class="preloader"></div>
	        <div>玩命加载中...</div>
	    </div>
	    <div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
		</div>
	</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5.js'
import pageNav from '@/pages/page-nav'
  export default{
		name:'app',
		data() {
			return {
				page: 1,
				pageSize:15,
				records:[],
				navigation:false,
				isNowLogin:false,//登录标识
				status:'hide',
				isLoadingMore: false, //判断加载更多
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			didScroll() {
	      // 页面的文档高度
	      var contentHeight = $("#news .content .info-content").height();
	      var scrollTop = $("#news .content").scrollTop();
	      // 浏览器的高度
	      var windowH = $(document).height();
			if(this.isLoadingMore){return;}
	      if (windowH + scrollTop - 50>=  contentHeight) {
	        this.status = "loading";
	        this.page += 1;
	        this.loadMore(this.page);
		    }
	    },
	    //上拉加载
	    loadMore(page) {
	    	// console.log('load'+page)
	      this.isLoadingMore = true;
	      let dataObj = {
	      	page:page,
	      	pageSize:this.pageSize
	      },
	      path = _path.getObj('infos', dataObj)
				this.$axios.get(path,{withCredentials: true}).then((res)=> {
					if(res.status == 200){
						if(res.data.status == "000000"){
							let data = res.data.data;
							if(data.records.length==0){
								 this.isLoadingMore = true;
								 this.status = 'hide'
							}else{
								this.records = this.records.concat(data.records);
								this.isLoadingMore = false;
								this.status = "fail";
							}
						}else{
							_path.dealStatusCode(res.data.status,res.data.msg,this)
						}
					}
				}).
				catch((res)=>{
					this.isLoadingMore = false;
					alert("加载更多失败，请再次尝试");
				}) 
				
	    },
			getData(currentPage) {
				let dataObj = {
					page:currentPage,
					pageSize:this.pageSize,
					type:'notice',
				},
				vm = this,
				path = _path.getObj('infos',dataObj)
				this.$axios.interceptors.request.use(function (config) {
	        vm.status = 'loading'
	        return config;
	      }, function (error) {
	        return Promise.reject(error);
	      });
				this.$axios.get(path,{withCredentials: true}).then((res)=>{
					 //console.log(res)
					if(res.status === 200){
						let data = res.data
						if(data.status === "000000"){
							let dataContent = data.data;
//							dataContent.records.map(function(val,index){
//								return val.title =  vm.traText(val.title)
//							}) 
							if(dataContent.records.length>0){
								this.records = dataContent.records
							}else{
								this.status = 'hide'
							}
						}else{
							_path.dealStatusCode(data.status,data.msg,this)
						}
					}else{
						$.alert('网络异常请重试', function () {
		          this.getData();
		        });
					}
				})
			},
			getInfoContent(event,id) {
				this.$router.push({ name: 'newsDetail', params: { newId: id }})
			},
			btns(){
				this.navigation=!this.navigation
			}
		},
		created() {
			this.getData(1)
		},
		mounted(){
			$("#news .content").scroll(this.didScroll);
			this.$store.state.newPage = 0
			this.$store.state.loan = 1
		},
		components:{
			pageNav
		}
  }
</script>
<style src='@/assets/css/index/news.css'>
</style>
