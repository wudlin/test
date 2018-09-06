<template>
  <div>
    <div id="detail" class="preInvestDetail">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
				<h1 class="title">项目详情</h1>
			</header>
			<div class="content">
				<div class="pinfo">
					<div class="pname">
						<span class="picon xing zhi"></span>
						<span class="nameT">{{title}}</span>
					</div>
					<!--2018.05.09修改-->
					<!--<div class="rtext">年化收益({{repayType}})</div>-->
					<div class="rtext">剩余可投</div>
					<!--2018.05.09修改-->
					<!--<div class="rnum">{{yearRate | percentFormat}}<small>%</small>{{reward==0?'undefined':reward | percentFormat11}}</div>-->
					<div class="rnum">{{remain}}元</div>
					<div class="pbid">
						<div>
							<!--2018.05.09修改-->
							<!--<div class="num">{{amount|formatNumber0}}</div>
							<div class="text">标的总额(元)</div>-->
							<div class="num">自动匹配</div>
							<div class="text">投资方式</div>
						</div>
						<div>
							<!--2018.05.09修改-->
							<!--<div class="num">{{period | isNotData}}</div>
							<div class="text">投资期限</div>-->
							<div class="num">次日计息</div>
							<div class="text">计息方式</div>
						</div>
						<div>
							<!--<div class="num">{{remain|formatNumber0}}</div>
							<div class="text">剩余可购买(元)</div>-->
							<div class="num">{{repayType | isNotData}}</div>
							<div class="text">还款方式</div>
						</div>
					</div>
					<!--2018.05.09修改-->
					<!--<div class="progress">
						<div class="fill" :style="{'width':schedule<0 ? schedule=0 : schedule && schedule>100 ? schedule=100 : schedule+'%'}"></div>
					</div>-->
					<div class="repayment">
						<!--2018.05.09修改-->
						<!--<span class="typeT">还款方式</span>
						<span class="type">{{repayType | isNotData}}</span>-->
						<!--<span class="rate">{{schedule<0 ? schedule=0 : schedule && schedule>100 ? schedule=100 : schedule}}%</span>-->
					</div>
				</div>
				
				<div class="pinformation prePlan">
					<dl>
						<!------------------标的详情-------------------->
						<dt @click="dt3" class="dt3">标的详情</dt>
						<!--20180802智投展期-->
						<dd class="tableList dd3">
							<ul class="dh-content">
								<li class="dh-title">
									<!--<div>序号</div>-->
									<div class="name">标的名称</div>
									<div class="time">期限</div>
									<div class="rate">利率</div>
									<div class="money">标的金额</div>
								</li>
								<router-link class="preBidDetail" :to="'/detail/'+r.oddNumber+'/'+planId" tag="li" v-for="(r,i) in bidRecords" v-if="bidRecords.length>0" :key="i">
									<!--<div>{{r.normalKey}}</div>-->
									<div class="name">{{r.title}}</div>
									<div class="term">
										<div class="time">{{r.period}}</div>
									</div>
									<div class="rate">
										<div class="time">{{r.rate | planRate}}</div>
									</div>
									<div class="money">{{r.amount|formatNumber0}}</div>
								</router-link>
								<div class="loading" @click="increPage1()" v-if="totalPage1>page1">加载更多</div>
								<div class="nodata" v-if="bidRecords.length==0">暂无数据</div>
							</ul>
						</dd>
						<!---------------------项目介绍--------------------------------------->
						<dt @click="dt1" class="rcmT dt1">项目介绍</dt>
						<dd class="dd1">
							<p class="preDec">
								智能一键投标是小微时贷最新推出的自动化投资工具，该工具为有大额投资需求的用户提供便捷功能，
                用户可根据自身条件，选择合适金额进行投资，只需一键操作即可系统自动匹配标的，系统将智
                能为出借人甄选优质标的。用户进入预约计划，投资成功后系统将自动为该笔资金匹配对应的借款用户。
							</p>
							<!--2018.4.27删去-->
              <!--<p class="preDec">
								例：智能一键投标A债权期限固定为1个月，当期收益率为11%奖励，还款方式为先息后本。
							</p>-->
							<div class="sec2">
								<div class="">
									<p class="fsgray">1.按笔预约投资</p>
                  <!-- 20180523 10万改20万 -->
									<p class="p2">用户单笔参与智能一键投标最多20万元，最低起投金额50元（50的倍数）。</p>
								</div>
								<div>
									<p class="fsgray">2.冻结资金</p>
									<p class="p2">资金进入智能一键投标后，资金将会被冻结，冻结资金后开始计息。</p>
								</div>
							</div>	
							<div class="sec2">
								<div>
									<p class="fsgray">3.系统自动投标</p>
									<p class="p2">系统将根据您投入的金额和期限，自动为您匹配债权。</p>
								</div>
								<div>
									<!--2018.06.14修改START-->
									<p class="fsgray">4.回款方式</p>
									<!--<p class="p2 padL">当期投资期限为1个月，到期后将您的应得利息和本金归还至您的江西银行账户中。</p>-->
									<p class="p2">当期投资标的为1-24个月的则按月返还利息，当期投资标的为5-35周的则按周返还利息。当期标的到期后将您的应得利息和本金归还至您的江西银行存管账户</p>
									<!--018.06.14修改END-->
								</div>
							</div>	
							<table border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td>功能：智能一键投标</td>
                    <!-- 20180517修改 -->
										<!-- <td>债权转让：一个月内不允许债转</td> -->
										<td>债权转让：投标后30日内不支持债权转让</td>
									</tr>
									<tr>
                    <!-- 20180521修改 -->
                    <!-- <td>计息方式：购买智能一键投标后次日开始计息，以标的实际退出时间为止息时间</td> -->
                    <!-- <td>回款方式：按月付息，到期后一次性回款，资金发放到用户的账户中</td> -->
										<td>计息方式：按月付息，到期后一次性回款，资金发放到用户的账户中</td>
										<td>回款方式：先息后本/等额本息</td>
									</tr>
									<tr>
										<td>利息管理费：利息管理费在返息日收取，利息管理费标准详见VIP规则。</td>
										<td>卡券使用：可以正常使用专属提现券，专属加息券，专属现金券，专属抵扣红包等。</td>
									</tr>
								</tbody>
							</table>
							<div class="qa">
								<p class="problem fsgray">问：小微智能一键投标的计息方式？ </p>
                <!-- 20180521移除次日 -->
								<p class="problem">答：购买智能一键投标后开始计息，以标的实际退出时间为止息时间。</p>
								<p class="problem fsgray">问：加入小微智能一键投标后，可以看到具体投向的借款项目吗？</p>
								<p class="problem">答：可以，小微智能一键投标成立日起系统将资金分散投向平台的借款项目。
                  在“我的账户—交易记录—查看明细”中，可以查询到小微智能一键投标投向列表。
								</p>
								<!--chen2018.4.27删去-->
								<!--<p class="problem fsgray">问：智能一键投标的期限与收益？</p>
								<p class="problem">答：智能一键投标目前分为智能一键投标A（30天），智能一键投标B（90天），
                  智能一键投标C（180天），智能一键投标D（360天），智能一键投标E（720天），智能一键投标A收益率为：11%；
                  智能一键投标B收益率为：12%；智能一键投标C收益率为：14%;智能一键投标D收益率为：16%;智能一键投标E收益率为：17%
								</p>-->
                <!-- 20180517添加 -->
                <p class="problem fsgray">问：智能一键投标债转要求</p>
								<p class="problem">答： 购买智能一键投标“标的”的用户，可在投标天数≥30天后进行债转。标的回款前3日至回款期间无法进行债转。</p>
                <p class="problem fsgray">问：投资智能一键投标项目的债权转让标需支付的利息怎么计算？</p>
								<p class="problem">答：用户投资智能一键投标项目的债权转让标则需预先支付承接金额的承接前该期的利息给转让人，用户承接后该期的全部回款资金都回款至承接人账户中。</p>
								<p class="problem">如：用户A在7月1日成功购买10000元的3月标，年化利率为15.5%，在8月14日将其债权转让。用户B在8月14投资5000元至其债权转让项目，则用户B需预先支付7月31日至8月14日期间5000元债权那部分的利息。待8月29日回款当天，用户B则收到7月31日至8月29日整月的回款金额。</p>
							</div>
						</dd>
						<!------------------投资记录-------------------->
						<dt @click="dt2" class="dt2">投资记录</dt>
						<dd class="tableList dd2">
							<ul class="dh-content">
								<li class="dh-title">
									<div>投标人</div>
									<div>购买金额</div>
									<div>购买时间</div>
								</li>
								<li v-for="(r,i) in records" v-if="records.length>0" :key="i">
									<div>{{r.username}}</div>
									<div>
										<div class="time">{{r.amount|formatNumber0}}</div>
									</div>
									<div>{{r.time}}</div>
								</li>
								<div class="loading" @click="increPage()" v-if="totalPage>page">加载更多</div>
								<div class="nodata" v-if="records.length==0">暂无数据</div>
							</ul>
						</dd>
						
					</dl>
				</div>
			</div>
			<!--马上就投-->
			<div class="immBtn gray" v-if="btnFlags==1">复审中</div>
			<div class="immBtn" @click="immCast()" v-else-if="btnFlags==2">马上就投</div>
			<div class="immBtn gray" v-else-if="btnFlags==3">{{second}}后可投</div>
			<div class="immBtn gray" v-else-if="btnFlags==4">{{openTime}}开始</div>
			<div class="immBtn gray" v-else-if="btnFlags==5">还款中</div>
			<div class="immBtn gray" v-else-if="btnFlags==6">已投满</div>
			<div class="immBtn gray" v-else-if="btnFlags==7">已结束</div>
			<div class="autoDialog" v-if="!!autoDialog">
				<div class="textContent">开通自动投标的授权 <br />即可参与智能一键投标！ </div>
				<div class="open">
					<div class="openBtn" @click="openAuto">开通授权</div>
				</div>
				<div class="cancel">
					<div class="cancelBtn" @click="cancel">下次再说</div>
				</div>
			</div>
			<div class="screen" v-if="!!autoDialog"></div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
let methods = {
  routerback() {
    if (this.perFromPage == "home") {
      this.$router.push("/");
    } else if (this.perFromPage == "project") {
      this.$router.push("/projects");
    } else {
      this.$router.go(-1);
    }
  },
  dt1() {
    $(".pinformation dd")
      .not($(".dd1"))
      .hide(); //
    $(".dd1").slideToggle(200);
    $(".pinformation dt")
      .not($(".dt1"))
      .removeClass("show"); //
    $(".dt1").toggleClass("show");
  },
  dt2() {
    $(".pinformation dd")
      .not($(".dd2"))
      .hide();
    $(".dd2").slideToggle(200);
    $(".pinformation dt")
      .not($(".dt2"))
      .removeClass("show");
    $(".dt2").toggleClass("show");
  },
  dt3() {
    $(".pinformation dd")
      .not($(".dd3"))
      .hide();
    $(".dd3").slideToggle(200);
    $(".pinformation dt")
      .not($(".dt3"))
      .removeClass("show");
    $(".dt3").toggleClass("show");
  },
  //判断登录状态
  isLogin() {
  	//this.getData();
    let path = _path.getApiUrl("islogin");
    this.$axios
      .get(path, { withCredentials: true })
      .then(({ status, data }) => {
        if (status == 200) {
          if (data.status == "000000" && data.data.isLogin == 1) {
            this.isNowLogin = true;
            this.getData();
          } else {
            this.$router.push("/login/1");
          }
        }
      });
  },
  cancel() {
    this.$router.push("/projects");
  },
  openAuto() {
    //开通授权
    //			let dataObj = {
    //				mode:'bid',
    //				ret: "/preInvestDetail"
    //			},path = _path.getObj('autoAuth',dataObj)
    //			window.location.href = path;

    this.$router.push("/automaticBid");
  },
  getData() {
    let pid = this.$route.params.pid,
      dataObj = {
        planId: pid
      },
      path = _path.getObj("plan", dataObj);
    this.$axios
      .get(path, { withCredentials: true, emulateJSON: true })
      .then(res => {
        //				console.log(res)
        if (res.status === 200) {
          if (res.data.status === "000000") {
            let data = res.data.data,
              second = data.second;
            this.title = data.title;
            this.planId = data.planId;
            this.amount = data.amount;
            this.yearRate = data.yearRate;
            this.reward = data.reward;
            this.period = data.period;
            this.schedule = data.schedule;
            this.progress = data.progress;
            this.second = data.second;
            this.openTime = data.openTime;
            this.remain = data.remain;
            this.repayType = data.repayType;
            this.autoBidAuth = data.autoBidAuth;
            this.btnFlag(second);
            if (!!this.autoBidAuth) {
              return;
            } else {
              this.autoDialog = true;
            }
          } else {
            _path.dealStatusCode(res.data.status, res.data.msg, this);
          }
        } else {
          $.alert("网络异常请重试", function() {
            this.getData();
          });
        }
      });
    this.getInvestR(1);
    this.getBidDetail(1);
  },
  btnFlag(second) {
    //			console.log(second)
    if (this.progress === "review") {
      //复审中
      //console.log('复审中')
      this.btnFlags = 1;
    } else if (this.progress === "start" && this.remain > 0 && second == -1) {
      //马上就投
      //console.log('马上就投')
      this.btnFlags = 2;
    } else if (this.progress === "start" && second > 0) {
      //倒计时
      //console.log('倒计时')
      console.log(this.second);
      this.btnFlags = 3;
      this.remainTime(second);
    } else if (this.progress === "start" && this.remain > 0 && second == 0) {
      //开始时间
      //console.log('开始时间')
      this.btnFlags = 4;
    } else if (this.progress === "run") {
      //还款中
      //console.log('还款中')
      this.btnFlags = 5;
    } else if (this.progress === "start" && this.remain == 0) {
      //满标
      this.btnFlags = 6;
    } else if (this.progress === "end") {
      //已结束
      //console.log('已结束')
      this.btnFlags = 7;
    }
  },
  getInvestR(pageNum) {
    //投资记录
    let pid = this.$route.params.pid,
      dataObj = {
        page: pageNum,
        pageSize: this.pageSize,
        planId: pid
      },
      path = _path.getObj("planrecords", dataObj);
    this.$axios
      .get(path, { withCredentials: true, emulateJSON: true })
      .then(res => {
        let data = res.data;
        if (res.status === 200) {
          if (data.status === "000000") {
            let dataContent = data.data;
            let records = this.records.concat(dataContent.records);
            this.$set(this, "records", records);
            this.totalPage = Math.ceil(dataContent.count / this.pageSize);
          } else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
        }
      });
  },
  getBidDetail(pageNum) {
    //标详情
    let pid = this.$route.params.pid,
      dataObj = {
        page: pageNum,
        pageSize: this.pageSize,
        planId: pid
      },
      pathTz = _path.getObj("planodds", dataObj);
    this.$axios
      .get(pathTz, { withCredentials: true, emulateJSON: true })
      .then(res => {
        //				console.log(res)
        let data = res.data;
        if (res.status === 200) {
          if (data.status === "000000") {
            let dataContent = data.data;
            let records = this.bidRecords.concat(dataContent.records);
            this.$set(this, "bidRecords", records);
            this.totalPage1 = Math.ceil(dataContent.count / this.pageSize);
            //console.log(this.bidRecords)
          } else {
            _path.dealStatusCode(data.status, data.msg, this);
          }
        }
      });
  },
  increPage() {
    //投资记录
    this.page = this.page + 1;
    this.getInvestR(this.page);
  },
  increPage1() {
    //标详情
    this.page1 = this.page1 + 1;
    this.getBidDetail(this.page1);
  },
  remainTime(time) {
    this.traTime(time);
    var setTime = setInterval(() => {
      if (time > 0) {
        this.traTime(time);
        time--;
      } else {
        clearInterval(setTime);
        this.btnFlags = 2;
      }
    }, 1000);
  },
  traTime(time) {
    var minutes = Math.floor((time / 60) % 60); //计算剩余的分钟
    var seconds = Math.floor(time % 60); //计算剩余的秒数
    minutes = this.formatTimes(minutes);
    seconds = this.formatTimes(seconds);
    this.second = minutes + ":" + seconds;
  },
  formatTimes(s) {
    return s < 10 ? "0" + s : s;
  },
  immCast() {
    let path = _path.getApiUrl("islogin");
    this.$axios
      .get(path, { withCredentials: true, emulateJSON: true })
      .then(({ status, data }) => {
        if (status == 200) {
          if (data.status == "000000" && data.data.isLogin == 1) {
            this.$router.push("/preInvestBid/" + this.planId);
          } else {
            this.$router.push("/login/1");
          }
        }
      });
  }
};
export default {
  name,
  methods,
  filters,
  data() {
    return {
      perFromPage: "", //回退标识
      autoDialog: false,
      title: "", //标题
      planId: "", //智投标识符
      yearRate: 0, //年化率
      reward: 0, //奖励年化率
      amount: 0, //标的金额
      remain: 0, //剩余可投
      period: "", //标的期限
      repayType: "", //还款方式
      schedule: "", //进度
      second: "", //倒计时秒数
      progress: "", //标进程
      openTime: "", //开始时间
      autoBidAuth: "", //是否授权自动投标
      btnFlags: 0, //按钮显示的标志
      page: 1, //投资记录
      page1: 1, //标的详情页码
      pageSize: 6,
      totalPage: 0, //投资记录总页面数
      totalPage1: 0, //标的详情总页面数
      //					currentPage:1,//投资记录当前页码
      //					currentPage1:1,//标的详情当前页码
      records: [], //投资记录内容
      bidRecords: [] //标的详情
    };
  },
  created() {
    this.isLogin();
    window.sessionStorage.setItem("couponName", "");
    window.sessionStorage.setItem("couponId", 0);
    this.perFromPage = window.sessionStorage.getItem("perFromPage");
  },
  updated() {
    window.sessionStorage.setItem("fromPage", "preInvestDetail");
  }
};
</script>

<style src='@/assets/css/projects/detail.css'>

</style>
<style type="text/css" scoped>
.preInvestDetail .screen {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.2);
}
.preInvestDetail .autoDialog {
  position: fixed;
  z-index: 12;
  width: 80%;
  height: 9rem;
  background-color: #fff;
  left: 10%;
  top: calc(50% - 4.5rem);
  padding: 0.6rem;
  text-align: center;
}
.preInvestDetail .autoDialog .textContent {
  padding: 0.3rem;
  font-size: 0.9rem;
  line-height: 1.2rem;
}
.preInvestDetail .autoDialog .open {
  margin: 0.6rem 0 0.3rem;
}
.preInvestDetail .autoDialog .openBtn,
.preInvestDetail .autoDialog .cancelBtn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  font-size: 0.75rem;
  line-height: 0.75rem;
  border-radius: 0.15rem;
}
.preInvestDetail .autoDialog .openBtn {
  background-color: #3096fd;
  color: #fff;
}
.preInvestDetail .autoDialog .cancelBtn {
  color: #666;
}
.preInvestDetail .content .pinfo .pbid .num{
	font-size: .8rem !important;
}
.preInvestDetail .w50{
  height: 6rem;
}
.preInvestDetail .dh-title .name,.preInvestDetail .preBidDetail .name{
	width: 30% !important;
}
.preInvestDetail .dh-title .time,.preInvestDetail .preBidDetail .term{
	width: 26% !important;
}
.preInvestDetail .dh-title .money,.preInvestDetail .preBidDetail .money{
	width: 25% !important;
}
</style>