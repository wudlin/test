<template>
  <div>
    <div id="auto-bid">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">转投授权</h1>
				<router-link v-if='setShow' to='autoBidSetting1' class="icon icon-settings button-nav pull-right"></router-link>
				<!-- <a href="#" class="icon icon-settings button-nav pull-right"></a> -->
			</header>
			<div class="screen" v-if="screen"></div>
			<div class="content"> 				
				<div class="ab2">
					<div>
						<div class="t06 fs8">转投产品授权</div>
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
				<div v-if="agree">
          <p class="indent1 fs7">
						<label class="label-checkbox item-content">
				      <input type="checkbox" class='che' checked="checked">
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"  style="width:.8rem;height:.8rem"></i>
				      	<span>同意并签署</span>
								<a href="http://itf.xwshidai.com/wap/changeproductprotocol" target="_blank">《转投资产品授权》</a>
				      </div>
				    </label>
					</p>
        </div>
				<div class="ab3" style="margin-top:0">
          <p>什么是转投产品授权？</p>
          <p>转投产品授权成功后，系统自动将用户到期结清的所有先息后本标的本息金额投资50周消费分期标的</p>
          <p>转投产品授权好处</p>
          <p>回款自动复投，充分提高资金出借资金的利用率</p>
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
      setShow: false,
      autoBidAuth: "", //自动投标签约单号 授权小微
      custodyId: "", //开通存管
      custodyPwd: "" //存管密码
      ,is:false
      ,screen:false//遮罩层
      ,screenTip:false//存管短信发送
      ,smscustody:''//存管短信输入验证码
      ,authCode:''//授权码
      ,msginfo:'获取验证码'
      ,agree:true
      ,bankStatus:''
    };
  },
  methods: {
    routerback() {
      this.$router.push("/me");
    },
    postChangeproductauth() {
      //转产品授权
      let path = _path.getApiUrl("changeproductauth");
      this.$axios.post(path, undefined, { emulateJSON: true, withCredentials: true }).then(({status,data}) => {
        // $("body").html(data)
        $.alert(data.msg||data.info)
      })
    },
    postcancelchangeproductauth(){
      //取消授权
      let path = _path.getApiUrl("cancelchangeproductauth");
      this.$axios.post(path, undefined, { emulateJSON: true, withCredentials: true }).then(({status,data}) => {
        $.alert(data.msg||data.info)
        // $("body").html(data)
      })
    },
    sets(e) {
      // $(".che").attr("checked", "true");

      if(!!$(".che")[0].checked){
        //授权
        if(!!$(".che")[1].checked){
          //授权勾选协议
          // $.alert("成功")
          if (~~this.custodyPwd == 0) {
            //0 未设置存管密码
            this.$router.push("/openDepository");
            $(".che")[0].checked=false
            if(!!this.autoBidAuth.length){
              $(".che")[0].checked=false
              this.$router.push("/automaticBid")
            }else {
              //跳转授权
              this.postChangeproductauth()
            }
          }else {
            //跳转授权
            this.postChangeproductauth()
          }
        }else{
          //授权未勾选协议
          // $.alert("请先勾选协议")
          $toast("请先勾选协议")
          $(".che")[0].checked=false
        }
      }else{
        //取消授权
        this.postcancelchangeproductauth()
      }

    },
    getUserInfo() {
      //用户信息
      let path = _path.getApiUrl("getUserInfo");
      this.$axios.get(path, { withCredentials: true }).then(res => {
        if (res.status == 200) {
          if (res.data.status == "000000") {
            let r = res.data.data;
            this.custodyPwd = r.custodyPwd;//是否设置存管密码 
            this.autoBidAuth = r.autoBidAuth//是否开通自动投标
            this.authList = r.authList//授权列表
            if(this.authList.indexOf("changeProduct")>-1){
              $(".che")[0].checked=true
              this.agree = false
            }
          }else{
	        	_path.dealStatusCode(res.data.status,res.data.msg,this)
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
    },
    getAutoAuth() {
    //自动投标、自动债转签约【页面跳转】
      let obj = { mode: "bid",authCode:this.authCode,smsCode:this.smscustody, ret: "/automaticBid" };
      window.location.href = _path.getObj("autoAuth", obj);
    },
  },
  mounted() {
    // this.getDate();
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
