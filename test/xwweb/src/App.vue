<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>

export default {
  name,
  data(){
    return{
    	is:false,
    }
  },
  mounted(){
    //document.body.addEventListener("touchstart", function(){}, false)
  },
}
</script>
<style scoped="scoped">
	.side-menu-animate-enter-active,.side-menu-animate-leave-active{
      transition: all .5s;
    }

	.side-menu-animate-enter,.side-menu-animate-leave-active{
	  opacity: 0;
	  transform: translateX(100%);
	}
</style>