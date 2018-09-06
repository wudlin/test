$.config = {router: false}
$(document).on("pageInit", "#index", function(e, id, $page) {

	$(".information .swiper-container").swiper({
		// 初始显示第几张图片
		initialSlide: 0,
		//几毫秒滑动一次
		speed: 3000,
		//两张轮播图的间隔像素
//				spaceBetween: 2,
		// 循环轮播
		loop: true,
		// 自动播放
		autoplay: true,
		// 手动滑动后可继续轮播
		autoplayDisableOnInteraction : false,
		direction: 'vertical',
		effect : 'cube',//'coverflow 3d流'、'cube'、'slide默认'
//		onTouchStart: function(swiper,even){
//	        swiper.unlockSwipeToPrev();
//	        swiper.unlockSwipeToNext();
//	        if(swiper.isEnd){
//	            swiper.lockSwipeToNext();
//	        }
//	        else if(swiper.activeIndex==0){
//	            swiper.lockSwipeToPrev();
//	        }
//	    }
	});
});
$(document).on("pageInit", "#projects", function(e, id, $page) {
	$.config = {router: false}
	console.log(e)
	console.log(id)
	console.log($page)
	$.init()
	function selectItem(who){
		$(who).on('click',function(){
			$(who).removeClass('select')
			$(this).toggleClass('select')
		})
	}
	$('.buttons-tab a').on('click',function(){
		var index = $(this).index();
		console.log(index)
//		$('#projects .bor .selectBtn').toggleClass('dark')
		if(index == 0){
			$('#projects .bor .selectBtn').removeClass('dark')

		}else{
			$('#projects .bor .selectBtn').removeClass('down')
			$('#projects .bor .selectBtn').addClass('dark')
			$('#selectItem,#screen').hide();
			$('#screen').hide();
			$('header .sure').text('')
			$('header .sure').addClass('xwsd-menu')
		}
	})
	
	$('#projects .bor .selectBtn').on('click',function(){
		if($('.buttons-tab a').eq(0).hasClass('active')){
			$(this).toggleClass('down')
			$('#selectItem,#screen').toggle()
			$('header .sure').toggleClass('xwsd-menu')
			if(!$('header .sure').hasClass('xwsd-menu')){
				$('header .sure').text('确认')
			}else{
				$('header .sure').text('')
			}
		}
	})
	
	selectItem('#selectItem .borrowType dd')
	selectItem('#selectItem .borrowM dd')
	selectItem('#selectItem .borrowTime dd')
})

$(document).on("pageInit", "#me", function(e, id, $page) {
	console.log('meme')
});
