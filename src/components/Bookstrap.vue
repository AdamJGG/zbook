<template>
	<div class="booklist">
		<div class="nav">
			<van-nav-bar title="主题书单" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<van-tabs v-model="active">
			<van-tab v-for="(item,index) in bookd" :key='index'>
				 <div class="tab-title" slot="title" @click="onClick(item._id)">{{ item.title }}</div>
				 
				<li class="detail-li" v-for="(item,index) in malebookd" :key='index' @click="goState({name:'Intro',params:{pid:item.book.title,item:malebookd,sid:item.book._id}})">
					<van-row class='detail-row'>
						<van-col span='4' class='fl'><img class="auto-img" :src="item.book.cover | formaImg" /></van-col>
						<van-col span='20' class='fr'>
							<h4>{{item.book.title}}</h4>
							<i class="i1">{{item.book.author}}</i><i class="i2">{{item.book.majorCate}}</i>
							<p>{{item.book.shortIntro}}</p>
							<span><b>{{item.book.latelyFollower}}</b>人气</span><span>{{item.book.cat}}</span>
						</van-col>
					</van-row>
				</li>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar, Search } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Search);
	export default {
		name: 'Bookstrap',
		data() {
			return {
				value: '',
				active: 0,
				bookd: [],
				malebookd: [],
				isLoading: true
				
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push({
					name: 'Main'
				})
			},
			goState(path){
				this.$router.push(path)
			},
			onClickRight() {
				Toast('按钮');
			},
			onClick(item){

				var j = item
				console.log("item",item)
				this.axios.get("https://novel.juhe.im/booklists/"+ j).then(books =>{
				localStorage.setItem("books",JSON.stringify(books))
				var books = JSON.parse(localStorage.getItem("books")).data.bookList.books
				this.malebookd =books.splice(10,20)
			this.isLoading = false
				
				console.log("booklist=>",books.splice(10,10))
				
			})
//				var books = JSON.parse(localStorage.getItem("booklist")).data.bookLists
//				console.log("booklist=>",this.active)
			}
		},
		created() {
			this.axios.get("https://novel.juhe.im/booklists").then(bookList =>{
				localStorage.setItem("bookList",JSON.stringify(bookList))
				var bookList = JSON.parse(localStorage.getItem("bookList")).data.bookLists
				this.bookd = bookList
					
			})		
			this.axios.get("https://novel.juhe.im/booklists/576d182926e661a62719a1b6").then(book1 =>{
				localStorage.setItem("book1",JSON.stringify(book1))
				var book1 = JSON.parse(localStorage.getItem("book1")).data.bookList.books
				this.malebookd =book1.splice(20,20)
				console.log("book1=>",this.malebookd)
				
			})
		}

	}
</script>

<style lang="less">
	.booklist {
		overflow: hidden;
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
		.van-tab--active {
			color: #B93321;
		}
		.van-tabs__line {
			display: none;
		}
		.detail-li {
			background: #F5F2ED;
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
</style>