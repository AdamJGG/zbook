<template>
	<div class="mine">
		<div class="nav">
			<van-nav-bar title="登录" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft({name:'Main'})" @click-right="onClickRight" />
		</div>
		<div class="booklist-img" v-if="isShow">
			<div class="ll">
				<p>马上登录看看书~</p>
				<van-button type="info" class="fl" @click="goState({name:'Login'})">{{title}}</van-button>
				<van-button type="primary" class="fr" @click='goState({name:"Register"})'>注 册</van-button>
			</div>

		</div>
		<div id="myself" v-if="isResit">
			<van-cell-group>
				<div class="contents"><img class="auto-img" src="../assets/2.jpeg"/></div>
				<van-cell title="昵称" v-model="usrarrs.nickname" />
				<van-cell title="手机" v-model="usrarrs.phone" />
				<van-cell title="注册时间" v-model="usrarrs.registerTime" />
				<van-cell title="书单" value="内容" />
			</van-cell-group>
		</div>
		<van-col span="24" class='seek'>
			<van-search shape='round' background="#f0f0f0" placeholder="请输入搜索书籍" @focus="goState({name:'Search'})" />
		</van-col>
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
	import { NavBar, Cell, CellGroup,Field } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Cell).use(CellGroup);
	export default {
		name: 'Mine',
		components: {
			[Field.name]: Field
		},
		data() {
			return {
				value: '',
				userInfo: {
					phone: '',
					pwd: ''
				},
				isShow: true,
				isResit: false,
				title: '登录',
				usrarrs:[]

			}
		},
		methods: {
			onClickLeft(path) {
				this.$router.push(path)
			},
			onClickRight() {
				Toast('按钮');
			},
			goState(path) {
				this.$router.push(path)
			},
			userShow() {

			}
		},
		created() {

				var arr = this.$route.params
			console.log("this.$route.params",arr)
			console.log("this.$route.params2",this.$route.parmas)
				
			if(arr.user == "") {
				this.isShow = true;
				this.isResit = false;

			} else {
				this.isShow = false;
				this.isResit = true;
				if(arr != undefined) {
					localStorage.setItem("arr", JSON.stringify(arr))
				} else {
					var usrarrs = JSON.parse(localStorage.getItem("arr"))
				}
				var userarrs = JSON.parse(localStorage.getItem("arr")).user
				
				this.usrarrs = userarrs[0]
				
				this.title = "个人中心"
				
			}

		}

	}
</script>

<style lang="less">
	.mine {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(185, 51, 33, .2);
		.booklist-img {
			min-height: 8rem;
			padding-top: 1.4rem;
			/*background: #F0F0F0;*/
			.ll {
				width: 5rem;
				margin: 0 auto;
				p {
					color: grey;
					text-align: center;
					margin-bottom: 1rem;
				}
			}
		}
		#myself {
			background: transparent;
			.van-cell-group {
				background: transparent;
			}
			.contents {
				width: 4rem;
				height: 4rem;
				margin: 0 auto;
				padding: 2rem 0 1rem 0;
				background: transparent;
				img {
					border: 5px solid rgba(181, 51, 33, .5);
					border-radius: 50%;
				}
			}
			.van-cell {
				background: transparent;
			}
		}
	}
</style>