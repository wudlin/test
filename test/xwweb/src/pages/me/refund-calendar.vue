<template>
  <div>
      <div id="refund-calendar">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">回款日历</h1>
			</header>
			<div class="content">
				<div data-toggle="date" id='calendar' @click="btn" :value="!!getCalendar?getCalendar:''"></div>
				 <!--<input type="text" data-toggle='date' id="calendar"/>-->
				<div class="rc1">
					<!-- <div id="select-cale">{{getCalendar}}</div> -->

          <!-- <template v-if="!!getCalendar">
						<div class="pai">
							<template v-if="i==getCalendar.split('-')[2]">
							<div class="com">
								<div>
									<span class="orange">{{ar.oughtMoney|formatNumber2}}</span>
									<span class="yuan">元</span>
								</div>
								<div class="grey">当天还款金</div>
							</div>
							</template>
						</div>
					</template> -->
					<div class="pai repayDay">
            <div  v-if="!!getCalendar" v-for='(ar,i) in ary' :key='i' style="display:inline-block">
              <template v-if="i==getCalendar.split('-')[2]||i==(datas<10?datas.toString()[1]:datas)">
                <div class="com">
                  <div>
                    <span class="orange">{{ar.oughtMoney|formatNumber2}}</span>
                    <span class="yuan">元</span>
                  </div>
                  <div class="grey">当期应回金额</div>
                </div>
              </template>
            </div>
						<div class="com r6">
							<div>
								<span class="orange">{{allMoney|formatNumber2}}</span>
								<span class="yuan">元</span>
							</div>
							<div class="grey">当月还款金</div>
						</div>
						<div class="com r0">
							<div>
								<span class="orange">{{interest|formatNumber2}}</span>
								<span class="yuan">元</span>
							</div>
							<div class="grey">当月还款利息</div>
						</div>
					</div>
					<!-- <template v-if="!!getCalendar">
						<div class="pai"  v-for='(ar,i) in ary' :key='i'>
							<template v-if="i==getCalendar.split('-')[2]">
							<div class="com">
								<div>
									<span class="orange">{{ar.oughtMoney|formatNumber2}}</span>
									<span class="yuan">元</span>
								</div>
								<div class="grey">当天还款金</div>
							</div>
							<div class="com">
								<div>
									<span class="orange">{{ar.interest|formatNumber2}}</span>
									<span class="yuan">元</span>
								</div>
								<div class="grey">当天还款利息</div>
							</div>
							</template>
						
						</div>
					</template> -->
					
				 	<!-- <div class="swiper-container" >
					    <div class="swiper-wrapper">
				        <div class="swiper-slide">
				      		<div class="pai">
				      			<div class="com">
				      				<div>
				      					<span class="orange">{{allMoney|formatNumber2}}</span>
				      					<span class="yuan">元</span>
				      				</div>
				      				<div class="grey">当月还款金</div>
				      			</div>
				      			<div class="com">
				      				<div>
				      					<span class="orange">{{interest|formatNumber2}}</span>
				      					<span class="yuan">元</span>
				      				</div>
				      				<div class="grey">当月还款利息</div>
				      			</div>
				      		</div>
				        </div> -->
					     	<!-- <div class="swiper-slide"  v-for='(ar,i) in ary' :key='i'>
					      		<div class="pai">
					      			<div class="com">
					      				<div>
					      					<span class="orange">{{ar.oughtMoney|formatNumber2}}</span>
					      					<span class="yuan">元</span>
					      				</div>
					      				<div class="grey">当天还款金</div>
					      			</div>
					      			<div class="com">
					      				<div>
					      					<span class="orange">{{ar.interest|formatNumber2}}</span>
					      					<span class="yuan">元</span>
					      				</div>
					      				<div class="grey">当天还款利息</div>
					      			</div>
					      		</div>
					        </div> -->
					    </div>
					    <!-- 左右切换 -->
					    <!-- <div class="swiper-button-next ">
					    	<a class="icon icon-right"></a>
					    </div>
					    <div class="swiper-button-prev ">
					    	<a class="icon icon-left"></a>
					    </div> -->
					
				<!-- <div class="rc3" v-for='(od,i) in odds' :key='i'> -->
				<router-link v-if='show==1' class="rc3" v-for='(od,i) in odds' :key='i' :to="{name:'detail',params:{pid:od.oddNumber,fromPage:'refundCalendar'}}" tag='div'>
					<!-- <div class="rc3-1">
						<div class="orange">{{od.oddYearRate|percentFormat1}}</div>
						<div class="color9">年化利率</div>
					</div> -->
          <!-- 20180605移除年化利率添加回款金额 -->
          <div class="rc3-1">
						<div class="orange">{{od.amount}}</div>
						<div class="color9">回款金额</div>
					</div>
					<div class="rc3-2">
						<div class="color6">{{od.oddTitle}}</div>
						<div class="flex marT">
							<div ><span class="color9">投资周期</span><span class="color3 marL">{{od.oddPeriod}}</span></div>
							<div v-if="od.status==0" class="blue">未回款</div>
							<div v-else-if="od.status>0" class="blue">已回款</div>
							<div v-else-if="od.status==-1" class="blue">回款中</div>
						</div>
					</div>
				</router-link>	
				<!-- </div> -->
				
				<!-- <div class="rc2">
				 	<div class="rt">还款<br />时间</div>
				 	<div class="main">
				 		<div class="swiper-container" >
						    <div class="swiper-wrapper">
						        <div class="swiper-slide"  v-for='(i,v) in DaysLength'>
						      		<div class="rt-content">
						      			<div v-for='(v,key) in stayDays' v-if='key>=(i-1)*5&&key<i*5' :key='key' @click='getBid(v)'>
						      				<div class="top">{{parseInt(v.substr(4,2))}}</div>
						      				<div class="bottom">{{v.substr(6,2)}}</div>
						      			</div>
						      		</div>
						        </div>
						    </div>
						    <div class="swiper-button-next ">
						    	<a class="icon icon-right"></a>
						    </div>
						    <div class="swiper-button-prev ">
						    	<a class="icon icon-left"></a>
						    </div>
						</div>
				 	</div>
				</div> -->

			</div>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
//import jquery from "@/assets/js/jquery.js";
//import cookie from "@/assets/js/jqueryCookie.js";

export default {
  name,
  data() {
    return {
      MonDate: [], //当月
      MonDates: [], //月
      allMoney: "",
      interest: "",
      year: "",
      years: "",
      month: "",
      months: "",
      day: "",
      stayDays: "", //还款日期
      DaysLength: "",
      getCalendar: "", //当天日期
      repayments: {}, //当月天
      ones: 0,
      ary: {},
      addDays: [], //
      odds: [], //标
      show: 0,
      classStatus: 0,
      once: 0
      ,datas:""
    };
  },
  methods: {
    routerback() {
      this.$router.push("/me");
    },
    getDate() {
      let time;
      time = this.getCalendar.split("-");
      if (this.years) {
        this.year = this.years;
      } else {
        this.year = time[0];
      }
      if (this.months) {
        this.month = this.months;
      } else {
        this.month = time[1];
      }
            this.datas = time[2]//第一次进入触发点击
      let obj = { year: this.year, month: this.month, isAll: 1, type: "new" };
      this.$axios
        .get(_path.getObj("repayments", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.MonDate = data.data;
              this.allMoney = this.MonDate.allMoney;
              this.interest = this.MonDate.interest;
              let repayments = this.MonDate.repayments,
                arr = {};
              // for(let key in repayments){
                // 	arr.push(repayments[key])
              // }
              this.ary = repayments;
              if (this.ones == 0) {
                this.stayDays = this.MonDate.stayDays;

                let now = this.getCalendar
                let changnow = this.getCalendar.split('-')[0]+this.getCalendar.split('-')[1]
                for(let i in this.ary){
                  this.stayDays.push(changnow+i)
                }
                // this.DaysLength = Math.ceil(this.stayDays.length / 5);
                setTimeout(()=>{

                  this.btnAdd();
                },0)
                this.ones = 1;
              }
      // console.log("aa"+this.getCalendar)
              
              // console.log(this.MonDates)
              // let mon = this.month
              // mon.length==1?'0'+mon:mon
              // console.log(this.month)

              // for (let k in repayments) {
                // let day = this.getCalendar.split('-')[0]+this.getCalendar.split('-')[1]+k
                
                // console.log(day)
                // this.stayDays.push(day)
                // i.value = i[k];
              // }
                // });
              // for(let i in repayments){
              // 	console.log(i)
              // }
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    getBid(date, mons) {
      // console.log(date)
      // if(date.indexOf('-')==-1){
      // 	date = date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2)
      // }else{
      // 	date = date
      // }
      this.once++;

      let year = date.split("-")[0];
      let mon = date.split("-")[1];
      if (mons == 1) {
      } else {
        mon = parseInt(mon) + 1;
      }
      let days = date.split("-")[2];

      // if(mon.length==1){
      // 	mon = '0'+mon
      // }
      // if(days.length==1){
      // 	days = '0'+days
      // }
      let dates = year + "-" + mon + "-" + days;
      if (this.once > 1) {
        window.sessionStorage.setItem("nowdate", dates);
        //cookie.setItem.setItem('nowdate',dates)
        // document.cookie = 'nowdate=' + dates+';expires=2018/3/3'
      }
      let obj = { day: dates };
      this.$axios
        .get(_path.getObj("repaymentOdds", obj), { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000") {
              this.$set(this, "show", 1);
              this.$set(this, "odds", data.data.odds);
            } else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    p(s){
      if(!!s){
        return s=(s.toString())[1]?s:'0'+s
      }
    },
    btn() {
      // function p(s) {
      //   // return s < 10 ? "0" + s : s;
      // }
      if (!this.getCalendar) {
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
        let now = year + "-" + this.p(month) + "-" + this.p(date);
        var _this = this;
        this.getCalendar = now;
        //月份-1
        let nows = year + "-" + this.p(month-1) + "-" + this.p(date);
        this.getBid(nows);
        // $("#select-cale").text(now);
        // let numDay =1
        $("#calendar").calendar({
          value: [now],
          onDayClick: function(p, dayContainer, year, month, day) {
            month = Number(month) + 1;
            var getCalendar = year + "-" + month + "-" + day;
            _this.years = year;
            _this.months = month;
            _this.days = day;
            _this.getCalendar = getCalendar;
            _this.getDate();
            let date = dayContainer.getAttribute("data-date");
            _this.addDays.forEach((i, v) => {
              if (i == date) {
                _this.getBid(date);
              } else {
                _this.$set(_this, "show", 0);
              }
            });
            _this.getBid(date);
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
        // $.init()
      } else {
        let year,
          month,
          day,
          time,
          nowdate = "";
        time = this.getCalendar.split("-");
        year = time[0];
        month = time[1];
        // month = Number(month)+1
        day = time[2];
        nowdate = year + "-" + this.p(month) + "-" + this.p(day);
        // nowdate = this.getCalendar
        // this.getCalendar = year + "-" + p(month) + "-" + day
        // console.log('aaa'+this.getCalendar)
        _this = this;
        $("#calendar").calendar({
          value: [nowdate],
          onDayClick: function(p, dayContainer, year, month, day) {
            month = Number(month) + 1;
            var getCalendar = year + "-" + month + "-" + day;
            _this.years = year;
            _this.months = month;
            _this.days = day;
            _this.getCalendar = getCalendar;
            _this.getDate();
            let date = dayContainer.getAttribute("data-date");
            _this.addDays.forEach((i, v) => {
              if (i == date) {
                _this.getBid(date);
              } else {
                _this.$set(_this, "show", 0);
              }
            });
            _this.getBid(date);
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
        // $.init()
      }
      if (this.classStatus == 1) {
        this.btnAdd();
      }
    },
    btnAdd() {
      this.stayDays.forEach((i, v) => {
        let date = i.substr(0, 4) + "-" + i.substr(4, 2) + "-" + i.substr(6, 2);
        this.addDays.push(date);
        $(".picker-calendar-month-current .picker-calendar-day").each(
          (index, v) => {
            if ($(v).data("date") == this.changeYears(date)) {
              $(v)
                .find("span")
                .attr("class", "select");
            }
          }
        );
      });
      this.classStatus = 1;
      // console.log($('.picker-calendar-month-current .picker-calendar-day'))
    },
    changeYears(dates) {
      let dataYear = parseInt(dates.split("-")[0]);
      let dateMon = parseInt(dates.split("-")[1]) - 1;
      let dataDay = parseInt(dates.split("-")[2]);
      if (dateMon == -1) {
        dateMon = 12;
        dataYear--;
      }
      let newDate = dataYear + "-" + dateMon + "-" + dataDay;
      return newDate;
    }
  },
  mounted() {
    //   window.sessionStorage.setItem('fromPage','refundCalendar')
    let date = window.sessionStorage.getItem("nowdate");
    // let date = document.cookie.split(';')[2].split('nowdate')[1].split('=')[1]
    // let aa='002'
    // console.log(aa.length)
    if (!!date) {
      this.getCalendar = date;
      this.getBid(date, 1);
    }
    setTimeout(() => {
      this.btn();
      this.getDate();
    }, 0);
  },
  filters
};
</script>
<style src='@/assets/css/me/refund-calendar.css'>

</style>
