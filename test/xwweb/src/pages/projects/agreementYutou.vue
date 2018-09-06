<template>
    <div class="agreementYuTou">
		<header class="bar bar-nav">
			<a @click.prevent="routerback"  class="icon icon-left button-nav pull-left" style='width:2.4rem'></a>
			<h1 class="title">智能一键投标协议</h1>
		</header>
		<div class="content">
			<iframe src="" width="100%" height="100%"></iframe>
		</div>
	</div>
</template>
<script>
import _path from "@/assets/js/md5";
import filters from "@/assets/js/formatAll";
let methods = {
  routerback() {
    this.$router.go(-1);
  }
};
export default {
  name,
  filters,
  methods,
  data() {
    return {};
  }
};
</script>
<style scoped>
.center {
  text-align: center;
}
.red {
  color: red;
}
h4{
	margin: 0;
}
.cont{
	padding: .5rem;
}
</style>

