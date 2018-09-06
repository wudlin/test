<template>
  <div>
  	
    <div id="loan" >
		<header class="bar bar-nav">
			<a @click.prevent="routerback"  class="icon icon-left pull-left"  style='width:2.4rem'></a>
			<h1 class="title">新手指南</h1>
			<!-- <a class="icon xwsd-menu pull-right open-panel " data-panel='#panel-right2' @click.prevent="btns"></a> -->
		</header>
		<!--内容区-->
		<div class="content">
			<p style='text-align:center'>暂无数据</p>
		</div>
	</div>
  </div>
</template>
<script>
    export default{
		name,
		data(){
			return{}
		},
		methods:{
			routerback(){
				this.$router.go(-1)
			},
		}
  }
</script>
<style src="@/assets/css/index/loan.css">
</style>

