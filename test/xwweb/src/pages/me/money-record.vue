<template>
  <div>
      <div id="money-record">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">资金记录</h1>
			</header>
			<div class="content infinite-scroll">
				<!--<div class="pull-to-refresh-layer">
		        <div class="preloader"></div>
		        <div class="pull-to-refresh-arrow"></div>
		    </div>-->
				<div class="card" v-for="(record,i) in records">
				    <div class="card-content">
				       <div class="card-content-inner">
				       		<div class="mr-left">
				       			<div class="mr-icon">
				       				<img :src="'../../../static/img/me/moneyRecord/'+record.newtypeKey+'.png'" alt="" />
				       				<span class="mr-title">{{record.type}}</span>
				       			</div>
				       			<div class="mr-time">{{record.time}}</div>
				       		</div>
				       		<div class="mr-right">
				       			<span v-if="record.mode=='in'" class="mr-icon">收</span>
				       			<span v-else-if="record.mode=='out'" class="mr-icon">支</span>
				       			<span v-else-if="record.mode=='unfreeze'" class="mr-icon">支</span>
				       			<span v-else-if="record.mode=='freeze'" class="mr-icon">支</span>
				       			<span class="mr-num">{{record.money | formatNumber2}}</span>
				       		</div>
				       </div>
				    </div>
				</div>
				<!--<div class="mr-cm">
					<div>
						<div class="text">共计交易</div>
						<div class="num">0</div>
					</div>
					<div>
						<div class="text">总共金额</div>
						<div class="num">0</div>
					</div>
				</div>-->
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
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
export default {
  name,
  data() {
    return {
      page: 1, //页码
      pageSize: 10, //每页显示数量
      records: [],//数据
      status:'loading',//
      isLoadingMore: false, //判断加载更多
    };
  },
  methods: {
    routerback() {
      this.$router.go(-1);
    },
    //判断登录状态
    isLogin() {
      let path = _path.getApiUrl("islogin");
      this.$axios.get(path,{withCredentials: true}).then(({status,data}) => {
        if(status==200){
          if (data.status == '000000'&&data.data.isLogin==1) {
            this.getData(1);
          }else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
        }
      });
    },
		typeKeyAll(records){
			records.forEach(function(v,i){
	  		if(v.typeKey=='nor-tfrecharge'||v.typeKey=='nor-recharge'){
					v.newtypeKey = 'recharge';
				}else if(v.typeKey=='nor-tender'||v.typeKey=='nor-crtr'||v.typeKey == 'nor-cancel-tender'){
					v.newtypeKey = 'tender';
				}else if(v.typeKey=='fee-interest'||v.typeKey=='fee-crtr'||v.typeKey == 'fee-withdraw'||v.typeKey == 'fee-loan'){
					v.newtypeKey = 'fee';
				}else if(v.typeKey=='rpk-spread'||v.typeKey=='rpk-newuser'||v.typeKey == 'rpk-normal' ||v.typeKey == 'rpk-interest' ||v.typeKey == 'rpk-investmoney'){
					v.newtypeKey = 'rpk';
				}else if(v.typeKey=='nor-curprofit'||v.typeKey=='nor-recvpayment'){
					v.newtypeKey = 'recorded';
				}
				else {
					v.newtypeKey=v.typeKey ;
				}
	  	})
			return records
		},
    getData(page) {
      let dataObj = {
      	page:page,
      	pageSize:this.pageSize
      },
      _this = this,
      path = _path.getObj("moneyLog", dataObj);
      this.isLoadingMore = true;
      this.$axios.interceptors.request.use(function (config) {
        _this.status = 'loading'
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
	    this.$axios.get(path,{withCredentials: true}).then(({status,data}) => {
	      if (status == 200) {
	        // let data = res.data;
	        if (data.status == '000000') {
	          let dataContent = data.data;
	          if(dataContent.records.length != 0){
	          	let records = this.typeKeyAll(dataContent.records)
	          	this.records = this.records.concat(records);
	          	this.status = "fail";
	          }else{
	          	this.status = 'hide'
	          }
	          this.isLoadingMore = false;
	        }else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
	      }
	    }).catch((res)=>{
				this.isLoadingMore = false;
				alert("加载更多失败，请再次尝试");
			});
    },
    didScroll() {
      var contentHeight = $("#money-record .content").height(); // 页面的文档高度
      var scrollTop = $("#money-record .content").scrollTop();// 浏览器的高度
      var scrollH = $("#money-record .content").prop("scrollHeight") - 10;
      if (this.isLoadingMore || this.status == 'hide') { return; }
      if (contentHeight + scrollTop >=  scrollH) {
        this.page += 1;
        this.getData(this.page);
	    }
    },
  },
  created() {
    this.isLogin()
	},
	mounted(){
    $("#money-record .content").scroll(this.didScroll);
	},
  filters
};
</script>
<style src="@/assets/css/me/money-record.css">
</style>
