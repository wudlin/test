<template>
  <div>
    <div id="detail">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
				<h1 class="title">项目详情</h1>
			</header>
			<div class="content">
				<div class="pinfo">
					<div class="pname">
						<!--消费标也可能是新手标-->
						<!--<span v-if="oddStyle=='plan'" class="picon yutou"></span>-->
						<template v-if="oddType=='consumer'">
							<span class="picon xing" v-if="oddStyle=='newhand'"></span>
							<span class="picon xiao" v-else-if="oddStyle!='newhand'"></span>
						</template>
						<template v-else-if="oddType!='consumer'">
							<span class="picon xing" v-if="oddStyle=='newhand'"></span>
							<span v-else-if="oddStyle!='newhand'" :class="{'picon':true,'picon0':investType==0,'picon1':investType==1}"></span>
						</template>
						<span class="nameT">{{oddTitle}}</span>
					</div>
					<!--20180727展期START-->
					<template v-if="!!extendPeriod">
						<div class="rtext">展期年化利率({{oddRepayType}})</div>
						<div class="rnum">{{extendYearRate | percentFormat}}<small>%</small></div>
					</template>
					<template v-else>
						<div class="rtext">年化利率({{oddRepayType}})</div>
						<div class="rnum">{{oddYearRate | percentFormat}}<small>%</small>{{oddReward==0?'undefined':oddReward | percentFormat11}}</div>
					</template>
					<div class="pbid">
						<div>
							<div class="num">{{oddMoney|formatNumber0}}</div>
							<div class="text">标的总额(元)</div>
						</div>
						<div>
							<div class="num">{{oddPeriod}} {{!!extendPeriod?'(+'+String(extendPeriod).replace("个","")+')':''}}</div>
							<div class="text">投资期限</div>
						</div>
						<div v-if="!!extendPeriod">
							<div class="num">{{oddYearRate | percentFormat}}<small>%{{oddReward==0?'undefined':oddReward | percentFormat11}}</small></div>
							<div class="text">年化利率</div>
						</div>
						<div v-else>
							<div class="num">{{oddMoneyLast|formatNumber0}}</div>
							<div class="text">剩余可投</div>
						</div>
					</div>
					<div class="progress">
						<div class="fill" :style="{'width':schedule<0 ? schedule=0 : schedule && schedule>100 ? schedule=100 : schedule+'%'}"></div>
					</div>
					<div class="repayment">
						<span class="typeT">还款方式</span>
						<span class="type">{{oddRepayType}}</span>
						<span class="rate">{{schedule<0 ? schedule=0 : schedule && schedule>100 ? schedule=100 : schedule}}%</span>
					</div>
					<div class="addPlanText" v-if="oddStyle=='plan'">该项目已加入小微智能一键投标</div>
				</div>
				<div class="pinformation">
					<dl v-if="oddType!='consumer'">
						<dt @click="dt1" class="dt1">借款者信息</dt>
						<dd class="borrowerInfo">
							<ul>
								<li class="name">
									<span class="bTitle">昵称</span>
									<span class="bContent">{{user1.username}}</span>
								</li>
								<li class="age">
									<span class="bTitle">年龄</span>
									<span class="bContent">{{user1.age}}</span>
								</li>
								<li class="marriage">
									<span class="bTitle">婚姻</span>
									<span class="bContent">{{user1.marital}}</span>
								</li>
								<li class="marriage">
									<span class="bTitle">借款用途 </span>
									<span class="bContent">个人资金周转</span>
								</li>
							</ul>
						</dd>
						<dt @click="dt2" class="vehicleInfo dt2">车辆信息<small>(共{{oddExteriorPhotos.length}}张)</small></dt>
						<dd class="vic">
							<ul>
								<li class="tb">
									<table border="1" cellspacing="0" cellpadding="0">
										<tbody>
											<!--2018.05.09修改为值为后台控制增加落地价格-->
											<tr v-for="(item,key) in oddLoanRemark" v-if="!!item">
												<td>{{key}}</td>
												<td>{{item}}</td>
											</tr>
											<!--<tr>
												<td>品牌型号</td>
												<td>{{oddLoanRemark.品牌型号}}</td>
												<td>车身颜色</td>
												<td>{{oddLoanRemark.车身颜色}}</td>
											</tr>
											<tr>
												<td>行驶公里数</td>
												<td>{{oddLoanRemark.行驶公里数}}</td>
												<td>排量</td>
												<td>{{oddLoanRemark.排量}}</td>
											</tr>
											<tr>
												<td>购买价格</td>-->
												<!--不明确是元还是万元-->
												<!--<td>{{oddLoanRemark.购买价格}}</td>
												<td>抵押估价</td>
												<td>{{oddLoanRemark.抵押估价}}</td>
											</tr>-->
										</tbody>
									</table>
								</li>
								<li class="pic" v-if="oddExteriorPhotos.length>0">
									<div v-for="(img,i) in oddExteriorPhotos">
										<img :src="img.min" alt="" :key="i" @click="photoBrowser(i,oddExteriorPhotos)"/>
									</div>
								</li>
								<div class="noimg" v-else-if="oddExteriorPhotos.length=0">暂无图片</div>
							</ul>
						</dd>
						<!----------------风控材料---------->
						<dt @click="dt3" class="rcmT dt3">风控材料</dt>
						<dd class="rcm">
							<h3 class="rcm-title dec">风控描述</h3>
							<p class="rcm-content" v-html="oddLoanControl"></p>
							<h3 class="rcm-title pt">产权图片</h3>
							<div class="rcm-img" v-if="oddPropertyPhotos.length>0">
								<div class="magnify" v-for="(img,i) in oddPropertyPhotos" :key="i" @click="photoBrowser(i,oddPropertyPhotos)">
									<img :src="img.min" :alt="'产权图片-'+i" />
								</div>
							</div>
							<div class="noimg" v-else-if="oddPropertyPhotos.length==0">暂无图片</div>
							<h3 class="rcm-title">借款手续</h3>
							<div class="rcm-img" v-if="oddLoanPhotos.length>0">
								<div class="magnify" v-for="(img,i) in oddLoanPhotos" :key='i' @click="photoBrowser(i,oddLoanPhotos)">
									<img :src="img.min" :alt="'借款手续-'+i" />
								</div>
							</div>
							<div class="noimg" v-else-if="oddLoanPhotos.length==0">暂无图片</div>
							<!----------风控图片-------------->
							<h3 class="rcm-title">风控图片</h3>
							<div class="rcm-img" v-if="controlPhotos.length>0">
								<div class="magnify" v-for="(img,i) in controlPhotos" :key='i' @click="photoBrowser(i,controlPhotos)">
									<img :src="img.min" :alt="'风控图片-'+i" />
								</div>
							</div>
							<div class="noimg" v-else-if="controlPhotos.length==0">暂无图片</div>
							<!----------验车图片-------------->
							<h3 class="rcm-title">验车图片</h3>
							<div class="rcm-img" v-if="validateCarPhotos.length>0">
								<div  class="magnify" v-for="(img,i) in validateCarPhotos" :key='i' @click="photoBrowser(i,validateCarPhotos)">
									<img :src="img.min" :alt="'验车图片-'+i" />
								</div>
							</div>
							<div class="noimg" v-else="validateCarPhotos.length==0">暂无图片</div>
						</dd>
						<!------------------投资记录-------------------->
						<dt @click="dt4" class="dt4">投资记录</dt>
						<dd class="dh tableList">
							<ul class="dh-content">
								<li class="dh-title">
									<div>序号</div>
									<div>投标人</div>
									<div>投标时间</div>
									<div>投标金额</div>
								</li>
								<li v-for="(r,i) in records" v-if="records.length>0" :key="i">
									<div>{{r.key}}</div>
									<div>{{r.username}}</div>
									<div>
										<div class="time">{{r.time}}</div>
									</div>
									<div>{{r.money|formatNumber0}}</div>
								</li>
								<div class="loading" @click="increPage()" v-if="totalPage>currentPage">加载更多</div>
								<div class="nodata" v-if="records.length==0">暂无数据</div>
							</ul>
						</dd>
						<!------------------GPS定位-------------------->
						<dt @click="dt5" class="dt5">GPS定位</dt>
						<dd class="location">
							<div>
								<iframe :src="'https://www.xwsd.com/gps/gpsLocation?odd='+ oddNumber" width="100%"  border="none"></iframe>
							</div>
						</dd>
					</dl>
					
					<dl v-else-if="oddType=='consumer'" class="consumer">
						<dt @click="dt1" class="dt1">项目详情</dt>
						<dd class="d1">
							<div class="pd6 clearfix user1">
								<div class="left">
									<div class="fz6"><span class="color666 wl">昵称</span><span class="color333  wR">{{user1.username|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">年龄</span><span class="color333  wR">{{user1.age|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">学历</span><span class="color333  wR">{{user1.educational|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">户籍地</span><span class="color333  wR">{{user1.city|isNotData}}</span></div>
								</div>
								<div class="right">
									<div class="fz6"><span class="color666 wl">性别</span><span class="color333  wR">{{user1.sex|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">婚姻</span><span class="color333  wR">{{user1.marital|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">身份证</span><span class="color333  wR">{{user1.cardnum|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">居住地</span><span class="color333  wR">{{user1.addressLocal|isNotData}}</span></div>
								</div>
								
							</div>
							<div class="typeTitle">工作详情</div>
							<div class="pd6 clearfix">
								<div class="left">
									<div class="fz6"><span class="color666 wl">单位名称</span><span class="color333  wR">{{user1.company|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">单位性质</span><span class="color333  wR">{{user1.nature|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">所在部门</span><span class="color333  wR">{{user1.depart|isNotData}}</span></div>
								</div>
								<div class="right">
									<div class="fz6"><span class="color666 wl">单位地址</span><span class="color333  wR">{{user1.companyAddr|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">所属行业</span><span class="color333  wR">{{user1.industry|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">月薪</span><span class="color333  wR">{{user1.salary|isNotData}}</span></div>
								</div>
							</div>
							<div class="typeTitle">借款记录</div>
							<div class="pdL6 pdT6 pdR2 clearfix user2">
								<div class="left">
									<div class="fz6"><span class="color666 wl">申请借款(笔)</span><span class="color333  wR">{{user2.borrowCount|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">借款总额(元)</span><span class="color333  wR">{{user2.borrowMoney|isNotData}}</span></div>
								</div>
								<div class="right">
									<div class="fz6"><span class="color666 wl">成功借款(笔)</span><span class="color333  wR">{{user2.successCount|isNotData}}</span></div>
									<div class="fz6"><span class="color666 wl">待还本息(元)</span><span class="color333  wR">{{user2.stayMoney|formatNumber2}}</span></div>
								</div>
							</div>
						</dd>
						<dt @click="dt2" class="dt2">风控材料</dt>
						<dd class="d2">
							<div class="typeTitle pdT6">借款材料</div>
							<div class="pd6 clearfix">
								<div v-if="controlVars" v-for="(controlVars,i) in controlVars" class="loanInfo">
									<span class="color666 fz75 pdR6">{{controlVars}}</span>
									<span class="colorB fz75">已认证</span>
								</div>
								<div v-else-if="controlVars.length==0" style="text-align: center;font-size: .6rem;">暂无信息</div>
							</div>
							<div class="typeTitle pdT6">合规材料</div>
							<div class="pd6 imgArea" v-if="oddPropertyPhotos.length>0">
								<div class="pdT6 pdR6 img" v-for="(img,i) in oddPropertyPhotos" :key="i" @click="photoBrowser(i,oddPropertyPhotos)">
									<img :src="img.min" :alt="'合规材料-'+i" />
								</div>
							</div>
							<div class="noimg" v-else-if="oddPropertyPhotos.length==0">暂无图片</div>
							<div class="typeTitle pdT6">借款手续</div>
							<div class="pd6 imgArea " v-if="oddLoanPhotos.length>0">
								<div class="pdT6 pdR6 img" v-for="(img,i) in  oddLoanPhotos" :key="i" @click="photoBrowser(i, oddLoanPhotos)">
									<img :src="img.min" :alt="'借款手续-'+i"/>
								</div>
							</div>
							<div class="noimg" v-else-if=" oddLoanPhotos.length==0">暂无图片</div>
						</dd>
						<dt @click="dt3" class="dt3">投资记录</dt>
						<dd class="d3 tableList">
							<ul class="dh-content">
								<li class="dh-title">
									<div>序号</div>
									<div>投标人</div>
									<div>投标时间</div>
									<div>投标金额</div>
								</li>
								<li v-for="(r,i) in records" v-if="records.length>0" :key="i">
									<div>{{r.key}}</div>
									<div>{{r.username}}</div>
									<div>
										<div class="time">{{r.time}}</div>
									</div>
									<div>{{r.money|formatNumber0}}</div>
								</li>
								<div class="loading" @click="increPage()" v-if="totalPage>currentPage">加载更多</div>
								<div class="nodata" v-if="records.length==0">暂无数据</div>
							</ul>
						</dd>
						<dt @click="dt4" class="dt4">在投记录</dt>
						<dd class="d4 tableList">
							<ul class="dh-content">
								<li class="dh-title">
									<div>投标人</div>
									<div>金额</div>
									<div>投标时间</div>
									<div>有效时间</div>
								</li>
								<li v-for="(r,i) in currentRecords" v-if="currentRecords.length>0" :key="i">
									<div>{{r.username}}</div>
									<div>{{r.money}}</div>
									<div>
										<div class="time">{{r.time}}</div>
									</div>
									<div>{{r.lastTime}}</div>
								</li>
								<div class="loading" @click="increPage1()" v-if="totalPage1>currentPage1">加载更多</div>
								<div class="nodata" v-if="currentRecords.length==0">暂无数据</div>
							</ul>
						</dd>
					</dl>
				</div>
			</div>
			<!--马上就投-->
			<template v-if="oddStyle!='plan'">
				<div class="immBtn gray" v-if="btnFlags==1">复审中</div>
				<div class="immBtn" @click="immCast()" v-else-if="btnFlags==2">马上就投</div>
				<div class="immBtn gray" v-else-if="btnFlags==3">{{second}}后可投</div>
				<div class="immBtn gray" v-else-if="btnFlags==4">{{openTime}}开始</div>
				<div class="immBtn gray" v-else-if="btnFlags==5">还款中</div>
				<div class="immBtn gray" v-else-if="btnFlags==6">已满标</div>
				<div class="immBtn gray" v-else-if="btnFlags==7">已结束</div>
			</template>
		</div>
  </div>
</template>
<script>
	import _path from '@/assets/js/md5'
	import filters from '@/assets/js/formatAll'
	let methods = {
		routerback(){
			if(this.fromPag=='debt1'){
				this.$router.push({name:'debtCession'})
			}else if(this.fromPag=='refundCalendar'){
				this.$router.push({name:'refundCalendar'})
			}else if(this.fromPag=='investManage'){
				this.$router.push({name:'investManage'})
			}else if(this.fromPage=='debt'){
				this.$router.push({name:'debtCession',params:{dcDetailGo:'sell'}})
			}else if(this.fromPage=='home'){
				this.$router.push('/')
			}else if(this.project=='debt'){
					this.$router.push({ name: 'projects', params: { projectShow:'debt'}})
			}else if(this.fromPage=='project'){
				this.$router.push({ name: 'projects', params: { projectShow:'detail'}})
			}else if(this.fromPage=='preInvestDetail'){
				this.$router.push('/preInvestDetail/'+this.planId)
			}else{
				this.$router.go(-1)
			}
		},
		dt1() {
			$('.pinformation dd').not($('.borrowerInfo,.d1')).hide();
			$('.borrowerInfo,.d1').slideToggle(200);
			$('.pinformation dt').not($('.dt1')).removeClass('show');
			$('.dt1').toggleClass('show')
		},
		dt2() {
			$('.pinformation dd').not($('.vic,.d2')).hide();//
			$('.vic,.d2').slideToggle(200);
			$('.pinformation dt').not($('.dt2')).removeClass('show');//
			$('.dt2').toggleClass('show')
		},
		dt3() {
			$('.pinformation dd').not($('.rcm,.d3')).hide();
			$('.rcm,.d3').slideToggle(200);
			$('.pinformation dt').not($('.dt3')).removeClass('show');
			$('.dt3').toggleClass('show')
		},
		dt4() {
			$('.pinformation dd').not($('.dh,.d4')).hide();
			$('.dh,.d4').slideToggle(200);
			$('.pinformation dt').not($('.dt4')).removeClass('show');
			$('.dt4').toggleClass('show')
		},
		dt5() {
			$('.pinformation dd').not($('.location')).hide();
			$('.location').slideToggle(200);
			$('.pinformation dt').not($('.dt5')).removeClass('show');
			$('.dt5').toggleClass('show')
		},
		getData() {
			let pid = this.$route.params.pid,
					dataObj = {
						oddNumber:pid
					},
					path = _path.getObj('odd',dataObj)
					this.oddNumber = pid;
			//将标的标识传入下个页面
			//window.sessionStorage.setItem("oddNumber",pid)
			this.$axios.get(path,{withCredentials: true}).then((res)=>{
				//console.log(res)
				let data = res.data
				if(res.status === 200){
					if(data.status === '000000'){
						let dataContent = data.data,second = dataContent.second;
						this.oddTitle = dataContent.oddTitle;
						this.oddNumber = dataContent.oddNumber;
						this.oddStyle = dataContent.oddStyle
						this.investType = dataContent.investType;
						this.oddType = dataContent.oddType;
						// console.log(dataContent)
						this.oddYearRate = dataContent.oddYearRate;
						this.oddReward = dataContent.oddReward;
						this.oddMoney = dataContent.oddMoney;
						this.oddMoneyLast = dataContent.oddMoneyLast;
						this.oddGarageNum = dataContent.oddGarageNum;
						this.oddUse = dataContent.oddUse;
						this.oddLoanRemark = dataContent.oddLoanRemark;
						this.oddExteriorPhotos = dataContent.oddExteriorPhotos;
						this.addtime = dataContent.addtime;
						this.oddPeriod = dataContent.oddPeriod;
						this.oddRepayType = dataContent.oddRepayType;
						this.schedule = dataContent.schedule;
						this.openTime = dataContent.openTime;
						this.user1 = dataContent.user1;
						this.user2 = dataContent.user2;
						this.progress = dataContent.progress;
						this.extendPeriod = dataContent.extendPeriod;
						this.extendYearRate = dataContent.extendYearRate;
//						this.second = dataContent.second
						this.btnFlag(second);
						//window.sessionStorage.setItem('oddPeriod',dataContent.oddPeriod)
						// console.log('oddPeriod'+dataContent.oddPeriod)
					}else{
						_path.dealStatusCode(data.status,data.msg,this)
					}
				}else{
					$.alert('网络异常请重试', function () {
	          this.getData();
	        });
				}
			})
			//风控信息
			let pathFk = _path.getObj('oddrm',dataObj)
			this.$axios.get(pathFk,{withCredentials: true}).then((res)=>{
				//  console.log(res);
				let data = res.data;
				if(res.status === 200){
					if(data.status === "000000"){
						let dataContent = data.data;
						this.controlVars = dataContent.controlVars;
						this.oddPropertyPhotos = dataContent.oddPropertyPhotos;
						this.oddLoanPhotos = dataContent.oddLoanPhotos;
						this.controlPhotos = dataContent.controlPhotos;
						this.validateCarPhotos = dataContent.validateCarPhotos;
//						this.bankCreditReport = dataContent.bankCreditReport;
						this.oddLoanControl =this.traText(dataContent.oddLoanControl) ;
					}else{
						_path.dealStatusCode(data.status,data.msg,this)
					}
				}
			})
		},
		btnFlag(second) {
			if(this.progress==='review'){
				//复审中
					//console.log('复审中')
					this.btnFlags = 1
			}else if(this.progress==='start'&&this.oddMoneyLast>0&&second==-1){
				//马上就投
				//console.log('马上就投')
				this.btnFlags = 2
			}else if(this.progress==='start'&&second>0){
				//倒计时
				//console.log('倒计时')
				console.log(this.second)
				this.btnFlags = 3
				this.remainTime(second)
			}else if(this.progress==='start'&&this.oddMoneyLast>0&&second==0){
				//开始时间
				//console.log('开始时间')
				this.btnFlags = 4
			}else if(this.progress==='run'){
				//还款中
				//console.log('还款中')
				this.btnFlags = 5
			}else if(this.progress==='start'&&this.oddMoneyLast==0){
				//满标
				this.btnFlags = 6
			}else if(this.progress==='end'){
				//已结束
				//console.log('已结束')
				this.btnFlags = 7
			}
			
		},
		traText(content) {
			return $('<span />').html(content).text()
		},
		openPhotoBrowser (photos,num){
			let myPhotoBrowser = $.photoBrowser({
				photos: photos,
				theme: 'dark',
			})
			myPhotoBrowser.open(num);
		},
		//放大后的所需图片数组
		photosArr(photosObject) {
			let photos = []
			photosObject.forEach(function(value,index){
				photos.push(value.normal)
			})
			return photos
		},
		photoBrowser(num,photosObject) {
			//车辆照片
			let photos = this.photosArr(photosObject)
			this.openPhotoBrowser(photos,num)
		},
		getInvestR(pageNum) {
			//投资记录
			 
			let	dataObj = {
						page:pageNum,
						pageSize:this.pageSize,
						oddNumber:this.oddNumber
				},pathTz = _path.getObj('oddtenders',dataObj)
			this.$axios.get(pathTz,{withCredentials: true}).then((res)=>{
				let data = res.data;
				if(res.status === 200){
					if(data.status === "000000"){
						let dataContent = data.data;
						let records = this.records.concat(dataContent.records)
						this.$set(this, "records", records);
						this.currentPage = dataContent.page;
						console.log(this.currentPage)
						this.totalPage = Math.ceil(dataContent.count/this.pageSize);
					}else{
						_path.dealStatusCode(data.status,data.msg,this)
					}
				}
			})
			
		},
		getCurrentInvest(pageNum){
			//在投记录
			let dataObj = {
				page:pageNum,
				pageSize:this.pageSize,
				oddNumber:this.oddNumber
			},
			path = _path.getObj('oddBuy',dataObj)
			this.$axios.get(path,{withCredentials: true}).then((res)=>{
				let data = res.data;
				if(res.status === 200){
					if(data.status === "000000"){
						let dataContent = data.data;
						let records = this.currentRecords.concat(dataContent.records)
						this.$set(this, "currentRecords", records);
						this.currentPage1 = dataContent.count;
						this.totalPage1 = Math.ceil(dataContent.count/this.pageSize);
					}else{
						_path.dealStatusCode(data.status,data.msg,this)
					}
				}
			})
		},
		increPage() {//投资记录
			this.page = this.page + 1;
			this.getInvestR(this.page)
		},
		increPage1() {//在资记录
			this.page1 = this.page1 + 1;
			this.getCurrentInvest(this.page1)
		},
		remainTime(time) {
			this.traTime(time)
				var setTime = setInterval(()=>{
					if(time>0){
						this.traTime(time)
						time --;
					}else{
						clearInterval(setTime)
						this.btnFlags = 2
					}
				},1000);
		},
		traTime(time) {
			var minutes = Math.floor(time / 60 % 60);//计算剩余的分钟 
			var seconds = Math.floor(time % 60);//计算剩余的秒数 
			minutes = this.formatTimes(minutes); 
			seconds = this.formatTimes(seconds);
			this.second =   minutes+":"+seconds; 
		},
		formatTimes(s) {
			return s < 10 ? '0' + s: s
		},
		immCast() {
			let path = _path.getApiUrl('islogin')
			this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
      	if(status==200){
      		if (data.status == "000000"&&data.data.isLogin==1) {
//     			let odd = {
//						//将剩余可投、标题传到下个页面
//						oddMoneyLast:this.oddMoneyLast,
//						oddTitle:this.oddTitle
//					}
//  			odd = JSON.stringify(odd)
//					window.sessionStorage.setItem('odd',odd)
      		  this.$router.push('/investBid/'+this.oddNumber)
      		}else{
	    			this.$router.push('/login/1')
	    		}
      	}
      });
		}
	}
	export default{
			name,
			methods,
			filters,
			data(){
				return {
					planId:'',//智投标识
					project:'',
					pid:'',
					oddTitle:'',//标题
					investType:'',//自动手动标识
					oddType:'',//消费标标识
					oddNumber:'',//标的唯一标识符
					oddStyle:'',//标种类
					oddYearRate:0,//年化率
					oddReward:0,//奖励年化率
					oddMoney:0,//标的金额
					oddMoneyLast:0,//剩余可投
					oddGarageNum:'',//车库编号
					oddUse:'',//借款用途
					oddLoanRemark:{},//车辆信息
					oddExteriorPhotos:[],//车辆照片
					addtime:'',//发布时间
					oddPeriod:'',//标的期限
					oddRepayType:'',//还款方式
					schedule:'',//进度
					second:'',//倒计时秒数
					progress:'',//标进程
					openTime:'',//开始时间
					btnFlags:0,//按钮显示的标志
					user1:{},//借款者信息
					//风控信息
					controlVars:[],//接口材料
					oddPropertyPhotos:[],//产权图片
					oddLoanPhotos:[],//借款手续
					controlPhotos:[],//风控图片
					validateCarPhotos:[],//验车图片
//					bankCreditReport:[],//央行征信
					oddLoanControl:"",//风控描述
					extendYearRate: '',//展期利率
					extendPeriod: '',//展期期限
					page:1,//投资记录
					page1:1,//在投记录
					pageSize:6,
					totalPage:0,//投资记录总页面数
					currentPage:1,//投资记录当前页码
					records:[],//投资记录内容
					totalPage1:0,//在投记录总页面数
					currentPage1:1,//在投记录当前页码
					currentRecords:[],//在投记录
					fromPage:'',
					fromPag:'',
					user2:{},//借款记录
				}
			},
			created() {
				this.getData()
				this.getInvestR(1)
				this.getCurrentInvest(1)
			},
			mounted(){
				this.fromPage = window.sessionStorage.getItem('fromPage')
				window.sessionStorage.removeItem('inputMoneyNum')
				window.sessionStorage.setItem('lotteryName','')
				window.sessionStorage.setItem('lotteryId',0)
				this.planId = this.$route.params.id
				this.project = this.$route.params.project
				this.fromPag = this.$route.params.fromPage
			}
	}
</script>

<style src='@/assets/css/projects/detail.css'>
</style>
