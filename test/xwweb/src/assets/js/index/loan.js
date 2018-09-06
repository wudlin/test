var cityData3 = []
$.getJSON('../../dist/data.json',function(res){
	cityData3 = res
	console.log(cityData3)
})

// $("#picker").cityPicker({
// 	toolbarTemplate: `<header class="bar bar-nav">
// 	<button class="button button-link pull-right close-picker">确定</button>
// 	<h1 class="title">选择居住地</h1>
// 	</header>`,
// 	inputReadOnly:true
// });
//$("#picker").cityPicker({});