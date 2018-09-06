<template>
  <div>
    <div id="auto-bid">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">自动投标</h1>
				<router-link v-if='setShow' to='autoBidSetting1' class="icon icon-settings button-nav pull-right"></router-link>
				<!-- <a href="#" class="icon icon-settings button-nav pull-right"></a> -->
			</header>
        <div class="screenTip" v-if="screenTip">
					<div class="st1">输入短信验证码</div>
					<div class="st2">
						<input v-model='smscustody' type="text" name="vcode" placeholder="请输入短信验证码"/>
            <!-- <span @click="custodysms">{{msginfo}}</span> -->
						<custodysms :type="'autoBidAuthPlus'" @authCode="ac" class="btn" color="#fff"></custodysms>
					</div>
          <div class="st3">
						<span @click="screenTipOff">关闭</span><span @click="screenTipOn">确认</span>
					</div>
				</div>
			<div class="screen" v-if="screen"></div>
			<div class="content"> 
				<div class="ab1">
					<div class="ab11">
						<div>
							<div class="t06">有效排名</div>
							<div class="t075">{{preInfo.validNum}}</div>
						</div>
						<div>
							<div class="t06">我的排名</div>
							<div class="t075">{{queueInfo.location}}</div>
						</div>
						<div>
							<div class="t06">无效排名</div>
							<div class="t075">{{preInfo.invalidNum}}</div>
						</div>
					</div>
					<div class="ab12">
						<div>
							<div class="t05">一月标</div>
							<div class="t075">{{monthNum[1]}}<small>人</small></div>
							<div class="t055">{{monthMoney[1]|formatNumber0}}<small>元</small></div>
						</div>
						<div>
							<div class="t05">二月标</div>
							<div class="t075">{{monthNum[2]}}<small>人</small></div>
							<div class="t055">{{monthMoney[2]|formatNumber0}}<small>元</small></div>
						</div>
						<div>
							<div class="t05">三月标</div>
							<div class="t075">{{monthNum[3]}}<small>人</small></div>
							<div class="t055">{{monthMoney[3]|formatNumber0}}<small>元</small></div>
						</div>
						<div>
							<div class="t05">六月标</div>
							<div class="t075">{{monthNum[6]}}<small>人</small></div>
							<div class="t055">{{monthMoney[6]|formatNumber0}}<small>元</small></div>
						</div>
						<div>
							<div class="t05">十二月标</div>
							<div class="t075">{{monthNum[12]}}<small>人</small></div>
							<div class="t055">{{monthMoney[12]|formatNumber0}}<small>元</small></div>
						</div>
						<div>
							<div class="t05">二十四月标</div>
							<div class="t075">{{monthNum[24]}}<small>人</small></div>
							<div class="t055">{{monthMoney[24]|formatNumber0}}<small>元</small></div>
						</div>
					</div>
				</div>
				
				<div class="ab2">
					<div>
						<div class="t06">当前所处队列</div>
						<div class="t06">{{queueInfo.inQueue}}</div>
					</div>
					<div>
						<div class="t06">排在我前面的资金</div>
						<div class="t055">有效资金：<span class="orange">{{preInfo.validMoney|formatNumber0}}</span><span>元</span></div>
					</div>
					<div>
						<div class="t06">授权小微</div>
					<div>
					<div class="item-input">
						<label class="label-switch">
							<input type="checkbox" class='che' @click='sets($event)'>
							<div class="checkbox"></div>
						</label>
					</div>
 						</div>
					</div>
					
				</div>
				
				<div class="ab3">
					<h3>投标金额上限 </h3>
					<p>若发标金额&le;3万元，自动投出上限为发标金额的50%；3万元&lt;发标金额&le;10万元，自动投出上限为标的金额的25%；发标金额&gt;10万元，自动投出上限为标的金额的20%。 </p>
					<h3>相关名词解释 </h3>
					<p>
						<span class="f333">排队资金：</span>
						系统仅会识别排队账户实际余额计入排队资金中，设置的金额不会被计入。 
						<br />
						<span class="f333">有效排名：</span>
						系统将投标设置正确且账户余额符合设置的待投用户计入有效排名中。 
						<br />
						<span class="f333">无效排名：</span>
						系统将投标设置“排队不投”、“关闭自动投标”、“不选择任一投资类型”或账户余额不符合投资金额设置、保留金额设置的用户计入无效排名。 排队不投：不进行投资，只排队占位(不退出排名，且排名会前移)。 
					</p>
					<h3> 投标规则说明： </h3>
					<p>
						1、自动投标设置提交后即进入投标队列；
						<br />2、起投金额：大于等于50的倍数； 
						<br />3、排队过程中可自由修改设置，任意设置皆不影响其排队位置； 
						<br />4、关闭自动投标或用户自动投标成功后，都会重新开始排队； 
						<br />5、关闭第三方资金托管授权则退出自动投标队列。
					</p>
				</div>
			</div>
		</div>
   
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
import custodysms from "@/pages/home/custodysms";

export default {
  name,
  data() {
    return {
      queueInfo: [], //自动投标
      preInfo: [],
      validNum: "", //有效人数
      invalidMoney: "", //无效人数
      monthNum: [], //月份人数
      monthMoney: [], //月份金额
      setShow: false,
      authorise: "0",
      autoBidAuth: "", //自动投标签约单号 授权小微
      autoCreditAuth: "", //自动债转签约单号 授权小微
      custodyId: "", //开通存管
      custodyPwd: "" //存管密码
      ,is:false
      ,screen:false//遮罩层
      ,screenTip:false//存管短信发送
      ,smscustody:''//存管短信输入验证码
      ,authCode:''//授权码
      ,msginfo:'获取验证码'
    };
  },
  methods: {
    routerback() {
      this.$router.push("/me");
    },
    getDate() {
      let path = _path.getApiUrl("queueInfo");
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data.status == "000000") {
              this.queueInfo = data.data;
              this.preInfo = this.queueInfo.preInfo;
              this.monthNum = this.queueInfo.preInfo.monthNum;
              this.monthMoney = this.queueInfo.preInfo.monthMoney;
            } else {
              _path.dealStatusCode(data.status, data.msg,this);
            }
          }
        });
    },
    sets(e) {
      // $(".che").attr("checked", "true");
      // this.authorise = 1;
      // if (this.authorise == 1) {
      // 	}
      //自动投标签约
      if (this.autoBidAuth != "") {
        // $(".che").attr("disabled", "disabled");
        // window.sessionStorage.setItem("authorise", this.authorise);
        $(".che").prop("checked", true);
        $(".che").attr("disabled", "disabled");
        this.setShow = true;
      } else {
        this.screen=true//遮罩层
        this.screenTip=true//存管短信发送
      }
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
              this.autoBidAuth = r.autoBidAuth;
              this.custodyPwd = r.custodyPwd;
              if (!!this.custodyId) {
                // 开通存管
                if (this.custodyPwd==0) {
                  // 设置存管密码
                  $.confirm(
                    "您还未设置存管密码！</br>设置存管密码",
                    function() {
                      // let obj = { ret: "/automaticBid" };
                      let obj = { ret: "/" };
                      window.location.href = _path.getObj(
                        "setCustodypass",
                        obj
                      );
                    },
                    function() {
                      this.$router.go(-1);
                    }.bind(this)
                  );
                } else {
                  if (this.autoBidAuth != "") {
                    this.setShow = true;
                    $(".che").prop("checked", true);
                    $(".che").attr("disabled", "disabled");
                  } else {
                    $(".che").prop("checked", false);
                  }
                }
              } else {
                $.confirm(
                  "您暂未开通存管</br>是否开通存管",
                  function() {
                    this.$router.push("/openDepository1");
                  }.bind(this),
                  function() {
                    this.$router.go(-1);
                  }.bind(this)
                );
         
              }
            }else {
              _path.dealStatusCode(res.data.status, res.data.msg, this);
            }
          }
        });
    },
    screenTipOff(){
      this.screenTip=false
      this.screen=false
      $(".che").prop("checked", false); 
    },
    screenTipOn(){
      // this.screenTip=false
      // this.screen=false
      this.signing()
    },
    signing(){
      let _this = this;
        //let div = "<label class='label-checkbox item-content'><input type='checkbox' checked  class='ches'><div class='item-media'><i class='icon icon-form-checkbox'></i><span>小微时贷自动投标服务协议</span> </div></label>"
        //未签约自动投标
        $.confirm(
          "您尚未签约自动投标?",
          function() {
            _this.getAutoAuth();
          },
          function() {
            $(".che").prop("checked", false);
            // $(".che").removeAttr("checked");
          }.bind(this)
        );
        let srceen = document.querySelector('.modal-overlay')
			  if(!!srceen&&this.is==false){
            srceen.addEventListener('click',function(e){
            e.stopPropagation()
            this.is=true
            // $(".che").prop("checked", false);
          }.bind(this))
        }
    },
    ac(ac){
      //授权码
      this.authCode = ac
      console.log(ac)
    },
    getAutoAuth() {
    //自动投标、自动债转签约【页面跳转】
      let obj = { mode: "bid",authCode:this.authCode,smsCode:this.smscustody, ret: "/automaticBid" };
      window.location.href = _path.getObj("autoAuth", obj);
    },
  },
  mounted() {
    this.getDate();
    this.getUserInfo();

    //1.开通存管
    //2.设置存管密码
    //3.获取授权码
    //4.自动投标签约

  },
  filters,
  components:{
    custodysms
  }
};
</script>
<style src='@/assets/css/me/automatic-bid.css'></style>
