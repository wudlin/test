<template>
  <div>
    <div id="updatePass">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button button-link pull-left  back"></a>
				<h1 class="title">开通存管</h1>
			</header>
			<div class="content">
				<div class="list-block">
				    <ul>
				      <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">真实姓名</div>
					            <div class="item-input forget">
					              <input type="text" v-model='user.name' placeholder="">
					            </div>
					        </div>
				        </div>
				      </li>
				      <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">身份证号</div>
					            <div class="item-input">
					              <input type="text" v-model='user.cardnum' placeholder="">
					            </div>
					        </div>
				        </div>
				      </li>
					  <!-- <li>
				        <div class="item-content">
					        <div class="item-inner">
					            <div class="item-title label">本人银行卡</div>
					            <div class="item-input">
					              <input type="tel" v-model='user.bankNum' placeholder="">
					            </div>
					        </div>
				        </div>
				      </li> -->
				    </ul>
				</div>
				<!-- {{agreement()}} -->
				<div class="protocolArea">
					<label class="label-checkbox item-content" @click="agreement">
				      <input type="checkbox"  id="protocolCheck" ref="agree">
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"></i>
				      	<span class="fz06 color666">我已阅读并同意</span>
				      	<router-link to="/bankProtocol" class="fz06">《江西银行账户存管第三方协议》</router-link>
				      </div>
				  </label>
				</div>
				<!--<label @click="agreement">
					<input type="checkbox" ref="agree">我已阅读并同意
					<router-link to="bankProtocol">《江西银行账户存管第三方协议》</router-link>
				</label>				-->
				<a href="#" v-if="show==0" class="button button-fill sure gray">确认</a>
				<a href="#" v-else class="button button-fill sure" @click.prevent='register'>确认</a>
			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import _reg from "@/assets/js/Regular";
export default {
  name,
  data() {
    return {
      user: {
        name: "",
        cardnum: "",
        // bankNum: "",
        arg: ""
      },
      show: 0
    };
  },
  methods: {
    routerback() {
      this.$router.push('/');
    },
    register() {
      if (
        _reg.regName(this.user.name) &&
				_reg.regCard(this.user.cardnum) 
				// &&_reg.regBank(this.user.bankNum)
      ) {
        let obj = {
          name: this.user.name,
          cardnum: this.user.cardnum,
          // bankNum: this.user.bankNum,
          ret: "/settings"
        };
        window.location.href = _path.getObj("openCustody", obj);
      }
    },
    agreement() {
      this.$refs.agree;
      if (this.$refs.agree.checked == true) {
        this.user.arg = true;
      } else {
        this.user.arg = false;
      }
    },
    getinput() {}
  },
  watch: {
    user: {
      handler(val) {
				//2018 4 16 取消银行卡
        //if (!!val.name && !!val.cardnum && !!val.bankNum && val.arg) {
        if (!!val.name && !!val.cardnum  && val.arg) {
          this.show = 1;
        } else {
          this.show = 0;
				}
				console.log(this.show)
      },
      deep: true
    }
  }
};
</script>
<style src='@/assets/css/me/updatePassword.css'>

</style>
