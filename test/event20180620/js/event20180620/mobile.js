define(['jquery','require', './common','mui'],function($,_r,_c){
	var mui = window.mui, TITLE = "夏季大回馈 积分Fun开花", 
	_this = {
		"isApp":false,
		"ready":function(t){
			// APP版本自动登录
			//console.log("go")
			_this.appLogin().then(function(){
				_this.isApp = true;
				_this.init()
			},function(json){
				//console.log("hi",json);
				
				if(json.status == -999){
					_this.init()
				}else{
					_this.alert(json.info || json.msg)
				}
			})
		},
		"init":function(){
			// 检测登录
			//*
			_c.getInfo().then(function(json){
				_this.writeLoginArea(json);
				_this.writePage(json);
				// _c.getOddInfo().then(function(jon){
				// },function(json){
				// 	console.log(json)
					
				// })
			},function(json){
				_this.writePage(false);
				_this.writeLoginArea(false);
			})
			// */
		},
		"loginData":{
			"isLogin":false, 
			"phone":"",
			"username":"读取用户名",
			"integral":"",//当前剩余积分
			"slicemoney":_c.slicemoney,//分割金额
		},
		"userData":{
			"conversionw":false,//确认积分弹窗显示
			"giftList":_c.giftList,//积分列表
			"slicemoney":_c.slicemoney,//分割金额
			"getApiUrl":_c.getApiUrl,
			"type":_c.type,//选择积分
			"isLogin":false,
			"integral":"",//当前剩余积分
			// "getexchange":_c.getexchange//提交兑换
		},
		"giftData":{
			"count":0,
			"canGet":false,
			"leftCount":0,
			"leftMoney":0
		},
		"conversions":function(v,i){
			//弹出选择兑换窗口
			if(_this.userData["isLogin"]==false){
				_this.alert("请登入");
				return;
			}else{
				_this.showconversionWin(v,i)
			}
		},
		"writeLoginArea":function(ud){
			if(!ud){
				_this.loginData["isLogin"] = false;
			} else if(!ud.data.username) {
				_this.loginData["isLogin"] = false;
			} else {
				_this.loginData["isLogin"] = true;
				_this.loginData["username"] = ud.data.username;
				// 获取积分
				_this.loginData["integral"] = ud.data.integral;
			}

			// 登录区域
			_this.vm_login = _c.toVue("loginArea", {
				"name":"loginArea",
				"mounted":function(){
					$(this.$el).removeClass("hidden");
				},
				"methods":{
					"showLogin":function(){
						_this.showLoginBox();
					}
				},
				"data":function(){
					return _this.loginData;
				}
			})
		},
		"writePage":function(ud){
			if(!ud){
				// 未登录
				_this.userData["isLogin"] = false;
			} else if(!ud.data.username) {
				_this.userData["isLogin"] = false;
			}
			else {
				var data = ud.data;
				_this.userData["integral"] = ud.data.integral;
				_this.userData["isLogin"] = true;
			}

			// 首页			
			_this.vm_gift = _c.toVue("userArea", {
				"name":"userArea",
				"mounted":function(){
					$(this.$el).removeClass("hidden");
				},
				"methods":{
					"conversion":function(v,i){
						_this.conversions(v,i)
					}
				},
				"data":function(){
					return _this.userData;
				}
			})
		},
		"getGift":function(t){
			if(!_this.userData["isLogin"]){
				_this.alert("请先登录！");
				return;
			}
			//*
			// _c.getReward().then(function(json){
			// 	console.log(json)
			// 	// _this.showMsgBox(json.info,"ok");
			// 	//_this.alert(json.info);
				
			// },function(json){
			// 	_this.alert(json.info);
			// })
			// */
		},
		"countStart":function(vm,val){
			if(_this.timer){
				clearInterval(_this.timer);
			}
			vm.second = val;
			_this.timer = setInterval(function(){
				if(--vm.second < 1){
					clearInterval(_this.timer);
				}
			},1000)
		},
		"showconversionWin":function(v,i){
			// console.log(v)//选择积分
			// console.log(_this.userData.integral)//剩余积分
			if(~~v>~~_this.userData.integral){
				_this.alert("积分不足");
				return;
			}
			// 是否兑换
			if(_this.vm_conversionWin){
				var vm = _this.vm_conversionWin;
				vm.$set(vm,'i',i)
				vm.$set(vm,'conversionw',_this.userData.conversionw)
				$(vm.$el).removeClass('hidden');
				return ;
			}
			_this.vm_conversionWin = _c.toVue("conversionWin",{
				"name":"conversionWin",
				"mounted":function(){
					$(this.$el).removeClass("hidden");
					this.conversionw =_this.userData.conversionw
				},
				"methods":{
					"close":function(){
						$(this.$el).addClass("hidden");
						_this.userData.type = ""
						// console.log("选择积分："+_this.userData.type)
					},
					"affirm":function(){
						_this.userData.type = this.i;
						// _this.userData.getexchange(this.v)
						let _t = this
						_c.getexchange(_this.userData.type|this.i).then(function(json){
							//显示提交成功
							if(json.status=="000000")_this.userData.conversionw = _t.conversionw = true;
						},function(json){
							_this.alert(json.msg)
						})	
						// console.log("选择积分："+_this.userData.type)
					},
					"affirm_off":function(){
						$(this.$el).addClass("hidden");
						this.conversionw = false
						location.reload();
						// location.href="https://www.xwsd.com/plans";
						//重新获取积分
					}
				},
				"data":function(){
					return {"v":v,"i":i,"conversionw":false};
				}
			})
		},
		"showLoginBox":function(){
			if(_this.vm_loginWin){
				var vm = _this.vm_loginWin;
				$(vm.$el).removeClass("hidden");
				return;
			}
			_this.vm_loginWin = _c.toVue("loginWin", {
				"name":"loginWin",
				"mounted":function(){
					$(this.$el).removeClass("hidden");
				},
				"methods":{
					"submit":function(){
						//console.log(this.form)
						_c.getLogin(this.form).then(function(){
							location.reload();
						},function(json){
							_this.alert(json.info);
						});
					},
					"sendCode":function(){
						//console.log("send")
						var that = this
						_c.getCode(that.form.username).then(function(){
							mui.toast('短信已发送');
							_this.countStart(that,60)
						},function(json){
							_this.alert(json.info);
						});
					},
					"close":function(){
						$(this.$el).addClass("hidden");
						//this.$destroy();
					}
				},
				"data":function(){
					return {
						"second":0, 
						"form":{"username":"","password":"","smsCode":""}
					};
				}
			})
		},
		
		"checkApp":function(){
			var u = navigator.userAgent, ret = {}
			if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
				ret["android"] = true
			}else if(u.indexOf('iPhone') > -1){
				ret["ios"] = true
			}

			ret["app"] = (!!_this.mobiHash)

			return ret;

		},
		"getMobiHash":function(){

			var c = _this.checkApp(), _d = $.Deferred();

			window.sendHash = function(hash) {
				_d.resolve( hash );
			}

			//console.log(c)

			try{
				if(c.android){
					android.getLoginHash()
				} else if(c.ios){
					window.webkit.messageHandlers.getLogin.postMessage("")
				} else {
					_d.reject( { "info":"当前APP版本暂不支持本活动，请升级到最新版本！", "status":-999 } )
				}
			}catch(e){
				console.log(e);
				_d.reject( { "info":"当前APP版本暂不支持本活动，请升级到最新版本！", "status":-999 } )
			}

			return _d.promise();
			
		},
		"appLogin":function(){
			var _d = $.Deferred();
			//console.log("aaa")
			_this.getMobiHash().then(function(hash){
				//console.log("bbb")
				_c.hashLogin(hash).then(function(obj){
					//console.log("ccc")
					_d.resolve(obj);
				},function(ij){_d.reject(ij)})
			},function(j){_d.reject(j)})

			return _d.promise();
		},
		"gotoAppIndex":function(){
			var c = _this.checkApp();
			try{
				if(c.android){
					android.toHome("")
				}else if(c.ios){
					window.webkit.messageHandlers.toHome.postMessage("")
				}
			}catch(e){
				console.log(e)
				_this.alert("您使用的App版本暂不支持此操作！")
			}
		},
		"alert":function(msg){
			// mui.alert(msg,TITLE);
			mui.alert(msg,"提示");
		}
	}

	return _this;
})