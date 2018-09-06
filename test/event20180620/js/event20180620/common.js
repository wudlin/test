define(['jquery','require','vue'],function($,_r){
	var Vue = _r("vue"), cfg = _r("module").config(), 
	_this = {
		"giftList":[{s:"0",v:"50000"},{s:"1",v:"100000"},{s:"2",v:"200000"},{s:"3",v:"300000"},{s:"4",v:"400000"},{s:"5",v:"500000"}],
		"type":"",//当前剩余积分
		"getApiUrl":function(str){
			//console.log(cfg)
			return cfg.domain + str;
		},
		"toVue":function(n,o){
			var $n = $('[data-vue="' + n + '"]').get(0);
			return new Vue($.extend({"el":$n}, o))
		},
		"getInfo":function(){
			var _d = $.Deferred(), 
				// u = _this.getApiUrl("activity/integralactivity?m=getUserInfo");
				u = "js/test/info.json"

			$.get(u,function(json){
				var status = parseInt(json.status)
				if(status == 000000){
					_d.resolve(json)
				}else{
					_d.reject(json)
				}
			},"JSON")
			return _d.promise();
		},
		"getexchange":function(v){
			var _d = $.Deferred(), 
				// u = _this.getApiUrl("activity/integralactivity?m=exchange&type="+parseInt(v));
				u = "js/test/exchange.json";
			$.get(u,function(json){
				var status = parseInt(json.status)
				if(status == 000000){
					_d.resolve(json)
				}else{
					_this.alert(json.info);
					_d.reject(json)
				}
			},"JSON")
			return _d.promise();
		},
		"hashLogin":function(hash){
			var u = _this.getApiUrl("common/loginByHash"), _d = $.Deferred();

			$.post(u,{"hash":hash},function(json){
				var status = json.status
				if(status == "000000"){
					_d.resolve(json)
				}else{
					_d.reject(json)
				}
			},"JSON")
			return _d.promise();
		},
		"getLogin":function(d){
			var u = _this.getApiUrl("common/login"), _d = $.Deferred();

			$.post(u,d,function(json){
				var status = json.status
				if(status == "000000"){
					_d.resolve(json)
				}else{
					_d.reject(json)
				}
			},"JSON")
			return _d.promise();
		},
		"getCode":function(phone){
			var u = _this.getApiUrl("common/sms"), _d = $.Deferred();

			$.post(u,{"phone":phone,"msgType":"login"},function(json){
				var status = json.status
				if(status == "000000"){
					_d.resolve(json)
				}else{
					_d.reject(json)
				}
			},"JSON")
			return _d.promise();
		},
		"slicemoney"(v){
			v = v.toString()
			if(v!=0){
				v=parseFloat(v).toLocaleString()
				return v;
			}else{
				return v;
			}
		}
	}
	return _this;
})