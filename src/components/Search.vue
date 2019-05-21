<template>
	<div class="searchs">
		<div class="nav">
			<van-nav-bar title="搜索" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<van-search id="search" background="transparent" ref="search" v-model="keyWord" placeholder="请输入搜索关键词" show-action shape="round" @focus="focusFn">
			<div slot="action" @click="search">搜索</div>
		</van-search>
		<div class="tags" v-show="isFocus">
			<p>搜索热词<b class="fr" @click="refesh">换一批</b></p>
			<ul class="tag-row clearfix">
				<li v-for="(item,index) in searchWords" :key='index' class="itemli" @click="searchForTag(item.word)">
					{{item.word}}</li>
			</ul>
		</div>
		<div class="tags" v-show="isFocus">
			<p>热门搜索<b class="fr" @click="hotrefash">换一批</b></p>
			<ul class="tag-row clearfix">
				<li v-for="(item,index) in hotbook" :key='index' class="itemli" @click="searchForTag(item)">
					{{item}}</li>
			</ul>
		</div>
		<div class="tags" v-show="isFocus">
			<p>搜索历史<b class="fr" @click="clear"><van-icon name="delete" class="del"/></b></p>
			<ul class="tag-row clearfix">
				<li v-for="(item,index) in seeks" :key='index' class="itemli" @click="searchForTag(item)">
					{{item}}</li>
			</ul>
		</div>
		<div class="musicss">
			<ul class="tag-row clearfix">
				<li class="detail-li" v-for="(item,index) in searchBook" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:searchBook,sid:item._id}})">
					<van-row class='detail-row'>
						<van-col span='4' class='fl'><img class="auto-img" :src="item.cover | formaImg" /></van-col>
						<van-col span='20' class='fr'>
							<h4>{{item.title}}</h4>
							<i class="i1">{{item.author}}</i><i class="i2">{{item.lastChapter}}</i>
							<p>{{item.shortIntro}}</p>
							<span><b>{{item.latelyFollower}}</b>人气</span><span><b>{{item.retentionRatio}}%</b>读者留存</span>
						</van-col>
					</van-row>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar, Toast,Icon } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Toast).use(Icon);
	export default {
		name: 'Search',
		data() {
			return {
				keyWord: '霸道总裁',
				searchBook: [],
				seeks: [],
				isFocus: true,
				searchWords: [],
				isLoading: true,
				hotbook: []
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push({
					name: 'Main'
				})
			},
			onClickRight() {
				Toast('欢迎！');
			},
			goState(path) {
				this.$router.push(path)
			},
			search() {
				this.isFocus = false

				if(this.keyWord == '' || this.keyWord == undefined) {
					Toast("搜索不正确！")
					return
				}
				var match = new RegExp('(' + this.keyWord + ')', 'img')
				this.searchBook = []
				var p = this.keyWord
				this.axios.get("http://novel.juhe.im/search?keyword=" + p).then(searchbooks => {
					localStorage.setItem('searchbooks', JSON.stringify(searchbooks))
					var sbook = JSON.parse(localStorage.getItem('searchbooks')).data.books
					this.searchBook = sbook
				})

				if(!this.seeks) {
					this.seeks = []
				} else if(this.seeks.length > 15) {
					this.seeks.shift()
				}
				if(this.seeks.indexOf(this.keyWord) === -1) {
					this.seeks.push(this.keyWord);
					localStorage.setItem('seeks', JSON.stringify(this.seeks));
				}
			},
			focusFn() {
				this.isFocus = true;
			},

			searchForTag(keyWord) {
				this.keyWord = keyWord;
				this.search();
			},
			refesh(){
				var clip = JSON.parse(localStorage.getItem("hotwords")).data.searchHotWords
					if(clip.indexOf(this.searchWords) == -1){
						this.searchWords = []
						let v = clip.sort(() => .5-Math.random()).slice(0,12)
						this.searchWords.push(v)
							this.searchWords = v

					}
			},
			hotrefash(){
				var cvv = JSON.parse(localStorage.getItem("hotbooks")).data.hotWords
					if(cvv.indexOf(this.hotbook) == -1){
						this.hotbook = []
						let l = cvv.sort(() => .5-Math.random()).slice(0,12)
						this.hotbook.push(l)
							this.hotbook = l

					}
			},
			clear(){
				localStorage.removeItem('seeks')
				this.seeks = ''
			}
		},
		created() {
			var seeksdata = localStorage.getItem("seeks")
			this.seeks = seeksdata == undefined ? [] : JSON.parse(seeksdata)
			this.axios.get("https://novel.juhe.im/search-hotwords").then(hotwords => {
				localStorage.setItem('hotwords', JSON.stringify(hotwords))
				var hotword = JSON.parse(localStorage.getItem("hotwords")).data.searchHotWords
				this.searchWords = hotword.splice(0, 12)
				this.isLoading = false
				

			})
			this.axios.get("https://novel.juhe.im/hot-books").then(hotbooks => {
				localStorage.setItem('hotbooks', JSON.stringify(hotbooks))
				var hotbook = JSON.parse(localStorage.getItem("hotbooks")).data.hotWords
				this.hotbook = hotbook.splice(0, 10)
				this.isLoading = false
				
			})

			
		},
		mounted() {
			const me = this 
		}

	}
</script>

<style lang="less">
	.searchs {
		overflow-y: scroll;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(185, 51, 33, .2);
		.van-search--show-action {
			background: transparent;
		}
		.tags {
			p {
				margin: 0;
				padding: .3rem 0 .5rem 0.4rem;
				font-size: 18px;
				font-weight: 700;
				color: rgba(0, 0, 0, .5);
				.fr{
					margin-right: .4rem;
					font-size: 14px;
				}
				.del {
				color: grey;
				font-size: 20px;
				line-height: .8rem;
			}
			}
			.itemli {
				color: rgba(100, 125, 215, 0.8);
				background: lavenderblush;
				display: inline-block;
				border: 0.05333rem solid lightblue;
				border-radius: 0.32rem;
				max-width: 2rem;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				padding: 0.2rem;
				margin: 0rem 0.2rem 0.2rem 0.2rem;
			}
			padding-bottom:.5rem;
		}
		.musicss {
			.clearfix {
				.detail-row {
					background: rgba(185, 51, 33, .2);
					height: 2.8rem;
					position: relative;
					img {
						width: 1.5rem;
						height: 2.1rem;
						position: relative;
						padding: .3rem;
					}
					.fr {
						position: relative;
						left: 0.5rem;
						color: rgba(0, 0, 0, .5);
						h4 {
							margin: .2rem 0 .1rem 0;
							font-size: 14px;
							color: rgba(0, 0, 0, .8);
						}
						.i1 {
							font-style: normal;
							padding-right: .2rem;
						}
						.i2 {
							font-style: normal;
							padding-left: .2rem;
							max-width: 250px;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							border-left: 1px solid grey;
						}
						p {
							margin: .2rem 0 .2rem 0;
							max-width: 250px;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						span {
							padding-right: .3rem;
							b {
								font-weight: normal;
								color: #B93321;
							}
						}
						span:nth-of-type(2) {
							padding-left: .3rem;
							border-left: 1px solid grey;
						}
					}
				}
			}
		}
	}
</style>