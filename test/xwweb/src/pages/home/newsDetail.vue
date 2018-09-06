<template>
	<div id="newsDetail">
		<header class="bar bar-nav">
			<a @click.prevent="routerback" class="icon icon-left pull-left" style='width:2.4rem'></a>
			<h1 class="title">资讯详情</h1>
		</header>
		<div class="content">
			<h4 class="titleB" v-html="title"></h4>
			<h5 class="titleS" v-html="time"></h5>
			<p class="newsDC" v-html="content">
				
			</p>
		</div>
	</div>
</template>

<script>
	import _path from '@/assets/js/md5.js'
	export default{
		name: 'newDetail',
		data() {
			return{
				title:'',//标题
				time:'',//时间
				content:'',//内容
			}
		},
		methods: {
			routerback(){
				this.$router.back()
			},
			traText(content) {
				return $('<span />').html(content).text()
			},
			getData() {
				let dataObj = {
					type:'notice',
					id:this.$route.params.newId,
				},
				path = _path.getObj('news',dataObj)
				this.$axios.get(path,{withCredentials: true}).then((res) =>{
					if(res.status === 200){
						let data = res.data
						if(data.status === "000000"){
							let dataContent = data.data;
							this.title = dataContent.title;
							this.time = dataContent.time;
//							this.content = dataContent.content;
							this.content = this.traText(dataContent.content)
						}
					}else{
						$.alert('网络异常请重试', function () {
				          this.getData();
				        });
					}
				})
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style scoped>
	#newsDetail header{
		height: 2.4rem;
		background-color: #3096FD;
	}
	#newsDetail header a{
		color: #fff;
		height: 2.4rem;
		line-height: 1.4rem;
	}
	#newsDetail header h1.title{
		font-size: .9rem;
		color: #fff;
	}
	#newsDetail .content{
		background-color: #fff;
	}
	#newsDetail .content .titleB{
		font-size: .9rem;
		font-weight: normal;
		line-height: 1.4rem;
		color: #333;
		text-align: center;
		margin: 1.5rem .6rem .7rem;
	}
	#newsDetail .content .titleS{
		font-size: .6rem;
		line-height: .6rem;
		font-weight: normal;
		color: #999;
		text-align: center;
		margin: .6rem .6rem 1.5rem;
	}
	#newsDetail .content .newsDC{
		font-size: .75rem;
		color: #333;
		text-align: justify;
		padding:0 .6rem;
	}
</style>