var VERSION = "20180620", DOMAIN = "http://"+document.domain+"/", NAME = "event20180620",
	rCfg = {
		'sitecommon':{
			'domain':DOMAIN
		}
	};
	rCfg[NAME + "/common"] = {
		'domain':DOMAIN
	}
requirejs.config({
	'urlArgs':"version="+VERSION,
	'paths': {
		'jquery':'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
		'bootstrap':'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min',
		'vue':'https://cdn.bootcss.com/vue/2.5.9/vue.min',
		'ELEMENT':'https://cdn.bootcss.com/element-ui/2.0.7/index',
		'mui':'https://cdn.bootcss.com/mui/3.7.1/js/mui.min',
		'sitecommon':'./sitecommon'
	},
	'shim':{
		"bootstrap":['jquery'],
		"ELEMENT":['vue']
	},
	'config':rCfg
})

function goModule(s,t){
	require([s],function(m){
		m.ready(t);
	});
}

require(['jquery'],function($){
	var type = $("body").data("type");
	switch(type){
		case "web":
			goModule(NAME + "/web",type);
			return;
		default:
			goModule(NAME + "/mobile",type);
			return;
	}
});