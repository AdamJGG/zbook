<template>
	<div class="booklist">
		<div class="nav">
			<van-nav-bar title="我的书架" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<div class="booklist-img" id="book" ref="book" v-if="isShow">
			<div class="ll">
				<img class="auto-img" src="../assets/ku.png" alt="图片跑丢了~~" />
				<p @click="goState({name:'Main'})">书架空空如也，去看看吧！</p>

			</div>
		</div>
		<div class="my-booklist" v-if="isBookShow">
			<li class="detail-li" v-for="(item,index) in likeBookList" :key='index'>
				<van-row class='detail-row'>
					<van-col span='4' class='fl'><img class="auto-img" :src="item.cover | formaImg" @click="goState({name:'Intro',params:{pid:item.title,item:likeBookList,sid:item._id}})"/></van-col>
					<van-col span='20' class='fr'>
						<h4>{{item.title}}</h4>
						<i class="i1">{{item.author}}</i><i class="i2">{{item.majorCate}}</i>
						<p>{{item.shortIntro}}</p>
						<span><b>{{item.latelyFollower}}</b>人气</span><span><b>{{item.retentionRatio}}%</b>读者留存</span>
						<span class="del" @click="bookDel(index,item)"><van-icon name="delete"/></span>
					</van-col>
				</van-row>
			</li>
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
	import { NavBar, Search, Icon } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Search).use(Icon);
	export default {
		name: 'Booklist',
		data() {
			return {
				value: '',
				isShow: false,
				isBookShow: false,
				likeBookList: [],
				isLoading :true
				
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				Toast('按钮');
			},
			bookDel(index,likeBookId) {
				this.likeBookList.splice(index,1)
				var booklists = JSON.parse(localStorage.getItem("likeBooks"))

				if(booklists == null){
					this.isShow = true;
					
				}else{
					for(var i = 0; i <booklists.length;i++){
					if(likeBookId._id == booklists[i]._id){
						booklists.splice(i,1)
						i--;	
					}
					
				}
				}
				
				localStorage.setItem('likeBooks', JSON.stringify(booklists));
				


			},
			goState(path){
				this.$router.push(path)
			}
		},
		created() {

			//			this.axios.post("https://novel.juhe.im/categories").then(book=>{
			//				localStorage.setItem('book',JSON.stringify(book))
			//			})
			var booklists = JSON.parse(localStorage.getItem("likeBooks"))
			this.likeBookList = booklists
			this.$nextTick(function() {
				if(!this.likeBookList) {
					this.isShow = true;
					//				console.log("aa=>", this.$refs.book)

				}else if(this.likeBookList.length == 0){
					this.isShow = true;
					
				} else {
					this.isBookShow = true;
					this.likeBookList = booklists
				}
				this.isLoading = false
				
			})

			
		},
		mounted() {
			const me = this 
		}

	}
</script>

<style lang="less" scoped="scoped">
	.booklist {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		left: 0;
		margin: auto;
		overflow-y: scroll;
		background: #F0F0F0;
		.booklist-img {
			min-height: 8rem;
			padding-top: 1.4rem;
			background: #F0F0F0;
			.ll {
				width: 4rem;
				height: 4rem;
				margin: 0 auto;
				p {
					font-size: 12px;
					color: grey;
				}
			}
		}
		.my-booklist {
			min-height: 8rem;
			position: relative;
			.detail-li {
				background: rgba(185, 51, 33, .2);
				p {
					font-size: 12px;
					color: rgba(0, 0, 0, .6);
					padding-left: 0rem;
				}
			}
			.del {
				position: absolute;
				right: 27px;
				bottom: -7px;
				color: grey;
				font-size: 20px;
			}
		}
	}
</style>