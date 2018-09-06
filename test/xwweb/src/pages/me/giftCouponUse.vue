<template>
  <div>
    <div id="giftCoupon">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
				<h1 class="title">可用红包/加息券</h1>
			</header>
			<div :class="{'content':true, 'giftCouponUse':whoUseCoupon=='autoBidSetting2'}">
				<template v-if="!!Coupon">
					
				<div class="card" id="tab1" v-for="(red,i) in Coupon" :key='i' @click="route(red)" v-if="red.type=='invest_money'" >
			    <template v-if="red.status==0&&red.isExpired == 0">
						<!--有效券-->
				    <div class="card-content">
				    	<!--gc-icon0是红色背景gc-icon1是灰色背景-->
				    	<div :class="{'gc-icon':true, 'gc-icon0':(red.status==0 && red.isExpired == 0),'gc-icon1':(red.status==1||red.status== -1||red.isExpired==1)}">
				    		{{red.faceValue}}元
				    	</div>
				    	<!--gcr-icon-1是过期gcr-icon1是使用过-->
				    	<div :class="{'gc-right':true}">
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
				</div>
				
				<div class="card" id="tab2" v-for='(cou,i) in Coupon' :key='i' @click="route(cou)" v-if="cou.type=='interest'"  >
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
				</div>
				</template>
				<div class="infinite-scroll-preloader" v-if="status=='loading'">
					<div class="preloader"></div>
					<div>正在玩命加载中...</div>
				</div>
				<!--<div v-else-if="status=='hide'|| status=='fail'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>-->
				<div v-else-if="status=='noone'"  style="text-align:center;">暂无可用券</div>
				<div class="cancelUse" @click="cancelUse" v-if="whoUseCoupon=='autoBidSetting2'">不使用优惠券</div>
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
      Coupon: [], //券
      whoUseCoupon: "", //用来存放来自哪个页面的
      page: 1,
      pageSize: 100,
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
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          // console.log(res);
          if (data.status == "000000" && data.data.isLogin == 1) {
            this.moneyLotteries(1);
          } else {
            this.$router.push("/login");
          }
        });
    },
    moneyLotteries(page) {
      //散标投资根据输入金额选择红包
      let _this = this;
      this.$axios.interceptors.request.use(
        function(config) {
          _this.status = "loading";
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
      if(this.whoUseCoupon == "investBid"){
      	let moneyNum = window.sessionStorage.getItem("inputMoneyNum") || null, refNum = this.$route.query.id,
      	dataObj = {
      		amount: moneyNum,
      		refNum: refNum,
      		bidType: 'odd',
        },
        path = _path.getObj("getCouponsByBidAmount", dataObj);
        
        this.$axios.get(path, { withCredentials: true }).then(({status, data }) => {
		      	if (status == 200) {
		            if (data.status == "000000") {
		            		let records = data.data.records;
		            		if (records.length == 0) {
			                this.status = "noone";
			              }else{
			              	this.Coupon = records;
			              	this.status = "hide";
		              	}
		            }else {
		              _path.dealStatusCode(data.status, data.msg, this);
		            }
		       	}
        	
        })
      }else if(this.whoUseCoupon == "autoBidSetting2"){
	      	let dataObj = {
						type: 'all',
	          status: "nouse",
	          page: page,
	          pageSize: this.pageSize,
	        },
	        path = _path.getObj("getusercoupons", dataObj);
	        
	        this.$axios.get(path,{withCredentials: true}).then(({ status,data }) => {
		        	if (status == 200) {
			            if (data.status == "000000") {
			            		let records = data.data.records;
			            		if (records.length == 0) {
				                this.status = "noone";
				              }else{
				              	this.Coupon = records;
				              	this.status = "hide";
			              	}
			            }else {
			              _path.dealStatusCode(data.status, data.msg, this);
			            }
			       	}
	        })
      }
      
      
//    this.$axios
//      .get(path, { withCredentials: true })
//      .then(({ status, data }) => {
//        //请求红包
//        // console.log(res);
//        if (status == 200) {
//          if (data.status == "000000") {
//            // let data = res.data.data;
//            if (data.data.records.length == 0) {
//              this.status = "hide";
//            }else{
//              let Coupon = [],
//                oddPeriod = window.sessionStorage.getItem("oddPeriod");
//              if (this.whoUseCoupon == "investBid") {
//                //如果是购买标页面 需要根据标的期限和输入的金额进行筛选出可使用的券
//                let moneyNum = window.sessionStorage.getItem("inputMoneyNum") || 0;
//                //console.log(data.data.records)
//                data.data.records.forEach((v, i) => {
//                  if (v.period_lower != "" && oddPeriod < v.period_lower) {
//                    return;
//                  }
//                  if (v.period_uper != "" && oddPeriod > v.period_uper) {
//                    return;
//                  }
//                  if (v.money_lower != "" && v.money_lower > moneyNum) {
//                    return;
//                  }
//                  if (v.money_uper != "" && v.money_uper < moneyNum) {
//                    return;
//                  }
//                  Coupon.push(v);
//                });
//              } else {
//                let investMoneyLower = window.sessionStorage.getItem(
//                    "investMoneyLower"
//                  ),
//                  investMoneyUper = window.sessionStorage.getItem(
//                    "investMoneyUper"
//                  );
//                //console.log([investMoneyLower, investMoneyUper]);
//                data.data.records.forEach((v, i) => {
//                  //          			if(v.money_lower!=null && v.money_lower>investMoneyLower){
//                  //										return;
//                  //									}
//                  //									if(v.money_uper!=null && v.money_uper<investMoneyUper){
//                  //										return;
//                  //									}
//                  //									if(v.money_lower==null && v.money_uper<investMoneyLower){
//                  //										return;
//                  //									}
//                  //									if(v.money_uper==null && v.money_lower>investMoneyUper){
//                  //										return;
//                  //									}
//                  Coupon.push(v);
//                });
//              }
//              this.Coupon = this.Coupon.concat(Coupon);
//                //console.log(this.Coupon);
//              this.isLoadingMore = false;
//              this.status = "fail";
//            }
//          } else {
//            _path.dealStatusCode(data.status, data.msg, this);
//          }
//        }
//      });
    },
    route(lottery) {
    		if(!!lottery.name && !!lottery.id){
		    	$.confirm(
		        "确定使用优惠券?",
		        function() {
		          window.sessionStorage.setItem("lotteryName", lottery.name);
		          window.sessionStorage.setItem("lotteryId", lottery.id);
		          window.sessionStorage.setItem("tellInvestBid", 1);
		          this.$router.go(-1);
		        }.bind(this)
		      );
    		}
//    if (status == 1 && isExpired == "0") {
//      if (this.whoUseCoupon == "investBid") {
//        let moneyNum = window.sessionStorage.getItem("inputMoneyNum");
//        if (money_lower != "" && money_lower > moneyNum) {
//          $.alert("您选择的券要求投资金额大于" + money_lower + "元");
//          return;
//        } else if (money_uper != "" && money_uper < moneyNum) {
//          $.alert("您选择的券要求投资金额小于" + money_uper + "元");
//          return;
//        } else {
//          $.confirm(
//            "确定使用优惠券?",
//            function() {
//              window.sessionStorage.setItem("lotteryName", lotteryName);
//              window.sessionStorage.setItem("lotteryId", lotteryId);
//              window.sessionStorage.setItem("tellInvestBid", 1);
//              this.$router.go(-1);
//            }.bind(this)
//          );
//        }
//      } else if (this.whoUseCoupon == "autoBidSetting2") {
//        $.confirm(
//          "确定使用优惠券?",
//          function() {
//            window.sessionStorage.setItem("lotteryName", lotteryName);
//            window.sessionStorage.setItem("lotteryId", lotteryId);
//            window.sessionStorage.setItem("tellInvestBid", 1);
//            this.$router.go(-1);
//          }.bind(this)
//        );
//      }
//    }
    },
    cancelUse() {
      window.sessionStorage.setItem("tellInvestBid", 1);
      this.$router.go(-1);
    }
  },
  mounted() {
    window.sessionStorage.setItem("lotteryName", "");
    window.sessionStorage.setItem("lotteryId", 0);
    window.sessionStorage.setItem("redPage", 1);
    let whoUseCoupon = window.sessionStorage.getItem("whoUseCoupon");
    this.whoUseCoupon = whoUseCoupon;
    console.log(this.whoUseCoupon);
    this.isLogin();
    //$("#giftCoupon .content").scroll(this.didScroll);
  },
  filters
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
<style src='@/assets/css/me/gift-coupon.css'>

</style>
