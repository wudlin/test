define(['jquery','require', './common','sitecommon'],function($,_r,_c){
	var Vue = _r("vue"), sc = _r('sitecommon'), TITLE = "夏季大回馈 积分Fun开花", 
	_this = {
		
		"ready":function(t){
			//console.log("ok "+t)

			sc.ready();
			
			_this.init();
		},
		"init":function(){
			// 检测登录
			//*
			_c.getInfo().then(function(json){
				//console.log(json)
				_this.writePage(json);
				// _c.getOddInfo().then(function(jon){
				// 	// _this.writeGiftArea(jon);
				// },function(json){
				// 	console.log(json)
				// 	// _this.writeGiftArea(false);
					
				// })
			},function(json){
				console.log(json)
				_this.writePage(false);
				// _this.writeGiftArea(false);
			})
			// */
		},
		"userData":{
			"isLogin":false,
			"type":_c.type,//选择积分
			"integral":"",//当前剩余积分
			"conversionw":false,//确认积分弹窗显示
			"username":"读取用户名",
			"giftList":_c.giftList,//积分列表
			"slicemoney":_c.slicemoney,//分割金额
			"getApiUrl":_c.getApiUrl,
			// "getexchange":_c.getexchange//提交兑换
		},
		"conversions":function(v,i){
			//弹出选择兑换窗口
			if(_this.userData["isLogin"]==false){
				_this.alert("请登入");
				return;
			}else{
				// console.log(v)
				_this.showconversionWin(v,i)
			}
		},
		"writePage":function(ud){
			if(!ud){
				// 未登录
				_this.userData["isLogin"] = false;
			} else if(!ud.data.username ) {
				_this.userData["isLogin"] = false;
			}
			else {
				var data = ud.data;
				_this.userData["isLogin"] = true;
				_this.userData["integral"] = data.integral|0;
				_this.userData["username"] = data.username;
				// _this.userData["type"] = data.phone;
			}
			// if(_this.vm_gift){
			// 不刷新
			// 	_this.userData["integral"] = data.integral|0;
			// 	return;				
			// }
			// 首页			
			_this.vm_gift = _c.toVue("userArea", {
				"name":"userArea",
				"mounted":function(){
					$(this.$el).removeClass("hidden");
				},
				"methods":{
					"showLogin":function(){
						_this.showLoginBox();
					},
					"conversion":function(v,i){
						_this.conversions(v,i)
					}
				},
				"data":function(){
					return _this.userData;
				}
			})
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
			//console.log("hi")
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
							// _this.showMsgBox("快去领取您的投资奖励吧！","login")
						},function(json){
							_this.alert(json.info);
						});
					},
					"sendCode":function(){
						//console.log("send")
						var that = this
						_c.getCode(that.form.username).then(function(){
							sc.cvm.$message('短信已发送');
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
						"form":{"username":"","password":"","smsCode":""},
						"second":0
					};
				}
			})
		},
		"alert":function(msg){
			// sc.cvm.$alert(msg,TITLE);
			sc.cvm.$alert(msg,"提示");
		}
	}

	return _this;
})