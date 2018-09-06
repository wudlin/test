<template>
  <div>
    <div id="giftCoupon">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
				<h1 class="title">红包/加息券</h1>
			</header>
			<div class="buttons-tab">
			    <a href="#tab1" class="tabs1 tab-link active button bor">红包</a>
			    <a href="#tab2" class="tabs2 tab-link button">加息券</a>
			</div>
			<div class="content">
				<div class="tabs">
					<div id="tab1" class="tab active">
						<div class="card"  v-for="(red,i) in redLotteries" :key='i'>
							<template v-if="red.status==0&&red.isExpired == 0">
								<!--有效券-->
						    <div class="card-content">
						    	<!--gc-icon0是红色背景gc-icon1是灰色背景-->
						    	<div :class="{'gc-icon':true, 'gc-icon0':(red.status==0 && red.isExpired == 0),'gc-icon1':(red.status==1||red.status== -1||red.isExpired==1)}">
						    		{{red.faceValue}}元
						    	</div>
						    	<!--gcr-icon-1是过期gcr-icon1是使用过-->
						    	<div :class="{'gc-right':true}">
						    		<!--<div class="num" v-if="red.money_lower==null && red.money_uper==null">使用金额：无限制</div>
						    		<div class="num" v-else-if="red.money_lower==null">使用金额：{{red.money_uper}}元以下的投资</div>
						    		<div class="num" v-else-if="red.money_uper==null">使用金额：{{red.money_lower}}元以上的投资</div>
						    		<div class="num" v-else-if="red.money_uper==red.money_lower">使用金额：仅限{{red.money_lower}}元的投资</div>
						    		<div class="num" v-else>使用金额：{{red.money_lower}}-{{red.money_uper}}元的投资</div>-->
						    		
						    		<div class="num">使用金额：{{red.constraints.amount}}</div>-->
						    		<div class="time">
						    			适用月标：{{red.constraints.period}} 
						    			<!--2018.05.23新增区分专用类型SATRT-->
						    			<!--<span style="color: red;" v-if="red.mode=='odd'">(散标专用)</span>
											<span style="color: red;" v-else-if="red.mode=='plan'">(智投专用)</span>
											<span style="color: red;" v-else-if="red.mode=='common'">(通用)</span>-->
											<span style="color: red;">({{red.constraints.style}})</span>
						    		</div>
						    		
						    		<div class="bor"></div>
						    		<div class="validity">有效期至：{{red.expiryDate}}</div>
						    	</div>
						    </div>
						  </template>
						  <template v-else>
								<!--无效券-->
						    <div class="card-content">
						    	<!--gc-icon0是红色背景gc-icon1是灰色背景-->
						    	<div :class="{'gc-icon':true, 'gc-icon0':(red.status==0 && red.isExpired == 0),'gc-icon1':(red.status==1||red.status== -1||red.isExpired==1)}">
						    		{{red.faceValue}}元
						    	</div>
						    	<!--gcr-icon-1是过期gcr-icon1是使用过-->
						    	<div :class="{'gc-right':true,'gcr-icon-1':(red.isExpired==1),'gcr-icon1':(red.status == 1)}">
						    		<div class="num">使用金额：{{red.constraints.amount}}</div>-->
						    		<div class="time">
						    			适用月标：{{red.constraints.period}} 
						    			<!--2018.05.23新增区分专用类型SATRT-->
						    			<!--<span v-if="red.mode=='odd'">(散标专用)</span>
											<span v-else-if="red.mode=='plan'">(智投专用)</span>
											<span v-else-if="red.mode=='common'">(通用)</span>-->
											<span>({{red.constraints.style}})</span>
						    		</div>
						    		<div class="bor"></div>
						    		<div class="validity">有效期至：{{red.expiryDate}}</div>
						    	</div>
						    </div>
						  </template>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
					</div>
					<div class="tab" id="tab2">
						<div class="card"  v-for='(cou,i) in Coupon' :key='i'>
							<template v-if="cou.status==0 && cou.isExpired == 0">
								<!--有效的-->
						    <div class="card-content">
						    	<!--gc-icon0是红色背景gc-icon1是灰色背景-->
						    	<div :class="{'gc-icon':true, 'gc-icon0':(cou.status==0 && cou.isExpired == 0),'gc-icon1':(cou.status==1 || cou.status==-1 || cou.isExpired==1)}" >
						    		+{{Number(cou.faceValue)*100}}%
						    	</div>
						    	<!--gcr-icon-1是过期gcr-icon1是使用过-->
						    	<div :class="{'gc-right':true}" >
						    		<div class="num">使用金额：{{cou.constraints.amount}}</div>-->
						    		<div class="time">
						    			适用月标：{{cou.constraints.period}} 
						    			<!--2018.05.23新增区分专用类型SATRT-->
						    			<!--<span v-if="cou.mode=='odd'">(散标专用)</span>
											<span v-else-if="cou.mode=='plan'">(智投专用)</span>
											<span v-else-if="cou.mode=='common'">(通用)</span>-->
											<span style="color: red;">({{cou.constraints.style}})</span>
						    		</div>
						    		<div class="bor"></div>
						    		<div class="validity">有效期至：{{cou.expiryDate}}</div>
						    	</div>
						    </div>
							</template>
							<template v-else>
								<!--无效的-->
								<div class="card-content">
						    	<!--gc-icon0是红色背景gc-icon1是灰色背景-->
						    	<div :class="{'gc-icon':true, 'gc-icon0':(cou.status==0&&cou.isExpired == 0),'gc-icon1':(cou.status==1 || cou.status==-1 || cou.isExpired==1)}" >
						    		+{{Number(cou.faceValue)*100}}%
						    	</div>
						    	<!--gcr-icon-1是过期gcr-icon1是使用过-->
						    	<div :class="{'gc-right':true,'gcr-icon-1':(cou.isExpired==1),'gcr-icon1':(cou.status == 1)}" >
						    		<div class="num">使用金额：{{cou.constraints.amount}}</div>-->
						    		<div class="time">
						    			适用月标：{{cou.constraints.period}} 
						    			<!--2018.05.23新增区分专用类型SATRT-->
						    			<!--<span v-if="cou.mode=='odd'">(散标专用)</span>
											<span v-else-if="cou.mode=='plan'">(智投专用)</span>
											<span v-else-if="cou.mode=='common'">(通用)</span>-->
											<span>({{cou.constraints.style}})</span>
						    		</div>
						    		<div class="bor"></div>
						    		<div class="validity">有效期至：{{cou.expiryDate}}</div>
						    	</div>
						    </div>
							</template>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<!--<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>-->
						<div v-else-if="status=='noone'"  style="text-align:center;">暂无加息券</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import bus from "@/bus.js";
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";

export default {
  name,
  data() {
    return {
      redLotteries: [], //红包券
      Coupon: [], //加息券
      page: 1,
      pageSize: 200,
      isLoadingMore: false, //判断加载更多
      status: "loading"
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
            this.moneyLotteries(1);
          }else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
        }
      });
    },
    paixuTime(records) {
      let arr = records;
      let result = arr.sort(function(a, b) {
        var a = a.money_rate,
          b = b.money_rate;
        // console.log(a);
        return a < b ? 1 : -1;
      });
      // console.log(result);
      return result;
    },
    didScroll() {
      if (this.isLoadingMore || this.status == 'hide') {return;}
      if ($("#tab1").hasClass("active")) {
      	let $tb1 = $("#giftCoupon .content #tab1"),
      			cs = $("#giftCoupon .content").scrollTop(),
      			tbh = $(document).height(),
      			tbs = $tb1.height()-10;
      		// console.log([cs,tbh,tbs])
        if ( cs + tbh < tbs) {
            this.status = "loading";
            this.page += 1;
            
            this.moneyLotteries(this.page);
        }
      } else if ($("#tab2").hasClass("active")) {
      	let $tb2 = $("#giftCoupon .content #tab2"),
      			cs = $("#giftCoupon .content").scrollTop(),
      			tbh = $(document).height(),
      			tbs = $tb2.height()-10;
        if (cs + tbh < tbs) {
        //   if (!this.isLoadingMore) {
            this.status = "loading";
            this.page += 1;
            this.moneyLotteries(this.page);
        //   }
        }
      }
    },
    //上拉加载
//  loadMore(pag, type) {
//  //   
//    let dataObj = {
//      page: pag,
//      pageSize: this.pageSize,
//      type: type
//    },_this = this;
//    if(this.isLoadingMore) { return; }
//    this.isLoadingMore = true;
//   	this.$axios.interceptors.request.use(function (config) {
//      _this.status = 'loading'
//      return config;
//    }, function (error) {
//      return Promise.reject(error);
//    });
//    this.$axios.get(_path.getObj("investlotteries", dataObj),{withCredentials: true}).then(res => {
//      let data = res.data.data;
//      console.log(res);
//      if (data.records.length == 0) {
////        this.isLoadingMore = true;
//        this.status = "hide";
//      } else {
//        if (type == "invest_money") {
//          this.redLotteries = this.redLotteries.concat(data.records);
//          console.log(this.red);
//          
//        } else if (type == "interest") {
//          this.Coupon = this.Coupon.concat(data.records);
//          console.log(this.Coupon);
//          
//        }
//        this.isLoadingMore = false;
//        this.status = "fail";
//      }
//    });
//  },
    moneyLotteries(page) {
      //投标页面interest存放加息，red存放红包
      //混合包含红包和加息券的需要分类出
			 
			let	dataObj = {
						type: 'all',
						status:'all',
		        page: page,
		        pageSize: this.pageSize,
		      },
    	_this = this,
    	path = _path.getObj("getusercoupons", dataObj);
      this.$axios.interceptors.request.use(function (config) {
        _this.status = 'loading'
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
      this.$axios.get(path,{withCredentials: true}).then(({status,data}) => {
        //请求红包
        // console.log(res);
        if (status == 200) {
          if (data.status == '000000') {
            // let data = data.data;
            if(data.data.records.length==0){
            	this.status = 'noone';
            }else{
            	let redLotteries=[],Coupon=[];
            	data.data.records.forEach((v,i)=>{
            		if(v.type == 'invest_money'){
            			redLotteries.push(v)
            		}else if(v.type == 'interest'){
            			Coupon.push(v)
            		}
            	})
            	this.redLotteries = redLotteries;
            	this.Coupon = Coupon;
            	this.isLoadingMore = false;
         			this.status = "hide";
            }
          }else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
        }
      });
    },
  },
  mounted() {
    this.isLogin();
    $("#giftCoupon .content").scroll(this.didScroll);
  },
  filters,
  //		beforeRouteEnter (to, from,next) {
  //			console.log('二')
  //			 if(from.name=='investManage'){
  //				 next(vm=>{
  //				 	console.log('investManage')
  //				 	window.sessionStorage.setItem('isModifyFlag',1)
  //					vm.Modify()
  //					vm.rightsCoupon()
  ////					 vm.moneyLotteries()
  //					 //禁止点击红包
  //					 $('.tabs1').removeAttr('href')
  //				 })
  //			 }
  ////			 else if(from.name=='autoBidSetting2'){
  ////				next(vm=>{
  ////					window.sessionStorage.setItem('isModifyFlag',0)
  ////					console.log('autoBidSetting2')
  ////					vm.moneyLotteries()
  ////				})
  ////			 }
  //		},
};
</script>
<style src='@/assets/css/me/gift-coupon.css'></style>
