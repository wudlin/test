import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)
export default new Router({
  routes:[
    { path: '/', redirect: '/home' },
    { path: '*', redirect: '/' },
    {
     path:'/home',
     name:'home',
     component:resolve=>require(['../pages/home.vue'],resolve),
    },
    {
      path: '/guide',//新手指南
      name: 'guide',
      component:resolve=>require(['../pages/home/guide'],resolve),
    },
    {
      path:'/login',//登录小微时贷
      name:'login',
      component:resolve=>require(['../pages/home/login.vue'],resolve),
    },
    {
      path:'/login/:go',//登录小微时贷,有传参数登录后go(-1)，无参返回首页
      name:'login1',
      component:resolve=>require(['../pages/home/login.vue'],resolve),
    },
    {
      path:'/loan',//申请贷款
      name:'loan',
      component:resolve=>require(['../pages/home/loan'],resolve),
    },{
      path: '/modifyPw',//忘记登入密码
      name: 'modifyPw',
      component:resolve=>require(['../pages/home/modifyPw'],resolve)
    },{
      path:'/news',// 咨询
      name:'news',
      component:resolve=>require(['../pages/home/news'],resolve),
    },{
      path:'/newsDetail/:newId',//资讯详情
      name:'newsDetail',
      component:resolve=>require(['../pages/home/newsDetail'],resolve)
    },{
      path: '/protocol',//用户协议
      name: 'protocol',
      component:resolve=>require(['../pages/home/protocol'],resolve)
    },{
      path: '/iosdownload',//ios下载
      name: 'iosdownload',
      component:resolve=>require(['../pages/home/iosdownload'],resolve)
    },{
      path: '/register',//投资注册
      name: 'register',
      component:resolve=>require(['../pages/home/register'],resolve)
    },{
      path: '/register/:code',//投资注册
      name: 'register1',
      component:resolve=>require(['../pages/home/register'],resolve)
    },{
      path: '/openDepository',//注册第二步
      name: 'openDepository',
      component:resolve=>require(['../pages/home/openDepository'],resolve)
    },{
      path: '/registerSuccess',//注册第三步
      name: 'registerSuccess',
      component:resolve=>require(['../pages/home/registerSuccess'],resolve)
    },{
      path: '/registerBorrowing',//借款注册
      name: 'registerBorrowing',
      component:resolve=>require(['../pages/home/registerBorrowing'],resolve)
    },{
      path: '/vote',//问卷调查
      name: 'vote',
      component:resolve=>require(['../pages/home/vote'],resolve)
    },{
      path: '/vote/:path',//问卷调查
      name: 'vote0',
      component:resolve=>require(['../pages/home/vote'],resolve)
    },{
      path: '/vote1/:path',//问卷调查协议1
      name: 'vote1',
      component:resolve=>require(['../pages/home/vote1'],resolve)
    },{
      path: '/vote2/:path',//问卷调查协议2
      name: 'vote2',
      component:resolve=>require(['../pages/home/vote2'],resolve)
    }
    ,{
      path: '/projects',//项目详情
      name: 'projects',
      component:resolve=>require(['../pages/projects.vue'],resolve),
    },
    {
      path: '/crtrs/:id',//项目详情
      name: 'crtrs',
      component:resolve=>require(['../pages/crtrs.vue'],resolve),
    },
    {
      path: '/crtrs',//项目详情
      name: 'crtrs1',
      component:resolve=>require(['../pages/crtrs.vue'],resolve),
    },
    {
      path:'/continueDebt/:id',//承接
      name:'continueDebt',
      component:resolve=>require(['../pages/projects/continueDebt'],resolve)
    },{
      path: '/debt/:pid',//债权详情
      name: 'debt',
      component:resolve=>require(['../pages/projects/debt'],resolve)
    },{
      path: '/detail/:pid',//标的详情
      name: 'detail',
      component: resolve=>require(['../pages/projects/detail'],resolve)
    },{
      path: '/detail/:pid/:id',//智投的项目详情2
      name: 'detail1',
      component:resolve=>require(['../pages/projects/detail'],resolve)
    },{
      path:'/investBid/:id',//投标
      name:'investBid',
      component:resolve=>require(['../pages/projects/investBid'],resolve)
    },{
      path:'/preInvestBid/:id',//智能一键投标投标
      name:'preInvestBid',
      component:resolve=>require(['../pages/projects/preInvestBid'],resolve)
    },{
      path: '/preInvestDetail/:pid',//智能一键投标总项目详情
      name: 'preInvestDetail',
      component:resolve=>require(['../pages/projects/preInvestDetail'],resolve)
    },{
      path: '/me',
      name: 'me',
      component:resolve=>require(['../pages/me.vue'],resolve),
    },{
      path: '/pageNav',
      name: 'pageNav',
      component:resolve=>require(['../pages/page-nav.vue'],resolve)
    },
    {
      path: '/applicationBid',//申请约标
      name: 'applicationBid',
      component:resolve=>require(['../pages/me/application-bid'],resolve)
    },{
      path: '/automaticBid',//自动投标
      name: 'automaticBid',
      component:resolve=>require(['../pages/me/automatic-bid'],resolve)
    },{
      path: '/changeproductauth',//转投授权
      name: 'changeproductauth',
      component:resolve=>require(['../pages/me/changeproductauth'],resolve)
    },{
      path: '/debtCession',//债权转让
      name: 'debtCession',
      component:resolve=>require(['../pages/me/debtCession'],resolve)
    },{
      path: '/giftCoupon',//红包
      name: 'giftCoupon',
      component:resolve=>require(['../pages/me/gift-coupon'],resolve)
    },{
      path:'/giftCouponUse',//使用红包页面
      name:'giftCouponUse',
      component:resolve=>require(['../pages/me/giftCouponUse'],resolve)
    },{
      path: '/investManage',//投资管理
      name: 'investManage',
      component:resolve=>require(['../pages/me/investManage'],resolve)
    },{
      path: '/moneyRecord',//资金记录
      name: 'moneyRecord',
      component:resolve=>require(['../pages/me/money-record'],resolve)
    },{
      path: '/recharge',//充值
      name: 'recharge',
      component:resolve=>require(['../pages/me/recharge'],resolve)
    },{
      path: '/rechargeWithdrawalRecord',//充值提现记录
      name: 'rechargeWithdrawalRecord',
      component:resolve=>require(['../pages/me/rechargeWithdrawalRecord'],resolve)
    },{
      path: '/referralBonuses',//推荐奖励
      name: 'referralBonuses',
      component:resolve=>require(['../pages/me/referralBonuses'],resolve)
    },{
      path: '/refundCalendar',//还款日期
      name: 'refundCalendar',
      component:resolve=>require(['../pages/me/refund-calendar'],resolve)
    },{
      path: '/settings',//设置中心
      name: 'settings',
      component:resolve=>require(['../pages/me/settings'],resolve)
    },{
      path: '/withdraw',//提现
      name: 'withdraw',
      component:resolve=>require(['../pages/me/withdraw'],resolve)
    },{
      path:'/planGiftCoupon',//智投使用红包
      name:'planGiftCoupon',
      component:resolve=>require(['../pages/me/planGiftCoupon'],resolve)
    },

    {
      path: '/addBankCard',//添加银行卡
      name: 'addBankCard',
      component:resolve=>require(['../pages/me/me3/addBankCard'],resolve)
    },{
      path: '/autoBidSetting1',//自动投标高级版
      name: 'autoBidSetting1',
      component:resolve=>require(['../pages/me/me3/auto-bid-setting1'],resolve)
    },{
      path: '/autoBidSetting2',//自动投标简版
      name: 'autoBidSetting2',
      component:resolve=>require(['../pages/me/me3/auto-bid-setting2'],resolve)
    },{
      path: '/bankCard',//银行卡
      name: 'bankCard',
      component:resolve=>require(['../pages/me/me3/bankCard'],resolve)
    },{
      path: '/openDepository1',//开通存管
      name: 'openDepository1',
      component:resolve=>require(['../pages/me/me3/openDepository1'],resolve)
    },{
      path: '/bankProtocol',//银行三方协议
      name: 'bankProtocol',
      component:resolve=>require(['../pages/me/me3/bankProtocol'],resolve)
    },{
      path: '/borrowMoney',//借款
      name: 'borrowMoney',
      component:resolve=>require(['../pages/me/me3/borrowMoney'],resolve)
    },{
      path: '/cashBank',//银联号
      name: 'cashBank',
      component:resolve=>require(['../pages/me/me3/cashBank'],resolve)
    },{
      path: '/dcDetail/data/:dcDetail/:planTradeNo',//明细
      name: 'dcDetail0',
      component:resolve=>require(['../pages/me/me3/dcDetail'],resolve)
    },{
      path: '/dcDetail/:ids/:dcDetail',//明细
      name: 'dcDetail',
      component:resolve=>require(['../pages/me/me3/dcDetail'],resolve)
    }
    ,{
      path: '/dcDetail/:ids',//明细
      name: 'dcDetail1',
      component:resolve=>require(['../pages/me/me3/dcDetail'],resolve)
    },{
      path: '/dcDetail/data2/:dcInfo/:ids',//明细
      name: 'dcDetail2',
      component:resolve=>require(['../pages/me/me3/dcDetail'],resolve)
    },
    {
      path: '/emailAuthentication',//邮箱验证
      name: 'emailAuthentication',
      component:resolve=>require(['../pages/me/me3/emailAuthentication'],resolve)
    },{
      path: '/emailPhoneAuthentication',//手机验证
      name: 'emailPhoneAuthentication',
      component:resolve=>require(['../pages/me/me3/emailPhoneAuthentication'],resolve)
    },{
      path: '/exDetail/:tradeNo',//智能一键投标详情
      name: 'exDetail',
      component:resolve=>require(['../pages/me/me3/exDetail'],resolve)
    },{
      path: '/modifyPhone',//修改手机号
      name: 'modifyPhone',
      component:resolve=>require(['../pages/me/me3/modifyPhone'],resolve)
    },{
      path: '/supportBankList',//支持银行
      name: 'supportBankList',
      component:resolve=>require(['../pages/me/me3/supportBankList'],resolve)
    },{
      path: '/updatePassword',//修改登录密码
      name: 'updatePassword',
      component:resolve=>require(['../pages/me/me3/updatePassword'],resolve)
    },{
      path: '/VIP',
      name: 'VIP',
      component:resolve=>require(['../pages/me/me3/VIP'],resolve)
    }
  ]
})


