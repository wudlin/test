<template>
  <div>
      <div id="panel-right" class="panel panel-right panel-cover" >
			<header class="bar bar-nav">
				<a class="icon icon-left button-nav pull-left external close-panel" style='width:2.4rem'></a>
				<h1 class="title">选择银行卡</h1>
			</header>
			<div class="content">
				<div class="bluebanner">
					<div>支持银行</div>
					<div>充值限额</div>
				</div>
					
				<ul class="allbc">
					<li v-for='(ba,i) in bankList' :key='i' @click='btn(ba.name.bankName)'>
						<div class="allbc1">
							<img :src="'/static/img/me/supportBankList/'+ba.name.bankIcon" alt="" />
							<span>{{ba.name.bankName}}</span>
						</div>
						<div class="allbc2">{{ba.name.limit}}</div>
					</li>
					<!-- <li>
						<div class="allbc1">
							<img src="" alt="" />
							<span>中国银行</span>
						</div>
						<div class="allbc2">不支持快捷充值</div>
					</li> -->
				</ul>
					
			</div>
		</div>
		<div  id="addBankCard">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left button-nav pull-left external"></a>
				<h1 class="title">添加银行卡</h1>
			</header>
			<div class="content">
				<ul class="abc">
					<!--<li>
						<div class="left">真实姓名</div>
						<div class="right" v-if="name=='' || name=='null'"><input placeholder="请输入姓名" type="text" v-model='names'></div>
						<div class="right" v-else>*{{name.substr(1,2)}}</div>
					</li>
					<li>
						<div class="left">身份证号</div>
						<div class="right" v-if="cardnum==''|| cardnum=='null'"><input placeholder="请输入身份证号" type="text" v-model='cardnums'></div>
						<div class="right" v-else>{{cardnum.substr(0,3)+'**** **** ****'+cardnum.substr(cardnum.length-4,4)}}</div>
					</li>-->
					<li>
						<div class="left">银行卡号</div>
						<input type="tel" v-model="bankNum" placeholder="请输入银行卡号" class="right"/>
					</li>
					<!--20180413修改成短信验证去掉真实姓名、身份证号字段-->
					<li>
						<div class="left">短信验证码</div>
						<input type="tel" v-model="inpsmsCode" placeholder="请输入验证码" class="right"/>
						<!-- <span class="blue">获取验证码</span> -->
						<custodysms :type="'cardBindPlus'" @authCode="ac" :cardNo="bankNum" ></custodysms>
						<!--<span class="nolight">重新获取</span>-->
					</li>
					<li class="open-panel" data-panel='#panel-right'>
						<div class="left" >开户行</div>
						<input type="text" placeholder="选择银行" class="right centre" v-model="bankName" readonly/>
						<a class="icon icon-right pull-right" ></a>
					</li>
				</ul>
				<div class="abc-sure"><a href="#" class="external button button-fill" @click.prevent="blankNama">立即绑定</a></div>
			</div>
		</div>
  </div>
</template>
<script>
// import bank from '@/assets/js/bank'
import _path from '@/assets/js/md5'
import custodysms from "@/pages/home/custodysms";
import _reg from '@/assets/js/Regular'

    export default{
		name,
		data() {
			return{
				bankInfo:'',
				bank:'',
				bankNum:'',//银行卡卡号
				UserInfo:'',
				cardnum:'',
				cardnums:'',//输入
				name:'',
				names:'',//输入
				bankList:'',
				bankName:'',
				bc:1,//设置页面跳转
				authCode:''//授权码
				,smsCode:''//短信验证码
				,inpsmsCode:''//短信验证码
			}
		},
		methods:{
			routerback(){
				// console.log(this.bc)
				if(this.bc==1){
					this.$router.push('/recharge')
				}else{
					window.sessionStorage.setItem('bankCard',1)
					this.$router.push('/settings')
				}
			},
			blankNama(){
				//_reg.regCode(this.codes,this.code)
				let _this=this
				if(_reg.regBank(this.bankNum)&&_reg.regCode1(this.inpsmsCode)){
					let obj = {bankNum:this.bankNum,smsCode:this.inpsmsCode,authCode:this.authCode},
        				path = _path.getApiUrl("cardBind");
					this.$axios.post(path,_path.postObj(obj),{withCredentials: true}).then(({status,data})=>{
						if(status==200){
							$.alert(data.msg,function(){
								_this.$router.push('/bankCard')
							})
							// setTimeout(()=>{
							// },1000)
							// $('.content').html(data)
						}
					})
				}
				// https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=6222005865412565805&cardBinCheck=true
			},
			getUserInfo(){//获取用户信息
				let path = _path.getApiUrl('getUserInfo')
				this.$axios.post(path,undefined,{emulateJSON: true,withCredentials: true}).then(res=>{
					if(res.status == 200){
						if(res.data.status == '000000'){
							this.UserInfo = res.data.data
							this.cardnum = this.UserInfo.cardnum
							this.name = this.UserInfo.name
						}
						
					}
				})
			},
			banks(){
				let path = _path.getApiUrl('banks');
				this.$axios.get(path,{withCredentials: true}).then(res=>{
					if(res.data.status=='000000'){
						// $.alert(res.data.msg)
						this.bankList = res.data.data.records
					}
				})
			},
			btn(name){
				this.bankName = name
				$('#panel-right').css('display','none')
				$('#panel-right').removeClass('active')
				$('body').removeClass('with-panel-right-cover')
			},
			ac(ac){
				this.authCode = ac
			}
		},
		mounted(){
			this.bc = window.sessionStorage.getItem('bankCard')
			this.getUserInfo()
			this.banks()
		},
		components:{
			custodysms
		}
    }
</script>
<style src='@/assets/css/me/addBankCard.css'>
</style>
