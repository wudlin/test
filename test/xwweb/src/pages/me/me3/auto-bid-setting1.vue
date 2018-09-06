<template>
  <div>
      <div id="auto-bid-setting1">
			<header class="bar bar-nav">
        <router-link to='automaticBid' class="icon icon-left button-nav pull-left external" style='width:2.4rem'></router-link>
				<!-- <a class="icon icon-left button-nav pull-left external"></a> -->
				<h1 class="title">自动投标</h1>
        <router-link to='autoBidSetting2' class="external button button-link pull-right rr">简版</router-link>
				<!-- <a href="view/me/auto-bid-setting2.html" class="external button button-link pull-right rr">简版</a> -->
			</header>
			<div class="content">
				<div class="abs1 abs11">
					<div>账户余额：<span class="orange">{{autoInfo.fundMoney|formatNumber2}}</span></div>
					<div class="abs112"> 
						<div>保留余额：
							<span class="orange" v-if='retentionShow==0'>{{investEgisMoney|formatNumber2}}</span>
							<input class="orange" v-else type="text" v-model="investEgisMoney">
						</div>
						<div>
							<div class="item-input">
								<label class="label-switch">
									<input type="checkbox" class='retentions' @click="retention" >
									<div class="checkbox"></div>
								</label>
							</div>
						</div>
					</div>
				</div>
				
				<div class="abs1 abs12">
					<div class="buttons-row" style='display: flex;justify-content: space-around'>
						<!-- 投资金额： -->
						<!-- <span class="grey">投资范围</span> -->
						<!-- <select class='item-inner' @click='selects'>
							<option value='0'>投资范围</option>
							<option value='1'>指定金额</option>
						</select> -->
						<!-- <div @click='selects(1)' styly='display: inline-block;'><span class='fa'>投资范围</span></div>
						<div @click='selects(0)' styly='display: inline-block;'><span class='zhi'>指定金额</span></div> -->
						<a href="javascript:;" :class='{"button":true, "button-round":true, "active":(1 == moneyType)}' @click='selects(1)'>投资范围</a>
						<a href="javascript:;" :class='{"button":true, "button-round":true, "active":(0 == moneyType)}' @click='selects(0)'>指定金额</a>
					</div>
					<div class="abs122">
						<div class='items0'>
							<input type="text" v-model="investMoneyLower" class="input1"/>
							<span style='color:rgba(180,180,180,1);display: inline-block;width: 10%'>-></span>
							<input type="text" v-model="investMoneyUper" class="input2"/>
							<span class="yuan">元</span>
						</div>
						<div class='items1' style='display: none;text-align:center'>
							<input type="text" v-model='fixedMoney' placeholder='输入金额' style='text-align:left;width:60%;'/><span class="yuan">元</span>
						</div>
					</div>					
				</div>

				<div class="abs1 abs13">
					<div class="flex">
						<div>开启自动投标</div>
						<div>
							<div class="item-input">
                <label class="label-switch">
                    <input type="checkbox" class='autos' @click='autos'>
                    <!-- <input v-if='autostatus==1' type="checkbox" checked="checked" class='autos' @click='autost'> -->
                    <div class="checkbox"></div>
                </label>
              </div>
						</div>
					</div>
					<div class="flex">
						<div>排队不投</div>
						<div>
							<div class="item-input">
                <label class="label-switch">
                  <input type="checkbox" class='stay' @click='stays'>
                  <!-- <input type="checkbox" v-if='staystatus==1' class='stay' checked="checked" @click='stays'> -->
                  <div class="checkbox"></div>
                </label>
              </div>
						</div>
					</div>
					
				</div>
				
				<div class="abs1 abs14">
					<div class="flex">
						<div>全部的类型</div>
						<div>
							<div class="item-input">
                <label class="label-switch">
                    <input type="checkbox" class='allElection' @click='election'>
                    <div class="checkbox"></div>
                </label>
					    </div>
						</div>
					</div>
				</div>
				<div class="abs15">
					
					<div class="flex bor" >
            <!-- 20180529移除 -->
						<!-- <div :class="{'w33':xiao==0}">抵押标&ensp;<span class="down">&#9660;</span>&ensp;</div> -->
						<!-- <div :class="{'w33':xiao==0}">质押标&ensp;<span class="down">&#9660;</span>&ensp;</div> -->
						<!-- <div :class="{'w33':xiao==0}">融资租凭<span class="down">&#9660;</span></div> -->
						<!-- <div v-if="xiao==1">消费标&ensp;<span class="down">&#9660;</span>&ensp;</div> -->
            <!-- 20180509 添加 汽车金融标-->
						<!-- <div v-if="xiao==0">汽车金融标&ensp;<span class="down">&#9660;</span>&ensp;</div> -->
						<!-- 20180529添加先息后本，等额本息 -->
            <div class="w50">{{gtypes[0]?gtypes[0].name:''}}&ensp;<span class="down">&#9660;</span>&ensp;</div>
            <div class="w50">{{gtypes[1]?gtypes[1].name:''}}&ensp;<span class="down">&#9660;</span>&ensp;</div>
					</div>
					<table border="0" cellspacing="0" cellpadding="0">
						<tr class="ali">
            <!-- 20180529移除 -->
							<!-- <td :class="{'abs15-b':true,'impawn':true,'borderLeft':true,'w33':xiao==0}">
								<div v-if="diya.type=='diya'" v-for='(diya,i) in autoInfoType' :key='i' class="hb" :id="'a'+diya.id" @click='typeBtn(diya.id,$event)'>{{diya.name}}</div>
							</td>
							<td :class="{'abs15-b':true,'impawn':true,'borderLeft':true,'w33':xiao==0}">
								<div v-if="xingyong.type=='xingyong'" v-for='(xingyong,i) in autoInfoType' :key='i' class="hb" :id="'a'+xingyong.id" @click='typeBtn(xingyong.id,$event)'>{{xingyong.name}}</div>
							</td> -->
							<!-- <td :class="{'abs15-b':true,'impawn':true,'borderLeft':xiao==1,'w33':xiao==0}">
								<div v-if="danbao.type=='danbao'" v-for='(danbao,i) in autoInfoType' :key='i' class="hb" :id="'a'+danbao.id" @click='typeBtn(danbao.id,$event)'>{{danbao.name}}</div>
							</td> -->
            <!-- 20180509 添加 汽车金融标-->
              <!-- <td :class="{'abs15-b':true,'impawn':true,'borderLeft':true,'w33':xiao==0}">
								<div v-if="autofinance.type=='auto-finance'" v-for='(autofinance,i) in autoInfoType' :key='i' class="hb" :id="'a'+autofinance.id" @click='typeBtn(autofinance.id,$event)'>{{autofinance.name}}</div>
							</td>
							<td class="abs15-b financing"  v-if="xiao==1">
								<div v-if="xiaojin.type=='consumer'" v-for='(xiaojin,i) in autoInfoType' :key='i' class="hb" :id="'a'+xiaojin.id" @click='typeBtn(xiaojin.id,$event)'>{{xiaojin.name}}</div>
							</td> -->
						<!-- 20180529添加先息后本，等额本息 -->
              <td class="abs15-b financing">
                <!-- 先息后本 -->
								<div v-for="(ma,i) in gtypes[0]?gtypes[0].subs:''" :key='i' class="hb" :id="'a'+ma.id" @click='typeBtn(ma.id,$event)'>{{ma.name}}</div>
							</td>
              <td class="abs15-b financing">
                <!-- 等额本息 -->
								<div v-for="(mb,i) in gtypes[1]?gtypes[1].subs:''" :key='i' class="hb" :id="'a'+mb.id" @click='typeBtn(mb.id,$event)'>{{mb.name}}</div>
							</td>
						</tr>
					</table>
					<a href="#" class="button button-fill savest" @click.prevent='setDate'>保存设置</a>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";

export default {
  name,
  data() {
    return {
      autoInfo: [], //自动投标
      autoInfoType: [], //自动投标
      investEgisMoney: "",
      investMoneyLower: "",
      investMoneyUper: "",
      autostatus: "0", //开启自动投标
      autost: "0", //开启自动投标
      staystatus: "0", //排队不投/是否站队
      stayst: "0", //排队不投/是否站队
      typeAry: [], //类型id
      typeAryString: "", //类型id字符串
      moneyType: "", //投资金额范围
      rangeBegin: "", //最低投资
      rangeEnd: "", //最高投资
      fixedMoney: "", //输入指定金额
      retentionShow: 0, //保留余额
      mode: 0,
      lotteryID: 0,
      couponInsId:0,//20180629 lotteryID 改为 couponInsId
      xiao: 0,
      gtypes: [], //先息后本、等额本息
      types: [] //先息后本、等额本息 默认选中
    };
  },
  methods: {
    routerback() {
      this.$router.go(-1);
    },
    getDate() {
      let path = _path.getApiUrl("autoInfo");
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.autoInfo = data.data;
              // this.autoInfoType = this.autoInfo.types;
              //先息后本、等额本息
              this.gtypes = data.data.types;

              // for (let a = 0; a < this.autoInfoType.length; a++) {
              //   if (this.autoInfoType[a].type == "consumer") {
              //     this.retentionShow = 1;
              //   }
              // }
              this.investEgisMoney = this.autoInfo.autoInvest.investEgisMoney;
              if (this.investEgisMoney > 0) {
                $(".retentions").prop("checked", true);
              }
              this.moneyType = this.autoInfo.autoInvest.moneyType;
              if (this.moneyType == 1) {
                $(".buttons-row a:eq(0)").addClass("active");
              } else {
                $(".buttons-row a:eq(1)").addClass("active");
              }
              this.investMoneyLower = this.autoInfo.autoInvest.investMoneyLower; //最低投资
              this.investMoneyUper = this.autoInfo.autoInvest.investMoneyUper; //最高投资
              this.autostatus = this.autoInfo.autoInvest.autostatus;
              this.staystatus = this.autoInfo.autoInvest.staystatus;
              if (this.autostatus == 1) {
                $(".autos").prop("checked", true);
                this.autost = 1;
              }
              if (this.staystatus == 1) {
                $(".stays").prop("checked", true);
                this.stayst = 1;
              }

              this.types = data.data.autoInvest.types;
              // 添加选中样式
              for (let i of this.types) {
                // if(i.substr(i.length-1)=='周'){}else{
                this.typeAry.push(i);
                // }
              }
              this.typeAry = this.typeAry.map((v, idx) => {
                return "" + v;
              });
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    setDate() {
      //保存设置
      if (this.moneyType == 0) {
        this.rangeBegin = this.fixedMoney;
        this.rangeEnd = this.fixedMoney;
      } else {
        this.rangeBegin = this.investMoneyLower;
        this.rangeEnd = this.investMoneyUper;
        this.fixedMoney = 1;
      }
      if (this.typeAry == "") {
        $.alert("全部类型不能为空");
      } else {
        let types = [];
        types.concat(this.typeAry);
        for (let i of this.typeAry) {
          types += i + ",";
        }
        types = types.substr(0, types.length - 1);
        this.typeAryString = types;

        let obj = {
            autostatus: this.autost,
            staystatus: this.stayst,
            investEgisMoney: this.investEgisMoney,
            moneyType: this.moneyType,
            rangeBegin: this.rangeBegin,
            rangeEnd: this.rangeEnd,
            fixedMoney: this.fixedMoney,
            types: this.typeAryString,
            mode: 0,
            couponInsId: 0
          },
          path = _path.getApiUrl("autoSet");
        this.$axios
          .post(path, _path.postObj(obj), {
            emulateJSON: true,
            withCredentials: true
          })
          .then(res => {
            if (res.status == 200) {
              if (res.data.status == "000000") {
                $.alert("保存" + res.data.msg);
              } else {
                _path.dealStatusCode(res.data.status, res.data.msg, this);
              }
            }
          });
      }
    },
    selects(v) {
      if (v == 1) {
        $(".items1").css("display", "none");
        $(".items0").css("display", "block");
        this.moneyType = 1;
      } else {
        $(".items1").css("display", "block");
        $(".items0").css("display", "none");
        this.moneyType = 0;
      }
    },
    election() {
      //全部类型
      if ($(".allElection").is(":checked") == true) {
        $(".abs15-b div").removeClass("hb");
        $(".abs15-b div").addClass("fb");
        this.typeAry = [];
        for (let i in this.gtypes[0].subs) {
          this.typeAry.push(this.gtypes[0].subs[i].id);
        }
        for (let i in this.gtypes[1].subs) {
          this.typeAry.push(this.gtypes[1].subs[i].id);
        }
      } else {
        $(".abs15-b div").removeClass("fb");
        $(".abs15-b div").addClass("hb");
        this.typeAry.length = 0;
      }
    },
    typeBtn(id, e) {
      $(".allElection").prop("checked", false);
      // console.log(this.typeAry)
      if (this.typeAry.indexOf(id) == -1) {
        // $('.allElection').is(':checked')=false
        this.typeAry.push(id);
        e.target.setAttribute("class", "fb");
      } else {
        e.target.setAttribute("class", "hb");
        for (let i in this.typeAry) {
          this.typeAry[i] == id ? this.typeAry.splice(i, 1) : "";
        }
      }
    },
    stays() {
      if ($(".stay").is(":checked") == true) {
        this.stayst = 1;
      } else {
        this.stayst = 0;
      }
    },
    autos() {
      if ($(".autos").is(":checked") == true) {
        this.autost = 1;
      } else {
        this.autost = 0;
      }
    },
    retention() {
      if ($(".retentions").is(":checked") == true) {
        this.retentionShow = 1;
        this.investEgisMoney = "";
      } else {
        this.retentionShow = 0;
        this.investEgisMoney = 0;
      }
    }
  },
  mounted() {
    this.getDate();
  },
  filters,
  updated() {
    for (let i of this.typeAry) {
      $("#a" + i).attr("class", "fb");
    }
  }
};
</script>
<style src='@/assets/css/me/auto-bid-setting1.css'>
</style>
