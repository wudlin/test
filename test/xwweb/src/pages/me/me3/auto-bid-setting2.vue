<template>
  <div>
    <div id="auto-bid-setting2">
			<header class="bar bar-nav">
				<a @click="routerback" class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<!-- <a class="icon icon-left button-nav pull-left external"></a> -->
				<h1 class="title">自动投标</h1>
				<!-- <a href="#" class="pull-right rr">简约</a>                 -->
				<router-link to='autoBidSetting1' class="external button button-link pull-right rr">高级</router-link>
			</header>
			<div class="content">
				<div class="padb mar">
					<span class="leftcs">账户余额：</span><span class="orange">{{autoInfo.fundMoney|formatNumber2}}</span>
				</div>
				<div class="padb mar flex">
					<div class="leftcs">投资范围：</div>
					<input type="text" v-model='investMoneyLower' @input='setLower' placeholder="0.00"/>
					<span>-></span>
					<input type="text"  v-model='investMoneyUper' @input='setUper' placeholder="0.00"/>
					<span>元</span>
				</div>
				<div class="investh flex">
					<span class="leftcs">投资期限：</span>
					<div class="flex warp">
						<div class="investh-a hb" v-for='(pre,i) in gperiods' :id="pre.key" @click='autoMonth(pre.key,i,$event)'>{{pre.name}}</div>
					</div>
				</div>
				<div class="flex autobid">
					<span class="leftcs">开启自动投标</span>
					<div>
						<div class="item-input">
			              <label class="label-switch">
			                <input type="checkbox" class='autos' @click='autost'>
			                <div class="checkbox"></div>
			              </label>
			            </div>
					</div>
				</div>
				<!--<div class="padb borderb pickerArea" >-->
				<div class="padb borderb pickerArea" @click="whoUseCoupon">
				<!-- <div class="padb borderb"> -->
					<span class="leftcs">优惠券</span>
					<!--<input type="text" id="picker" placeholder="点我换券" @click="clicPicker"/>-->
					<input type="text" id="picker" placeholder="请选择优惠券" v-model="couponInsName" readonly/>
					<!--<span class="lotteryB">{{couponInsName}}</span>-->
					<a class="icon icon-right pull-right dc" ></a>
				<!-- </div> -->
				</div>
				<div class="padb inst">
					<a href="#" class="instr">使用说明</a>
					<p style='color:rgb(178,178,178);text-align: justify;'>1、自动投标功能开启后进入自动投标队列，关闭则退出队列；2、设置好投资金额、标的类型，投标队列到位时，
						系统会自动匹配符合条件项目投出金额；3、自动投标成功后，自动投标的排名至队尾；4、高级版设置增加
						保留金额、排队不投、细化标的类型选择等相关功能。（温馨提示：您可先进行投标设置，待投标队列排名
						靠前时再进行充值，避免资金站岗！）</p>
				</div>
				<a href="#" class="button button-fill savest" @click='setDate'>保存设置</a>
			</div>
		</div>
		
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";

export default {
  name: "app",
  data() {
    return {
      autoInfo: [],
      autoInfoTypes: [],
      investMoneyLower: "",
      investMoneyUper: "",
      autostatus: "1",
      arymon: [],
      typeAry: [],
      btnAry: [],
      January: "", //1
      February: "", //2
      march: "", //3
      June: "", //6
      December: "", //12
      December2: "", //24
      December3: "", //36
      lotteryName: "", //红包名
      couponInsName: "", //20180629 红包名lotteryName 改为 couponInsName
      lotteryID: 0, //红包id
      couponInsId: "", //20180629 红包id lotteryID 改为 couponInsId
      fixedMoney: "1", //指定投资金
      typeAryString: "", //投资类型
      redId: "",
      newMon: "",
      periodSign: [], //标
      // 20180529
      gperiods: [], //new
      periods: [] //
    };
  },
  methods: {
    routerback() {
      this.$router.push("/automaticBid");
      window.sessionStorage.setItem("redPage", 0);
    },
    whoUseCoupon() {
      if (this.investMoneyLower != "" && this.investMoneyUper != "") {
        this.$router.push("/giftCouponUse");
        window.sessionStorage.setItem("whoUseCoupon", "autoBidSetting2");
        window.sessionStorage.setItem(
          "investMoneyLower",
          this.investMoneyLower
        );
        window.sessionStorage.setItem("investMoneyUper", this.investMoneyUper);
      } else {
        $.alert("请先输入投资范围");
      }
    },
    clicPicker() {
      if (this.values.length == 0) {
        $.alert("无可使用的优惠券");
      } else {
        $(".lotteryB").text("");
      }
    },
    getDate() {
      let path = _path.getApiUrl("autoInfo");
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.autoInfo = data.data;
              this.autoInfoTypes = this.autoInfo.types;

              this.autostatus = this.autoInfo.autoInvest.autostatus;
              let tellInvestBid =
                  window.sessionStorage.getItem("tellInvestBid") || 0,
                investMoneyLower = window.sessionStorage.getItem(
                  "investMoneyLower"
                ),
                investMoneyUper = window.sessionStorage.getItem(
                  "investMoneyUper"
                );
              if (tellInvestBid == 1) {
                this.couponInsId = window.sessionStorage.getItem("lotteryId");
                this.couponInsName = window.sessionStorage.getItem("lotteryName");
                window.sessionStorage.setItem("tellInvestBid", 0);
                // console.log([this.couponInsId,this.couponInsName])
              } else {
                this.couponInsId = this.autoInfo.autoInvest.couponInsId;
                this.couponInsName = this.autoInfo.autoInvest.couponInsName;
              }
              // console.log(window.sessionStorage.getItem('redPage'))
              if (window.sessionStorage.getItem("redPage") == 1) {
                // console.log('red')
                this.investMoneyLower = investMoneyLower;
                this.investMoneyUper = investMoneyUper;
              } else {
                // console.log('nored')
                this.investMoneyLower = this.autoInfo.autoInvest.investMoneyLower;
                this.investMoneyUper = this.autoInfo.autoInvest.investMoneyUper;
              }
              window.sessionStorage.setItem(
                "investMoneyLower",
                this.investMoneyLower
              );
              window.sessionStorage.setItem(
                "investMoneyUper",
                this.investMoneyUper
              );
              //							$('#picker').val(this.couponInsName)
              // console.log(this.couponInsName)
              if (this.autostatus == 1) {
                $(".autos").prop("checked", true);
                this.autost = 1;
              }
              this.aryMonth();
              this.types = this.autoInfo.autoInvest.types;
              // console.log(this.types)
              //简版标
              this.gperiods = data.data.periods;
              //已投
              this.periods = data.data.autoInvest.periods;

              // console.log(this.periods)
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    redCoupon() {
      let dataObj = {
          status: "available",
          page: 1,
          pageSize: 100
        },
        path = _path.getObj("moneyLotteries", dataObj);
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              let id = [],
                name = [],
                data = data.data;
              this.values = data.records;
              data.records.forEach((v, i) => {
                //										if(v.period_lower != null && oddPeriod < v.period_lower){
                //											return;
                //										}
                //										if(v.period_uper != null && oddPeriod > v.period_uper){
                //											return;
                //										}
                let dateVal = v.endtime.split(" ");
                id.push(v.id);
                name.push(v.name + "(" + dateVal[0] + ")");
              });
              //this.values = id;
              //this.displayValues = name;
              if (this.values.length == 0) {
                return;
              } else {
                this.$picker = $("#picker").picker({
                  toolbarTemplate:
                    '<header class="bar bar-nav">\
										  <button class="button button-link pull-right close-picker">确定</button>\
										  <h1 class="title">请选择券</h1>\
										  </header>',
                  cols: [
                    {
                      textAlign: "center",
                      values: id,
                      displayValues: name
                      //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                    }
                  ],
                  formatValue: function(p, values, displayValues) {
                    $(p.input).data("val", values[0]);
                    return displayValues[0];
                  },
                  rotateEffect: true,
                  inputReadOnly: true,
                  cssClass: "myPicker"
                });
              }
              //this.$picker.picker("setValue", id, name)
              //console.log(id);
              //console.log(name)
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    //显示点击样式
    autoMonth(id, index, e) {
      index = index + 1;
      if (this.periods.indexOf(id) == -1) {
        this.periods.push(id);
        e.target.setAttribute("class", "wbluebg");
        // this.btnAry.push({id})
      } else {
        e.target.setAttribute("class", "hb");
        for (let i in this.periods) {
          this.periods[i] == id ? this.periods.splice(i, 1) : "";
        }
        // this.btnAry.forEach((j,v)=>{
        // 	j.ind==index?this.btnAry.splice(index,1):'';
        // })
      }
      // console.log(this.periods)
      window.sessionStorage.setItem(
        "setting2-btnArr",
        JSON.stringify(this.btnAry)
      );
    },
    autost() {
      //自动投标
      if ($(".autos").is(":checked") == true) {
        this.autostatus = 1;
      } else {
        this.autostatus = 0;
      }
    },
    aryMonth() {
      //月份
      let transition = {};
      for (let i in this.autoInfoTypes) {
        let autos = this.autoInfoTypes[i];
        if (!transition[autos.name]) {
          this.periodSign.push({
            name: autos.name,
            id: autos.id
          });
          transition[autos.name] = autos;
        } else {
          for (let j in this.periodSign) {
            let pre = this.periodSign[j];
            if (pre.name == autos.name) {
              pre.id += "," + autos.id;
              break;
            }
          }
        }
      }
      // console.log(this.periodSign)
    },
    setDate() {
      let gperiods = "";
      for (let i of this.periods) {
        gperiods += i + ",";
      }
      gperiods = gperiods.substr(0, gperiods.length - 1);
      if (this.periods.length == 0) {
        $.alert("投资期限不能为空");
      } else {
        // this.typeAryString = types

        //					let redVal = $("#picker").data("val")
        //					if(!!redVal){
        //						this.couponInsId = redVal;
        //					}
        let obj = {
            autostatus: this.autostatus,
            staystatus: 0,
            investEgisMoney: 0,
            moneyType: 1,
            rangeBegin: this.investMoneyLower,
            rangeEnd: this.investMoneyUper,
            fixedMoney: this.fixedMoney,
            periods: gperiods,
            mode: 1,
            couponInsId: this.couponInsId || 0
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
    setLower() {
      window.sessionStorage.setItem("investMoneyLower", this.investMoneyLower);
    },
    setUper() {
      window.sessionStorage.setItem("investMoneyUper", this.investMoneyUper);
    }
  },
  mounted() {
    this.getDate();
    //			this.redCoupon()
    let btn = JSON.parse(window.sessionStorage.getItem("setting2-btnArr"));
    if (btn) {
      btn.forEach((ind, val) => {
        $(".investh .investh-a")
          .eq(ind.ind)
          .removeClass("hb");
        $(".investh .investh-a")
          .eq(ind.ind)
          .addClass("wbluebg");
        this.typeAry.push(ind.val);
      });
    }
  },
  filters,
  updated() {
    let _this = this;
    // this.periods = []
    for (let i of this.periods) {
      $(".investh-a").each(function(index, v) {
        let j = $(v).attr("id");
        // 20180529
        // if(j.split(',')[0]==i || j.split(',')[1]==i ||j.split(',')[2]==i){
        // 	$(this).attr("class", "wbluebg");
        // 	_this.typeAry.push(j)
        // }
        if (j == i) {
          $(this).attr("class", "wbluebg");
          _this.typeAry.push(j);
        }
      });
    }
    // console.log(this.typeAry)
  }
};
</script>
<style src='@/assets/css/me/auto-bid-setting2.css'>
</style>
