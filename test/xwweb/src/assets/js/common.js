	var status = 1
	var _this = {
		isNull(val){
			return "" === val || null === val || undefined === val || ("number" !== typeof(val)?$.isEmptyObject(val) : false)
		},
		getArtPage(filename,tpldata){
			var dfd =  $.Deferred();
			$.get(filename,function(data){
				try{
					dfd.resolve(_this.dealTpl(tpldata,data))
				}catch(e){
					dfd.reject(e)
				}
				
			})
			return dfd.promise()
		},
		dealTpl(data,tpl){
			var render = template.compile(tpl);
			var htmlStr = render(data);
			return htmlStr
		},
		
		
		cfg(obj){
			return $.extend(_this,obj)
		},
		getCurrentTime(){
			function p(s) {
			    return s < 10 ? '0' + s: s;
			}
			var myDate = new Date();
			//获取当前年
			var year=myDate.getFullYear();
			//获取当前月
			var month=myDate.getMonth()+1;
			//获取当前日
			var date=myDate.getDate(); 
			var now=year+'-'+p(month)+"-"+p(date);
			return now;
		}
	}
	$.fn.parseForm=function(){
        var serializeObj={};
        var array=this.serializeArray();
        //[{name:xx,value:xx},{name:xx,value:xx}]
        //var str=this.serialize();
        console.log(array)
        $(array).each(function(){
//      	console.log(this)
            if(serializeObj[this.name]){
                if($.isArray(serializeObj[this.name])){
                    serializeObj[this.name].push(this.value);
                }else{
                    serializeObj[this.name]=[serializeObj[this.name],this.value];
                }
            }else{
                serializeObj[this.name]=this.value; 
            }
        });
        return serializeObj;
    };
	//new Date().format("yyyy-MM-dd")
	Date.prototype.format = function (format) {
	    var o = {
	        "M+": this.getMonth() + 1, //month
	        "d+": this.getDate(),    //day
	        "h+": this.getHours(),   //hour
	        "H+": this.getHours(),   //hour
	        "m+": this.getMinutes(), //minute
	        "s+": this.getSeconds(), //second
	        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
	        "S": this.getMilliseconds() //millisecond
	    };
	    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
	    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) if (new RegExp("(" + k + ")").test(format))
	        format = format.replace(RegExp.$1,
	        RegExp.$1.length == 1 ? o[k] :
	        ("00" + o[k]).substr(("" + o[k]).length));
	    return format;
	};
	window['xwsd'] = _this.cfg

