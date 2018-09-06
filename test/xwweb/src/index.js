import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import VueRouter from 'vue-router'
// 一级页面
import home from '@/pages/home'
import projects from '@/pages/projects'
import me from '@/pages/me'
import pageNav from '@/pages/page-nav'


// 二级页面 
import loan from '@/pages/home/loan'//申请贷款
import login from '@/pages/home/login'//登录小微时贷
import modifyPw from '@/pages/home/modifyPw'//忘记登入密码
import news from '@/pages/home/news'// 咨询
import newsDetail from '@/pages/home/newsDetail'//资讯详情
import register from '@/pages/home/register' //注册
import openDepository from '@/pages/home/openDepository'//注册第二步
import registerSuccess from '@/pages/home/registerSuccess'//注册第三步
import guide from '@/pages/home/guide'//新手指南
import protocol from '@/pages/home/protocol'//用户协议


import withdraw from '@/pages/me/withdraw'//提现
import recharge from '@/pages/me/recharge'//充值
import investManage from '@/pages/me/investManage'//投资管理
import debtCession from '@/pages/me/debtCession'//债权转让
import refundCalendar from '@/pages/me/refund-calendar'//还款日期
import automaticBid from '@/pages/me/automatic-bid'//自动投标
import moneyRecord from '@/pages/me/money-record'//资金记录
import applicationBid from '@/pages/me/application-bid'//申请约标
import giftCoupon from '@/pages/me/gift-coupon'//红包
import giftCouponUse from '@/pages/me/giftCouponUse'//使用红包页面
import planGiftCoupon from '@/pages/me/planGiftCoupon'//智投使用红包
import rechargeWithdrawalRecord from '@/pages/me/rechargeWithdrawalRecord'//充值提现记录
import referralBonuses from '@/pages/me/referralBonuses'//推荐奖励
import settings from '@/pages/me/settings'//设置中心


// 三级页面advanceObj
import detail from '@/pages/projects/detail'//projects 项目详情
import preInvestDetail from '@/pages/projects/preInvestDetail'//智能一键投标总项目详情
import investBid from '@/pages/projects/investBid'//投标
import preInvestBid from '@/pages/projects/preInvestBid'//智能一键投标投标
import debt from '@/pages/projects/debt'//债权详情
import continueDebt from '@/pages/projects/continueDebt'//承接

import dcDetail from '@/pages/me/me3/dcDetail'//明细
import exDetail from '@/pages/me/me3/exDetail'//智能一键投标详情
import addBankCard from '@/pages/me/me3/addBankCard'//添加银行卡
import autoBidSetting1 from '@/pages/me/me3/auto-bid-setting1'//自动投标高级版
import autoBidSetting2 from '@/pages/me/me3/auto-bid-setting2'//自动投标简版

import emailPhoneAuthentication from '@/pages/me/me3/emailPhoneAuthentication'//手机验证
import modifyPhone from '@/pages/me/me3/modifyPhone'//修改手机号
import emailAuthentication from '@/pages/me/me3/emailAuthentication'//邮箱验证
import bankCard from '@/pages/me/me3/bankCard'//银行卡
import cashBank from '@/pages/me/me3/cashBank'//银联号
import updatePassword from '@/pages/me/me3/updatePassword'//修改登录密码

import VIP from '@/pages/me/me3/VIP'//VIPborrowMoney
import borrowMoney from '@/pages/me/me3/borrowMoney'//借款
import supportBankList from '@/pages/me/me3/supportBankList'//支持银行


Vue.use(Router)

const routes = [
  {
    path:'/',
    redirect:'home'
  },
  {
   path:'/home',
   name:'home',
   component:home,
  },{
    path: '/projects',
    name: 'projects',
    component: projects
  },{
    path: '/me',
    name: 'me',
    component: me
  },{
    path:'/news',
    name:'news',
    component: news,
  },{
  	path:'/newsDetail/:newId',
  	name:'newsDetail',
  	component: newsDetail
  },{
    path:'/loan',
    name:'loan',
    component: loan,
  },{
    path:'/login',
    name:'login',
    component: login,
  },{
    path: '/detail/:pid',
    name: 'detail',
    component: detail
  },{
    path: '/detail/:pid/:id',
    name: 'detail',
    component: detail
  },{
    path: '/preInvestDetail/:pid',
    name: 'preInvestDetail',
    component: preInvestDetail
  },{
  	path:'/investBid/:id',
  	name:'investBid',
  	component: investBid
  },{
  	path:'/preInvestBid/:id',
  	name:'preInvestBid',
  	component: preInvestBid
  },{
    path: '/withdraw',
    name: 'withdraw',
    component: withdraw
  },{
    path: '/recharge',
    name: 'recharge',
    component: recharge
  },{
    path: '/investManage',
    name: 'investManage',
    component: investManage
  },{
    path: '/debtCession',
    name: 'debtCession',
    component: debtCession
  },{
    path: '/refundCalendar',
    name: 'refundCalendar',
    component: refundCalendar
  },{
    path: '/automaticBid',
    name: 'automaticBid',
    component: automaticBid
  },{
    path: '/moneyRecord',
    name: 'moneyRecord',
    component: moneyRecord
  },{
    path: '/applicationBid',
    name: 'applicationBid',
    component: applicationBid
  },{
    path: '/guide',
    name: 'guide',
    component: guide
  },{
    path: '/giftCoupon',
    name: 'giftCoupon',
    component: giftCoupon
  },{
  	path:'/giftCouponUse',
  	name:'giftCouponUse',
  	component:giftCouponUse
  },{
  	path:'/planGiftCoupon',
  	name:'planGiftCoupon',
  	component:planGiftCoupon
  },{
    path: '/rechargeWithdrawalRecord',
    name: 'rechargeWithdrawalRecord',
    component: rechargeWithdrawalRecord
  },{
    path: '/settings',
    name: 'settings',
    component: settings
  },{
    path: '/protocol',
    name: 'protocol',
    component: protocol
  },{
    path: '/autoBidSetting1',
    name: 'autoBidSetting1',
    component: autoBidSetting1
  },{
    path: '/autoBidSetting2',
    name: 'autoBidSetting2',
    component: autoBidSetting2
  },{
    path: '/emailPhoneAuthentication',
    name: 'emailPhoneAuthentication',
    component: emailPhoneAuthentication
  },{
    path: '/modifyPhone',
    name: 'modifyPhone',
    component: modifyPhone
  },{
    path: '/emailAuthentication',
    name: 'emailAuthentication',
    component: emailAuthentication
  },{
    path: '/bankCard',
    name: 'bankCard',
    component: bankCard
  },{
    path: '/updatePassword',
    name: 'updatePassword',
    component: updatePassword
  },{
    path: '/borrowMoney',
    name: 'borrowMoney',
    component: borrowMoney
  },{
    path: '/VIP',
    name: 'VIP',
    component: VIP
  },{
    path: '/cashBank',
    name: 'cashBank',
    component: cashBank
  },{
    path: '/referralBonuses',
    name: 'referralBonuses',
    component: referralBonuses
  },{
    path: '/register',
    name: 'register',
    component: register
  },{
    path: '/openDepository',
    name: 'openDepository',
    component: openDepository
  },{
    path: '/registerSuccess',
    name: 'registerSuccess',
    component: registerSuccess
  },{
    path: '/modifyPw',
    name: 'modifyPw',
    component: modifyPw
  },{
    path: '/pageNav',
    name: 'pageNav',
    component: pageNav
  },{
    path: '/debt/:pid',
    name: 'debt',
    component: debt
  },{
  	path:'/continueDebt/:id',
  	name:'continueDebt',
  	component:continueDebt
  },{
    path: '/dcDetail',
    name: 'dcDetail',
    component: dcDetail
  },{
    path: '/exDetail/:tradeNo',
    name: 'exDetail',
    component: exDetail
  },{
    path: '/supportBankList',
    name: 'supportBankList',
    component: supportBankList
  },{
    path: '/addBankCard',
    name: 'addBankCard',
    component: addBankCard
  }
//,{
//  path: '/agreementYutou',//智能一键投标协议
//  name: 'agreementYutou',
//  component: resolve=>require(['../pages/projects/agreementYutou'],resolve)
//}
]

export default new VueRouter({
  routes
})
