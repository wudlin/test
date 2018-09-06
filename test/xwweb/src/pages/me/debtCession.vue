<template>
  <div>
      <div id="debtCession">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">债权转让</h1>
			</header>
			<div class="buttons-tab">
				<a href="#tab1" class="tab-link active button bor" @click.prevent="getCan(1)">可转让</a>
        <!-- 20180806添加审核中 -->
				<a href="#tab_15" class="tab-link button" @click.prevent="getApply(1)">审核中</a>
				<a href="#tab2" class="tab-link button" @click.prevent="getIng(1)">转让中</a>
				<a href="#tab3" class="tab-link button" @click.prevent="getSell(1)">转让记录</a>
				<a href="#tab4" class="tab-link button" @click.prevent="getRepay(1)">持有中</a>
				<a href="#tab5" class="tab-link button" @click.prevent="getOver(1)">已回款</a>
			</div>
			<div class="content">
				<div class="tabs">
					<!--可转让-->
					<div id="tab1" class="tab active">
						<div v-for="(ca,i) in Can" :key="i" class="card">
						    <div class="card-content">
						      <div  class="card-content-inner">
						      	<div class="a1 a-flex">
						      		<div class="a11 left">
						      			<div>{{ca.time.split(' ')[0]}}</div>
						      			<div>{{ca.time.split(' ')[1]}}</div>
						      		</div>
						      		<div class="a12 right">
						      			<div class="a12-name">{{ca.oddTitle}}</div>
						      			<div class="a12-number">
                          <!-- 20180522修改期限添加利率 -->
						      				<!-- <div class="money">{{ca.oddMoney|formatNumber0}}元</div> -->
						      				<!-- <div class="time">期限:{{ca.oddPeriod}}</div> -->
                          <!-- <div class="time">利率:{{ca.oddYearRate|percentFormat0}}</div> -->
                          <!-- 20180727添加展期 -->
						      				<div class="money">年化利率{{ca.oddYearRate|percentFormat1}}</div>
						      				<div class="time" v-if="!!ca.extendYearRate&&ca.extendYearRate!=0">展期利率:{{ca.extendYearRate|percentFormat1}}</div>
						      				<div class="time" v-if="!!extendPeriod">{{ca.oddPeriod}}+({{ca.extendPeriod}})</div>
						      				<div class="time" v-else>{{ca.oddPeriod}}</div>
						      			</div>
						      		</div>
						      	</div>
						      	<div class="a2 a-flex">
						      		<div class="a21 left">
						      			<div>{{ca.money|formatNumber0}}元</div>
						      		</div>
						      		<div class="a22 right">
						      			<div class="a22-time">预计到期时间：{{ca.endtime}}</div>
						      			<div class="a22-profit">
						      				到期收益：<span>{{ca.interest|formatNumber2}}</span>元&#x2000;
						      				<span class="red" v-if="ca.couponInsType=='interest'">已加息</span>
						      				<span class="red" v-else-if="ca.couponInsType=='invest_money'">已抵扣</span>
						      			</div>
						      		</div>
						      	</div>
						      </div>
						    </div>
						    <div class="card-footer">
                <a @click.prevent="detail(ca.id,'can')">明细</a>
								<!-- <router-link  :to="'/dcDetail/'+ca.id">明细</router-link> -->
								<router-link :to="{name:'detail',params:{pid:ca.oddNumber,fromPage:'debt1'}}">原标</router-link>

								<a href="#" @click.prevent='screenTip(ca.id,ca.interest)'>转让债权</a>
						    </div>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<!-- <div v-if="Can.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
					</div>
          <!--审核中-->
					<div id="tab_15" class="tab">
						<!-- 利率 oddYearRate *100 %  剩余利息 interest %-->
						<!-- 剩余天数 remainDay 天 转让时间 time split(' ')[0].substr(2) -->
						<!-- 剩余本金 money 元 到期时间 endtime .substr(2) -->
						<!-- 撤销转让 deltransfer -->
						<div  v-for="(ins,i) in Apply" :key="i" class="card">
							<div class="card-content">
					        <div class="card-content-inner">
					      		<div class="cf">
					      			<div class="color6" v-if="!!ins.extendYearRate&&ins.extendYearRate!=0">展期利率：<span class="color3">{{ins.extendYearRate|percentFormat1}}</span></div>
					      			<div class="color6" v-else>利率：<span class="color3">{{ins.oddYearRate|percentFormat1}}</span></div>
					      			<!-- <div class="color6">剩余天数：<span class="color3">{{ins.remainDay}}天</span></div> -->
					      			<div class="color6">剩余本金：<span class="color3">{{ins.money|formatNumber0}}元</span></div>
					      		</div>
					      		<div class="cf">
					      			<div class="color6">剩余利息：<span class="color3">{{ins.interest|formatNumber2}}元</span></div>
					      			<div class="color6">转让时间：<span class="color3">{{ins.time.split(' ')[0].substr(2)}}</span></div>
					      			<div class="color6">到期时间：<span class="color3">{{ins.endtime.substr(2)}}</span></div>
					      		</div>
					        </div>
					    </div>
					    <div class="card-footer">
							<a @click.prevent="cancelTransferApply(ins.id)">撤销转让</a>
					    </div>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
						<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<!-- <div v-if="Ing.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
					</div>
					<!--转让中-->
					<div id="tab2" class="tab">
						<!-- 利率 oddYearRate *100 %  剩余利息 interest %-->
						<!-- 剩余天数 remainDay 天 转让时间 time split(' ')[0].substr(2) -->
						<!-- 剩余本金 money 元 到期时间 endtime .substr(2) -->
						<!-- 撤销转让 deltransfer -->
						<div  v-for="(ins,i) in Ing" :key="i" class="card">
							<div class="card-content">
					        <div class="card-content-inner">
					      		<div class="cf">
                      <!-- 20180727添加展期 -->
					      			<div class="color6" v-if="!!ins.extendYearRate&&ins.extendYearRate!=0">展期利率：<span class="color3">{{ins.extendYearRate|percentFormat1}}</span></div>
					      			<div class="color6" v-else>利率：<span class="color3">{{ins.oddYearRate|percentFormat1}}</span></div>
					      			<div class="color6">剩余天数：<span class="color3">{{ins.remainDay}}天</span></div>
					      			<div class="color6">剩余本金：<span class="color3">{{ins.money|formatNumber0}}元</span></div>
					      		</div>
					      		<div class="cf">
					      			<div class="color6">剩余利息：<span class="color3">{{ins.interest|formatNumber2}}元</span></div>
					      			<div class="color6">转让时间：<span class="color3">{{ins.time.split(' ')[0].substr(2)}}</span></div>
					      			<div class="color6">到期时间：<span class="color3">{{ins.endtime.substr(2)}}</span></div>
					      		</div>
					        </div>
					    </div>
					    <div class="card-footer">
							<a @click.prevent="deltransfer(ins.id)">撤销转让</a>
					    </div>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
						<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<!-- <div v-if="Ing.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
					</div>
					<!--转让记录-->
					<div id="tab3" class="tab">
						<!-- 剩余本金 money 元  转让利息 interest 元-->
						<!-- 转让时间 time -->
						<!-- 原标 :to="'debt/'+ins.crtrId" -->
						<div v-for="(se,i) in Sell" :key="i" class="card">
							<div class="card-content">
								<div class="card-content-inner">
									<div class="t3flec">
										<div class="color6">剩余本金：<span class="color3">{{se.money|formatNumber0}}元</span></div>
										<div class="color6">转让利息：<span class="color3">{{se.interest|formatNumber2}}元</span></div>
									</div>
									<div class="color6 trT">投资时间：<span class="color3">{{se.time}}</span></div>
								</div>
							</div>
							<div class="card-footer">
								<a @click.prevent='router(se.oddNumber)' >原标查询</a>
							</div>
						</div>
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
						<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
						<!-- <div v-if="Sell.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
					</div>
					<!--持有中-->
					<div id="tab4" class="tab">
						<div class="card" v-for='(re,i) in Repay' :key='i' >
						    <div class="card-header">
						    	<div class="text">承接时间</div>
						    	<div class="num">{{re.time.split(' ')[0]}} &#x2000;{{re.time.split(' ')[1]}}</div>
						    </div>
						    <div class="card-content">
						        <div class="card-content-inner">
						      		<div class="cf">
						      			<div>承接金额：{{re.money|formatNumber2}}元</div>
						      			<div>到期时间：{{re.endtime}}</div>
						      		</div>
						      		<div class="cf">
						      			<div>到期利息：{{re.interest|formatNumber2}}</div>
						      			<div>剩余天数：{{re.remainDay}}天</div>
						      		</div>
						        </div>
						    </div>
						    <div class="card-footer">
								<!-- <router-link :to="'/dcDetail/'+re.id">明细</router-link> -->
                <a @click.prevent="detail(re.id,'repay')">明细</a>                
						    </div>
						</div>
						<!-- <div v-if="Repay.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
						<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
					</div>
					<!--已回款-->
					<div id="tab5" class="tab">
						<div v-for="(re,i) in Over" :key="i" class="card">
						    <div class="card-header">
						    	<div class="text">承接时间</div>
						    	<div class="num">{{re.time.split(' ')[0]}} &#x2000;{{re.time.split(' ')[1]}}</div>
						    </div>
						    <div class="card-content">
						        <div class="card-content-inner">
						      		<div class="cf">
						      			<div>承接金额：{{re.money|formatNumber2}}元</div>
						      			<div>到期时间：{{re.endtime}}</div>
						      		</div>
						      		<div class="cf">
						      			<div>到期利息：{{re.interest|formatNumber2}}</div>
						      			<div>剩余天数：{{re.remainDay}}天</div>
						      		</div>
						        </div>
						    </div>
						    <div class="card-footer">
								<!-- <router-link :to="'/dcDetail/'+re.id">明细</router-link> -->
                <a class="a-tb5" @click.prevent="detail(re.id,'over')">明细</a>                
						    </div>
						</div>
						<!-- <div v-if="Over.length==0" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div> -->
						<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
						<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem;margin-top:.6rem">无更多数据</div>
					</div>
				</div>
			</div>
			<div id="screenTip" class="fs75">
        <div class="st1 st">
					<span class="text">债权本息：</span>
					<span class="orange" v-if="!!crtrSM.remain">{{(Number(interest)+Number(crtrSM.remain))|formatNumber2}}</span>
					<span class="yuan">元</span>
				</div>
				<div class="st1 st">
					<span class="text">债权本金：</span>
					<span class="orange" v-if="!!crtrSM.remain">{{crtrSM.remain|formatNumber2}}</span>
					<span class="yuan">元</span>
				</div>
				<div class="st2 st">
					<span class="text">服&#x2000;务&#x2000;费：</span>
					<span class="orange" v-if="!!crtrSM.remain">{{crtrSM.serviceMoney|formatNumber2}}</span>
					<span class="yuan">元</span>
				</div>
        <!-- 20180606隐藏差价 -->
        <!-- 20180714修改差价 -->
        <!-- 转让差价 -->
        <div class="st2 st">       
					<span class="" >转让差价：</span>
          <input type="text" class="w3 marl1" :maxlength="maxl(pdRate)" v-model="pdRate" @input="setpdRate">
					<span class="yuan">%</span>
					<span class="yuan">&#x2000;差价</span>
					<span class="yuan red" v-if="!!crtrSM.remain&&!!pdRate">{{((Number(interest)+Number(crtrSM.remain)) /100 * pdRate)|formatNumber2}}</span>
					<span class="yuan">元</span>
          <!-- <div class=" patl5 poa">差值为出让本息的±5%</div> -->
          <div class=" patl5 poa">只能输入负50%-0的数值</div>
				</div>
        <div class="st2 st">
					<span class="text" >转让价格：</span>
					<span class="orange" v-if="!!crtrSM.remain">{{(Number(interest)+Number(crtrSM.remain)+((Number(interest)+Number(crtrSM.remain)) /100 * pdRate))|formatNumber2}}</span>
					<span class="yuan">元</span>
				</div>
				<div class="st3 st">
					<span class="text">验&#x2000;证&#x2000;码</span>
					<input type="tel"  class="inputCode" v-model='vcode'/>
					<Verificationcode v-if="showswipe" phone="" @codes="getcodes" msgType="transfer" border_l="" style="display:inline-block"></Verificationcode>
					<!-- <span class="blue grey gainVcode" @click="gainVcode">发送验证码</span>
					<span v-model="codeTime" class="grey gainVcodes" style='display:none'>重新获取{{codeTime}}S</span> -->
				</div>
        <div class="protocolArea">
					<label class="label-checkbox item-content" @click="agreement">
				      <input type="checkbox"  id="protocolCheck" ref="agree">
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"></i>
				      	<span class="fs75 color666">本人已悉知流动风险</span>
				      </div>
				  </label>
				</div>
				<div class="st4">
					<div @click="stcancel" class="st-cancel">取消</div>
					<div @click="determine" class="st-sure">确认</div>
				</div>
        
			</div>
			<div id="screen">
          <!-- <div v-if="z1" class="fs75 while z1">转让差价指转让价格可自定义设置，差值为出让本息的±5%</div>
          <div v-if="z2" class="fs75 while z1">转让价格=可转本金+转让差价，即承接人实际支付金额</div> -->
      </div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
import Verificationcode from "@/pages/home/Verificationcode";

export default {
  name,
  data() {
    return {
      crtrSM: {}, //服务费、剩余本金
      Can: [], //可转让
      Apply:[],//申请审核中
      Ing: [], //转让中
      Sell: [], //转让记录
      Repay: [], //持有中
      Over: [], //已回款
      oddMoneyId: "", //id
      phone: "",
      codeTime: "60",
      code: "", //验证码
      vcode: "", //输入验证码
      msg: "",
      over: "", //已回款
      page: 1,
      page_can: 1,
      page_apply:1,
      page_ing: 1,
      page_sell: 1,
      page_repay: 1,
      page_over: 1,
      pageSize: 5,
      isLoadingMore: false,
      status: "hide",
      agreeflow: false, //本人已悉知流动风险
      pdRate: "", //折价/溢价比例
      interest: ""
      ,z1:false
      ,z2:false
      ,showswipe:false//加载验证码
    };
  },
  methods: {
    // 小窗口服务费、剩余本金
    screenTip(id, interest) {
      this.interest = interest;
      this.state = "hide";
      this.oddMoneyId = id;
      let obj = { oddMoneyId: this.oddMoneyId },
        path = _path.getApiUrl("crtrSM");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.crtrSM = data.data;
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
      $("#screen").css("display", "block");
      $("#screenTip").css("display", "block");
      this.showswipe=true//加载验证码
    },
    //小窗口取消
    stcancel() {
      this.state = "fail";
      this.status = "fail";
      //勾选取消
      this.agreeflow = false;
      this.vcode = ""; //验证码制空
      this.pdRate = ""; //折价制空
      $("#protocolCheck").prop("checked", false);

      $("#screen").css("display", "none");
      $("#screenTip").css("display", "none");
      //重置验证码
      this.$nextTick(()=>{
        this.showswipe=false
      })
    },
    routerback() {
      window.sessionStorage.setItem("dcDetail", "");
      this.$router.push("/me");
    },
    determine() {
      if (this.agreeflow) {
        //债权转让确定
        this.state = "fail";
        //20180604 添加pdRate折价/溢价比例
        let obj = {
          oddMoneyId: this.oddMoneyId,
          pdRate: !!this.pdRate ? (this.pdRate / 100).toFixed(4) : 0,
          smsCode: this.vcode
        };
        if (!!this.code) {
        let path = _path.getApiUrl("transfer");
        this.$axios
          .post(path, _path.postObj(obj), {
            emulateJSON: true,
            withCredentials: true
          })
          .then(({ status, data }) => {
            if (status == 200) {
              if (data.status == "000000") {
                this.msg = data.msg;
                this.status = "fail";
                // $.alert(this.msg);20180806修改成功为···
                $.alert("转让申请提交成功");
                $("#screen").css("display", "none");
                $("#screenTip").css("display", "none");
                this.vcode = "";
                this.getCan(); //可转让
              } else {
                _path.dealStatusCode(data.status, data.msg, this);
              }
              this.vcode = ""; //验证码制空
              this.pdRate = ""; //折价制空
            }
          });
        } else {
          $.alert("未获取验证码");
        }
      } else {
        $.alert("请确认勾选");
      }
    },
    gainVcode() {
      //获取验证码
      this.phone = window.sessionStorage.getItem("phone");
      // console.log(this.phone);
      let obj = { msgType: "transfer", phone: this.phone },
        path = _path.getApiUrl("sms");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.code = data.data.code;
              this.status = "fail";
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
      $(".gainVcode").fadeOut(0);
      $(".gainVcodes").fadeIn(0);
      this.gainVcodes();
    },
    gainVcodes() {
      var setInt = setInterval(() => {
        if (this.codeTime == 0) {
          clearInterval(setInt);
          $(".gainVcode").fadeIn(0);
          $(".gainVcodes").fadeOut(0);
          return (this.codeTime = 60);
        }
        this.codeTime--;
      }, 1000);
    },
    getc() {
      window.sessionStorage.setItem("dcDetail", "can");
    },
    getCan(a) {
      if(!!a)this.Can =[],this.page_can=1
      //可转让
      let obj = { page: this.page_can, pageSize: this.pageSize, type: "can" },
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
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              // this.Can = res.data.data.records
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                // this.Can = r.data.records
                this.isLoadingMore = false;
                this.status = "fail";
                this.Can = this.Can.concat(data.data.records);
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getApply(a) {
      if(!!a)this.Apply =[],this.page_apply=1
      //20180806添加申请审核中
      let obj = { page: this.page_apply, pageSize: this.pageSize, type: "apply" };
      this.$axios
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.isLoadingMore = false;
                this.status = "fail";
                this.Apply = this.Apply.concat(data.data.records);
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getIng(a) {
      if(!!a)this.Ing =[],this.page_ing=1
      //转让中
      let obj = { page: this.page_ing, pageSize: this.pageSize, type: "ing" };
      this.$axios
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.isLoadingMore = false;
                this.status = "fail";
                this.Ing = this.Ing.concat(data.data.records);
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getSell(a) {
      if(!!a)this.Sell =[],this.page_sell=1
      //转让记录
      let obj = { page: this.page_sell, pageSize: this.pageSize, type: "sell" };
      this.$axios
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.Sell = this.Sell.concat(data.data.records);
                this.isLoadingMore = false;
                this.status = "fail";
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getRepay(a) {
      if(!!a)this.Repay =[],this.page_repay=1
      //持有中 回款中
      let obj = { page: this.page_repay, pageSize: this.pageSize, type: "repay" };
      this.$axios
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.Repay = this.Repay.concat(data.data.records);
                this.isLoadingMore = false;
                this.status = "fail";
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getOver(a) {
      if(!!a)this.Over =[],this.page_over=1
      //已回款 无数据
      let obj = { page: this.page_over, pageSize: this.pageSize, type: "over" };
      this.$axios
        .get(_path.getObj("usercrtrs", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              if (data.data.records.length == 0) {
                this.isLoadingMore = true;
                this.status = "hide";
              } else {
                this.Over = this.Over.concat(data.data.records);
                this.isLoadingMore = false;
                this.status = "fail";
              }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    didScroll() {
      if (this.isLoadingMore) {
        return;
      }
      let $tb1 = $("#debtCession #tab1"),
        $tb2 = $("#debtCession #tab2"),
        $tb3 = $("#debtCession #tab3"),
        $tb4 = $("#debtCession #tab4"),
        $tb5 = $("#debtCession #tab5"),
        cs = $("#debtCession .content").scrollTop(),
        dh = $(document).height();
      if ($tb1.hasClass("active")) {
        if ($tb1.height() - cs < dh) {
          this.status = "loading";
          this.isLoadingMore = true;
          this.page_can += 1;
          this.getCan()
        }
      } else if ($tb2.hasClass("active")) {
        if ($tb2.height() - cs < dh) {
          this.status = "loading";
          this.isLoadingMore = true;
          this.page_ing += 1;
          this.getIng()
        }
      } else if ($tb3.hasClass("active")) {
        if ($tb3.height() - cs < $(document).height()) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.page_sell += 1;
          this.getSell();
        }
      } else if ($tb4.hasClass("active")) {
        if ($tb4.height() - cs < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.page_repay += 1;
          this.getRepay();
        }
      } else if ($tb5.hasClass("active")) {
        if ($tb5.height() - cs < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.page_over += 1;
          this.getOver();
        }
      }
    },
    deltransfer(id) {
      //撤销转让
      let obj = { oddMoneyId: id },
        path = _path.getApiUrl("deltransfer");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.status = "fail";
              $.alert(data.msg);
              this.getIng(); //重置页面
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    cancelTransferApply(id){
      //撤销债权转让申请
      let obj = { id: id },
        path = _path.getApiUrl("cancelTransferApply");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.status = "fail";
              $.alert(data.msg)
              this.getApply(1); //重置页面
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    router(ids) {
      // //债权详情
      // this.$router.push({
      //   name: "debt",
      //   params: { pid: ids, dcDetail: "sell" }
      // });
      //  项目详情
      this.$router.push({
        name: "detail",
        params: { pid: ids, fromPage: "debt" }
      });
    },
    detail(ids, name) {
      this.$router.push({
        name: "dcDetail",
        params: { ids: ids, dcDetail: name }
      });
      // this.$router.push('/dcDetail/'+ids);
    },
    getcodes(co) {
      this.code = co;
      this.status = "fail";
      // console.log(this.code)
    },
    agreement() {
      this.$refs.agree;
      if (this.$refs.agree.checked == true) {
        this.agreeflow = true;
      } else {
        this.agreeflow = false;
      }
    },
    setpdRate() {
      this.$nextTick(()=>{
        // if(this.pdRate=='.'||this.pdRate=='-'){
        //   return;
          
        // }else{
          // let pdRate = Number(this.pdRate)
          //  this.pdRate = e.target.value
          // this.$set(this,'pdRate',pdRate)
          // this.pdRate = Number(this.pdRate) > 5 ? 5 : Number(this.pdRate) < -5 ? -5 : this.pdRate;
          // 20180718 修改为 -5%-0
          this.pdRate = Number(this.pdRate) > 0 ? 0 : Number(this.pdRate) < -50 ? -5 : this.pdRate;
        // }
      })
    },
    maxl(v){
      //判断长度格式
      v =v.toString()
      // if(v[0]=='.'){
      //   return 3;
      // }
      if(v[1]=='.'){
        return 4;
      }
      if(v>=0){
        return 4;
      }else{
      // console.log(v[2])
        if(v.indexOf('.')==2){
        // if(String(v).substr(0,2)=='-.'){
          return 5;
        }else{
          return 5;
        }
      }
    },
  },
  mounted() {
    this.getCan(); //可转让
    //			this.getIng()//转让中
    //			this.getSell()//转让记录
    //			this.getRepay()//持有中 回款中
    //			this.getOver()//已回款
    $("#debtCession .content").scroll(this.didScroll);
    window.sessionStorage.setItem("fromPage", "debt");
    let dcDetail = this.$route.params.dcDetailGo;
    // console.log("dcDetailGo+"+dcDetail)
    let $tb1 = $("#debtCession #tab1");
    let $tb3 = $("#debtCession #tab3");
    let $tb4 = $("#debtCession #tab4");
    let $tb5 = $("#debtCession #tab5");
    let nav1 = $(".buttons-tab a:eq(0)");
    let nav3 = $(".buttons-tab a:eq(3)");
    let nav4 = $(".buttons-tab a:eq(4)");
    let nav5 = $(".buttons-tab a:eq(5)");
    if (dcDetail == "repay") {
      this.getRepay();
      nav1.removeClass("active");
      nav1.removeClass("bor");
      nav4.addClass("active");
      nav4.addClass("bor");
      $tb1.removeClass("active");
      $tb4.addClass("active");
      window.sessionStorage.setItem("dcDetailGo", "");
    } else if (dcDetail == "over") {
      this.getOver();
      nav1.removeClass("active");
      nav1.removeClass("bor");
      nav5.addClass("active");
      nav5.addClass("bor");
      $tb1.removeClass("active");
      $tb5.addClass("active");
      window.sessionStorage.setItem("dcDetailGo", "");
    } else if (dcDetail == "sell") {
      this.getSell();
      nav1.removeClass("active");
      nav1.removeClass("bor");
      nav3.addClass("active");
      nav3.addClass("bor");
      $tb1.removeClass("active");
      $tb3.addClass("active");
    }
  },
  components: {
    Verificationcode
  },
  filters
};
</script>
<style src='@/assets/css/me/debtCession.css'></style>
