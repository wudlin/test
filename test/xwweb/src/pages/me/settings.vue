<template>
  <div>
      <div id="settings">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">设置中心</h1>
			</header>
			<div class="content" style=" margin-bottom: 0px;">
				<div class="list-block">
				    <ul>
					    <li>
									<router-link to='emailPhoneAuthentication' class="external item-content item-link">
					      	<!-- <a href="view/me/emailPhoneAuthentication.html#phoneAuth" class="external item-content item-link"> -->
						        <div class="item-media"><i class="icon icon-wh icon-settings0"></i></div>
						        <div class="item-inner">
						          <div class="item-title">手机认证</div>
						        </div>
					      	<!-- </a> -->
									</router-link>
					    </li>
				        <li>
									<router-link to='emailAuthentication' class="external item-content item-link">
					      	<!-- <a href="view/me/emailPhoneAuthentication.html#emailAuth" class="external item-content item-link"> -->
						        <div class="item-media"><i class="icon icon-wh icon-settings1"></i></div>
						        <div class="item-inner">
						          <div class="item-title">邮箱认证</div>
						        </div>
					      	<!-- </a> -->
									</router-link>
				        </li>
					    <li>
								<!-- <router-link to='bankCard' class="item-content item-link"> -->
					    	<a  class="item-content item-link" @click.prevent="bankCard">
						        <div class="item-media"><i class="icon icon-wh icon-settings2"></i></div>
						        <div class="item-inner">
						          <div class="item-title">银行卡</div>
						        </div>
					    	</a>
								<!-- </router-link> -->
					    </li>
					    <li>
					    	<a class="item-content item-link" @click.prevent="Custody(1)">
						        <div class="item-media"><i class="icon icon-wh icon-settings3"></i></div>
						        <div class="item-inner">
						          <div class="item-title">开通存管</div>
						        </div>
					    	</a>
					    </li>
				    </ul>
				</div>
				<div class="list-block">
				    <ul>
				      <li>
								<router-link to='modifyPhone' class="item-content item-link">
				      	<!-- <a href="view/me/modifyPhone.html" class="item-content item-link"> -->
				      		<div class="item-media"><i class="icon icon-wh icon-settings4"></i></div>
					        <div class="item-inner">
					          <div class="item-title">修改手机号码</div>
					        </div>
				      	<!-- </a> -->
								</router-link>
				      </li>
				      <li>
								<router-link to='updatePassword' class="item-content item-link">
				      	<!-- <a href="view/me/updatePassword.html" class="item-content item-link"> -->
					        <div class="item-media"><i class="icon icon-wh icon-settings5"></i></div>
					        <div class="item-inner">
					          <div class="item-title">修改登录密码</div>
					        </div>
				        <!-- </a> -->
								</router-link>
				      </li>
				      <li >
				      	<a @click.prevent='updateCustodypass' class="item-content item-link">
					        <div class="item-media"><i class="icon icon-wh icon-settings6"></i></div>
					        <div class="item-inner">
					          <div class="item-title">修改存管密码</div>
					        </div>
				        </a>
				      </li>
				    </ul>
				</div>
				<div class="list-block">
				    <ul>
				    	<li>
								<!-- <router-link to='VIP' class="item-content item-link"> -->
					      <a href="view/me/VIP.html" class="item-content item-link" @click.prevent="custodyInfo('VIP')">
					        <div class="item-media"><i class="icon icon-wh icon-settings7"></i></div>
					        <div class="item-inner">
					          <div class="item-title">VIP</div>
					        </div>
					      </a>
								<!-- </router-link> -->
				    	</li>
				    	<li>
								<router-link to='borrowMoney' class="item-content item-link">
					      <!-- <a class="item-content item-link"> -->
					        <div class="item-media"><i class="icon icon-wh icon-settings8"></i></div>
					        <div class="item-inner">
					          <div class="item-title">借款</div>
					        </div>
					      <!-- </a> -->
								</router-link>
				      	</li>
				      	<li>
								<!-- <router-link to='referralBonuses' class="item-content item-link">
					        <div class="item-media"><i class="icon icon-wh icon-settings6"></i></div>
					        <div class="item-inner">
					          <div class="item-title">推荐奖励</div>
					        </div>
								</router-link> -->
				        </li>
				    </ul>
				</div>
				<!--<div class="list-block">
				    <ul>
				        <li>
					      	<a href="#" class="item-content item-link">
						        <div class="item-media"><i class="icon icon-wh icon-settings4"></i></div>
						        <div class="item-inner">
						          <div class="item-title">设置手势密码</div>
						        </div>
					        </a>
				        </li>
				    </ul>
				</div>-->
				<a href="#" class="signOut" @click.prevent='logout'>退出登录</a>
				<!-- <p class="edition">
					<span>小微时贷WAP版 V1.1.1</span>
				</p> -->
			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";

export default {
  name,
  data() {
    return {
      BankCard: "",
      bankNum: "", //卡号
      UserInfo: "", //用户信息
      cardnum: "",
      name: "",
      custodyId: "",
      custodyPwd: "", //是否设置存管密码
      bankStatus: ""
    };
  },
  methods: {
    routerback() {
      this.$router.push("/me");
    },
    Custody(i) {
      //绑定第三方帐号
      if (this.bankStatus == 1) {
        this.$router.push("/openDepository1");
      } else if (!this.bankNum && this.custodyId) {
				if(i==1){
					$.alert("已开通存管，无法修改");
				}else{
					// 20180613 移除添加银行卡页面
					// window.sessionStorage.setItem("bankCard", 0);
					// this.$router.push("/addBankCard");
					
					//跳转添加银行卡页面
					this.getcardBind();
				}
      } else if (this.bankStatu != 1 && this.custodyId) {
        $.alert("已开通存管，无法修改");
      } else if (!this.custodyId) {
        this.$router.push("/openDepository1");
        // let obj = {cardnum:this.cardnum,name:this.name,bankNum:this.bankNum,ret:'/openDepository'}
        // window.location.href=	_path.getObj('openCustody',obj)
        // this.$axios.get(_path.getObj('openCustody',obj),{withCredentials: true}).then(res=>{
        // 	$('.content').html(res.data)
        // 	// window.location.href =
        // })
      }
    },
    getUserInfo() {
      //获取用户信息
      let path = _path.getApiUrl("getUserInfo");
      this.$axios
        .post(path, undefined, { emulateJSON: true, withCredentials: true })
        .then(({status,data}) => {
					if(status==200){
						if(data.status=='000000'){
							this.UserInfo = data.data;
							this.cardnum = this.UserInfo.cardnum;
							this.name = this.UserInfo.name;
							this.custodyId = this.UserInfo.custodyId;
							this.custodyPwd = this.UserInfo.custodyPwd;
							if (!this.name || !this.cardnum) {
								this.bankStatus = 1;
							}
						}else{
							_path.dealStatusCode(data.status,data.msg,this)
						}
					}
          
        });
    },
    userBankCard() {
      //获取银行卡信息
      let path = _path.getApiUrl("userBankCard");
      this.$axios.get(path, { withCredentials: true }).then(res => {
      	if(res.status == 200){
      		if(res.data.status == "000000"){
      			this.BankCard = res.data.data;
      			this.bankNum = this.BankCard.bankNum;
      		}else{
      			_path.dealStatusCode(res.data.status,res.data.msg,this)
      		}
      	}
      });
    },
    logout() {
      //退出登录
			 $.confirm(
        "是否退出登入",
        function() {
          let path = _path.getApiUrl("logout");
          this.$axios
            .post(path, {}, { emulateJSON: true, withCredentials: true })
            .then(res => {
							setTimeout(() => {								
								this.$router.push("/");
							}, 1000);
            });
        }.bind(this)
      );
    },
    updateCustodypass() {
      //修改存管密码
      if (this.custodyId.length == 0) {
        $.alert("请开通存管");
      } else if (this.custodyPwd == 1) {
        let path = _path.getApiUrl("updateCustodypass");
        window.location.href = path;
        // this.$axios.get(path,{withCredentials: true}).then(res=>{
        // 	$('.content').html(res.data)
        // })
      } else if (this.custodyPwd == 0) {
        let path = _path.getApiUrl("setCustodypass");
        window.location.href = path;
      }
    },
    bankCard() {
      if (this.bankNum) {
        this.$router.push("/bankCard");
      } else {
        $.alert(
          "未绑定银行卡",
          function() {
            this.Custody();
          }.bind(this)
        );
      }
    },
    custodyInfo(name) {
      if (this.custodyId.length == 0) {
        $.alert("请开通存管");
      } else {
        this.$router.push(name);
      }
		},
		getcardBind(){
			//跳转添加银行卡页面
			let path = _path.getApiUrl("cardBind");
      window.location.href = path;
		}
  },
  mounted() {
    this.getUserInfo();
		this.userBankCard();
		
		// this.getcardBind()
  }
};
</script>
<style src='@/assets/css/me/settings.css'>
</style>
