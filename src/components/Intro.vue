<template>
	<div class="intro">
		<div class="nav">
			<van-nav-bar title="书籍详情" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<li class="bookdetail">
			<van-row>
				<van-col span='6'>
					<img :src="booklis.cover | formaImg" />
				</van-col>
				<van-col span='18'>
					<h5>{{booklis.title}}</h5>
					<b>{{booklis.author}}</b><i>{{booklis.minorCate}}</i><i> {{booklis.majorCate}}</i>
				</van-col>
			</van-row>

		</li>
		<van-row class='add'>
			<van-col span='12'>
				<van-button plain type="danger" class='btn1' @click="likeBook">加入书架</van-button>
			</van-col>
			<van-col span='12'>
				<van-button type="danger" class='btn2' @click="goState({name:'Chapter',params:{pid:booklis._id,ns:booklis.title}})">开始阅读</van-button>
			</van-col>
		</van-row>
		<van-row class='data'>
			<van-col span='8'>
				<p>追人气</p><b>{{booklis.latelyFollower}}</b></van-col>
			<van-col span='8'>
				<p>读者留存率</p><b>{{booklis.retentionRatio}}%</b></van-col>
			<van-col span='8'>
				<p>日更字数/天</p><b>13.4万</b></van-col>
		</van-row>
		<ul>
			<van-collapse v-model="activeName" accordion>
				<van-collapse-item title="书籍简介" name="1">
					{{booklis.shortIntro}}
				</van-collapse-item>

			</van-collapse>

		</ul>
		<van-cell-group class='calagole'>
			<li @click="goState({name:'Chapter',params:{pid:booklis._id,ns:booklis.title}})">
				<van-cell title="目录" :value="booklis.lastChapter" />

			</li>

		</van-cell-group>
		<ol>
			<van-cell-group class='comment'>
				<van-cell title="热门书评" value="" />
			</van-cell-group>
			<li class="rate" v-for="(item,index) in commen" :key="index">
				<van-row class='com'>
					<van-col span='6' class='fl img'>
						<img :src="'http://statics.zhuishushenqi.com' + item.author.avatar" />

					</van-col>
					<van-col span='18' class="fr cont">
						<p class="userid">{{item.author.nickname}}</p>
						<p class="rates">{{item.commentCount}}人点赞</p>
						<p class="good">★ ★ ★ ★ ★</p>
						<p>{{item.updated}}</p>
					</van-col>
					<p class="lan">{{item.title}}</p>

				</van-row>

			</li>

		</ol>
		<van-search class='search' placeholder="请输入搜索关键词" show-action shape="round">
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
	import { NavBar, Button, Cell, CellGroup, Rate } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Cell).use(CellGroup).use(Rate);
	export default {
		name: 'Intro',
		data() {
			return {
				booklis: [],
				activeName: '1',
				commen: [],
				likeBooks: [],
				isLoading: true

			}
		},
		components: {
			[Button.name]: Button
			//		[ImagePreview.name]: ImagePreview
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				this.$toast('书香欢迎您！');
			},
			goState(path) {
				this.$router.push(path)
			},
			likeBook() {
				if(!this.likeBooks) {
					this.likeBooks = []
				} else if(this.likeBooks.length > 20) {
					this.likeBooks.shift()
				}
				if(this.likeBooks.indexOf(this.booklis) === -1) {
					this.likeBooks.push(this.booklis);
					localStorage.setItem('likeBooks', JSON.stringify(this.likeBooks));
					//					var pp = JSON.parse(localStorage.getItem('likeBooks'))

				}
				this.$toast("已加入书架");

			}
		},
		created() {
			var booklist = this.$route.params.item
			if(booklist != undefined) {
				localStorage.setItem("booklist", JSON.stringify(booklist))
			} else {
				booklist = JSON.parse(localStorage.getItem("booklist"))
			}

			for(var j = 0; j < booklist.length; j++) {

				if(this.$route.params.pid == booklist[j].title) {
					this.booklis = booklist[j]
				} 
				
			}
			var p = this.$route.params.sid
			if(p != undefined) {
				localStorage.setItem("p", JSON.stringify(p))
			} else {
				p = JSON.parse(localStorage.getItem("p"))
			}

			this.axios.get("https://novel.juhe.im/book/discussions?book=" + p).then(commen => {

				localStorage.setItem('commen', JSON.stringify(commen))
				var commen = JSON.parse(localStorage.getItem('commen')).data.posts

				this.commen = commen.splice(4, 2)

			})
			var likebookdata = localStorage.getItem("likeBooks")
			this.likeBooks = likebookdata == undefined ? [] : JSON.parse(likebookdata)
			this.isLoading = false

		},
		mounted() {
			const me = this
		}

	}
</script>

<style lang="less">
	.intro {
		overflow: hidden;
		.bookdetail {
			height: 3.2rem;
			img {
				width: 1.8rem;
				height: 2.5rem;
				padding: .3rem;
			}
			h5 {
				color: rgba(0, 0, 0, .8);
				font-size: 16px;
				margin: .3rem 0 .3rem 0;
			}
			b {
				color: #B93321;
				padding-right: .4rem;
			}
			i {
				font-style: normal;
				border-left: 1px solid grey;
				padding: 0 .3rem 0 .3rem;
			}
		}
		.add {
			/*position: relative;*/
			margin-bottom: .5rem;
			text-align: center;
			.btn1 {
				width: 4rem;
				border: 1px solid #B93321;
				color: #B93321;
			}
			.btn2 {
				border: 1px solid #B93321;
				width: 4rem;
				background: #B93321;
			}
		}
		.data {
			text-align: center;
			height: 2rem;
			border-top: 1px solid #EBEBEB;
			border-bottom: 1px solid #EBEBEB;
			padding: .2rem 0 .2rem 0;
			p {
				font-size: 14px;
				color: rgba(0, 0, 0, .8);
			}
			b {
				font-weight: normal;
				font-size: 14px;
				color: rgba(0, 0, 0, .8);
			}
		}
		.calagole {
			padding: .3rem 0 0.3rem 0;
			.van-cell__value {
				span {
					font-size: 12px;
				}
			}
		}
		.comment {
			.van-cell__value {
				span {
					font-size: 12px;
				}
			}
		}
		.rate {
			height: 3.5rem;
			border-bottom: 1px solid #EBEBEB;
			.com {
				/*position: relative;*/
				img {
					/*position: relative;*/
					padding: .3rem;
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 50%;
				}
				.cont {
					/*background: pink;*/
					height: 2.1rem;
					.userid {
						/*position: relative;*/
						width: 100%;
						color: burlywood;
					}
					b {
						/*position: relative;*/
						left: -1.4rem;
						top: .8rem;
					}
					.good {
						color: #F19047;
						font-size: 0.32rem;
						/*position: relative;*/
						top: 0.3rem;
					}
					p {
						font-size: 10px;
						color: rgba(0, 0, 0, .8);
						margin: 0.1rem;
						/*position: relative;*/
						top: 1rem;
						right: -4rem;
					}
				}
			}
			.lan {
				float: left;
				padding-right: .4rem;
				color: rgba(0, 0, 0, 0.6);
			}
		}
	}
</style>