(function(window) {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        //IE兼容
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        
        // alert(window.navigator)
        // alert(theUA.indexOf('trident/'));
        // alert(theUA.slice(theUA.indexOf('trident/')+8,theUA.indexOf('trident/')+9));
        if (ieVersion <= 9 ) {
            if(theUA.indexOf('trident/')!=-1  &&  theUA.slice(theUA.indexOf('trident/')+8,theUA.indexOf('trident/')+9)>6){
                
            }else{
                document.execCommand("Stop");
                window.location.href='isOutBrower.html';
            }
 
        }else{
            console.log(ieVersion);
        }
    }
    }else{
        //360兼容
        if(window.navigator.userAgent.indexOf('compatible') != -1){
            document.execCommand("Stop");
            window.location.href='isOutBrower.html';
        }
         //   QQ浏览器兼容
         var islow = window.navigator.userAgent.indexOf('QQBrowser/');
         if(islow!==-1){
         if(window.navigator.userAgent.slice (islow+10,islow+12).indexOf('.')==-1) {
            
           if(window.navigator.userAgent.slice (islow+10,islow+12)<10){
               document.execCommand("Stop");
               window.location.href='isOutBrower.html'
             }
         } else{
           if(window.navigator.userAgent.slice (islow+10,islow+11)<10){
               document.execCommand("Stop");
               window.location.href='isOutBrower.html'
             }
         }
           
         }
    }  
})(window);