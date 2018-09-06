/*!
 * =====================================================
 * light7 V0.4.3 - http://light7.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){
    
    $.smConfig.rawCitiesData = [{"text":"北京市","value":1,"children":[{"text":"市辖区","value":1},{"text":"北京周边","value":2}]},{"text":"天津市","value":2,"children":[{"text":"市辖区","value":1},{"text":"天津周边","value":2}]},{"text":"河北省","value":3,"children":[{"text":"石家庄市","value":1},{"text":"唐山市","value":2},{"text":"秦皇岛市","value":3},{"text":"邯郸市","value":4},{"text":"邢台市","value":5},{"text":"保定市","value":6},{"text":"张家口市","value":7},{"text":"承德市","value":8},{"text":"沧州市","value":9},{"text":"廊坊市","value":10},{"text":"衡水市","value":11}]},{"text":"山西省","value":4,"children":[{"text":"太原市","value":1},{"text":"大同市","value":2},{"text":"阳泉市","value":3},{"text":"长治市","value":4},{"text":"晋城市","value":5},{"text":"朔州市","value":6},{"text":"晋中市","value":7},{"text":"运城市","value":8},{"text":"忻州市","value":9},{"text":"临汾市","value":10},{"text":"吕梁市","value":11}]},{"text":"内蒙古自治区","value":5,"children":[{"text":"呼和浩特市","value":1},{"text":"包头市","value":2},{"text":"乌海市","value":3},{"text":"赤峰市","value":4},{"text":"通辽市","value":5},{"text":"鄂尔多斯市","value":6},{"text":"呼伦贝尔市","value":7},{"text":"巴彦淖尔市","value":8},{"text":"乌兰察布市","value":9},{"text":"兴安盟","value":10},{"text":"锡林郭勒盟","value":11},{"text":"阿拉善盟","value":12}]},{"text":"辽宁省","value":6,"children":[{"text":"沈阳市","value":1},{"text":"大连市","value":2},{"text":"鞍山市","value":3},{"text":"抚顺市","value":4},{"text":"本溪市","value":5},{"text":"丹东市","value":6},{"text":"锦州市","value":7},{"text":"营口市","value":8},{"text":"阜新市","value":9},{"text":"辽阳市","value":10},{"text":"盘锦市","value":11},{"text":"铁岭市","value":12},{"text":"朝阳市","value":13},{"text":"葫芦岛市","value":14}]},{"text":"吉林省","value":7,"children":[{"text":"长春市","value":1},{"text":"吉林市","value":2},{"text":"四平市","value":3},{"text":"辽源市","value":4},{"text":"通化市","value":5},{"text":"白山市","value":6},{"text":"松原市","value":7},{"text":"白城市","value":8},{"text":"延边朝鲜族自治州","value":9}]},{"text":"黑龙江省","value":8,"children":[{"text":"哈尔滨市","value":1},{"text":"齐齐哈尔市","value":2},{"text":"鸡西市","value":3},{"text":"鹤岗市","value":4},{"text":"双鸭山市","value":5},{"text":"大庆市","value":6},{"text":"伊春市","value":7},{"text":"佳木斯市","value":8},{"text":"七台河市","value":9},{"text":"牡丹江市","value":10},{"text":"黑河市","value":11},{"text":"绥化市","value":12},{"text":"大兴安岭地区","value":13}]},{"text":"上海市","value":9,"children":[{"text":"市辖区","value":1},{"text":"上海周边","value":2}]},{"text":"江苏省","value":10,"children":[{"text":"南京市","value":1},{"text":"无锡市","value":2},{"text":"徐州市","value":3},{"text":"常州市","value":4},{"text":"苏州市","value":5},{"text":"南通市","value":6},{"text":"连云港市","value":7},{"text":"淮安市","value":8},{"text":"盐城市","value":9},{"text":"扬州市","value":10},{"text":"镇江市","value":11},{"text":"泰州市","value":12},{"text":"宿迁市","value":13}]},{"text":"浙江省","value":11,"children":[{"text":"杭州市","value":1},{"text":"宁波市","value":2},{"text":"温州市","value":3},{"text":"嘉兴市","value":4},{"text":"湖州市","value":5},{"text":"绍兴市","value":6},{"text":"金华市","value":7},{"text":"衢州市","value":8},{"text":"舟山市","value":9},{"text":"台州市","value":10},{"text":"丽水市","value":11}]},{"text":"安徽省","value":12,"children":[{"text":"合肥市","value":1},{"text":"芜湖市","value":2},{"text":"蚌埠市","value":3},{"text":"淮南市","value":4},{"text":"马鞍山市","value":5},{"text":"淮北市","value":6},{"text":"铜陵市","value":7},{"text":"安庆市","value":8},{"text":"黄山市","value":9},{"text":"滁州市","value":10},{"text":"阜阳市","value":11},{"text":"宿州市","value":12},{"text":"巢湖市","value":13},{"text":"六安市","value":14},{"text":"亳州市","value":15},{"text":"池州市","value":16},{"text":"宣城市","value":17}]},{"text":"福建省","value":13,"children":[{"text":"福州市","value":1},{"text":"厦门市","value":2},{"text":"莆田市","value":3},{"text":"三明市","value":4},{"text":"泉州市","value":5},{"text":"漳州市","value":6},{"text":"南平市","value":7},{"text":"龙岩市","value":8},{"text":"宁德市","value":9}]},{"text":"江西省","value":14,"children":[{"text":"南昌市","value":1},{"text":"景德镇市","value":2},{"text":"萍乡市","value":3},{"text":"九江市","value":4},{"text":"新余市","value":5},{"text":"鹰潭市","value":6},{"text":"赣州市","value":7},{"text":"吉安市","value":8},{"text":"宜春市","value":9},{"text":"抚州市","value":10},{"text":"上饶市","value":11}]},{"text":"山东省","value":15,"children":[{"text":"济南市","value":1},{"text":"青岛市","value":2},{"text":"淄博市","value":3},{"text":"枣庄市","value":4},{"text":"东营市","value":5},{"text":"烟台市","value":6},{"text":"潍坊市","value":7},{"text":"济宁市","value":8},{"text":"泰安市","value":9},{"text":"威海市","value":10},{"text":"日照市","value":11},{"text":"莱芜市","value":12},{"text":"临沂市","value":13},{"text":"德州市","value":14},{"text":"聊城市","value":15},{"text":"滨州市","value":16},{"text":"菏泽市","value":17}]},{"text":"河南省","value":16,"children":[{"text":"郑州市","value":1},{"text":"开封市","value":2},{"text":"洛阳市","value":3},{"text":"平顶山市","value":4},{"text":"安阳市","value":5},{"text":"鹤壁市","value":6},{"text":"新乡市","value":7},{"text":"焦作市","value":8},{"text":"濮阳市","value":9},{"text":"许昌市","value":10},{"text":"漯河市","value":11},{"text":"三门峡市","value":12},{"text":"南阳市","value":13},{"text":"商丘市","value":14},{"text":"信阳市","value":15},{"text":"周口市","value":16},{"text":"驻马店市","value":17}]},{"text":"湖北省","value":17,"children":[{"text":"武汉市","value":1},{"text":"黄石市","value":2},{"text":"十堰市","value":3},{"text":"宜昌市","value":4},{"text":"襄樊市","value":5},{"text":"鄂州市","value":6},{"text":"荆门市","value":7},{"text":"孝感市","value":8},{"text":"荆州市","value":9},{"text":"黄冈市","value":10},{"text":"咸宁市","value":11},{"text":"随州市","value":12},{"text":"恩施土家族苗族自治州","value":13},{"text":"仙桃市","value":14},{"text":"神农架","value":4213},{"text":"天门","value":4214}]},{"text":"湖南省","value":18,"children":[{"text":"长沙市","value":1},{"text":"株洲市","value":2},{"text":"湘潭市","value":3},{"text":"衡阳市","value":4},{"text":"邵阳市","value":5},{"text":"岳阳市","value":6},{"text":"常德市","value":7},{"text":"张家界市","value":8},{"text":"益阳市","value":9},{"text":"郴州市","value":10},{"text":"永州市","value":11},{"text":"怀化市","value":12},{"text":"娄底市","value":13},{"text":"湘西土家族苗族自治州","value":14}]},{"text":"广东省","value":19,"children":[{"text":"广州市","value":1},{"text":"韶关市","value":2},{"text":"深圳市","value":3},{"text":"珠海市","value":4},{"text":"汕头市","value":5},{"text":"佛山市","value":6},{"text":"江门市","value":7},{"text":"湛江市","value":8},{"text":"茂名市","value":9},{"text":"肇庆市","value":10},{"text":"惠州市","value":11},{"text":"梅州市","value":12},{"text":"汕尾市","value":13},{"text":"河源市","value":14},{"text":"阳江市","value":15},{"text":"清远市","value":16},{"text":"东莞市","value":17},{"text":"中山市","value":18},{"text":"潮州市","value":19},{"text":"揭阳市","value":20},{"text":"云浮市","value":21}]},{"text":"广西壮族自治区","value":20,"children":[{"text":"南宁市","value":1},{"text":"柳州市","value":2},{"text":"桂林市","value":3},{"text":"梧州市","value":4},{"text":"北海市","value":5},{"text":"防城港市","value":6},{"text":"钦州市","value":7},{"text":"贵港市","value":8},{"text":"玉林市","value":9},{"text":"百色市","value":10},{"text":"贺州市","value":11},{"text":"河池市","value":12},{"text":"来宾市","value":13},{"text":"崇左市","value":14}]},{"text":"海南省","value":21,"children":[{"text":"海口","value":4601},{"text":"三亚","value":4602},{"text":"白沙","value":4603},{"text":"昌江","value":4605},{"text":"儋州","value":4607},{"text":"东方","value":4609},{"text":"临高","value":4611},{"text":"琼海","value":4613},{"text":"屯昌","value":4615},{"text":"文昌","value":4617},{"text":"洋浦","value":4619},{"text":"保亭","value":4604},{"text":"澄迈","value":4606},{"text":"定安","value":4608},{"text":"乐东","value":4610},{"text":"陵水","value":4612},{"text":"琼中","value":4614},{"text":"万宁","value":4616},{"text":"五指山","value":4618}]},{"text":"重庆市","value":22,"children":[{"text":"市辖区","value":1},{"text":"重庆周边","value":2},{"text":"市","value":3}]},{"text":"四川省","value":23,"children":[{"text":"成都市","value":1},{"text":"自贡市","value":2},{"text":"攀枝花市","value":3},{"text":"泸州市","value":4},{"text":"德阳市","value":5},{"text":"绵阳市","value":6},{"text":"广元市","value":7},{"text":"遂宁市","value":8},{"text":"内江市","value":9},{"text":"乐山市","value":10},{"text":"南充市","value":11},{"text":"眉山市","value":12},{"text":"宜宾市","value":13},{"text":"广安市","value":14},{"text":"达州市","value":15},{"text":"雅安市","value":16},{"text":"巴中市","value":17},{"text":"资阳市","value":18},{"text":"阿坝藏族羌族自治州","value":19},{"text":"甘孜藏族自治州","value":20},{"text":"凉山彝族自治州","value":21}]},{"text":"贵州省","value":24,"children":[{"text":"贵阳市","value":1},{"text":"六盘水市","value":2},{"text":"遵义市","value":3},{"text":"安顺市","value":4},{"text":"铜仁地区","value":5},{"text":"黔西南布依族苗族自治州","value":6},{"text":"毕节地区","value":7},{"text":"黔东南苗族侗族自治州","value":8},{"text":"黔南布依族苗族自治州","value":9}]},{"text":"云南省","value":25,"children":[{"text":"昆明市","value":1},{"text":"曲靖市","value":2},{"text":"玉溪市","value":3},{"text":"保山市","value":4},{"text":"昭通市","value":5},{"text":"丽江市","value":6},{"text":"思茅市","value":7},{"text":"临沧市","value":8},{"text":"楚雄彝族自治州","value":9},{"text":"红河哈尼族彝族自治州","value":10},{"text":"文山壮族苗族自治州","value":11},{"text":"西双版纳傣族自治州","value":12},{"text":"大理白族自治州","value":13},{"text":"德宏傣族景颇族自治州","value":14},{"text":"怒江傈僳族自治州","value":15},{"text":"迪庆藏族自治州","value":16}]},{"text":"西藏自治区","value":26,"children":[{"text":"拉萨市","value":1},{"text":"昌都地区","value":2},{"text":"山南地区","value":3},{"text":"日喀则地区","value":4},{"text":"那曲地区","value":5},{"text":"阿里地区","value":6},{"text":"林芝地区","value":7}]},{"text":"陕西省","value":27,"children":[{"text":"西安市","value":1},{"text":"铜川市","value":2},{"text":"宝鸡市","value":3},{"text":"咸阳市","value":4},{"text":"渭南市","value":5},{"text":"延安市","value":6},{"text":"汉中市","value":7},{"text":"榆林市","value":8},{"text":"安康市","value":9},{"text":"商洛市","value":10}]},{"text":"甘肃省","value":28,"children":[{"text":"兰州市","value":1},{"text":"嘉峪关市","value":2},{"text":"金昌市","value":3},{"text":"白银市","value":4},{"text":"天水市","value":5},{"text":"武威市","value":6},{"text":"张掖市","value":7},{"text":"平凉市","value":8},{"text":"酒泉市","value":9},{"text":"庆阳市","value":10},{"text":"定西市","value":11},{"text":"陇南市","value":12},{"text":"临夏回族自治州","value":13},{"text":"甘南藏族自治州","value":14}]},{"text":"青海省","value":29,"children":[{"text":"西宁市","value":1},{"text":"海东地区","value":2},{"text":"海北藏族自治州","value":3},{"text":"黄南藏族自治州","value":4},{"text":"海南藏族自治州","value":5},{"text":"果洛藏族自治州","value":6},{"text":"玉树藏族自治州","value":7},{"text":"海西蒙古族藏族自治州","value":8}]},{"text":"宁夏回族自治区","value":30,"children":[{"text":"银川市","value":1},{"text":"石嘴山市","value":2},{"text":"吴忠市","value":3},{"text":"固原市","value":4},{"text":"中卫市","value":5}]},{"text":"新疆","value":65,"children":[{"text":"乌鲁木齐","value":6501},{"text":"阿克苏","value":6502},{"text":"阿勒泰","value":6503},{"text":"巴州","value":6504},{"text":"博州","value":6505},{"text":"昌吉","value":6506},{"text":"哈密","value":6507},{"text":"和田","value":6508},{"text":"喀什","value":6509},{"text":"克拉玛依","value":6510},{"text":"马兰","value":6511},{"text":"石河子","value":6512},{"text":"塔城","value":6513},{"text":"吐鲁番","value":6514},{"text":"伊犁","value":6515},{"text":"克州","value":6516},{"text":"阿拉尔","value":6517},{"text":"五家渠","value":6518},{"text":"昌吉","value":6519},{"text":"博尔塔拉","value":6520},{"text":"巴音郭楞","value":6521},{"text":"克孜勒苏柯尔克孜","value":6522}]},{"text":"台湾省","value":32,"children":[]},{"text":"香港特别行政区","value":33,"children":[]},{"text":"澳门特别行政区","value":34,"children":[]}];
    
    }($);
    // jshint ignore: end
    
    /* global $:true */
    /* jshint unused:false*/
    
    + function($) {
      "use strict";
      
      $.fn.cityPicker = function(params) {
        return this.each(function() {
          if(!this) return;
          var format = function(data) {
            var v = [], d = [];
            for(var i=0;i<data.length;i++) {
              var item = data[i];
              v.push(item.value);
              d.push(item.text);
            }
            if(v.length && d.length && v.length == d.length) return {v,d};
            return {v:[],d:[]};
          };
    
          var sub = function(data) {
            //console.log(data)
            return format(data.children);
          };
    
          var getCities = function(d) {
            //console.log(d)
            for(var i=0;i< raw.length;i++) {
              if(raw[i].value == d) return sub(raw[i]);
            }
            return {v:[],d:[]};
          };
    
          var raw = $.smConfig.rawCitiesData;
          var provinces = format(raw)
          var initCities = sub(raw[0]);
    
          var currentProvince = provinces.v[0];
          var currentCity = initCities.v[0];
    
          var defaults = {
    
            cssClass: "city-picker",
            rotateEffect: false,  //为了性能
    
            formatValue: function (picker, values, displayValues) {
                $(picker.input).data("val",values)
                return displayValues.join(" ")
            },
    
            onChange: function (picker, values, displayValues) {
              var newProvince = values[0];
              var newCity;
              if(newProvince != currentProvince) {
                var newCities = getCities(newProvince);
                //console.log(newCities)
                newCity = newCities.v[0];
                picker.cols[1].replaceValues(newCities.v,newCities.d);
                currentProvince = newProvince;
                currentCity = newCity;
                picker.updateValue();
                return;
              }
              newCity = picker.cols[1].value;
              if(newCity != currentCity) {
                currentCity = newCity;
                picker.updateValue();
              }
            },
    
            cols: [
              {
                values: provinces.v,
                displayValues: provinces.d,
                cssClass: "col-province"
              },
              {
                values: initCities.v,
                displayValues: initCities.d,
                cssClass: "col-city"
              }
            ]
          };
    
          var p = $.extend(defaults, params);
          //计算value
          var val = $(this).data("val");
          if(val) {
            p.value = val.split();
            if(p.value[0]) {
              currentProvince = p.value[0];
              p.cols[1].values = getCities(p.value[0]);
            }
            if(p.value[1]) {
              currentCity = p.value[1];
            }
          }
          $(this).picker(p);
        });
      };
    
    }($);
    