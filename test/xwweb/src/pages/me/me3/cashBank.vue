<template>
  <div>
      <div id="withdraw">
			<header class="bar bar-nav">
				<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left external" style='width:2.4rem'></a>
				<h1 class="title">联行号查询</h1>
			</header>
			<div class="content">
				<img src="../../../../static/img/me/bankCard/info_get_bank_num.jpg" alt="">
			</div>
			
		</div>
  </div>
</template>
<script>
    export default{
		name,
		data(){
			return{
			}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
		},
    }
</script>
<style scoped>
	.content img{
		width: 100%;
	}
</style>
