<template>
  <div>
      <div id="rwrecord">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">充值提现记录</h1>
			</header>
			<div class="buttons-tab">
			    <a href="#tab1" class="tab-link active button bor">充值记录</a>
			    <a href="#tab2" class="tab-link button" @click.prevent='withdrawRecords'>提现记录</a>
			</div>
			<div class="content">
				<div class="tabs">
					<div class="tab active" id="tab1">
							<div class="card" v-for="(rec,i) in recharge" :key='i'>
								<div class="card-content">
									<div class="card-content-inner flex">
										<div class="rwrLeft flex">
											<img src="../../../static/img/me/rechargeWithdrawalRecord/rwr.png" alt="" />
											<div class="marl">
												<div class="num">{{rec.money|formatNumber1}}</div>
												<div class="text">充值成功</div>
											</div>
										</div>
										<div class="rwrRight">
											<div class="fzc">{{rec.time.split(' ')[0]}}</div>
											<div class="fzc">{{rec.time.split(' ')[1]}}</div>
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
					
					<div class="tab" id="tab2">
						<div class="card" v-for='(cas,i) in cash' :key='i'>
							<div class="card-content">
								<div class="card-content-inner flex">
									<div class="rwrLeft flex">
										<img src="../../../static/img/me/rechargeWithdrawalRecord/withdraw.png" alt="" />
										<div class="marl">
											<div class="num">{{cas.money|formatNumber1}}</div>
											<div class="text" v-if='cas.status==1'>提现成功</div>
											<!-- <div class="text" v-if='cas.status==0' style='color:red'>提现失败</div> -->
                      <!-- 20180619 -->
											<div class="text" v-if='cas.status==0' style='color:red'>待处理</div>
											<div class="text" v-if='cas.status==2' style='color:red'>失败</div>
											<div class="text" v-if='cas.status==3' style='color:orange'>审核中</div>
										</div>
									</div>
									<div class="rwrRight">
										<div class="fzc">{{cas.time.split(' ')[0]}}</div>
										<div class="fzc">{{cas.time.split(' ')[1]}}</div>
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
      recharge: [], //充值记录
      cash: [], //提现记录
      isLoadingMore: false, //判断加载更多
      page: 1,
      pageTr: 2,
      status: "hide",
      pageSize: 5
    };
  },
  methods: {
    routerback() {
      this.$router.go(-1);
    },
    rechargeRecords() {
      //充值记录
      let obj = { page: 1, pageSize: 10 },
        _this = this;
      this.$axios.interceptors.request.use(
        function(config) {
          _this.status = "loading";
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
      this.$axios
        .get(_path.getObj("rechargeRecords", obj), { withCredentials: true })
        .then(({status,data}) => {
          if(status==200){
            if (data.status == '000000') {
                this.recharge = data.data.records;
                this.status = 'fail'
            }else {
              _path.dealStatusCode(data.status, data.msg, this);
            }
          }
        });
    },
    withdrawRecords() {
      //提现记录
      let obj = { page: 1, pageSize: 10 }
      this.$axios
        .get(_path.getObj("withdrawRecords", obj), { withCredentials: true })
        .then(({status,data}) => {
          if(status==200){
            if (data.status == '000000') {
              this.cash = data.data.records;
              this.status = 'fail'
            }
          }
        });
    },
    didScroll() {
      if (this.isLoadingMore) {
        return;
      }
      let $tb1 = $("#rwrecord #tab1"),
        $tb2 = $("#rwrecord #tab2"),
        cs = $("#rwrecord .content").scrollTop(),
        dh = $(document).height();
      if ($tb1.hasClass("active")) {
        if ($tb1.height() - cs < dh) {
          this.status = "loading";
          this.page += 1;
          this.loadMore(this.page, "rechargeRecords");
        }
      } else if ($tb2.hasClass("active")) {
        if ($tb2.height() - cs < dh) {
          this.status = "loading";
          this.pageTr += 1;
          this.loadMore(this.pageTr, "withdrawRecords");
        }
      }
    },
    //上拉加载
    loadMore(pag, api) {
      // this.isLoadingMore = true;
      let dataObj = {
        page: pag,
        pageSize: this.pageSize
      };
      this.$axios
        .get(_path.getObj(api, dataObj), { withCredentials: true })
        .then(res => {
          let data = res.data.data;
          if (data.records.length == 0) {
            this.isLoadingMore = true;
            this.status = "hide";
          } else {
            // let data = res.data.data;
            if (api == "rechargeRecords") {
              this.recharge = this.recharge.concat(data.records);
              this.isLoadingMore = false;
              this.status = "fail";
            } else if (api == "withdrawRecords") {
              this.cash = this.cash.concat(data.records);
              this.isLoadingMore = false;
              this.status = "fail";
            }
          }
        });
    }
  },
  mounted() {
    this.rechargeRecords();
    //			this.withdrawRecords()
    $("#rwrecord .content").scroll(this.didScroll);
  },
  filters
};
</script>
<style src='@/assets/css/me/rechargeWithdrawalRecord.css'>

</style>
