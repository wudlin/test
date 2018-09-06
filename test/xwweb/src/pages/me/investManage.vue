<template>
  <div>
      <div id="investManage">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">投资管理</h1>
			</header>
			<div class="buttons-tab">
			    <a href="#tab0" class="tab-link active button">待收项目</a>
			    <a href="#tab1" class="tab-link button" @click.prevent="getDataEnd(1)">回款项目</a>
			    <a href="#tab2" class="tab-link button" @click.prevent="getUserplans(1)">智能投标</a>
			</div>
			<div class="content">
				<div class="tabs">
					<div id="tab0" class="tab active">
						<div v-for="(ru,i) in run" :key="i" class="card">
						    <div class="card-content">
						      <div  class="card-content-inner">
						      	<div class="a1 a-flex">
						      		<div class="a11 left">
						      			<div>{{ru.time.split(' ')[0]}}</div>
						      			<div>{{ru.time.split(' ')[1]}}</div>
						      		</div>
						      		<div class="a12 right">
						      			<div class="a12-name">{{ru.oddTitle}}</div>
                        <!-- 20180726添加展期字段 -->
						      			<div class="a12-number">
						      				<!-- <div class="money">{{ru.oddMoney|formatNumber0}}元</div> -->
						      				<!-- <div class="time">{{ru.oddPeriod}}</div> -->
                          <!-- 20180801添加年化利率 -->
						      				<div class="money" >年化利率{{ru.oddYearRate|percentFormat1}}</div>
						      				<div class="time" v-if="~~ru.extendYearRate!=0">展期利率{{ru.extendYearRate}}%</div>
						      				<div class="time" v-if="!!ru.extendPeriod">{{ru.oddPeriod}}({{ru.extendPeriod}})</div>
						      				<div class="time" v-else>{{ru.oddPeriod}}</div>
						      			</div>
						      		</div>
						      	</div>
						      	<div class="a2 a-flex">
						      		<div class="a21 left">
						      			<div>{{ru.money|formatNumber0}}元</div>
						      		</div>
						      		<div class="a22 right">
						      			<div class="a22-time">预计到期时间：{{ru.endtime}}</div>
						      			<div class="a22-profit">
						      				到期收益：<span>{{ru.interest|formatNumber2}}</span>元 &#x2000;
						      				<span class="red" v-if="ru.couponInsType=='interest'">已加息</span>
						      				<span class="red" v-else-if="ru.couponInsType=='invest_money'">已抵扣</span>
						      			</div>
						      		</div>
						      	</div>
						      </div>
						    </div>
						    <div class="card-footer">
						    <!--已加息才显示-->
								<!--<router-link v-if="ru.lotteryId==0" :to="'/giftCoupon/'+ru.id">
									<div @click="whoUseCoupon()">未使用</div>
								</router-link>-->
								<!--<a v-if="ru.lotteryId==1" >已加息</a>-->
						    <!-- <a href="#" class="fRight" >明细</a> -->
                <!-- 20180517添加原标 -->
								<router-link :to="{name:'detail',params:{pid:ru.oddNumber,fromPage:'investManage'}}">原标</router-link>
                <router-link class="fRight" :to="{name:'dcDetail1',params:{ids:ru.id}}">明细</router-link>
						    </div>
              </div>
              <div class="infinite-scroll-preloader" v-if="status=='loading'">
                <div class="preloader"></div>
                <div>正在玩命加载中...</div>
              </div>
              <div v-else-if="status=='hide'" class="center">无更多数据</div>
					</div>
					<div id="tab1" class="tab">
						<div v-for="(ru,i) in end" :key="i" class="card">
						    <div class="card-content">
						      <div  class="card-content-inner">
						      	<div class="a1 a-flex">
						      		<div class="a11 left">
						      			<div>{{ru.time.split(' ')[0]}}</div>
						      			<div>{{ru.time.split(' ')[1]}}</div>
						      		</div>
						      		<div class="a12 right">
						      			<div class="a12-name">{{ru.oddTitle}}</div>
						      			<div class="a12-number">
						      				<div class="money">{{ru.oddMoney|formatNumber0}}元</div>
						      				<div class="time">{{ru.oddPeriod}}</div>
						      			</div>
						      		</div>
						      	</div>
						      	<div class="a2 a-flex">
						      		<div class="a21 left">
						      			<div>{{ru.money|formatNumber0}}元</div>
						      		</div>
						      		<div class="a22 right">
						      			<div class="a22-time">预计到期时间：{{ru.endtime}}</div>
						      			<div class="a22-profit">
						      				到期收益：<span>{{ru.interest|formatNumber2}}</span>元&#x2000;
						      				<span class="red" v-if="ru.couponInsType=='interest'">已加息</span>
						      				<span class="red" v-else-if="ru.couponInsType=='invest_money'">已抵扣</span>
						      			</div>
						      		</div>
						      	</div>
						      </div>
						    </div>
						    <div class="card-footer">
						    <!--已加息才显示-->
								<!-- <router-link v-if="ru.lotteryId==0" :to="'/giftCoupon/'+ru.id">未使用</router-link>
								<router-link v-if="ru.lotteryId==1" :to="'/giftCoupon/'+ru.id"已加息</router-link> -->
						    	<!-- <a href="#" class="fRight" >明细</a> -->
								<!-- <router-link class="fRight" :to="'/dcDetail/'+ru.id">明细</router-link> -->
								<!-- <a class="fRight" @click.prevent="detail(ru.id,'investManage')">明细</a> -->
                <router-link class="fRight" :to="{name:'dcDetail2',params:{ids:ru.id,dcInfo:'investManage'}}">明细</router-link>               
						    </div>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" class="center">无更多数据</div>
					</div>
					<div id="tab2" class="tab">
						<div v-if="!autoBidAuth" class="center">
							<p>开通自动投标后即可参与智能一键投标！</p>
							<div class="btn" @click="getAutoAuth">开通自动投标</div>
						  <!-- <div class="btn gray">开通自动债转</div> -->
						</div>
            <template v-else>
              <div v-for="(ru,i) in userplans" :key="i" class="card">
						    <div class="card-content">
						      <div  class="card-content-inner">
						      	<div class="a1 a-flex">
						      		<div class="a11 left">
						      			<div>{{ru.addTime.split(' ')[0]}}</div>
						      			<div>{{ru.addTime.split(' ')[1]}}</div>
						      		</div>
						      		<div class="a12 right">
						      			<div class="a12-name">{{ru.title}}</div>
						      			<div class="a12-number">
						      				<div class="money">{{ru.amount|formatNumber0}}元</div>
						      				<div class="time">{{ru.period}}</div>
						      			</div>
						      		</div>
						      	</div>
						      	<div class="a2 a-flex">
						      		<div class="a21 left">
						      			<div>{{ru.planAmount|formatNumber0}}元</div>
						      		</div>
						      		<div class="a22 right">
						      			<div class="a22-time">预计到期时间：{{ru.endTime}}</div>
						      			<div class="a22-profit">
						      				待收本息：<span>{{ru.stayAmout|formatNumber2}}</span>元 &#x2000;
						      				<span class="red" v-if="ru.couponIns=='interest'">已加息</span>
						      				<span class="red" v-else-if="ru.couponIns=='invest_money'">已抵扣</span>
						      			</div>
						      		</div>
						      	</div>
						      </div>
						    </div>
						    <div class="card-footer">
                <router-link :to="{name:'exDetail',params:{tradeNo:ru.tradeNo}}">详情</router-link>
								<!-- <a class="fRight" @click.prevent="detail(ru.tradeNo,'yutou')">明细</a> -->
                <router-link class="fRight" :to="{name:'dcDetail0',params:{planTradeNo:ru.tradeNo,dcDetail:'yutou'}}">明细</router-link>
						    </div>
              </div>
              <div class="infinite-scroll-preloader" v-if="status=='loading'">
                <div class="preloader"></div>
                <div>正在玩命加载中...</div>
              </div>
              <div v-else-if="status=='hide'" class="center">无更多数据</div>
            </template>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
// import Vuex from 'vuex'
import qs from "qs";
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";

export default {
  name,
  data() {
    return {
      run: [], //待收项目
      end: [], //回款项目
      page: 1, //页码
      pageTr: 1, //债权页码
      pageYt: 1, //债权页码
      page_run:1,
      page_end:1,
      page_all:1,
      isLoadingMore: false, //判断加载更多
      status: "hide",
      pageSize: 5,
      autoBidAuth: "" //自动投标是否授权
      ,userplans:[]//智能一键投标列表
    };
  },
  methods: {
    routerback() {
      window.sessionStorage.setItem("dcDetailGo", "");
      this.$router.push("/me");
    },
    getData(a) {
      if(!!a)this.run =[],this.page_run=1
      let params = { page: this.page_run, pageSize: 5, type: "run" },
        _this = this;
      this.$axios.interceptors.request.use(
        function(config) {
          _this.status = "loading";
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
      this.$axios
        .get(_path.getApiUrl("usertenders"), { withCredentials: true, params })
        .then(({status,data}) => {
          // let r = res.data;
          if (data.status == '000000') {
            if (data.data.records.length == 0) {
              this.isLoadingMore = true;
              this.status = "hide";
            } else {
              this.status = "fail";
              this.run = this.run.concat(data.data.records);
            }
          }
        });
    },
    getDataEnd(a) {
      if(!!a)this.end =[],this.page_end=1
      let params = { page: this.page_end, pageSize: 5, type: "end" };
      this.$axios
        .get(_path.getApiUrl("usertenders"), { withCredentials: true, params })
        .then(({status,data}) => {
          // let r = res.data;
          if(status==200){
            if (data.status == '000000') {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.status = "fail";
                this.end = this.end.concat(data.data.records);
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getUserplans(a) {
      if(!!a)this.userplans =[],this.page_all=1
      let params = { page: this.page_all, pageSize: 5, type: "all" };
      this.$axios.get(_path.getApiUrl("userplans"), { withCredentials: true, params })
        .then(({status,data}) => {
          if(status==200){
            if (data.status == '000000') {
              this.autoBidAuth = data.data.autoBidAuth;
              if (!!data.data.records&&data.data.records.length!=0) {
                this.status = "fail";
                this.userplans = this.userplans.concat(data.data.records);
                // this.$set(this,'userplans',data.data.records)
              } else {
                this.isLoadingMore = true;
                this.status = "hide";
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    didScroll() {
      if (this.isLoadingMore || this.status == "hide") {
        return;
      }
      let tbh0 = $("#investManage .content #tab0").height(),
      tbh1 = $("#investManage .content #tab1").height(),
        tbh2 = $("#investManage .content #tab2").height(),
        cs = $("#investManage .content").scrollTop(),
        dh = $(document).height(),
        $tb0 = $("#tab0"),
        $tb1 = $("#tab1"),
        $tb2 = $("#tab2");
      if ($tb0.hasClass("active")) {
        if (tbh0 - cs < dh) {
          // this.isLoadingMore = true;
          this.status = "loading";
          this.page += 1;
          this.getData()
          // this.loadMore(this.page,"usertenders","run");
        }
      } else if ($tb1.hasClass("active")) {
        if (tbh1 - cs < dh) {
          // this.isLoadingMore = true;
          this.status = "loading";
          this.pageTr += 1;
          this.getDataEnd()
          // this.loadMore(this.pageTr,"usertenders","end");
        }
      }else if ($tb2.hasClass("active")) {
        if (tbh2 - cs < dh) {
          // this.isLoadingMore = true;
          this.status = "loading";
          this.pageYt += 1;
          this.getUserplans()
          // this.loadMore(this.pageYt, "userplans");
        }
      }
    },
    //上拉加载
    loadMore(pag, api,tys) {
      let dataObj = {}
      if(tys){
        dataObj = {
          page: pag,
          pageSize: this.pageSize,
          type: tys
        };
      }else{
        dataObj = {
          page: pag,
          pageSize: this.pageSize,
        };
      }
      this.$axios
        .get(_path.getObj(api, dataObj), { withCredentials: true })
        .then(res => {
          let data = res.data.data;
          if (data.records.length == 0) {
            this.isLoadingMore = true;
            this.status = "hide";
          } else {
            if (api == "usertenders") {
              if(tys=="run"){
                this.run = this.run.concat(data.records);
                this.isLoadingMore = false;
                this.status = "fail";
              }else{
              this.end = this.end.concat(data.records);
              this.isLoadingMore = false;
              this.status = "fail";
              }
            }else if (api == "userplans") {
              this.userplans = this.userplans.concat(data.records);
              this.isLoadingMore = false;
              this.status = "fail";
            }
          }
        });
    },
    detail(ids, name) {
      this.$router.push({
        name: "dcDetail",
        params: { ids: ids, dcDetail: name}
      });
    },
    getAutoAuth() {
      // let obj = { mode: "bid", ret: "/investManage" };
      // window.location.href = _path.getObj("autoAuth", obj);
      this.$router.push('/automaticBid')
    }
  },
  mounted() {
    this.getData();
    // this.getUserplans();
    $("#investManage .content").scroll(this.didScroll);
    let invest = this.$route.params.dcDetailGo;
    // console.log(invest)
    let nav0 = $(".buttons-tab a:eq(0)");
    let nav1 = $(".buttons-tab a:eq(1)");
    let nav2 = $(".buttons-tab a:eq(2)");
    let $tb0 = $("#investManage #tab0");
    let $tb1 = $("#investManage #tab1");
    let $tb2 = $("#investManage #tab2");
    if (invest == "end") {
      this.getDataEnd();
      nav0.removeClass("active");
      $tb0.removeClass("active");
      nav1.addClass("active");
      $tb1.addClass("active");
    } else if (invest == "yutou") {
      this.getUserplans();
      nav0.removeClass("active");
      $tb0.removeClass("active");
      nav2.addClass("active");
      $tb2.addClass("active");
    }
  },
  filters
};
</script>
<style src='@/assets/css/me/investManage.css'></style>