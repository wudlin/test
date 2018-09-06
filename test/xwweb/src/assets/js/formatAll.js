
let filters = {
	isNotData(num){
		return (typeof(num)=='undefined'||num==null||num=='') ? "--" : num;
	},
	formatNumber0(num) {
		let v = Number(num)
		return (Number.isNaN(v)) ? "-" : (Math.floor(num));
	},
	percentFormat0(value){
		let v = Number(value)
		return (Number.isNaN(v)) ? "" : (parseFloat(v*100).toFixed(0) +'%');
	},
	percentFormat1(value){
		let v = Number(value)
		return (Number.isNaN(v)) ? "" : (parseFloat(v*100).toFixed(1) +'%');
	},
	percentFormat11(value){
		let v = Number(value)
		return (Number.isNaN(v)) ? "" : '+'+(parseFloat(v*100).toFixed(1) +'%');
	},
	formatNumber1(num) {
		let v = Number(num)
		return (Number.isNaN(v)) ? "-" : (v.toFixed(1));
	},
	formatNumber2(num) {
		let v = Number(num)
		return (Number.isNaN(v)) ? "-" : (v.toFixed(2));
	},
	formatNumber3(num) {
		let month = String(num).indexOf('个月'),
			week = String(num).indexOf('周');
			if(month!=-1){
				return (typeof(num)=='undefined') ? "" : (String(num).substring(0,month))
			}else if(week!=-1){
				return (typeof(num)=='undefined') ? "" :(String(num).substring(0,week)) 
			}
	},
	percentFormat(value){
		let v = Number(value)
		return (Number.isNaN(v)) ? "-" : (parseFloat(v*100).toFixed(1));
	},
	moneyFormat(value) {
		let v = Number(num)
		return (Number.isNaN(v)) ? "-" : (parseInt(v/10000));
	},
	isNullTime(value){
		return value==null ? '无限':value;
	},
	isWho(value){
		if(value=='nor-tfrecharge'||value=='nor-recharge'){
			return value = 'recharge';
		}else if(value=='nor-tender'||value=='nor-crtr'||value == 'nor-cancel-tender'){
			return value = 'tender';
		}else if(value=='fee-interest'||value=='fee-crtr'||value == 'fee-withdraw'||value == 'fee-loan'){
			return value = 'fee';
		}else if(value=='rpk-spread'||value=='rpk-newuser'||value == 'rpk-normal' ||value == 'rpk-interest' ||value == 'rpk-investmoney'){
			return value = 'rpk';
		}else if(value=='nor-curprofit'||value=='nor-recvpayment'){
			return value = 'recorded';
		}
		else {
			return value ;
		}
	},
	month(mon){
		if(mon==13){
			return 1;
		}else{
			return mon;
		}
	},
	del2(val){
		//删除前2个字
		if(!!val){
			// return val.substring(2,val.length)
			return val.split('小微')[1]
		}else{
			return val
		}
	},
	discount1(val){
		//折扣保留1位
		if(!!val){
			val=Number(val)
			return (10*(1+val)).toFixed(1);
		}else{
			return val
		}
	},
	planRate(val){
		if(!!val){
			let a = Number(val.split('+')[0].split('%')[0]), b = Number(val.split('+')[1].split('%')[0]);
			return a+b + '%'
		}
	}
}
export default filters;