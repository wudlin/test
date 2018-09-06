<template>
  <div>
    <pageNav v-if='navigation' @navshow="navigation=!navigation"></pageNav>
        <!--项目页面-->
		<div  id="projects">
			<header class="bar bar-nav">
				<h1 class="title">项目</h1>
				<a @click.prevent="navigation=true" :class="navStyle.sidebar" data-panel='#panel-right'></a>
				<a @click.prevent="yutouReqs" :class="navStyle.confirm0">确认</a>
				<a @click.prevent="reqs" :class="navStyle.confirm1">确认</a>
			</header>
			<div class="buttons-tab" >
					<a @click.prevent="topnav(0)" href='#tab0' class="yu tab-link active button ">智能投标<span :class="navStyle.yu"></span></a>
					<a @click.prevent="topnav(1)" href='#tab1' class="san tab-link button ">散标投资<span :class="navStyle.san"></span></a>
					<a @click.prevent="topnav(2)" href='#tab2' class="zai tab-link button ">债权转让</a>
			</div>
			<div class="content" >
		    <div class="tabs">
          <div id="tab0" class="tab active">
            <!-- 立即投标 -->
					  <router-link class="list-container" :to="'preInvestDetail/'+rec.planId" v-model="records" v-for="(rec,i) in plans" :key='i'>
			    		<div :class="{'card':true,'bid':true,'review':rec.progress=='review','tofill':rec.type=='tofill','end':rec.progress=='end'} " @click="rec.type=='bid'?'':rec.type=='consumption'?'':isFinish(rec.isFinish)">
			        		<div class="card-content">
			        			<div class="card-content-inner">
									<div class="bid-title">
										<!-- 20180510 预图标改智 -->
                    <!-- <span v-if="rec.type=='bid'" class="title-icon yutou"></span> -->
										<!-- <span v-else class="title-icon yutou1"></span> -->
										<span v-if="rec.type=='bid'" class="title-icon zhi"></span>
										<span v-else class="title-icon zhi1"></span>
										<span :class="rec.type=='bid'?'text':'text nolightc'">{{rec.title}}</span>
									</div>
									<div class="bid-content">
										<div class="m">
											<div class="num" ><span :class="rec.type=='bid'?'':'nolightc'">{{rec.amount}}</span><span :class="rec.type=='bid'?'':'nolightc'">元</span></div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">借款金额</div>
										</div>
										<div class="t">
											<div class="num">
												<span :class="rec.type=='bid'?'':'nolightc'">{{rec.period }}</span>
											</div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">投资期限</div>
										</div>
										<div class="r">
											<div  :class="rec.type=='bid'?'num':'num nolightc'">
												{{(rec.yearRate)*100 |formatNumber1}}% 
                        <!-- 奖励年化利率 -->
												<span :class="{'oddReward':rec.type=='bid', 'nooddReward':rec.type!='bid'}" v-if="rec.reward>0">{{rec.reward |percentFormat11}}</span> 
											</div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">年化利率</div>
										</div>
									</div>
									<div class="pro">
										<div class="progress">
											<div class="fill" v-if="rec.type=='bid'" :style="{'width':rec.schedule+'%'}"></div>
										</div>
									</div>
								</div>
			        		</div>
			        	</div>
						</router-link>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<div v-else-if="status=='fail'" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div>
          </div>
			    <div id="tab1" class="tab" >
						<!-- 立即投标 -->
					  <router-link class="list-container" :to="'detail/'+rec.oddNumber" v-model="records" v-for="(rec,i) in records" :key='i'>
			    		<div :class="{'card':true,'bid':true,'review':rec.progress=='review','tofill':rec.type=='tofill','run':rec.progress=='run','end':rec.progress=='end'} " @click="rec.type=='bid'?'':rec.type=='consumption'?'':isFinish(rec.isFinish)">
			        		<div class="card-content">
			        			<div class="card-content-inner">
									<div class="bid-title">
									<!--通过是否有full或review来判断是否有效标
										有full或review则title-icon0无效自动标title-icon1无效手动标
									  无full或review则title-icon0有效自动标title-icon1有效手动标-->
                         <!-- autofinance 汽车金融标 (不是手动就是自动) -->
										<span v-if="rec.oddStyle=='newhand'" class="title-icon xing"></span>
										<span v-else-if="rec.oddType=='consumer'" :class="rec.type=='bid'&&rec.type!='tofill'?'title-icon xiao':'title-icon xiao1'"></span>
                    <template v-else-if="rec.oddStyle=='normal'">
                      <span v-if="rec.investType==0" :class="rec.type!='tofill'?'title-icon zi':'title-icon zi1'"></span>
                      <span v-else-if="rec.investType==1" :class="rec.type!='tofill'?'title-icon hand':'title-icon hand1'"></span>
                    </template>
										<span v-else class="title-icon title-icon1"></span>
										<span :class="rec.type=='bid'?'text':'text nolightc'">{{rec.oddTitle}}</span>
									</div>
									<div class="bid-content">
										<div class="m">
											<div class="num" ><span :class="rec.type=='bid'?'':'nolightc'">{{rec.oddMoney}}</span><span :class="rec.type=='bid'?'':'nolightc'">元</span></div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">借款金额</div>
										</div>
										<div class="t">
											<div class="num">
												<span :class="rec.type=='bid'?'':'nolightc'">{{rec.oddPeriod }}</span>
											</div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">投资期限</div>
										</div>
										<div class="r">
											<div  :class="rec.type=='bid'?'num':'num nolightc'">{{(rec.oddYearRate)*100 |formatNumber1}}% 
												<span :class="{'oddReward':rec.type=='bid', 'nooddReward':rec.type!='bid'}" v-if="rec.oddReward>0">{{rec.oddReward==0?'undefined':rec.oddReward | percentFormat11}}</span>
											</div>
											<div :class="rec.type=='bid'?'text':'text nolightc'">年化利率</div>
										</div>
									</div>
									<div class="pro">
										<div class="progress">
											<div class="fill" v-if="rec.type=='bid'" :style="{'width':rec.schedule+'%'}"></div>
										</div>
									</div>
								</div>
			        		</div>
			        	</div>
						</router-link>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<div v-else-if="status=='fail'" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div>
			    </div>
           <div id="tab2" class="tab " >
            <router-link class="zqbtn mart05 center" :to="{name:'crtrs1',params:{id:''}}" tag="div">切换债权列表样式</router-link>
            <div @click.capture='tab2(Tr.userId)' v-for="(Tr,i) in crtrusers" :key='i' class="card debt">
	        		<div class="card-content">
	        			<div class="card-content-inner">
									<div class="debt-detail">
										<div class="rate">
                      <!-- 20180802添加折扣图标 -->
											<div :class="~~Tr.discount==1?'num reduced':'num'">{{Tr.username}}</div>
											<div class="text">转让用户</div>
										</div>
										<div class="time ">
											<div class="num">{{Tr.count}}</div>
											<div class="text">转让债权数</div>
										</div>
										<div class="remain-money">
											<div class="num">{{Tr.amount}}</div>
											<div class="text">转让债权金额</div>
										</div>
									</div>
							  </div>						
		        	</div>
            </div>
			    	<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
			    </div>
		    </div>
			</div>
      <!-- 智投 -->
			<div :class="navStyle.yupage">
    		<div class="borrowType">
          <p>项目类型</p>
          <ul>
            <li @click="screening('all',$event,'yt_product')" class="select">全部</li>
            <li v-for="(types,i) in plansProduct" @click="screening(i,$event,'yt_product')" :key="i">{{types|del2}}</li>
          </ul>
        </div>
        <div class="borrowTime">
          <p>借款期限</p>
          <ul>
            <li @click="screening('all',$event,'yt_period')" class="select">全部</li>
            <li v-for="(type,i) in plansPeriod" @click="screening(type.key,$event,'yt_period')" :key="i">{{type.value}}</li>
          </ul>
        </div>
    	</div>
      <!-- 散标 -->
			<div :class="navStyle.sanpage">
    		<div class="borrowType">
          <p>借款类型</p>
          <ul>
            <li @click="screening('all',$event,'sb_type')" class="select">全部</li>
            <li v-for="(type,i) in typeBorrowing" @click="screening(type.key,$event,'sb_type')" :key="i">{{type.value}}</li>
          </ul>
        </div>
        <div class="borrowM">
          <p>借款金额</p>
          <ul>
            <li @click="screening('all',$event,'sb_money')" class="select">全部</li>
            <li @click="screening(1,$event,'sb_money')">5万以下</li>
            <li @click="screening(2,$event,'sb_money')">5-10万</li>
            <li @click="screening(3,$event,'sb_money')">10-20万</li>
            <li @click="screening(4,$event,'sb_money')">20-30万</li>
            <li @click="screening(5,$event,'sb_money')">30-50万</li>
            <li @click="screening(6,$event,'sb_money')">50万以上</li>
          </ul>
        </div>
        <div class="borrowTime">
          <p>借款期限</p>
          <ul>
            <li @click="screening('all',$event,'sb_period')" class="select">全部</li>
            <li v-for="(type,i) in DurationOfloan" @click="screening(type.key,$event,'sb_period')" :key="i">{{type.value}}</li>
          </ul>
        </div>
    	</div>
			<div id="screen" :class="navStyle.screen"></div>
			<nav class="bar bar-tab">
        <router-link to='/' tag='a'  class="tab-item active  replace ">
			      <img src="../../static/img/common/index-@1x.png"  />
			      <div class="tab-label gray">首页</div>
          </router-link>
        <router-link to='projects' tag='a' class="tab-item  replace">
			      <img src="../../static/img/common/projectactive-@1x.png" />
			      <div class="tab-label blue">项目</div>
        </router-link>
        <a class="tab-item  replace" @click="isToMe()">
			      <img src="../../static/img/common/me-@1x.png"  />
			      <div class="tab-label gray">我的</div>
        </a>
			</nav>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
import jquery from "@/assets/js/jquery.js";
import pageNav from "@/pages/page-nav";

export default {
  name,
  data() {
    return {
      triangle0: 0,
      triangle1: 0,
      once: 1,
      Md5Msg: "a12131",
      res: [],
      borrowTy: "", //借款类型
      borrowMo: "", //借款金额
      borrowT: "", //借款期限
      show: 0, //确认
      ary: [],
      records: [], //记录
      oddivitle: "", //标题
      oddMoney: "", //金额
      oddYearRate: "", //年化率
      oddReward: "", //奖励年化率
      oddPeriod: "", //月份
      schedule: "", //进度
      investType: "", //自动手动
      Transfer: [], //债权转让
      pageSize: 8, //页面条数
      pageSizeTr: 8, //债权页面条数
      pageYt: 1, //页码
      page: 1, //页码
      pageTr: 1, //债权页码
      isLoadingMore: false, //判断加载更多
      // isLoadingMoreTr: false, //判断加载更多
      status: "hide",
      isNowLogin: false,
      trPage: 1, //债权转让页码
      trPageSize: 3, //债权转让页面条数
      navigation: false,
      type: "bid",
      typeBorrowing: [],
      amountBorrowing: [],
      DurationOfloan: [],

      plans: [], //智投
      plansProduct: [], //项目类型
      plansPeriod: [], //借款期限
      productsYts: [],
      periodYts: [],
      nav: [0, 0, 0],
      i: "",
      navStyle: {
        yu: {},
        san: {},
        zai: {},
        screen: {},
        yupage: {},
        sanpage: {},
        zaipage: {},
        sidebar: {},
        confirm0: {},
        confirm1: {}
      },
      crtrusers: [] //债权列表【新】
    };
  },
  methods: {
    topnav(i, add) {
      (this.plans = []), (this.records = []), (this.crtrusers = []);
      //3个数字代表顶部3个按钮
      //012三角标的显示隐藏
      let navs = [0, 0, 0];
      this.nav[i]++;
      this.nav[i] == 3 ? (this.nav[i] = 1) : this.nav[i];
      navs[i] = this.nav[i];
      this.nav = navs;
      this.navStyle.yu = {
        selectBtn: true,
        disn: this.nav[0] == 0,
        disib: this.nav[0] != 0,
        down: this.nav[0] == 2
      };
      this.navStyle.san = {
        selectBtn: true,
        disn: this.nav[1] == 0,
        disib: this.nav[1] != 0,
        down: this.nav[1] == 2
      };
      this.navStyle.screen = {
        disn: true,
        disb: this.nav[1] == 2 || this.nav[0] == 2
      };
      this.navStyle.yupage = {
        selectItem: true,
        advanceMark: true,
        disn: true,
        disb: this.nav[0] == 2
      };
      this.navStyle.sanpage = {
        selectItem: true,
        scatteredMark: true,
        disn: true,
        disb: this.nav[1] == 2
      };
      this.navStyle.sidebar = {
        "xwsd-menu": true,
        "pull-right": true,
        "open-panel": true,
        disb: this.nav[0] != 2 && this.nav[1] != 2,
        disn: this.nav[0] == 2 || this.nav[1] == 2
      };
      this.navStyle.confirm0 = {
        confirm: true,
        "pull-right": true,
        button: true,
        disn: true,
        disb: this.nav[0] == 2
      };
      this.navStyle.confirm1 = {
        confirm: true,
        "pull-right": true,
        button: true,
        disn: true,
        disb: this.nav[1] == 2
      };
      //i下标
      //i!=this.i 判断当前按钮是否重复点击
      if (i == 1 && add != "btn" && i != this.i && this.nav[i] != 2) {
        //未点击确定
        this.getData(1);
        $("#projects .content").scrollTop("0");
      } else if (i == 2 && add != "btn" && i != this.i && this.nav[i] != 2) {
        // this.getDataTransfer()
        this.getCrtrusers(1);
        $("#projects .content").scrollTop("0");
      } else if (i == 0 && add != "btn" && i != this.i && this.nav[i] != 2) {
        this.getPlans(1);
        $("#projects .content").scrollTop("0");
      } else {
        // console.log(i)//当前重复点击
        if(i==0)this.getPlans()
        if(i==1)this.getData()
        if(i==2)this.getCrtrusers()
      }
      this.i = i; //记录当前点击的按钮
      //  console.log(this.status)

      this.ageYt = 1; //智投页码
      this.page = 1; //散标
      this.pageTr = 1; //债权页码
      this.status = "hide";
    },
    isFinish(isFinish) {
      //将是否满标传入下个页面
      window.sessionStorage.setItem("isFinish", isFinish);
      window.sessionStorage.getItem("isFinish");
    },
    //登录跳转我的页面否则跳转登录页面
    isToMe() {
      if (this.isNowLogin) {
        this.$router.push("/me");
      } else {
        this.$router.push("/login");
      }
    },
    //判断登录状态
    isLogin() {
      let path = _path.getApiUrl("islogin");
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000" && data.data.isLogin == 1) {
              this.isNowLogin = true;
            }
          }
        });
    },
    didScroll() {
      if (this.isLoadingMore) {
        return;
      }
      let $tab0 = $("#tab0"),
        $tab1 = $("#tab1"),
        $tab2 = $("#tab2"),
        dh = $(document).height(),
        $c = $("#projects .content"),
        st = $c.scrollTop();
      if ($tab0.hasClass("active")) {
        if ($tab0.height() - st < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.pageYt += 1;
          this.getPlans();
        }
      } else if ($tab1.hasClass("active")) {
        if ($tab1.height() - st < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          console.log(this.page);
          this.page += 1;
          this.getData();
        }
      } else if ($tab2.hasClass("active")) {
        if ($tab2.height() - st < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.pageTr += 1;
          this.getCrtrusers();
        }
      }
    },
    getPlans() {
      let obj = { page: this.pageYt, pageSize: this.pageSize };
      let _this = this;
      this.$axios.interceptors.request.use(
        function(config) {
          //config：发送之前 response：相应数据
          _this.status = "loading";
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
      // obj
      obj = Object.assign(obj, this.objsYt());
      this.$axios
        .get(_path.getObj("plans", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (!data.data.records.length) {
                this.isLoadingMore = true;
                this.status = "hide";
                return;
              }
              let records = data.data.records;
              let products = data.data.products;
              let period = data.data.periods;
              period.forEach((i, v) => {
                for (let k in i) {
                  i.key = k;
                  i.value = i[k];
                }
              });
              records.forEach(rec => {
                if (
                  rec.progress == "start" &&
                  rec.second == -1 &&
                  rec.remain > 0
                ) {
                  rec.type = "bid";
                } else if (rec.remain == 0) {
                  rec.type = "tofill";
                } else {
                  rec.type = "end";
                }
              });
              this.isLoadingMore = false;
              this.status = "fail";
              // if(this.records.length==records.length)return;
              this.plans = this.plans.concat(records);
              //标进程： 值为start且schedule为100时为复审中； 值为start且schedule小于100且second为-1时立即投标；
              //值为start且schedule小于100且second为0时HH:ii开始（openTime的值）； 值为run时还款中；
              this.$set(this, "plansProduct", products); //项目类型
              this.$set(this, "plansPeriod", period); //借款期限
              // this.$set(this, "plans", records); //记录
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getData() {
      let obj = { page: this.page, pageSize: this.pageSize };
      // let params = { page: 1, pageSize: 8 };
      obj = Object.assign(obj, this.objs());
      this.$axios
        .get(_path.getObj("odds", obj), { withCredentials: true })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              if (!res.data.data.records.length) {
                this.isLoadingMore = true;
                this.status = "hide";
                return;
              }
              let data = res.data.data;
              let types = data.types;
              let periods = data.periods;
              let records = data.records;
              types.forEach((i, v) => {
                for (let k in i) {
                  i.key = k;
                  i.value = i[k];
                }
              });
              periods.forEach((i, v) => {
                for (let k in i) {
                  i.key = k;
                  i.value = i[k];
                }
              });
              records.forEach(rec => {
                if (
                  (rec.progress == "start" &&
                    rec.schedule < 100 &&
                    rec.second == -1) ||
                  rec.second == 0
                ) {
                  rec.type = "bid";
                } else if (rec.remain == 0) {
                  rec.type = "tofill";
                } else {
                  rec.type = "end";
                }
              });
              this.isLoadingMore = false;
              this.status = "hide";
              // this.$set(this, "records", records); //记录
              this.$set(this, "typeBorrowing", types); //全部类型
              this.$set(this, "DurationOfloan", periods); //借款期限
              this.records = this.records.concat(records);
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
    },
    getCrtrusers() {
      //债权列表【新】
      let obj = { page: this.pageTr, pageSize: this.pageSize };
      // let params = { page: 1, pageSize: 8};
      // obj = Object.assign(obj, this.objs());
      this.$axios
        .get(_path.getObj("crtrusers", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              // data.forEach(rec => {
              //   if (rec.progress == "start") {
              //     rec.type = "start";
              //   } else {
              //     rec.type = "run";
              //   }
              // });
              if (!data.data.records.length) {
                this.isLoadingMore = true;
                this.status = "hide";
                return;
              }
              this.isLoadingMore = false;
              this.status = "hide";
              // this.crtrusers = data.data.records
              // if(this.crtrusers.length==data.data.records.length)return;
              this.crtrusers = this.crtrusers.concat(data.data.records);
              // this.$set(this, "crtrusers", data.data.records); //记录
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
      // this.$store.state.project = 'debt'
    },
    tab2(id) {
      this.$router.push({ name: "crtrs", params: { id: id } });
    },
    objs() {
      //散标筛选类型
      // let obj = { page: 1, pageSize: 5 };
      let obj = {};
      if (this.borrowTy || this.borrowMo || this.borrowT) {
        obj.type = this.borrowTy;
        obj.money = this.borrowMo;
        obj.period = this.borrowT;
        for (let i in obj) {
          if (obj[i] == "" || typeof obj[i] == "undefined") delete obj[i];
        }
      }
      return obj;
    },
    objsYt() {
      //智投筛选类型
      // let obj = { page: 1, pageSize: 5 };
      let obj = {};
      if (this.productsYts || this.periodYts) {
        obj.product = this.productsYts;
        obj.period = this.periodYts;
        for (let i in obj) {
          if (obj[i] == "" || typeof obj[i] == "undefined") delete obj[i];
        }
      }
      return obj;
    },
    yutouReqs() {
      this.page = 1;
      let obj = { page: 1, pageSize: 8 },
        dataObj = Object.assign(obj, this.objsYt());
      this.$axios
        .get(_path.getObj("plans", dataObj), { withCredentials: true })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              let records = res.data.data.records;
              records.forEach(rec => {
                if (
                  rec.progress == "start" &&
                  rec.second == -1 &&
                  rec.remain > 0
                ) {
                  rec.type = "bid";
                } else if (rec.remain == 0) {
                  rec.type = "tofill";
                } else {
                  rec.type = "end";
                }
              });
              $("#projects .content").scrollTop("0");
              this.plans = records;
              this.status = "fail";
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
      this.topnav(0, "btn");
      $("#projects .content").scrollTop("0");
    },
    reqs() {
      this.page = 1;
      let obj = { page: 1, pageSize: 8 },
        dataObj = Object.assign(obj, this.objs());
      this.$axios
        .get(_path.getObj("odds", dataObj), { withCredentials: true })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status === "000000") {
              let records = res.data.data.records;
              records.forEach(rec => {
                if (
                  rec.progress == "start" &&
                  rec.second == -1 &&
                  rec.remain > 0
                ) {
                  rec.type = "bid";
                } else if (rec.remain == 0) {
                  rec.type = "tofill";
                } else {
                  rec.type = "end";
                }
              });
              $("#projects .content").scrollTop("0");
              this.records = res.data.data.records;
              this.status = "fail";
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
      this.topnav(1, "btn");
      $("#projects .content").scrollTop("0");
    },
    screening(val, e, key) {
      if (key == "yt_product") if (!!val) this.productsYts = val; //智投项目类型
      if (key == "yt_period") if (!!val) this.periodYts = val; //智投借款期限
      if (key == "sb_type") if (!!val) this.borrowTy = val; //散标借款类型
      if (key == "sb_money") if (!!val) this.borrowMo = val; //散标借款金额
      //   this.borrowM = e.target.innerHTML;
      if (key == "sb_period") if (!!val) this.borrowT = val; //散标借款期限
      e.target.setAttribute("class", "select");
      $(e.target)
        .siblings()
        .removeClass("select");
    }
  },
  created() {
    this.isLogin();
  },
  updated() {
    window.sessionStorage.setItem("fromPage", "project");
    window.sessionStorage.setItem("perFromPage", "project");
  },
  mounted() {
    this.getPlans();
    // this.getData()
    // this.getDataTransfer()
    this.topnav(0);
    $("#projects .content").scroll(this.didScroll);
    this.$store.state.newPage = 1;
    this.$store.state.loan = 1;
    let projectShow = this.$route.params.projectShow;
    let nav0 = $(".buttons-tab a:eq(0)");
    let nav1 = $(".buttons-tab a:eq(1)");
    let nav2 = $(".buttons-tab a:eq(2)");
    let $tb0 = $("#projects #tab0");
    let $tb1 = $("#projects #tab1");
    let $tb2 = $("#projects #tab2");
    let triangle0 = $(".selectBtn:eq(0)");
    let triangle1 = $(".selectBtn:eq(1)");
    triangle0.css("display", "inline-block");
    if (projectShow == "detail") {
      this.getData();
      this.topnav(1);
      triangle0.css("display", "none");
      triangle1.css("display", "inline-block");
      nav0.removeClass("active");
      nav1.addClass("active");
      nav2.removeClass("active");
      $tb0.removeClass("active");
      $tb1.addClass("active");
    } else if (projectShow == "debt") {
      // this.getDataTransfer();
      //new
      this.getCrtrusers();
      this.topnav(2);
      // nav11.removeClass("down");
      triangle0.css("display", "none");
      // nav11.addClass("dark");
      nav0.removeClass("active");
      nav1.removeClass("active");
      nav2.addClass("active");
      $tb0.removeClass("active");
      $tb2.addClass("active");
    }
  },
  filters,
  components: {
    pageNav
  }
};
</script>
<style src='@/assets/css/index.css'></style>
