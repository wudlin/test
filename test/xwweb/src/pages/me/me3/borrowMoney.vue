<template>
  <div>
      <div id="borrowMoney">
			<header class="bar bar-nav">
				<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
				<h1 class="title">借款</h1>
			</header>
			<div class="content">
				<div class="list-block">
				    <ul>
				      <!-- 姓名 -->
					    <li>
					        <div class="item-content">
					          <div class="item-inner">
					            <div class="item-title label">姓名</div>
					            <div class="item-input">
					              <input type="text" id="username" name="username" v-model='name' placeholder="未填写">
					            </div>
					          </div>
					        </div>
					    </li>
					    <!--手机号码-->
					    <li>
					        <div class="item-content">
					          <div class="item-inner">
					            <div class="item-title label">手机号码</div>
					            <div class="item-input">
					              <input type="tel" id="tel" name="tel" placeholder="未填写" v-model='phone' pattern="/^1(3|4|5|7|8)\d{9}$/">
					            </div>
					          </div>
					        </div>
					    </li>
				
				      <!-- 居住地 -->
					    <li>
					        <div class="item-content">
						        <div class="item-inner">
						            <div class="item-title label">居住城市</div>
						            <div class="item-input address">
						              	<input type="text" id="city-picker" name="province" placeholder="选择省份城市" readonly>
						              	<!-- <input type="text" id="city" name="city" placeholder="选择城市" readonly> -->
						            </div>
						        </div>  
					        </div>
					    </li>
					    <!-- 借款金额 -->
					    <li>
					        <div class="item-content">
						        <div class="item-inner">
						            <div class="item-title label">借款金额</div>
						            <div class="item-input">
						              	<input type="number" id="money" name="money" v-model='money' placeholder="请输入50的整数倍">
						            </div>
						        </div>  
					        </div>
					    </li>
				    </ul>
				</div>
				<a href="#" class="button button-fill apply" @click.prevent='order'>立即申请</a>
			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import _reg from '@/assets/js/Regular'
import jquery from "@/assets/js/jquery.js";
import light7 from '../../../../static/light7/js/light7.min.js'
import light7City from '@/assets/js/light7-city-picker.js'
    export default{
		name,
		data(){
			return{
				phone:'',
				name:'',
				money:'',
				province:'',
				city:'',
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
			order(){
				let cit = $("#city-picker").data('val')
				if(_reg.regName(this.name)&&_reg.regPhone(this.phone)&&_reg.regCity(cit)){
					let obj = {phone:this.phone,name:this.name,money:this.money,province:cit[0],city:cit[1]},
							path = _path.getApiUrl('order')
					this.$axios.post(path,_path.postObj(obj),{emulateJSON: true,withCredentials: true}).then(({status,data})=>{
						if(status==200){
							if(data.status == "000000"){
								$.alert("借款"+data.msg)
							}else{
								_path.dealStatusCode(data.status, data.msg, this);
							}
						}
					})
				}
			}
		},
		mounted() {
			 $("#city-picker").cityPicker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择居住地址</h1>\
				</header>'
				,
				rotateEffect:true,
			});
		}
    }
</script>
<style src='@/assets/css/me/borrowMoney.css'>
</style>
