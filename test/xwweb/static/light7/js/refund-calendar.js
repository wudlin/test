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
$('#select-cale').text(now)
$("#calendar").calendar({
    value: [now],
    onDayClick:function(p, dayContainer, year, month, day){
        console.log(p);
        console.log(dayContainer);
        console.log(year);
        console.log(month);
        console.log(day)
        month = Number(month) + 1
        month = month < 10 ? '0' + month :  month;
        day = day < 10 ? '0' + day :  day;
        var getCalendar = year + '-' + month + '-' + day;
        console.log(getCalendar)
        $('#select-cale').text(getCalendar)
    }
});

$.init()
$('.swiper-container').swiper({
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    onlyExternal : true,//禁止滑动，只能通过点击
    simulateTouch : false,
    slideToClickedSlide:false,
    noSwiping : true,
})