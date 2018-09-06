<template>
	<div id="loadLayer">
		<div class="screen"></div>
		<div class="loadLayerTip">
			<div class="loadLayerContent">
				<slot></slot>
			</div>
			<div class="loadImg preloader"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'loadLayer',
		data() {
			return{
				
			}
		}
	}
</script>

<style scoped>
	#loadLayer{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10000;
	}
	#loadLayer .screen{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(1,1,1,.2);
	}
	#loadLayer .loadLayerTip{
		position: fixed;
		z-index: 10001;
		width: 80%;
		height: 20%;
		top: 40%;
		left: 10%;
		background-color: #fff;
		text-align: center;
		border-radius: .4rem;
	}
	#loadLayer .loadLayerTip .loadLayerContent{
		height: 60%;
		line-height: 500%;
	}
	#loadLayer .loadLayerTip .loadImg{
		width: 1.7rem;
		height: 1.7rem;
	}
</style>