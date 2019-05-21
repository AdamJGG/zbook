<template>
	<div class="carttoon">
		<div class="nav">
		<van-nav-bar title="我的书架" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
	</div>
	<div class="booklist-img">
		<div class="ll">
			<img class="auto-img" src="../assets/ku.png"/>
		<p>漫画数据跑丢了，呜呜呜~</p>
		</div>
		
	</div>
	<van-search class='search' v-model="value" placeholder="请输入搜索关键词" show-action shape="round">
						<div slot="action">搜索</div>
					</van-search>
					<van-row class='classify'>
						<van-col span='4'>分类</van-col>
						<van-col span='5'>排行</van-col>
						<van-col span='5'>书单</van-col>
						<van-col span='5'>我的</van-col>
						<van-col span='5'>联系我们</van-col>
					</van-row>

					<div class="footer">
						<div><img src="../assets/recordIcon.png" />沪公网安备 31011202006103号</div>
						<div>上海元聚网络科技有限公司上海元聚网络科技有限公司上海元聚网络科技有限公司</div>
						<h1>客服电话：021-54393188-8044</h1>
					</div>
	</div>
</template>

<script>
import Vue from 'vue'
	import { NavBar,Search } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Search);
	export default {
		name: 'Booklist',
		data(){
			return{
				value:''
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push({name:'Main'})
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
	.carttoon{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		left: 0;
		margin: auto;
		background: #F0F0F0;
	.booklist-img{
		min-height: 8rem;
		padding-top: 1.4rem;
		background: #F0F0F0;
		.ll{
			width: 4rem;
			height: 4rem;
			margin:0 auto;
			p{
				color:grey;
			}
		}
		
	}

	}
	
</style>