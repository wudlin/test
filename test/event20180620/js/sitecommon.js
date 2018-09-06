define(['jquery','require','vue','ELEMENT'],function($,_r){
	var Vue = _r("vue"), eleui = _r("ELEMENT"), cfg = _r("module").config(), 
	_this = {
		getApiUrl:function(str){
			return cfg.domain + str;
		},
		$get:function(str){
			return $('[data-vue="' + str + '"]').get(0)
		},
		getTpl:function(str){
			return $('#vueTpl_'+str).html()
		},
		toVue:function(str, obj){
			$('[data-vue="' + str + '"]').html(_this.getTpl(str));
			return new Vue($.extend({"el":_this.$get(str)}, obj));
		},
		handler:function(e){
			var $t = $(e.currentTarget || e.target),func = $t.data("func")
			//console.log(e)
			switch(func){
				case "calc":
					_this.cvm.calcVisible = true;
					return;
				default:
					console.log(func);
					return;
			}
		},
		ready:function(){
			// 页头的二维码显示
			$("header .dropdown").hover(function(){
				$(this).addClass("open");
			}, function(){
				$(this).removeClass("open");
			})

			$("body").on("click","[data-func]",_this.handler)

			Vue.use(eleui);

			var vm = _this.toVue("aside",{
				name: 'toolsPart',
				data:function(){
				  	return {
				  		"forecastOpend":false,
				  		"calcVisible":false, "calcResultVisible":false,
				  		"calcLoading":false, "calcResult":{},
				  		"calcForm":{
				  			"period":null, "periodType":"month", "repayType":"1",
				  			"account":null,"yearRate":null
				  		}
				  	}
				},
				methods:{
					calcSubmit:function(){
				  		this.calcLoading = true;
				  		var that = this, u = _this.getApiUrl("common/calculate");
				  		$.post(u,this.calcForm,function(json){
				  			//console.log(json);
				  			that.calcLoading = false;
				  			var status = parseInt(json.status);
				  			switch(status){
				  				case 0:
				  					that.calcResult = json.data.result;
				  					that.calcVisible = false;
				  					that.calcResultVisible = true;
				  					return;
				  				default:
				  					that.$message({
							          showClose: true,
							          message: json.info,
							          type: 'error'
							        });
							        return;
				  			}
				  		},"JSON")
				  	},
				  	gotop:function(){
				  		$("body,html").animate({"scrollTop":0},1000)
				  	}
				}
			});

			return _this.cvm = vm;
		}
	}

	return _this;
})