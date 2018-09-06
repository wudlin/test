+function($){
    window.onbeforeunload = function(){
        $.ajax({
            url:'/xwweb/logout',
            type:'POST',
            success:function(msg){ 
                console.log(msg) 
              }, 
            error:function(e){ 
            //     console.log(e.stack) 
             }
        })
    } 
}($);