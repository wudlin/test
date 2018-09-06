import md5 from 'js-md5'
import qs from 'qs'
import util from 'util'

var _path = {
	getApiUrl(str){
		return util.format("%s/%s",process.env.API_URL,str)
	},
	getObj(xw,obj){
		let objstr = qs.stringify(obj)
		return util.format("%s?%s",_path.getApiUrl(xw),objstr)
	},
	postObj(obj){
		// console.log(obj)
		return qs.stringify(obj)
	},
	getStr(arr) {
        let pathstr='',arrp = arr.sort()
		for(let i of arrp){
            pathstr += i + '&'
		}
        // console.log(pathstr)
		return pathstr;
	},
	getSign(arr) {
		let pathstr = '',result = '';
		pathstr = _path.getStr(arr)
		pathstr = pathstr.substring(0,pathstr.length-1)
		result= pathstr + 'abcdeft12345'
		return this.jiami(result)
	},
	jiami(num) {
		// console.log(num)
		return md5(num)
	},
	getPath(port,paramsArr) {
		let pathStr = _path.getStr(paramsArr),
		sign = 'sign=' + _path.getSign(paramsArr);
		pathStr = pathStr + sign
		return '/xwweb'+port+'?'+pathStr
	},
	dealDialog(tipContent,dialogType,_this,golink,go){
		if(dialogType==1){
			$.confirm(tipContent,()=>{
				if(!!golink){
					if(golink == "setCustodypass"){
						_path.setCustodypass();
					}else if(golink == "addBankCard"){
						// 20180614 修改添加银行卡页面
						_path.getcardBind();
					}else if(golink == "getAutoAuth"){
						_path.getAutoAuth();
					}else{
						_this.$router.push(golink);
					}
				}else{
					return;
				}
			},()=>{
				if(!!go){
					_this.$router.go(-1)
				}else{
					return;
				}
			})
		}else{
			$.alert(tipContent,()=>{
				if(!!golink){
					if(golink = 'feeauth'){
						_path.setFeeauth();
					}else if(golink = 'repayauth'){
						_path.setRepayauth();
					}else{
						_this.$router.push(golink)
					}
				}else{
					return _this.status='fail';
				}
			})
		}
	},
	dealStatusCode(status,msg,_this,go){
		//处理状态码,第一个参数状态码，第二个vue的this,
		switch(status){
			case "000000":
				break;
			case "111111":
				_path.dealDialog(msg,2,_this)
				break;
			case "C00001":
				_path.dealDialog('您还未开通存管',1,_this,'/openDepository1')
				break;
			case "C00004":
				_path.dealDialog('您还未设置存管密码',1,_this,'setCustodypass',go)
				break;
			case "C00002":
				_path.dealDialog('您还未进行自动投标签约', 1, _this, 'getAutoAuth')
				break;
			case "C00005":
				_path.dealDialog('缴费未授权,立即授权?', 2, _this,'feeauth')
				break;
			case "C00006":
				_path.dealDialog('还款未授权,立即授权?', 2, _this, 'repayauth')
				break;
			case "C00003":
				_path.dealDialog('您还未绑定银行卡',1,_this,'addBankCard',go)
				break;
			case "I00001":
				_path.dealDialog('您还未设置常用邮箱',1,_this,'/emailAuthentication')
				break;
			case "X00002":
				_path.dealDialog('缺少参数',2)
				break;
			case "X00003":
				_path.dealDialog('您还未登录',1, _this, '/login')
				break;
			case "X00007":
				+
				window.location.assign(go);
				break;
			default:
				_path.dealDialog(msg,2,_this)
				break;
		}
	},
	setCustodypass(){//设置存管密码
		let dataObj = {ret: "/home"},path = _path.getObj("setCustodypass", dataObj);
		window.location.href = path;
	},
	getAutoAuth() {//签约
    let obj = { mode: "bid", ret: "/home" };
    window.location.href = _path.getObj("autoAuth", obj);
	},
	setFeeauth() {//缴费授权
 		let dataObj = {ret: "/home"},path = _path.getObj('feeauth',dataObj);
 		window.location.href = path;
 	},
 	setRepayauth() {//还款授权
 		let dataObj = {ret: "/home"},path = _path.getObj('repayauth',dataObj);
 		window.location.href = path;
	 },
	getcardBind(){
	//跳转添加银行卡页面
		let path = _path.getApiUrl("cardBind");
		window.location.href = path;
	}
}
export default _path


