<template>
	<div ref="input">
		<span @click="countdown" v-if="codeshow" class="info">
			{{msginfo}}
		</span>
		<span v-else class="codeinfo">
			{{'重新获取'+codeTime+'s'}}
		</span>
	</div>
</template>
<script>
// import $ from "jquery";
import _path from '@/assets/js/md5'


export default {
  name,
  data() {
    return {
      msginfo: "获取验证码"
      ,codeTime: 60//倒计时
      ,codeshow:true
      ,code:''
      ,phone:''
      ,getphones:''
    };
  },
  methods: {
    countdown() {
		this.codeshow=!this.codeshow
    // console.log(this.phone);
    if(!!this.phone){
      this.gainVcode()
    }else{
      this.getphone()
    }
	    this.gainVcodes()
    },
    gainVcode(ph) {
      //获取验证码
      let obj = {}
      if(!!ph){
        obj = { phone: ph, msgType: this.msgType }
      }else{
        obj = { phone: this.phone, msgType: this.msgType }
      }
      let path = _path.getApiUrl("sms");
      this.$axios
        .post(path, _path.postObj(obj), {
          emulateJSON: true,
          withCredentials: true
        })
        .then(({status,data}) => {
          if (status == 200) {
            if (data.status == "000000") {
            //   $.alert("验证码获取" + res.data.msg);
              this.code = data.data.code;
		          this.$emit("codes",this.code)
            } else {
              _path.dealStatusCode(data.status,data.msg,this)
            }
          }
        });
    },
    gainVcodes() {
      var setInt = setInterval(() => {
        if (this.codeTime == 0) {
          clearInterval(setInt);
			      this.codeshow=!this.codeshow
          	this.codeTime =60
        }
        this.codeTime--;
      }, 1000);
    },
    getphone(){
			let path = _path.getApiUrl('getUserInfo');
      this.$axios.get(path,{withCredentials: true}).then(({status,data})=>{
				if(status == 200){
          if(data.status=='000000'){
            let phone = data.data.phone;
            // this.$set(this,'phone',data.data.phone)
            this.gainVcode(phone)
          }else{
            _path.dealStatusCode(data.status,data.msg,this)
          }
				}
			})
    }
    
  },
  mounted(){
    // console.log(this.msgType)
    if(!!this.border_l){this.$refs.input.style.borderLeft='1px solid '+this.border_l}
  },
  props:['phone','msgType','border_l']
};
</script>
<style scoped>
	.info{
		color: #3096FD;
		cursor: pointer;
	}
	.codeinfo{
    color:gray;
    cursor: pointer;
  }
  span{
    font-size: .75rem;
    /* border-left: 1px solid #8B8B8B; */
    padding-left: .5rem;
    text-align: center;
    display: inline-block;
    width: 5rem;
  }
</style>