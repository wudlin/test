<template>
  <div>
      <div id="application-bid">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">申请约标</h1>
			</header>
			<div class="content">
				<div class="applb">
					<div class="flex mar invesh">
						<div class="lefttitle">预约金额 </div>
						<div class=" flex marl">
							<input class="investlimit" readonly   type="text" @click="appointment" v-model="appointmentmoney">
			              <!-- <select v-model='reservation'>
			                <option value='1'>5万-10万</option>
			                <option value='2'>10万-20万</option>
			                <option value='3'>20万以上</option>
			              </select> -->
			            </div>
						
					</div>
					<div class="flex mar invesh">
						<div class="lefttitle">投资期限</div>
						<div class="flex marl">
							<input class="investlimit" readonly   type="text" @click="limit" v-model="limitArys">
							<!-- <label class="label-checkbox item-content flex">
						        <input type="checkbox" @click='limit(6)' name="my-radio">
						        <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
						        <div class="fzm">6月</div>
						    </label> -->
					
						    <!-- <label class="label-checkbox item-content flex">
						        <input type="checkbox" @click='limit(12)' name="my-radio">
						        <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
						        <div class="fzm">12月</div>
						    </label>
						    <label class="label-checkbox item-content flex">
						        <input type="checkbox" @click='limit(24)' name="my-radio">
						        <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
						        <div class="fzm">24月</div>
						    </label> -->
						</div>
					</div>
					<div class="flex mar orderday">
						<div class="lefttitle">预约日期</div>
						<div class="marl">
							<input class="investlimit" type="text" data-toggle='date' id="app-calendar" style='border: 1px solid rgba(102,102,102,0.59);' />
						</div>
					</div>
				</div>				
				<a href="#" class="button button-fill apply" @click.prevent='bespoke'>立即申请</a>	
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
      getCalendar: "", //日期
      limitAry: [], //投资期限
      reservation: 1,
	  limitArys: "12月" //投资期限
	  ,appointmentmoney:'5万-10万'
    };
  },
  methods: {
    routerback() {
      this.$router.go(-1);
    },
    date() {
      function p(s) {
        return s < 10 ? "0" + s : s;
      }
      var myDate = new Date();
      //获取当前年
      var year = myDate.getFullYear();
      //获取当前月
      var month = myDate.getMonth() + 1;
      //获取当前日
      var date = myDate.getDate();
      this.year = year;
      this.month = month;
      this.day = date;
      var now = year + "-" + p(month) + "-" + p(date);
      var _this = this;
      this.getCalendar = now;
      // $("#select-cale").text(now);
      $("#app-calendar").calendar({
        value: [now],
        onDayClick: function(p, dayContainer, year, month, day) {
          month = Number(month) + 1;
          month = month < 10 ? "0" + month : month;
          day = day < 10 ? "0" + day : day;
          var getCalendar = year + "-" + month + "-" + day;
          _this.getCalendar = getCalendar;
        }
      });

      $(".swiper-container").swiper({
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        observer: true,
        observeParents: true
        // onlyExternal : false,//禁止滑动，只能通过点击
        // 	simulateTouch : false,
        // 	slideToClickedSlide:false,
        // 	noSwiping : true,
      });
    },
    limit(mon) {
      if (this.limitAry.indexOf(mon) == -1) {
        this.limitAry.push(mon);
      } else {
        for (let i in this.limitAry) {
          this.limitAry[i] == mon ? this.limitAry.splice(i, 1) : "";
        }
      }
    },
    bespoke() {
		let moneys = this.appointmentmoney.substring(0,2)
		if(moneys=='5万'){
			moneys=1
		}else if(moneys=='10'){
			moneys=2
		}else if(moneys=='20'){
			moneys=3
		}else{}
      let obj = {
          money: moneys,
          month: this.limitArys.split('月')[0],
          time: this.getCalendar
        },
        path = _path.getApiUrl("bespoke");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              $.alert(
                data.msg,
                function() {
                  this.$router.push("me");
                }.bind(this)
              );
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
	},
	appointment(){
		let func =(i) => {this.appointmentmoney=i};
      let buttons1 = [
        // {
        //   text: "请选择",
        //   label: true
		// },
        {
          text: "5万-10万",
          bold: true,
          color: "dark",
          onClick: function() {
			  func("5万-10万")
          }
        },
        {
          text: "10万-20万",
          onClick: function() {
			func("10万-20万")
          }
        },
        {
          text: "20万以上",
          onClick: function() {
			func("20万以上")
          }
        }
      ];
      let buttons2 = [
        {
          text: "取消",
          bg: "danger"
        }
      ];
      let groups1 = [buttons1, buttons2];
      $.actions(groups1);
	},
    limit() {
      let func =(i) => {this.limitArys=i};
      let buttons1 = [
        // {
        //   text: "请选择",
        //   label: true
		// },
        {
          text: "12月",
          bold: true,
          color: "dark",
          onClick: function() {
			  func("12月")
          }
        },
        {
          text: "24月",
          onClick: function() {
			func("24月")
          }
        }
      ];
      let buttons2 = [
        {
          text: "取消",
          bg: "danger"
        }
      ];
      let groups2 = [buttons1, buttons2];
      $.actions(groups2);
    }
  },
  mounted() {
    this.date();
  }
};
</script>
<style src='@/assets/css/me/application-bid.css'></style>