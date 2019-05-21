<template>
	<div class="nav">
		<van-nav-bar title="我的书架" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar);
	export default {
		name: 'Nav',
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				Toast('按钮');
			}
		},
		created() {
			//			this.axios.post("https://novel.juhe.im/categories").then(book=>{
			//				localStorage.setItem('book',JSON.stringify(book))
			//			})
			}
			
	}
</script>

<style lang="less">
	.nav {
		.van-nav-bar {
			background: #B93321;
			.van-icon {
				color: #fff;
			}
			.van-nav-bar__arrow+.van-nav-bar__text {
				color: #fff;
			}
			.van-nav-bar__title {
				color: #fff;
			}
			.van-nav-bar__text {
				color: #fff;
			}
		}
	}
</style>