<template>
	<!--<transition appear name='slide-fade' mode="out-in" v-if='show'>-->
	<transition name="side-menu-animate" ease-in-out>
    <!--首页全部导航栏页-->
		<div id="pageNav"style="background-color: #fff;width: 100%;display:block" class="panel">
			<header class="bar bar-nav">
			<a class="icon pull-left xwsd-icon"></a>
			  <a class="icon xwsd-del pull-right" @click.prevent="routerback()">X</a>
			</header>
			<div class="content">
				<div class="a">
					<a href="" @click.prevent="newsP">
						<img src="../../static/img/common/m3.png" alt="" />
						<div class="text">资讯</div>
					</a>
					<a href="" @click.prevent="guide">
						<img src="../../static/img/common/m6.png" alt="" />
						<div class="text">新手指南</div>
					</a>	
					<a href="" @click.prevent="loans">
						<img src="../../static/img/common/m4.png" alt="" />
						<div class="text">申请车贷</div>
					</a>
				</div>
				<div class="a b">
					<a @click.prevent="reg">
						<img src="../../static/img/common/m2.png" alt="" />
						<div class="text">注册</div>
					</a>
					<router-link to='/login' v-if="!isNowLogin">
						<img src="../../static/img/common/m1.png" alt="" />
						<div class="text">登录</div>
					</router-link>
					<router-link to='/me' v-if="isNowLogin">
						<img src="../../static/img/common/m1.png" alt="" />
						<div class="text">我的</div>
					</router-link>
					<a href="#" @click="toWhere">
						<img src="../../static/img/common/m5.png" alt="" />
						<div class="text">官方APP</div>
					</a>
				</div>
			</div>
		</div>
	</transition>  
</template>
<script>
import _path from "@/assets/js/md5";
export default {
  name: "app",
  data() {
    return {
      show: true,
      isNowLogin: false, //登录标识
      loanPage: 1,
      newPage: 1,
      navigation: ""
    };
  },
  methods: {
    loans() {
      if (this.loanPage == 1 || this.loanPage === "") {
        this.$router.push("/loan");
      } else if (this.loanPage === 0) {
        this.routerback();
        this.loanPage = 1;
      }
    },
    newsP() {
      if (this.newPage == 1 || this.newPage === "") {
        this.$router.push("/news");
      } else if (this.newPage === 0) {
        this.routerback();
        this.newPage = 1;
      }
    },
    routerback() {
      this.$emit("navshow", false);
    },
    toWhere() {
      window.location.href = "https://app.xwsd.com/v2page/download.html";
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
      this.$axios
        .get(path, { withCredentials: true })
        .then(({ status, data }) => {
          if (status == 200) {
            if (data.status == "000000" && data.data.isLogin == 1) {
              this.isNowLogin = true;
            }
          }
        });
    },
    guide() {
      window.location.href = "https://app.xwsd.com/v2page/qdetail.html?param=1";
    },
    reg() {
      if (this.isNowLogin) {
        $.alert("您已经登入");
      } else {
        // 选择注册
        $.modal({
          title:  '选择注册',
          // text: '选择注册',
          buttons: [
            {
              text: '投资注册',
              onClick: function() {
                this.$router.push("register");
              }.bind(this)
            },
            {
              text: '借款注册',
              onClick: function() {
                this.$router.push("registerBorrowing");
              }.bind(this)
            },
          ]
        })
      }
    }
  },
  mounted() {
    this.isLogin();
    this.loanPage = this.$store.state.loan;
    this.newPage = this.$store.state.newPage;
  }
};
</script>
<style scoped>
/*.appear{
	 transform: translateX(50px)
	}
	.slide-fade-enter-active ,.slide-fade-leave-active {
	  transition:all 1s  linear;
	}*/
.slide-fade-enter,
.slide-fade-leave-to {
  /* transform: translateX(-100%); */
  transform: translate3d(-100%, 0, 0);
}
.side-menu-animate-enter-active,
.side-menu-animate-leave-active {
  transition: all 0.7s;
}

.side-menu-animate-enter,
.side-menu-animate-leave-active {
  /* opacity: 0; */
  transform: translateX(100%);
}
/*全部导航栏页*/
.panel {
  width: 100%;
}
/* .panel.panel-right.panel-cover {
  right: -100%;
} */
/* body.with-panel-right-cover .panel-right{
		-webkit-transform: translate3d(-100%,0,0);
		transform: translate3d(-100%,0,0);
	} */
#pageNav {
  z-index: 6000;
}
#pageNav > header {
  height: 2.4rem;
  border-bottom: 1px solid #dcdcdc;
  background-color: #fff;
}
#pageNav > header > a {
  height: 1.1rem;
  top: calc(1.2rem - 0.4125rem);
  background-size: 100% 100%;
}
#pageNav > header .xwsd-icon {
  width: 4rem;
  background-image: url(../../static/img/common/logo.png);
  background-position: left center;
}
#pageNav > header .xwsd-del {
  width: 1.1rem;
  color: #c0c0c0;
  line-height: 1.1rem;
  padding: 0;
  text-align: center;
  font-weight: 100;
}
#pageNav .content {
  background-color: #fff;
  top: 2.4rem;
}
#pageNav .content .a {
  display: flex;
  display: -webkit-flex;
  margin-top: 1.25rem;
}
#pageNav .content .a > a {
  display: block;
  width: 33.3%;
  text-align: center;
  font-size: 0;
}
#pageNav .content .a > a > img {
  width: 2.15rem;
  height: 2.15rem;
}
#pageNav .content .a .text {
  font-size: 0.6rem;
  color: #333;
  margin-top: 0.6rem;
}
#pageNav .content .b {
  margin-top: 1.225rem;
}
.bar-nav ~ .content {
  top: 2.4rem;
}
</style>
