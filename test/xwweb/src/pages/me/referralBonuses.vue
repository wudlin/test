<template>
		<div id="referralBonuses">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
				<h1 class="title">推荐奖励</h1>
				<!--<a class="external button button-link pull-right"><img src="/static/img/me/referralBonuses/Recommend_share.png" alt=""></a>-->
			</header>
			<div class="content">
				<div class="con-head">
					<img src="/static/img/me/referralBonuses/Recommend_banner.png" alt="">
				</div>
				<div class="flex fixed bg rb-head">
					<div class="w30">好友</div>
					<div class="w20">级别</div>
					<div class="w20">推荐奖励</div>
					<div class="w30">注册时间</div>
				</div>
				<div class="rb-list" v-for="(rec,i) in records">
					<div class="flex borderb">
						<div class="w30">{{rec.username}}</div>
						<div class="w20">{{rec.level}}级</div>
						<div class="w20">{{rec.money}}</div>
						<div class="w30">
							{{rec.time}}
						</div>
					</div>
				</div>
				<div class="infinite-scroll-preloader" v-if="status=='loading'">
					<div class="preloader"></div>
					<div>正在玩命加载中...</div>
				</div>
				<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
				<div v-else-if="records.length==0"  style="text-align:center;">暂无数据</div>
			</div>
			<div class="screen" v-if="show1"></div>
			<div class="tipLayer" v-if="show2">
				<div class="titleArea">{{links}}<br />推荐链接已复制</div>
				<div class="sureBtn" @click="sureBtn">确定</div>
			</div>
			<div class="extractLayer" v-if="show">
				<div class="sec1">
					<div class="line1">
						<span class="fz06 colorGray">累计获得推荐奖励：</span>
						<span class="fz75 colorOrange">{{spreadMoney}}元</span>
					</div>
					<div class="line2">
						<span class="fz06 colorGray">剩余可提取推荐奖励：</span>
						<span class="fz75 colorOrange">{{lastSpreadMoney}}元</span>
					</div>
					<div class="line3">
						<span class="fz06 colorGray">提取金额</span><input type="text" v-model="money"/>
					</div>
				</div>
				<div class="sec2">
					<div class="close fz75 colorGray" @click="close">关闭</div>
					<div class="extract fz75" @click="extractMoney">提取</div>
				</div>
			</div>
			<div class="BtnArea">
				<div class="extractBtn" @click="extractReward">提取推荐奖励</div>
				<div class="fecfBtn" @click="recommend" :data-clipboard-text="links" id="copy">推荐好友</div>
			</div>
		</div>
</template>
<script>
import _path from '@/assets/js/md5'
import Clipboard from 'clipboard';
    export default{
		name,
		data(){
			return{
				show:false,
				show1:false,
				show2:false,
				money:'',
				records:[],
				links:'',//推广链接,复制内容
				spreadMoney:'',//	推荐奖励
				lastSpreadMoney:'',//剩余推荐奖励
//				copyContent:'',//复制内容
				status: "loading",
				page: 1,
	      		pageSize: 10,
	      		isLoadingMore: false, //判断加载更多
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			//判断登录状态
		    isLogin() {
		      let path = _path.getApiUrl("islogin");
		      this.$axios.get(path,{withCredentials: true}).then(res => {
		        // console.log(res);
		        if (res.data.status == '000000') {
		            this.getFriendMoney(1).then(() => {
						var clipboard = new Clipboard('#copy');
						clipboard.on('success',(e)=> {
							$.alert(this.links+'</br>推荐链接已复制')
							e.clearSelection();
							//clipboard.destroy();
						});
						if(!Clipboard.isSupported()){
							$('#copy').click()
						}
					});
		        } else {
		          this.$router.push("/login");
		        }
		      });
		    },
		    sureBtn(){
		    	this.show1 = false;
		    	this.show2 = false;
		    },
			extractReward() {
				this.show = true;
				this.show1 = true;
			},
			recommend() {
//				var clipboard = new Clipboard('#copy');
				var copyData = $('#copy').data('clipboard-text');
				if(!Clipboard.isSupported()){
					if(copyData!=''&&copyData!=undefined){
						$.alert(this.links+'</br>推荐链接已复制')
					}else{
						$.alert('推荐链接复制失败')
					}
				}else if(navigator.userAgent.indexOf("UCBrowser")>-1){
//					alert(this.links+'推荐链接已复制')
					this.show1 = true
					this.show2 = true
				}
				
			},
			close() {
				this.show = false
				this.show1 = false;
			},
			extractMoney() {
				if(this.money!=''){
					let dataObj = {
							money:this.money
						},
						path = _path.getApiUrl('extractMoney')
					this.$axios.post(path,_path.postObj(dataObj),{emulateJSON: true,withCredentials: true}).then(res=>{
						console.log(res)
						if(res.status == 200){
							if(res.data.status == "000000"){
								$.alert("提取"+res.data.msg)
							}else{
								_path.dealStatusCode(res.data.status,res.data.msg,this)
							}
						}else{
							$.alert(res.msg)
						}
					})
					
				}else{
					$.alert('提取金额不能为空')
				}
			},
			getFriendMoney(page){
				let _this = this,
					obj = {page:page,pageSize:this.pageSize},
					path = _path.getObj('spread',obj),
					func = (resolve, reject) => {
//						this.$axios.interceptors.request.use(function (config) {
//					        _this.status = 'loading'
//					        return config;
//					    }, function (error) {
//					        reject(error);
//					    });
						this.$axios.get(path,{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
							// console.log(res)
							if(status == 200){
								if(data.status == '000000'){
									let r = data.data
									this.links = r.link;
									this.spreadMoney = r.spreadMoney;
									this.lastSpreadMoney = r.lastSpreadMoney;
									if(r.records.length==0){
						            	this.status = 'hide';
						            }else{
						            	this.records = this.records.concat(r.records)
						            	this.status = "fail";
						            }
					            	this.isLoadingMore = false;
					            	resolve()
					            	return;
								}else {
									_path.dealStatusCode(data.status, data.msg, this);
								}
							}
						},function (error) {
					        reject(error);
					    })
					}
				return new Promise(func);
			},
			didScroll() {
				var contentHeight = $("#referralBonuses .content").height(); 
				var scrollTop = $("#referralBonuses .content").scrollTop();
				var scrollH = $("#referralBonuses .content").prop("scrollHeight") - 40;
				var headH = $('.con-head').height()
//				console.log([contentHeight,scrollTop,scrollH,headH])
				if(scrollTop>=headH){
					$('.rb-head').addClass('fixedHead')
				}else{
					$('.rb-head').removeClass('fixedHead')
				}
		      	if (this.isLoadingMore || this.status == 'hide') {return;}
		      	if (contentHeight + scrollTop >=  scrollH) {
		        	this.page += 1;
		        	this.status = 'loading'
		        	this.getFriendMoney(this.page);
		    	}
	    	},
		},
		mounted(){
			this.isLogin()
//			this.getFriendMoney(1)
			$("#referralBonuses .content").scroll(this.didScroll);
//			alert(navigator.userAgent.indexOf("UCBrowser"))
		},
  }
</script>
<style src='@/assets/css/me/referralBonuses.css'>
</style>
