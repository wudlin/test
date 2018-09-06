<template>
  <div>
    <pageNav v-if='navigation' @navshow="navigation=!navigation"></pageNav>
        <!--项目页面-->
		<div  id="crtrs">
			<header class="bar bar-nav">
        <!-- <a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a> -->
				<h1 class="title">债权转让</h1>
				<a v-if="btnScreening==false" @click.prevent="setshow" class="button pull-right open-panel disb" data-panel='#panel-right'>筛选</a>
				<!-- <a @click.prevent="navigation=true" :class="navStyle.sidebar" data-panel='#panel-right'>筛选</a> -->
				<!-- <a @click.prevent="yutouReqs" :class="navStyle.confirm0">确认</a> -->
				<a v-if="!!btnScreening" @click="zqReqs" class="button pull-right open-panel disb" >确认</a>
			</header>
			<div class="content" >
        <div class="content-header">
          <div class="discount" @click="discount">折扣
            <span ref="iup" class="icon icon-up"></span>
            <span ref="idown" class="icon icon-down black"></span>
          </div>
          <div class="cut"  @click.prevent="routerback">切换样式</div>
        </div>
		    <div class="tabs">
			    <div id="tab2" class="tab active" >
            <div @click.capture='tab2(Tr.id)' v-for="(Tr,i) in Transfer" :key='i' :class="Tr.type=='start'?'card debt':'card debt sell'">
	        		<div class="card-content">
	        			<div class="card-content-inner">
									<div class="debt-title">
                    <!-- 20180802添加折扣 -->
										<div :class="Tr.type=='start'?'name':'name nolightc'">{{Tr.title}} <span v-if="Number(Tr.pdRate)<0" :class="Tr.pdRate<0?'reduced':''">{{Tr.pdRate|discount1}}折</span></div>
										<!-- <div v-if="Tr.type=='start'" class="type">原标</div> -->
                    <router-link v-if="Tr.type=='start'" :to="{name: 'detail',params:{pid:Tr.oddNumber, project: 'debt'}}" class="type" tag="div">原标详情</router-link>
									</div>
									<div class="progress">
										<div v-if="Tr.type=='start'" class="fill" :style="{width:Tr.schedule+'%'}"></div>
									</div>
									<div class="debt-detail">
										<div class="rate">
											<div :class="Tr.type=='start'?'num':'num nolightc'">
                        {{(Tr.oddYearRate)*100 |formatNumber1}}
                        <span v-if="!!Tr.oddReward&&Tr.oddReward>0">+{{(Tr.oddReward)*100 |formatNumber1}}</span>%
                      </div>
											<div :class="Tr.type=='start'?'text':'text nolightc'">年化利率</div>
										</div>
										<div class="time">
											<div :class="Tr.type=='start'?'num':'num nolightc'">{{Tr.remainDay}}</div>
											<div :class="Tr.type=='start'?'text':'text nolightc'">剩余天数(天)</div>
										</div>
										<!-- <div class="transfer-money">
											<div :class="Tr.type=='start'?'num':'num nolightc'">{{Tr.money}}元</div>
											<div :class="Tr.type=='start'?'text':'text nolightc'">转让本金</div>
										</div> -->
										<div class="remain-money">
											<div :class="Tr.type=='start'?'num':'num nolightc'">{{Tr.moneyLast}}</div>
											<div :class="Tr.type=='start'?'text':'text nolightc'">可接(元)</div>
										</div>
									</div>
							  </div>						
		        	</div>
            </div>
			    	<div class="infinite-scroll-preloader" v-if="status=='loading'">
							<div class="preloader"></div>
							<div>正在玩命加载中...</div>
						</div>
						<div v-else-if="status=='hide'" style="text-align:center;padding-bottom:.6rem">无更多数据</div>
			    </div>
		    </div>
			</div>
      <!-- 债权 -->
			<div :class="navStyle.zqpage">
    		<div class="borrowType">
          <p>债权期限</p>
          <ul>
            <!-- <li @click="screening('all',$event,'yt_product')" class="select">全部</li> -->
            <li v-for="(types,i) in periods" @click="screening(types.key,$event,'zq_period')">{{types.value}}</li>
          </ul>
        </div>
        <div class="borrowTime">
          <p>债权利率</p>
          <ul>
            <!-- <li @click="screening('all',$event,'yt_period')" class="select">全部</li> -->
            <li v-for="(type,i) in rates" @click="screening(type.key,$event,'zq_rate')">{{type.value}}</li>
          </ul>
        </div>
    	</div>
			<div id="screen" v-if="screenBg"></div>
			<nav class="bar bar-tab">
        <router-link to='/' tag='a'  class="tab-item active  replace ">
			      <img src="../../static/img/common/index-@1x.png"  />
			      <div class="tab-label gray">首页</div>
          </router-link>
        <router-link to='crtrs' tag='a' class="tab-item  replace">
			      <img src="../../static/img/common/projectactive-@1x.png" />
			      <div class="tab-label blue">项目</div>
        </router-link>
        <a class="tab-item  replace" @click="isToMe()">
			      <img src="../../static/img/common/me-@1x.png"  />
			      <div class="tab-label gray">我的</div>
        </a>
			</nav>
		</div>
  </div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
import jquery from "@/assets/js/jquery.js";
import pageNav from "@/pages/page-nav";

export default {
  name,
  data() {
    return {
      triangle0: 0,
      triangle1: 0,
      once: 1,
      Md5Msg: "a12131",
      res: [],
      borrowTy: "", //借款类型
      borrowMo: "", //借款金额
      borrowT: "", //借款期限
      show: 0, //确认
      ary: [],
      records: [], //记录
      oddivitle: "", //标题
      oddMoney: "", //金额
      oddYearRate: "", //年化率
      oddReward: "", //奖励年化率
      oddPeriod: "", //月份
      schedule: "", //进度
      investType: "", //自动手动
      pageSize: 5, //页面条数
      pageSizeTr: 5, //债权页面条数
      pageYt: 1, //页码
      page: 1, //页码
      pageTr: 1, //债权页码
      isLoadingMore: false, //判断加载更多
      // isLoadingMoreTr: false, //判断加载更多
      status: "hide",
      isNowLogin: false,
      trPage: 1, //债权转让页码
      trPageSize: 3, //债权转让页面条数
      navigation: false,
      type: "bid",
      typeBorrowing: [],
      amountBorrowing: [],
      DurationOfloan: [],

      plans: [], //智投
      plansProduct: [], //项目类型
      plansPeriod: [], //借款期限
      productsYts: [],
      periodYts: []
      ,nav:[0,0,0]
      ,i:''
      ,navStyle:{yu:{},san:{},zai:{},screen:{},
      zqpage:{'selectItem':true,'advanceMark':true},
      sanpage:{},zaipage:{},sidebar:{},confirm0:{},confirm1:{}}
      ,crtrsPeriods:[]
      ,crtrsRates:[]

      ,screenBg:false
      ,Transfer: [] //债权转让
      ,period:"all"//期限
      ,rate:"all"//利率
      ,periods:[]//期限列表
      ,rates:[]//利率列表
      ,btnScreening:false//确认按钮
      ,userId:""//用户id
      ,click:0//未点击
      ,sort:"asc"//asc:升序  desc：降序
    };
  },
  methods: {
    routerback(){
      this.$router.push({name:"projects",params:{projectShow:"debt"}})
    },
    setshow(){
      //按钮显示
      this.btnScreening = true
      //bg
      this.screenBg = true
      //筛选列表
      this.navStyle.zqpage={
        'selectItem':true, 
        'advanceMark':true,
        'disb':true
      }
    },
    isFinish(isFinish) {
      //将是否满标传入下个页面
      window.sessionStorage.setItem("isFinish", isFinish);
      window.sessionStorage.getItem("isFinish");
    },
    //登录跳转我的页面否则跳转登录页面
    isToMe() {
      if (this.isNowLogin) {
        this.$router.push("/me");
      } else {
        this.$router.push("/login");
      }
    },
    //判断登录状态
    isLogin() {
      let path = _path.getApiUrl("islogin");
      this.$axios.get(path, { withCredentials: true }).then(({status,data}) => {
      	if(status==200){
      		if (data.status == "000000"&&data.data.isLogin==1) {
      		  this.isNowLogin = true;
      		}
      	}
      });
    },
    didScroll() {
      if (this.isLoadingMore) {
        return;
      }
      // let $tab0 = $("#tab0"),
      //   $tab1 = $("#tab1"),
        let $tab2 = $("#tab2"),
        dh = $(document).height(),
        $c = $("#crtrs .content"),
        st = $c.scrollTop();
        
        // window.sessionStorage.setItem("scrolltopTab2",$("#crtrs .content").scrollTop());
        // $("#crtrs .content").stop().animate({scrollTop: window.sessionStorage.getItem("scrolltopTab2")+ "px"})
        if ($tab2.height() - st < dh) {
          this.isLoadingMore = true;
          this.status = "loading";
          this.pageTr += 1;
          this.loadMore(this.pageTr, "crtrs");
        }
    },
    //上拉加载
    loadMore(pag, api) {
      //this.isLoadingMore = true;
      let dataObj = {
        page: pag,
        pageSize: this.pageSize,
        crtrUser:this.userId,
        rate:"",
        period:"",
      };
      // this.objs()
      dataObj = Object.assign(dataObj, this.objs());
      this.$axios
        .get(_path.getObj(api, dataObj), { withCredentials: true })
        .then(res => {
          let data = res.data.data;
          if (data.records.length == 0) {
            this.isLoadingMore = true;
            this.status = "hide";
          } else {
            // if (api == "crtrs") {
              data.records.forEach(rec => {
                if (rec.progress == "start") {
                  rec.type = "start";
                } else {
                  rec.type = "run";
                }
              });
              this.Transfer = this.Transfer.concat(data.records);
            // }
            this.isLoadingMore = false;
            this.status = "fail";
          }
        });
    },
    getDataTransfer() {
      //债权转让
      // console.log(this.userId)
      //asc:升序  desc：降序
      let params = { page: 1, pageSize: 5 ,crtrUser:this.userId,rate:this.rate,period:this.period,sort:this.sort};
      this.$axios
        .get(_path.getApiUrl("crtrs"), { withCredentials: true, params })
        .then(({status,data}) => {
          if (status == 200) {
            if (data.status == "000000") {
              let records = data.data.records;
              records.forEach(rec => {
                if (rec.progress == "start") {
                  rec.type = "start";
                } else {
                  rec.type = "run";
                }
              });
              this.status = "hide";
              this.$set(this, "Transfer", records); //记录
              this.periods = data.data.periods;//期限列表
              this.rates = data.data.rates;//利率列表
              this.periods.forEach((i, v) => {
                for (let k in i) {
                  i.key = k;
                  i.value = i[k];
                }
              });
              this.rates.forEach((i, v) => {
                for (let k in i) {
                  i.key = k;
                  i.value = i[k];
                }
              });
            }else{
            	_path.dealStatusCode(data.status,data.msg,this)
            }
          }
        });
      // this.$store.state.project = 'debt'
    },
    tab2(id) {
      this.$router.push({ name: "debt", params: { pid: id, project: "debt"} });
    },
    objs() {
      //筛选类型
      // let obj = { page: 1, pageSize: 5 };
      let obj = {};
      if (this.periods || this.rates) {
        obj.rate = this.rate;
        obj.period = this.period;
        for (let i in obj) {
          if (obj[i] == "" || typeof obj[i] == "undefined")delete obj[i];
        }
      }
      return obj;
    },
    zqReqs() {
      this.click = 1//修改全部按钮样式
      this.page = 1;
      let obj = { page: 1, pageSize: 5 ,crtrUser:this.userId,rate:this.rate,period:this.period},
        dataObj = Object.assign(obj, this.objs());
      this.$axios
        .get(_path.getObj("crtrs", dataObj), { withCredentials: true })
        .then(res => {
          if (res.status == 200) {
          	if(res.data.status == "000000"){
              let records = res.data.data.records;
          		records.forEach(rec => {
                if (rec.progress == "start") {
                  rec.type = "start";
                } else {
                  rec.type = "run";
                }
              });
              $("#crtrs .content").scrollTop('0')
              // this.Transfer = records;
              this.$set(this,"Transfer",records)
              this.status = "hide";
          	}else{
              _path.dealStatusCode(res.data.status,res.data.msg,this)
            }
              //按钮显示
              this.btnScreening = false
              //bg
              this.screenBg = false
              //筛选列表
              this.navStyle.zqpage={
                'selectItem':true, 
                'advanceMark':true,
                'disb':false
              }
              //显示更多
              this.isLoadingMore = false
          }
        });   
    },
    screening(val,e,key){     
      if(key=='zq_period')if(!!val)this.period = val;//期限
      if(key=='zq_rate')if(!!val)this.rate = val;//利率
       e.target.setAttribute("class", "select");
      $(e.target)
        .siblings()
        .removeClass("select");
    },
    discount(){
      //折扣 asc:升序  desc：降序
      if(this.sort=="asc"){
        this.sort = "desc"
        this.$refs.iup.classList.add("black")
        this.$refs.idown.classList.remove("black")
      }else{
        this.sort = "asc"
        this.$refs.iup.classList.remove("black")
        this.$refs.idown.classList.add("black")
      }
      this.getDataTransfer()
    }
  },
  created() {
    this.isLogin();
  },
  mounted() {
    $("#crtrs .content").scroll(this.didScroll);
    // if(!this.userId){
      this.userId = this.$route.params.id
      window.sessionStorage.setItem('crtrsid',this.userId)
    // }
    // console.log(this.userId)
    this.getDataTransfer();
    // console.log(this.$route)
  },
  filters,
  components: {
    pageNav
  },
  updated(){
    if(this.click==0){
      $(".selectItem div ul")[0].children[0].setAttribute("class","select")
      $(".selectItem div ul")[1].children[0].setAttribute("class","select")
    }

  },
  	//  beforeRouteEnter (to,from,next){
    //       // console.log(to)

    //       next(vm=>{
    //       // console.log(from.name)
    //         if(!!from.name&&from.name=="projects"){
    //           vm.userId = to.params.id
    //           window.sessionStorage.setItem('crtrsid',vm.userId)
    //           }
    //       })
    // },
  // watch:{
  //     nav:function(val){

  //   }
  // }
};
</script>
<style src='@/assets/css/crtrs.css'></style>
