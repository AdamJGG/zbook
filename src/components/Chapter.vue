<template>
	<div class="chapter">
		<div class="nav">
			<van-nav-bar title="优质书源" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<van-row class='mu'>
			<van-col span='24'>目录<b>共{{commen.length}}章</b></van-col>
		</van-row>
		<li class="chapter-node" v-for="(item,index) in list" :key="index" @click="goState({name:'Setion',params:{pid:item.id,nss:title,item:commen,ds:list}})">
			<i>{{index+1}}</i><span>{{item.title}}</span>
		</li>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar);
	export default {
		name: 'Chapter',
		data() {
			return {
				commen: [],
				list: [],
				title: '',
				isLoading: true
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				Toast('按钮');
			},
			goState(path) {
				this.$router.push(path)
			},
			loadPageData() {}
		},
		created() {
			this.title = this.$route.params.ns
			var i = this.$route.params.pid
			this.axios.get("http://novel.juhe.im/book-sources?view=summary&book=" + i).then(chapter => {
				localStorage.setItem('chapter', JSON.stringify(chapter))

			})
			var chap = JSON.parse(localStorage.getItem('chapter')).data[0]._id
			if(chap != undefined){
				localStorage.setItem("chap",JSON.stringify(chap))
			}else{
				chap = JSON.parse(localStorage.getItem("chap")) 
			}
			this.axios.get("http://novel.juhe.im/book-chapters/" + chap).then(chapters => {
				localStorage.setItem('chapters', JSON.stringify(chapters))
				var chaps = JSON.parse(localStorage.getItem('chapters')).data.chapters
				var chapslice = chaps.splice(0, 50)
				this.commen = chaps
				this.list = chapslice
				this.isLoading = false

				if(this.list != undefined) {

					localStorage.setItem("allItem", JSON.stringify(this.list))
				} else {
					this.allItem = JSON.parse(localStorage.getItem("allItem"))
				}
			})

		},
		mounted() {
			const me = this
		}

	}
</script>

<style lang="less">
	.chapter {
		overflow: hidden;
		.mu {
			height: 1.2rem;
			padding: .2rem;
			line-height: 1.2rem;
			font-size: 16px;
			border-bottom: 1px solid #eeeeee;
			b {
				padding: .2rem;
				font-weight: normal;
				color: rgba(0, 0, 0, .5);
				font-size: 12px;
			}
		}
		.chapter-node {
			height: 1.4rem;
			line-height: 1.4rem;
			border-bottom: 1px solid #EEEEEE;
			i {
				font-style: normal;
				padding: .3rem;
				color: rgba(0, 0, 0, .5);
			}
			span {
				font-weight: 1000;
				/*font-size: 13px;*/
				color: rgba(0, 0, 0, .5);
			}
		}
	}
</style>