<template>
  <div>
    <div id="iosdownload">
		<header class="bar bar-nav" style="padding:0" v-if="safari">
			<img src="/static/img/iosdownload/head.png" alt="">
		</header>
		<div class="content">
			<div class="area1">
				<div class="center padt1 marb2">
					<img class="w4" src="/static/img/iosdownload/icon_logo.png" alt="">
					<div class="deepblue fs1">小微时贷</div>
				</div>
				<div class="mar1 deepblue">
					<div>银行存管上线，合规安心，就等你来！</div>
					<div>【小微简介】</div>
					<div>小微时贷平台稳定运营超3年，累计为用户赚取收益超6千万，累计交易总额超16亿；
						现已成长为国内知名p2p平台</div>
					<template v-if="info">
						<div>【新人福利】</div>
						<div>注册送380红包+首投加息0.8%</div>
						<div>新手专享标加息1.5%</div>
						<div>推荐好友注册投资，可每日获得推荐奖励</div>
						<div>【小微优势】</div>
						<div>投资门槛 - 50元起投</div>
						<div>投资情况 - 参考年回报率11%~17%</div>
						<div>提现速度 - 债权转让自由，无阻碍</div>
						<div>赚钱灵活 - 1-24月标期随你选</div>
						<div>功能升级 - 一键约标大额投资更方便</div>
						<div>月月加息 - 活动加息送不停</div>
						<div>【资金稳定】</div>
						<div>银行存管 - 用户所有资金由江西银行保障</div>
						<div>知名律所监管+第三方资金监控</div>
						<div>严密的风控审核机制 - 收益稳健</div>
						<div>【联系我们】</div>
						<div>官网网址：http://www.xwsd.com</div>
						<div>客服热线：400-865-9993</div>
						<div>准投资人Q群：336880049</div>
						<div>微信订阅号：搜索“小微xwsd订阅号”</div>
					</template>
					<div v-if="info==false" @click="more" class="blue pad_1">更多</div>
					<div v-if="info==true" @click="more" class="blue pad_1">收起</div>
					<div class="btn" @click="download">立即下载</div>
				</div>
			</div>
			<div class="area2">
				<div class="til2">"未受信任的企业级开发者"的解决办法</div>
				<div class="mar2">因苹果公司的政策原因，在iOS系统中首次安装
					企业版应用时会提示出现"未受信任的企业级开发者"提示</div>
				<img class="w15" src="/static/img/iosdownload/p1.png" alt="">
				<div>解决办法如下（以iOS11系统为例）：</div>
				<div class="deepblue mar1 left">1、在手机中打开设置功能，选择“通用”</div>
				<img class="w15 mar2" src="/static/img/iosdownload/p2.png" alt="1">
				<div class="deepblue mar1 left">2、在通用中，选择“设备管理”功能</div>
				<img class="w15 mar2" src="/static/img/iosdownload/p3.png" alt="2">
				<div class="deepblue mar1 left">3、在设备管理中的企业级应用分类中，选择要安装的企业应用的
					文件名称(与打开时的提示一致)，点击进入
				</div>
				<img class="w15 mar2" src="/static/img/iosdownload/p4.png" alt="3">
				<div class="deepblue mar1 left">4、进入企业签名页面后，确认企业签名中的公司名称与
					应用名称后，点击信任"企业签名公司名称"
				</div>
				<img class="w15 mart2" src="/static/img/iosdownload/p5.png" alt="4">
				<img class="w15 marb2" src="/static/img/iosdownload/p6.png" alt="5">
				<div class="deepblue mar1 left marb2">5、回到桌面，重新打开应用即可使用</div>
			</div>
	    </div>
		<div class="screenBg" v-if="screenBg" @click="screenBg=false">
			<img  src="/static/img/iosdownload/bg1.png" alt="">
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
				safari:false
				,info:false
				,screenBg:false
			}
		},
		methods:{
			routerback(){
				this.$router.push("/home");
			},
			more(){
				this.info = !this.info;
			},
			download(e){
				if(xt.versions.ios){
					if(!this.safari){
						//safari
						window.location.href = "itms-services://?action=download-manifest&url=https://gitee.com/xiaoweisd/download/raw/master/manifest.plist";
					}else{
						//是safari
						this.screenBg = true
					}
				}else{
					$.alert('请用apple手机打开页面')
				}
			}
		},
		mounted(){
			if(xt.versions.safari){
				this.safari =true
			}
		},
  }
</script>
<style src="@/assets/css/index/iosdownload.css"></style>
