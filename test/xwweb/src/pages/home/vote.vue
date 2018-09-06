<template>
  <div>
    <div id="news">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
			<h1 class="title">问卷调查</h1>
		</header>
		<div class="content">
			<div class="information">
				<div class="head">
					<span class="h-icon"></span>
					<span class="h-text">借款人与投资人调查问卷</span>
				</div>
				<div class="con">
					<p>尊敬的投资者：</p>
					<p class="tipIndent">以下问题是从财务状况、投资经验、投资风格、风险偏好和风险承受能力等方面对您进行风险自我评估和认定，以便您更有效地选择小微时贷向您推介的金融投资产品。</p>
					<p>请您认真作答，感谢您的配合！</p>
					<br>
					<p class="indent">您目前的年龄？</p>
					<ul>
						 <li>
							<label class="label-checkbox item-content" >
								<input type="radio" name="w1" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">a. &nbsp;18-25岁</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w1" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">b. &nbsp;25-40岁之间</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w1" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">c. &nbsp;41-60岁之间</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w1" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">d. &nbsp;大于60岁</div>
							</label>
						</li>
					</ul>
					<p class="indent">您当前的资产主要构成情况？</p>
					<ul>
						 <li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w2" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">a. &nbsp;只有银行存款（活期或者定期）</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w2" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">b. &nbsp;主要是银行存款，还有少量国债和基金、蓝筹股</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w2" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">c. &nbsp;既有股票、基金、股票、理财产品，也有银行存款，前后两者各半</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w2" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">d. &nbsp;互联网理财 （P2P互联网借贷，个人通过互联网平台将自有资金贷给借款人，并收取高于一般理财的利息，由担保公司进行借款的本金、利息担保方式）</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w2" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">e. &nbsp;以期货等金融衍生产品和股票投资为主。</div>
							</label>
						</li>
					</ul>
					<p class="indent">请问您投资价格波动性的产品有多少年的经验？（具有价格波动的产品包括互联网理财、股票、基金、外汇、期权期货等金融产品）</p>
					<ul>
						 <li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w3" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">a. &nbsp;7-10年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w3" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">b. &nbsp;4-7年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w3" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">c. &nbsp;1-3年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w3" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">d. &nbsp;从来没有或刚刚开始</div>
							</label>
						</li>
					</ul>
					<p class="indent">通常情况下您一笔投资预备持有的期限是多久？</p>
					<ul>
						 <li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w4" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">a. &nbsp;长期——超过7年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w4" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">b. &nbsp;中期——4年到7年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w4" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">c. &nbsp;中短期——1年到3年</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w4" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">d. &nbsp;短期——1年内</div>
							</label>
						</li>
					</ul>
					<p class="indent">一年中您能最能接受的资产波动范围是？</p>
					<ul>
						 <li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w5" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">a. &nbsp;最多盈利10%，最大亏损5%</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w5" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">b. &nbsp;最多盈利20%，最大亏损15%</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w5" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">c. &nbsp;最多盈利40%，最大亏损30%</div>
							</label>
						</li>
						<li>
							<label class="label-checkbox item-content">
								<input type="radio" name="w5" value="1">
								<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
								<div class="item-inner">d. &nbsp;最多盈利60%，最大亏损50%</div>
							</label>
						</li>
					</ul>
					<br>
					<p class="fs7">
						<label class="label-checkbox item-content">
				      <input type="checkbox"  class='che'>
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"></i>
				      	<span>我已阅读</span>
				      	<router-link :to="{name:'vote1',params:{path:terminal}}" class="fz06">网络借贷风险和禁止性行为提示书</router-link>
				      </div>
				    </label>
					</p>
					<p class="indent1 fs7">
						<label class="label-checkbox item-content">
				      <input type="checkbox"  class='che'>
				      <div class="item-media">
				      	<i class="icon icon-form-checkbox"></i>
				      	<span>我已阅读</span>
				      	<router-link :to="{name:'vote2',params:{path:terminal}}">借款人义务及禁止性行为提示书</router-link>
				      </div>
				    </label>
					</p>
					<div @click='getData' class="button button-big button-fill questionBtn">提交问卷</div>
				</div>
			</div>
	    </div>
		</div>
	</div>
  </div>
</template>
<script>
// import _path from '@/assets/js/md5.js'
// import pageNav from '@/pages/page-nav'
import xt from '@/assets/js/xt'
import jquery from "@/assets/js/jquery.js";


  export default{
		name,
		data() {
			return {
				android:false
				,ios:false
				,terminal:'app'
			}
		},
		methods:{
			routerback(){
				this.$router.push("/home")
			},
			getData(){
				if(!!$('input[name="w1"]:checked').val()&&!!$('input[name="w2"]:checked').val()&&
				!!$('input[name="w3"]:checked').val()&&!!$('input[name="w4"]:checked').val()
				&&!!$('input[name="w5"]:checked').val()){
					if(!!$(".che")[0].checked&&!!$(".che")[1].checked){
						// _this = this
						$.alert("问卷调查<br>问卷已提交，感谢您的参与！！",function(){
							let key = this.getCookie("vote_phone");
							// this.getMobiHash()
							if(this.terminal=='wap'){
								this.setCookie(key,key)
								this.$router.push("/home")
							}else{
								if(!!this.android){
									window.android.setSubmitStatus("true");
								}else if(!!this.ios){
									window.webkit.messageHandlers.submitStatus.postMessage("")								
								}else{
									this.setCookie(key,key)
									this.$router.push("/home")
								}
							}
						}.bind(this))
					}else{
						if(!!$(".che")[0].checked){
							$.alert("问卷调查<br>借款人义务及禁止性行为提示书!")
						}else{
							$.alert("问卷调查<br>网络借贷风险和禁止性行为提示书!")
						}
					}
				}else{
					$.alert("问卷调查<br>问卷所有题目均为必填！")
				}
				// console.log($('input[name="w1"]:checked').val())
				// console.log($('input[name="w2"]:checked').val())
				// console.log($('input[name="w3"]:checked').val())
				// console.log($('input[name="w4"]:checked').val())
				// console.log($('input[name="w5"]:checked').val())
				//问卷调查 问卷所有题目均为必填！
				//问卷调查 请阅读“网络借贷风险和禁止性行为”！
				//问卷调查 问卷已提交，感谢您的参与！！
			},
			setCookie(name,value){
		        //console.log(name)
		        var Days = 60;
		        var exp = new Date();
		        exp.setTime(exp.getTime() + Days*24*60*60*1000);
		        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=.xwshidai.com";
		        // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=.xwsd.com";
		    },
		    getCookie(name){ 
		        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
		        if(arr=document.cookie.match(reg))return unescape(arr[2]);else return null;
			},
			checkApp(){
				let u = navigator.userAgent, ret = {}
				if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
					ret["android"] = true
				}else if(u.indexOf('iPhone') > -1){
					ret["ios"] = true
				}
				// ret["app"] = (!!_this.mobiHash)
				return ret;
			},
			getMobiHash(){
				let c = this.checkApp(),
					func = (cb, cerr) => {
						window.sendHash = (hash) => {
							cb( { hash, "app":true } )
						}
						try{
							if(c.android){
								// this.terminal="android"
								// android.getLoginHash()
								window.android.setSubmitStatus("true");
							}else if(c.ios){
								// this.terminal="ios"
								//window.webkit.messageHandlers.submitStatus.postMessage("")
								window.webkit.messageHandlers.getLogin.postMessage("")
							}
							// $.alert(this.terminal)
						}catch(e){
							// this.terminal="app:false"
							this.setCookie(key,key)
							this.$router.push("home")
							cerr( { "app":false } )
						}
					}
				return new Promise(func)
			},
		},
		mounted(){
			this.terminal=this.$route.params.path
			if(!!this.terminal&&this.terminal=="wap"){

			}else{
				$('header').css('display','none')
				$('.content').css('top',0)
				$('.information').css('margin',0)
				if(!!xt.versions.iPhone){
					this.ios = true
				}else if(xt.versions.android){
					this.android = true
				}else{
					// this.terminal="wap"
				}
			}
			// console.log(xt.versions)
			// console.log(navigator.userAgent)
			$('.che').prop('checked',true)
		},
  }
</script>
<style src='@/assets/css/index/news.css'></style>
