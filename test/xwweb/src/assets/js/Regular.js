var reg = {
	regEmail(email){
		let pet = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
		if(email.length==0){
			$.alert('请输入邮箱号')
			return false;
		}else if(!pet.test(email)){
			$.alert('邮箱号号格式不正确')
            return false;
		}else{
			return true;
		}
	},
    regPhone(phone){
        let pet=/^[0-9][0-9]{10}$/
        if(pet.test(phone)){
            return true;
        }else if(phone.length ==0){
            $.alert('手机号不能为空')
            return false;
        }else{
            $.alert('手机号格式不正确')
            return false;
        }
    },
    regCode(code,inpCode){
        let pet=/^[0-9]{6}$/
        if(pet.test(code)&&code==inpCode){
            return true
        }else if(inpCode.length ==0){
            $.alert('验证码不能为空')
            return false;
        }else{
            $.alert('验证码错误')
            return false
        }
    },
    regCode1(inpCode){
        let pet=/^[0-9]{6}$/
        if(pet.test(inpCode)){
            return true
        }else if(inpCode.length ==0){
            $.alert('验证码不能为空')
            return false;
        }
    },
    regPw(pw){
    	console.log(pw)
        let pet=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/
        if(pet.test(pw)){
            return true
        }else if(pw.length ==0){
            $.alert('密码不能为空')
            return false;
        }else{
            $.alert('密码必须为数字+字符组合')
            return false
        }
    },
    regCard(card){
        let pet=/^(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/
        if(pet.test(card)){
            return true;
        }else if(card.length ==0){
            $.alert('身份证号不能为空')
            return false;
        }else{
            $.alert('身份证号格式不正确')
            return false;
        }
    },
    regBank(bank){
        let pet=/^[0-9][0-9]{15,18}$/
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99"
        if(strBin.indexOf(bank.substr(0, 2))== -1){
            $.alert('银行卡号开头6位不符合规范')
            return false
        }else if(bank.length ==0){
            $.alert('银行卡号不能为空')
            return false;
        }else if(pet.test(bank)){
            return true;
        }else{
            $.alert('银行卡号格式不正确')
            return false;
        }
    },
    hidebank(bank){
        let _b = bank.toString();
        if(!!bank){
            let _l = _b.length;
            return _b.substr(0,4)+"**** **** ****"+_b.substr(_l-4,_l)
        }else{
            return bank;
        }
    },
    regName(name){
        let pet=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ 
        if(pet.test(name)){
            return true;
        }else if(name.length ==0){
            $.alert('姓名不能为空')
            return false;
        }else{
            $.alert('姓名格式不正确')
            return false;
        }
    },
    regCity(provinces){
        if(typeof(provinces)=='undefined'){
            $.alert('居住地不能为空')
            return false;
        }else if(provinces!=''){
            return true
        }else{
            $.alert('居住地格式不正确')
            return false;
        }
    }
}
export default reg;