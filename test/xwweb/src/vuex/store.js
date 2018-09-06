 import Vue from 'vue'
 import Vuex from 'vuex'
 // 首先声明一个状态 state
 Vue.use(Vuex)
 const state = {
    msg: '',
    userid:'',
    lotteryName:'',
    lotteryId:'',
    loan:'',
    newPage:'',
    fromPage:'',
    detail:{}
 }
 // 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
 const actions = {
    saveName({commit}, msg) {
        commit('saveMsg', msg)    // 提交到mutations中处理    
    }
 }
 // 更新状态
 const mutations = {
    saveMsg(state, msg) {
        state.msg = msg;
        console.log(msg)
    },
    saveObj(state,obj){
        let key,val
        for(let i in obj){
            key=i,val=obj[i]
        }
        // Object.assign(state,obj)
        state[key] = val
        window.sessionStorage.setItem("commons",JSON.stringify(state))
    },
    saveState(state){
        //刷新页面重新赋值
        let session = JSON.parse(window.sessionStorage.getItem('commons'))
        // Object.assign(state,session)
        state = session
    }
 }
 // 获取状态信息
 const getter = {
    showState(state) {
        console.log(state.msg)
    }
 }


 // 下面这个相当关键了，所有模块，记住是所有，注册才能使用
 export default new Vuex.Store({
    state,
    getter,
    mutations,
    actions
 })