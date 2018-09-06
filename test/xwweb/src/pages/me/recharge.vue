<template>
  <div>
      <div id="recharge">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">账户充值</h1>
				<router-link to='/rechargeWithdrawalRecord' class="button pull-right rr external">充值记录</router-link>
				<!-- <a href="#">充值记录</a> -->
			</header>
			<div class="content">
			<div class="buttons-tab">
				<a href="#tab1" class="tab-link active button bor">快捷充值</a>
				<!-- 20180509移除支付宝充值 -->
				<!-- <a href="#tab2" class="tab-link button">支付宝充值</a> -->
				<a href="#tab3" class="tab-link button">银行转账</a>
			</div>
				<div class="tabs">
					<div id="tab1" class="tab active">
						<!--需要判断是否添加过银行卡-->
						<div v-if='bankNum' class="bc">
							<div class="borderp">
								<span>{{binInfo.split('-')[0]}}<span class="grey">（尾号{{bankNums}}）</span></span>
							</div>
							<div class="ra">
								<div class="text">充值金额</div>
								<input type="tel" v-model="money" placeholder="不少于100元"/>
							</div>
						</div>
						<div v-else  @click='addBankCard'  class="nobc">
							<span class="text">快捷充值需要绑定银行卡，请绑定银行卡</span>
							<a href="#" class="icon icon-right pull-right gray"></a>
						</div>	
						<div v-if='bankNum' class="rechargeBtn"><a href="#" class="button button-fill" @click.prevent="recharge">充值</a></div>
						<div class="sec3">
							<div class="ins">
								<div class="dashed"></div>
								<div class="text">充值说明</div>
								<div class="dashed"></div>
							</div>
							<p class="sec3-tips">
								1、快捷充值最低充值金额为100元，用户使用快捷充值不收取任 何手续费。
								<br />2、系统支持工商银行、建设银行、中国银行、农业银行在内的多 家银行快捷充值，其他银行的银联卡可以通过网上银行、ATM机 、支付宝等方式进行转账充值。 
								<br />
								<router-link class="underline" to='/supportBankList'>点击这里查看支持快捷转账的银行列表</router-link>
								<br />3、为了您的资金安全，江西银行电子交易账户采用同卡进出规则。 
								<br />4、如果充值失败，建议拨打您发卡行客服电话，咨询是否已开通 待收代付，无卡支付或电子支付业务。如无法解决，您可使用其他 方式充值。
							</p>
						</div>
					</div>
					<!-- <div id="tab2" class="tab">
						<div class="sec1">
							<h3 class="sec1-title">您可以通过支付宝转账到您在江西银行开立的电子账户。</h3>
							<table border="1" cellspacing="0">
								<tr>
									<th>收款姓名</th>
									<td>{{names}}</td>
								</tr>
								<tr>
									<th>收款方账号</th>
									<td>{{custodyId}}</td>
								</tr>
								<tr>
									<th>开户行</th>
									<td>江西银行</td>
								</tr>
								<tr>
									<th>开户地</th>
									<td>江西南昌市</td>
								</tr>
								<tr>
									<th>开户支行</th>
									<td>江西银行股份有限公司总行营业部</td>
								</tr>
							</table>
							<p class="sec1-tip">
								南昌银行已更名为江西银行，如果搜索不到江西银行，可选择南昌银行或城市商业银行。
							</p>
						</div>
						<div class="sec2">
							<img src="/static/img/me/recharge/explain.png" alt="使用支付宝账户" />
						</div>
						<div class="sec3">
							<p class="sec3-tips">
								温馨提示<br /> 1、用户充值时如果发现账户余额没有实时更新,请到我的账户中点击“可用余额”获取最新账户余额。 
								<br />2、您可通过支付宝账户向您的江西银行存管电子账户进行转账,充值到账时间以银行最终结果为准。
								<br />3、由于银行会在23:30到凌晨3:00进行系统数据处理,请尽量避免在此时间段充值。 
								<br />充值过程中如出现异常，请拨打江西银行客服电话400-78-96266
							</p>
						</div>
					</div> -->
					<div id="tab3" class="tab">
						<div class="sec1">
							<!-- 20180528修改文案 -->
							<!-- <h3 class="sec1-title">
								您可以直接向您在江西银行开立的电子账户进行转账。<br />
							 	转账方式包括：银行柜台转账、网银转账、手机银行转账。
							</h3> -->
							<h3 class="sec1-title">平台客户可以通过子账户的绑定银行卡向平台的汇总账户进行充值，入账后由江西银行从平台汇总账户向平台客户做资金划扣，从而完成线下充值。</h3>
							<h3 class="sec1-title">线下转账（如：网上银行、手机银行、柜台、ATM机）所需填写的收款方信息如下:</h3>
							<table border="1" cellspacing="0" cellpadding="">
							<!-- 20180528修改文案 -->
								<!-- <tr>
									<th>收款姓名</th>
									<td>{{names}}</td>
								</tr>
								<tr>
									<th>收款方账号</th>
									<td>{{custodyId}}</td>
								</tr>
								<tr>
									<th>开户行</th>
									<td>江西银行</td>
								</tr>
								<tr>
									<th>开户地</th>
									<td>江西南昌市</td>
								</tr>
								<tr>
									<th>开户支行</th>
									<td>江西银行股份有限公司总行营业部</td>
								</tr> -->
								<tr>
									<th>户名：</th>
									<th>福建小微时贷科技发展有限公司</th>
								</tr>
								<tr>
									<th>专户账号：</th>
									<th>791913245700308</th>
								</tr>
								<tr>
									<th>开户行：</th>
									<th>江西银行股份有限公司南昌新华支行营业部</th>
								</tr>
								<tr>
									<th>附言：</th>
									<th>1</th>
								</tr>
							</table>
							<p class="sec1-tip">
								南昌银行已更名为江西银行，如果搜索不到江西银行，可选择南昌银行或城市商业银行。
							</p>
							<!-- 20180528添加文案 -->
							<p class="sec1-title">（1）如客户在平台只有一个角色，无论附言是否填写，系统自动将相应的财务记录其存管子账户中</p>
							<p class="sec1-title">（2）如同一个客户在平台同时具有不同角色，即同时为借款人、出借人、担保人，为确保系统能够准确的记录到相应的存管子账户中，需客户在转账过程中，在附言中增加标识以便系统判断，具体标识：“1”代表出借人角色、“2”：代表借款人角色、“3”代表担保人角色</p>
							<p class="sec1-title">（3）如同一个客户在平台具有不同角色，但在转账过程中附言首位不为规定的标识（1、2、3），系统将按默认的顺序自动对其角色将财务记录存管子账户中，默认顺序依次为：借款人角色、出借人角色、担保人角色</p>
						</div>
						
						<div class="sec3">
							<div class="ins">
								<div class="dashed"></div>
								<div class="text">充值说明</div>
								<div class="dashed"></div>
							</div>
							<p class="sec3-tips">
								1、用户充值时如果发现账户余额没有实时更新,请到我的账户中点击“可用余额”获取最新账户余额。 
								<br />2、您可通过支付宝账户向您的江西银行存管电子账户进行转账,充值到账时间以银行最终结果为准。
								<br />3、由于银行会在23:30到凌晨3:00进行系统数据处理,请尽量避免在此时间段充值。 
								<br />充值过程中如出现异常，请拨打江西银行客服电话400-78-96266
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import _path from '@/assets/js/md5'

    export default{
        name,
		data(){
			return {
				binInfo:'',//卡名
				bankNum:'',//卡号
				bankNums:'',//卡号后4
				money:'',
				custodyId:'',//存管账号
				names:'',
				cardnum:'',
				bankStatus:'',
			}
		},
		methods:{
			routerback(){
				this.$router.push('/me')
			},
			getUserInfo(){//用户信息
				let path = _path.getApiUrl('getUserInfo')
				this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status == '000000'){
							let r = data.data
							this.cardnum = r.cardnum//身份证
							this.names = r.name//姓名
							this.custodyId = r.custodyId
							if(!this.names||!this.cardnum){
								this.bankStatus = 1
							}
							
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}			
				})
			},
			recharge(){//充值
				let obj = {money:this.money}
				if(this.money>=100){
					location.assign(_path.getObj('recharge',obj))
				}else{
					$.alert('充值金额少于100')
				}
			},
			userBankCard(){//获取银行卡信息
				let path = _path.getApiUrl('userBankCard')
				this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
					if(status==200){
						if(data.status=='000000'){
							this.BankCard = data.data
							this.binInfo = this.BankCard.binInfo
							this.bankNum = this.BankCard.bankNum
							this.bankNums =this.bankNum.substr(this.bankNum.length-4,4)					
						}else {
							_path.dealStatusCode(data.status, data.msg, this);
						}
					}
				})	
			},
			addBankCard(){
				if(this.bankStatus==1){
					this.$router.push('/openDepository')
				}else{
					// this.$router.push('/addBankCard')
					//20180614跳转添加银行卡页面
					this.getcardBind()
				}
			},
			getcardBind(){
			//跳转添加银行卡页面
				let path = _path.getApiUrl("cardBind");
				window.location.href = path;
			}
		},
		mounted(){
			this.getUserInfo()
			this.userBankCard()
		},
  }
</script>
<style src='@/assets/css/me/recharge.css'>
</style>
