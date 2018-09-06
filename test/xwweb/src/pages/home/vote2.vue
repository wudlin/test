<template>
  <div>
    <div id="vote">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
			<h1 class="title">借款人义务及禁止性行为提示书</h1>
		</header>
		<div class="content">
			<img src="/static/img/index/vote2.jpg" alt="">
	    </div>
		</div>
	</div>
</template>
<script>
// import _path from '@/assets/js/md5.js'
// import pageNav from '@/pages/page-nav'
  export default{
		name,
		data() {
			return {
				w1:''
				,terminal:'app'
			}
		},
		methods:{
			routerback(){
				// this.$router.push("vote")
				this.$router.push({name:'vote0',params:{path:this.terminal}})
			},
		},
		mounted(){
			this.terminal=this.$route.params.path||this.terminal
		},
  }
</script>
<style src='@/assets/css/index/vote.css'></style>
