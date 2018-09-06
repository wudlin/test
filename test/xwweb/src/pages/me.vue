<template>
  <div>
		<!--我的页面-->
		<div id="me">
			<div class="content">
				<!--蓝色区域-->
				<div class="me-header">
					<div class="a">
						<span class="user">用户:{{userName}}</span>
						<!-- <span class="service" @click="service">进入旧版</span> -->
						<span>
							<!-- <a @click.prevent="service" class="service"><img src="../../static/img/common/versionOld.png" alt="切换旧版" /></a> -->
							<router-link to="settings" class="service"><img src="../../static/img/common/icon_set.png" alt="设置中心" /></router-link>
							<a @click.prevent="serviceCustomer" class="service"><img src="../../static/img/common/service.png" alt="客服" /></a>
						</span>
					</div>
					<div class="b common">资产总额（元）</div>
					<div class="c common">{{Number(fundMoney) +Number(stayAllMoney)|formatNumber2}}</div>
					<div class="d common">累计收益（元）</div>
					<div class="e common">{{hasInterest|formatNumber2}}</div>
				</div>
				<!--提现区域-->
				<div class="me-userOper">
					<div class="left">
						<div class="text">可用余额（元）</div>
						<div class="num">{{fundMoney|formatNumber2}}</div>
					</div>
					<div class="right">
						<a class="external withdraw common" @click.prevent="custodyInfo('withdraw')">提现</a>
						<!-- <router-link to='withdraw' class="external withdraw common">提现</router-link> -->
						<!-- <router-link to='recharge' class="external recharge common">充值</router-link> -->
						<a class="external recharge common" @click.prevent="custodyInfo('recharge')">充值</a>
					</div>
				</div>
				<!--功能区域-->
				<div class="me-func">
					<div class="a bg">
						<a @click.prevent="custodyInfo('investManage')">
							<img src="../../static/img/common/me-icon1.png" alt="" />
							<div class="text">投资管理</div>
						</a>	
						<a @click.prevent="custodyInfo('debtCession')">
							<img src="../../static/img/common/me-icon2.png" alt="" />
							<div class="text">债权转让</div>
						</a>	
						<a @click.prevent="custodyInfo('refundCalendar')">
							<img src="../../static/img/common/me-icon3.png" alt="" />
							<div class="text">回款日历</div>
						</a>	
					</div>
					<div class="b bg">
						<a @click.prevent="custodyInfo('changeproductauth')">
							<img src="../../static/img/common/wap_icon_accredit.png" alt="" />
							<div class="text">转投授权</div>
						</a>
						<a @click.prevent="custodyInfo('automaticBid')">
							<img src="../../static/img/common/me-icon4.png" alt="" />
							<div class="text">自动投标</div>
						</a>
						<a @click.prevent="custodyInfo('moneyRecord')">
							<img src=" ../../static/img/common/me-icon5.png" alt="" />
							<div class="text">资金记录</div>
						</a>
					</div>
					<div class="c bg">
						<a @click.prevent="custodyInfo('applicationBid')">
							<img src="../../static/img/common/me-icon6.png" alt="" />
							<div class="text">申请约标</div>
						</a>
						<a @click.prevent="whoUseCoupon()">
							<img src="../../static/img/common/me-icon7.png" alt="" />
							<div class="text">红包/加息券</div>
						</a>
						<!-- <a @click.prevent="custodyInfo('rechargeWithdrawalRecord')">
							<img src="../../static/img/common/me-icon8.png" alt="" />
							<div class="text">充值提现记录</div>
						</a> -->
						<a @click.prevent="custodyInfo('referralBonuses')">
							<img src="../../static/img/common/me-icon8-1.png" alt="" />
							<div class="text">推荐奖励</div>
						</a>
						<!-- 20180807添加转投授权 -->
						<!-- <router-link to='settings'>
							<img src="../../static/img/common/me-icon9.png" alt="" />
							<div class="text">设置中心</div>
						</router-link> -->
					</div>
				</div>
				
			</div>
			<nav class="bar bar-tab">
				<router-link to='/' tag='a'  class="tab-item active  replace ">
					<img src="../../static/img/common/index-@1x.png"  />
					<div class="tab-label gray">首页</div>
				</router-link>
				<router-link to='projects' tag='a' class="tab-item  replace">
					<img src="../../static/img/common/project-@1x.png" />
					<div class="tab-label gray">项目</div>
				</router-link>
				<a class="tab-item  replace" @click="isToMe()">
					<img src="../../static/img/common/meactive-@1x.png"  />
					<div class="tab-label blue">我的</div>
				</a>
			</nav>
			<loadLayer v-if='!loadOk'>正在加载请稍候</loadLayer>
			<div class="agreement" v-if="agreement">
				<div class="til">转投资产品授权</div>
				<div class="con">先息后本所有标的到期本息金额自动投资50周消费分期标的</div>
				<div class="agree">
					<p class="indent1 fs7">
						<label class="label-checkbox item-content">
				      <input type="checkbox" class='che' checked="checked">
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"  style="width:.8rem;height:.8rem"></i>
				      	<span>同意并签署</span>
								<a :href="impowerUrl" target="_blank">《转投资产品授权》</a>
				      </div>
				    </label>
					</p>
				</div>
				<div class="auth">
					<button @click.prevent="cancelChangeproductauth()">暂不授权</button>
					<button @click.prevent="changeproductauth()">同意授权</button>
				</div>
			</div>
			<div class="screen" v-if="screen"></div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
import loadLayer from '@/pages/loadLayer'
export default {
  name,
  data() {
    return {
      UserInfo: "",
      phone: "",
      userName: "",
      accountInfo: [],
      isNowLogin: false,
      names: "",
      cardnum: "",
      custodyId: "",
      fundMoney: "",
      stayAllMoney: "",
			stayInterest: "",
			hasInterest:"",
      bankStatus: "",//是否开通存管 0否
			loadOk:false,//正在加载请稍候标识
			custodyPwd:"",//是否设置存管密码
			autoBidAuth:"",//是否开通自动投标
			screen:false,
			agreement:false,//转投弹窗显示
			identity:"",
			impowerUrl:"",//
    };
  },
  methods: {
    //登录跳转我的页面否则跳转登录页面
    isToMe() {
      if (this.isNowLogin) {
        this.$router.push("/me");
      } else {
        this.$router.push("/login");
      }
    },
    whoUseCoupon() {
      if (this.custodyId.length == 0) {
        $.alert("您暂未开通存管</br>请前往'设置中心->开通存管'");
      } else {
        this.$router.push("/giftCoupon");
//      window.sessionStorage.setItem("whoUseCoupon", "meLook");
      }
    },
    getUserInfo() {
      //用户信息
      let path = _path.getApiUrl("getUserInfo");
      this.$axios.get(path, { withCredentials: true }).then(res => {
        if (res.status == 200) {
          if (res.data.status == "000000") {
            let r = res.data.data;
            this.phone = r.phone;
            this.userName = r.userName;
            this.cardnum = r.cardnum; //身份证
            this.names = r.name; //姓名
						this.custodyId = r.custodyId;
						this.custodyPwd = r.custodyPwd;//是否设置存管密码 
						this.autoBidAuth = r.autoBidAuth//是否开通自动投标
						this.authList = r.authList//授权列表
						this.identity = r.identity//
						//changeProduct
            if (!this.names || !this.cardnum) {
              this.bankStatus = 0;
            }
						this.account();
						this.judgeImpower()
          }else{
	        	_path.dealStatusCode(res.data.status,res.data.msg,this)
	        }
        }
      });
		},
		judgeImpower(){
			//已经设置交易密码
			let num = Math.ceil(this.authList.length / 2);
			let phone = this.phone.substr(-8)
			// this.delCookie(phone)
			let ary = [];
			for (let i = 0; i < num; i++) {
				ary.push(this.authList.split("|")[i]);
			}
			if (this.isInArray("fee", ary)) {
				// 缴费授权
				if (~~this.identity != 1) {
					//为投资人，不进行还款判断 (identity=1 投资人)
					if (this.isInArray("repay", ary)) {
						//还款授权
						if(!this.isInArray("changeProduct", ary)){
							if(this.getCookie(phone) == phone){
								//cookie存在
							}else{
								this.screen =true
								this.agreement =true
								this.setCookie(phone,phone,1)
							}
						} 
					}else {
						// 未还款授权
						this.$router.push("/")
					}
				}else{
					//还款授权
						if(!this.isInArray("changeProduct", ary)){
							if(this.getCookie(phone) == phone){
								//cookie存在
							}else{
								this.screen =true
								this.agreement =true
								this.setCookie(phone,phone,1)
							}
						}
				}
			} else {
				this.$router.push("/")
			}
		},
		isInArray(value, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    },
    custodyInfo(name) {
      if (this.custodyId.length == 0) {
        $.alert("您暂未开通存管</br>请前往'设置中心->开通存管'");
      } else {
        this.$router.push(name);
      }
    },
    account() {
      //获取用户信息
      let path = _path.getApiUrl("account");
      this.$axios.get(path, { withCredentials: true }).then(res => {
        if (res.status == 200) {
        	if(res.data.status == "000000"){
        		let data = res.data.data;
        		this.accountInfo = data;
        		this.fundMoney = data.fundMoney;
        		this.stayAllMoney = data.stayAllMoney;
						this.stayInterest = data.stayInterest;
						this.hasInterest = data.hasInterest;
        		this.loadOk = true;
        	}else{
            _path.dealStatusCode(res.data.status,res.data.msg,this)
          }
        }
      });
    },
    islogin() {
      //判断登入
      let path = _path.getApiUrl("islogin");
      this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
      	if(status==200){
      		if (data.status == "000000"&&data.data.isLogin==1) {
      			this.isNowLogin = true;
	      		this.getUserInfo();
      		}else{
	      		this.$router.push("/login");
	      	}
      	}
      });
    },
    addBankCard() {
      if (this.bankStatus == 1) {
        this.$router.push("/openDepository");
      } else {
        this.$router.push("/withdraw");
      }
    },
    service() {
      window.location.href = "http://old.xwsd.com/";
    },
    serviceCustomer() {
      //客服
      // window.open("http://www.sobot.com/chat/h5/index.html?sysNum=cb3090cf3f3e4999866a57b46bcba0f")
      window.open(
        "http://www.sobot.com/chat/pc_new/index.html?sysNum=cb3090cf3f3e4999866a57b46bcba0fa&color=0099FF&telShowFlag=true&telFlag=false&moduleType=4&cid=841b972fd67d46acadedccc3479e9afa&lan=cn&invite=0&visitStartTime=1514166159967&uid=546349e358eb4fdd8d54c60bf5472d3c&unreadcount=0&from=iframe"
      );
		},
		changeproductauth(){
			if(!!$(".che")[0].checked){
        //授权勾选协议
				if (~~this.custodyPwd == 0){
					//0 未设置存管密码
          this.$router.push("/openDepository");
				}else{
					if(!this.autoBidAuth.length){
              this.$router.push("/automaticBid")//未开通自动投标
					}else{
            //跳转授权
						this.postChangeproductauth()
					}
				}
			}else{
          $.alert("请先勾选协议")
			}
		},
		postChangeproductauth() {
      //转产品授权
      let path = _path.getApiUrl("changeproductauth");
      this.$axios.post(path, undefined, { emulateJSON: true, withCredentials: true }).then(({status,data}) => {
        // $("body").html(data)
				$.alert(data.msg||data.info)
				this.screen =false
				this.agreement =false
      })
		},
		setCookie(name,value,day){
      var date = new Date();
      date.setDate(date.getDate() + day);
      document.cookie = name + '=' + value + ';expires='+ date;
    },
    getCookie(name){
      var reg = RegExp(name+'=([^;]+)');
      var arr = document.cookie.match(reg);
      if(arr){
          return arr[1];
      }else{
          return '';
       }
    },
    delCookie(name){
      this.setCookie(name,null,-1);
		},
		cancelChangeproductauth(){
			this.screen =false
			this.agreement =false
			let phone =this.phone.substr(-8)
			this.setCookie(phone,phone,1)
		}
	},
  mounted() {
		
		this.islogin();
		window.sessionStorage.setItem('nowdate','')
		this.impowerUrl = process.env.IMPOWER
  },
  filters,
  components:{
		loadLayer
	}
};
</script>
<style src='@/assets/css/index.css'>

</style>
