<template>
  <div id="app">
		<pageNav v-if='navigation' @navshow="navigation=!navigation"></pageNav>
    		<!--首页-->
				
		<div class="page page-current" id="index">
			<header class="bar bar-nav">
				<a class="icon pull-left xwsd-icon"></a>			
			  <a class="icon xwsd-menu pull-right" @click.prevent="navigation=true"></a>
			</header>
			<div class="content" >
				<!-- <div class="swiper-container slideshow1" id="slideshow1">
					<div class="swiper-wrapper">
					    <div class="swiper-slide" v-for="(b,i) in banners" :key='i'>
					    	<router-link :to="b.link">
					    		<img :src="b.banner" alt="">
					    	</router-link>
					    </div>
					</div>
				</div> -->
				<div class="slideshow1" id="photo">
					<div id="loading" class="spinner"></div>
					<ul id="pic-view" class="pic-view ">
						<li v-for="(b,i) in banners" :key='i' @click='jumpImg(b.link)'>
							<img :src="b.banner" style="height:100%!important">
						</li>
					</ul>
				</div>
				<div class="card information">
					<div class="card-content">
				    <div class="card-content-inner">
				      <div class="swiper-container slideshow2">
								<div class="swiper-wrapper">
								    <div class="swiper-slide">
								    	<img src="../../static/img/common/treasure-@1x.png" alt="" class="info-icon"/>
								    	<div class="earnings">
								    		<div class="fixtureNum">成交总额<span class="text" >{{allVolume}}</span>亿</div>
								    		<div class="earnNum">为用户赚取<span class="text" >{{allInterest}}</span>千万</div>
								    	</div>
						    		</div>
								    <div class="swiper-slide">
								    	<img src="../../static/img/common/information-@1x.png" class="info-icon"/>
						    			<router-link :to="'/newsDetail/'+notices.id" class="info-content" v-if="!!notices.id">
						    				<p>{{notices.news_title}}</p>
						    			</router-link>
						    			<a href="javascript:;" class="info-content" v-else>
						    				<p>{{notices.news_title}}</p>
						    			</a>
											<router-link to='news' class="info-to">
							    				<img src="../../static/img/common/more -@1x.png" alt="" />
											</router-link>
						    		</div>
								</div>
							</div>
				    </div>
				  </div>
				</div>
				<!--新手标-->
				<div class="card novice" v-if="!!newHandOdds">
					<div class="card-content">
						<div class="card-content-inner">
							<img src="../../static/img/common/hot-@1x.png" alt="热门推荐" />
							<div class="novice-content" >
								<p class="tip-text">新人专享标</p>
								<p class="rate">{{newHandOdds.newHandYearRate | percentFormat1}}{{newHandOdds.newHandReward==0?'undefined':newHandOdds.newHandReward | percentFormat11}}</p>
								<p class="expect-text">年化利率</p>
								<div class="tm">
									<div class="time">{{newHandOdds.oddPeriod}}</div>
									<!--??????缺少-->
									<div class="money">剩余{{newHandOdds.remain | formatNumber2}}元</div>
									<div class="fb">50元起购</div>
								</div>
								<div class="rb">
									<router-link :to="'detail/'+ newHandOdds.oddNumber" class="button">立即抢购</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--项目推荐-->
				<div class="pr">
					<span class="pr-icon"></span>
					<span class="pr-text">项目推荐</span>
				</div>
				
				<!--智能一键投标-->
				<div class="card bid" v-for="(plan,i) in plans" v-if="!!plan.planId">
					<div class="card-content">
						<router-link :to="'preInvestDetail/'+ plan.planId" class="card-content-inner" tag='div'>
							<div class="bid-title">
								<span class="title-icon zhi"></span>
								<span class="text">{{plan.title}}</span>
							</div>
							<div class="bid-content">
								<div class="m">
									<div class="num"><span>{{plan.amount}}</span><span>元</span></div>
									<div class="text">借款金额</div>
								</div>
								<div class="t">
									<div class="num">
										<span>{{plan.period | formatNumber3}}</span>
										<span v-if="plan.periodType=='month'">个月</span>
										<span v-else-if="plan.periodType=='week'">周</span>
									</div>
									<div class="text">投资期限</div>
								</div>
								<div class="r">
									<div class="num">{{plan.yearRate | percentFormat1}}
										<span class="oddReward">{{plan.reward==0?'undefined':plan.reward | percentFormat11}}</span>
									</div>
									<div class="text">年化利率</div>
								</div>
							</div>
							<div class="pro">
								<div class="progress">
									<div class="fill"  :style='{"width": plan.schedule<0 ? plan.schedule=0 : plan.schedule && plan.schedule>100 ? plan.schedule=100 : plan.schedule+"%"}'></div>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				
				
				<div class="card bid" v-for="(odds,i) in odds">
					<div class="card-content">
						<router-link :to="'detail/'+ odds.oddNumber" class="card-content-inner" tag='div'>
							<div class="bid-title">
								<!--<span v-if="odds.oddStyle=='plan'" class="title-icon yutou"></span>-->
								<template v-if="odds.oddStyle!='plan' && odds.oddType=='consumer'">
									<span class="title-icon xing" v-if="odds.oddStyle=='newhand'"></span>
									<span class="title-icon xiao" v-else-if="odds.oddStyle!='newhand'"></span>
								</template>
								<template v-else-if="odds.oddStyle!='plan' && odds.oddType!='consumer'">
									<span class="title-icon xing" v-if="odds.oddStyle=='newhand'"></span>
									<span v-else-if="odds.oddStyle!='newhand'" :class="{'title-icon':true,'title-icon0':odds.investType==0,'title-icon1':odds.investType==1}"></span>
								</template>
								<!--<span class="title-icon xing" v-if="odds.oddStyle=='newhand'"></span>
								<span class="title-icon" :class="['title-icon'+odds.investType]" v-else-if="odds.oddStyle!='newhand'"></span>-->
								<span class="text">{{odds.oddTitle}}</span>
							</div>
							<div class="bid-content">
								<div class="m">
									<div class="num"><span>{{odds.oddMoney}}</span><span>元</span></div>
									<div class="text">借款金额</div>
								</div>
								<div class="t">
									<div class="num">
										<span>{{odds.oddPeriod | formatNumber3}}</span>
										<span v-if="odds.periodType=='month'">个月</span>
										<span v-else-if="odds.periodType=='week'">周</span>
									</div>
									<div class="text">投资期限</div>
								</div>
								<div class="r">
									<div class="num">
										{{odds.oddYearRate | percentFormat1}}
										<span class="oddReward">{{odds.oddReward==0?'undefined':odds.oddReward | percentFormat11}}</span>
									</div>
									<div class="text">年化利率</div>
								</div>
							</div>
							<div class="pro">
								<div class="progress">
									<div class="fill"  :style='{"width": odds.schedule<0 ? odds.schedule=0 : odds.schedule && odds.schedule>100 ? odds.schedule=100 : odds.schedule+"%"}'></div>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<!--恢复2018.05.09-->
				 <div class="b">
					<div class="b1">
						<img src="../../static/img/common/bank-@1x.png" alt="银行" />
						<span class="bt">
							<div>规范经营</div>
							<div>银行存管</div>
						</span>
					</div>
					<div class="b2">
						<img src="../../static/img/common/safety-@1x.png" alt="安全" />
						<span class="bt">
							<div>严密安全</div>
							<div>风控体系</div>
						</span>
					</div>
					<div class="b3">
						<img src="../../static/img/common/multi- call-@1x.png" alt="多方审查" />
						<span class="bt">
							<div>多方审查</div>
							<div>有效监督</div>
						</span>
					</div>
				</div> 
				<div class="c">
					<div class="c-inner">
						<img src="../../static/img/common/fund-security-@1x.png" alt="安全" />
						<span class="c-text">您的资金由江西银行资金存管系统全程监管</span>
					</div>
				</div>
			</div>
			<div class="screenTip" v-if="screenTipFee">
				<div class="til"></div>
				<div class="st1">
					<div>江西银行</div>
					<div>缴费授权</div>
				</div>
				<div class="st2">
					<button @click="feeauth">立即授权</button>
				</div>
			</div>
			<div class="screenTip" v-if="screenTipRepay">
				<div class="til"></div>
				<div class="st1">
					<div>江西银行</div>
					<div>还款授权</div>
				</div>
				<div class="st2">
					<button @click="repayauth">立即授权</button>
				</div>
			</div>
			<div class="screen" v-if="screen"></div>
			<nav class="bar bar-tab">
				<router-link to='/' tag='a'  class="tab-item active  replace ">
						<img src="../../static/img/common/indexactive-@1x.png" />
						<div class="tab-label blue">首页</div>
				</router-link>
				<router-link to='projects' tag='a' class="tab-item  replace">
						<img src="../../static/img/common/project-@1x.png"  />
						<div class="tab-label gray">项目</div>
				</router-link>
				<a class="tab-item  replace" @click.prevent="isToMe()">
						<img src="../../static/img/common/me-@1x.png" />
						<div class="tab-label gray">我的</div>
				</a>
			</nav>
		</div>
		<loadLayer v-if='!loadOk'>正在加载请稍候</loadLayer>
		<router-view></router-view>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import pageNav from "@/pages/page-nav";
import filters from "@/assets/js/formatAll";
import loadLayer from "@/pages/loadLayer";
import bd from "@/assets/js/bd_statistics";//百度统计

export default {
  name,
  data() {
    return {
      allVolume: "", //累计成交
      allInterest: "", //用户收益
      todayLast: "", //今日可投
      banners: [], //轮播图
      newHandOdds: {}, //新手标
      notices: {}, //公告
      odds: [], //今日推荐标
      plans: [], //智能一键投标
      isNowLogin: false, //登录标识
      navigation: false,
      lunbo: 0,
      loadOk: false,
      offsetWidth: "",
			nav: false
			,screenTipFee: false //缴费
      ,screenTipRepay: false //还款
			,screen:false//遮罩层
			,authList:""//
			,identity:""//身份
    };
  },
  methods: {
    //获取数据
    getData() {
      let path = _path.getApiUrl("index");
      this.$axios.get(path, { withCredentials: true }).then(res => {
        let data = res.data;
        if (res.status === 200) {
          if (data.status === "000000") {
            let dataContent = data.data;
            this.banners = dataContent.banners;
            this.newHandOdds = dataContent.newHandOdds[0];
            this.notices = dataContent.notices[0]||{ news_title: "暂无公告" };
            this.odds = dataContent.odds;
            this.plans = dataContent.plans;
            this.todayLast = dataContent.todayLast;
            this.allVolume = (dataContent.allVolume / 100000000).toFixed(1);
            this.allInterest = (dataContent.allInterest / 10000000).toFixed(1);
//          if (this.notices.length==0) {
//            this.notices = { news_title: "暂无公告" };
//          }
            $(".fixtureNum .text").text(this.allVolume);
            $(".earnNum .text").text(this.allInterest);
            $(".info-content p").text(this.notices.news_title);
						this.loadOk = true;
          } else {
            _path.dealStatusCode(data.status,data.msg,this,data.data.url)
          }
        }
        //					$.hidePreloader();
      });
    },
    //登录跳转我的页面否则跳转登录页面
    isToMe() {
      if (!!this.isNowLogin) {
        this.$router.push("/me");
      } else {
        this.$router.push("/login");
      }
    },
    //判断登录状态
    isLogin() {
      let path = _path.getApiUrl("islogin");
      this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
      	if(status==200){
      		if (data.status == "000000"&&data.data.isLogin==1) {
						this.isNowLogin = true;
						this.getUserInfo();
      		}
      	}
      });
    },
    subSomething() {
      if (document.readyState == "complete") {
        // setTimeout(function(){
        var load = document.getElementById("loading");
        load.style.opacity = 0;
        document
          .getElementById("pic-view")
          .setAttribute("class", "pic-view show");
        load.remove();
        // },0);
      }
    },
    jumpImg(a) {
      window.location = a;
		},
		repayauth() {
      window.location.href = _path.getObj("repayauth");
		},
		feeauth() {
      window.location.href = _path.getObj("feeauth");
    },
		isInArray(value, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
		},
		getUserInfo() {
      //获取用户信息
      let path = _path.getApiUrl("getUserInfo");
      this.$axios
        .post(path, undefined, { emulateJSON: true, withCredentials: true })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == "000000") {
              let r = res.data.data;
              this.custodyId = r.custodyId;
              this.custodyPwd = r.custodyPwd;//存管密码
              this.authList = r.authList; //授权列表
              this.identity = r.identity//身份
              //screenTip screen
              // if(this.custodyPwd=="1"){
                if (this.custodyId.length != 0) {
                  //this.$router.push('/')
                  // let go = this.$route.params.go;
                  // console.log(go)
                  // if (!!go) {
                  //   this.$router.go(-1);
                  // } else {
                    if(this.custodyPwd=="1"){
                      let num = Math.ceil(this.authList.length / 2);
                      let ary = [];
                      for (let i = 0; i < num; i++) {
                        ary.push(this.authList.split("|")[i]);
											}
                      if (this.isInArray("fee", ary)) {
												// 缴费授权
												if(this.identity!=1){
                          if (this.isInArray("repay", ary)){
															
                          }else{
                            this.screenTipRepay = true;
                            this.screen = true;
                          }
                        }else{
                          // 还款授权 (identity=1 投资人没有还款授权)
                          // this.$router.push("/");
                        }
                      } else {
                        this.screenTipFee = true;
                        this.screen = true;
                      }
                    }else{
                      _path.dealDialog('您还未设置存管密码',1,this,'setCustodypass')
                    }
                    //bid 自动投标 credit 自动债转 fee 缴费 repay 还款  如： bid|credit|repay|fee
                  // }
                } else {
                  this.$router.push("openDepository1");
                }
            } else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
    },
  },
  filters,
  mounted() { 
		
		//this.setCustodypass()
		//		$.showPreloader('正在加载请稍候');
        // window.location.href = "itms-services://?action=download-manifest&url=https://gitee.com/xiaoweisd/download/raw/master/manifest.plist";
    this.getData();
		this.isLogin();
		// this.getUserInfo();
    this.subSomething();
    document.onreadystatechange = this.subSomething;
		
    $(function() {
      $.init();
    });
    this.$store.state.newPage = 1;
		this.$store.state.loan = 1;
		//window.sessionStorage.removeItem('loginBackLink')
		//this.isInArray("repay", ary)&&this.identity!=1)
		//weixin://wap.xwsd.com/#/home
  },
  updated() {
    window.sessionStorage.setItem("fromPage", "home");
    window.sessionStorage.setItem("perFromPage", "home");
    if (this.lunbo == 0) {
      photoSlide({
        wrap: document.getElementById("photo"),
        loop: true,
        autoPlay: true,
        autoTime: 3000,
        pagination: false
      });
      this.lunbo = 1;
    }
  },
  components: {
    pageNav,
    loadLayer
  }
};

</script>
<style src='@/assets/css/index.css'>
</style>



