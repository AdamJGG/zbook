<template>
	<div class="ranking">
		<div class="nav">
			<van-nav-bar :title="title" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<li class="detail-li" v-for="(item,index) in list" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:list}})">
			<van-row class='detail-row'>
				<van-col span='4' class='fl'><img class="auto-img" :src="item.cover | formaImg" /></van-col>
				<van-col span='20' class='fr'>
					<h4>{{item.title}}</h4>
					<i class="i1">{{item.author}}</i><i class="i2">{{item.majorCate}}</i>
					<p>{{item.shortIntro}}</p>
					<span><b>{{item.latelyFollower}}</b>人气</span><span><b>{{item.retentionRatio}}%</b>读者留存</span>
				</van-col>
			</van-row>
		</li>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar);
	export default {
		name: 'Ranking',
		data() {
			return {
				fantasy: [],
				list: [],
				title: '',
				isLoading: true,
				ranking:[]
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				Toast('按钮');
			},
			goState(path){
				this.$router.push(path)
			}
		},
		created() {
			this.title = this.$route.params.item
			var j = this.$route.params.pid
			this.axios.get("http://novel.juhe.im/rank/" + j ).then(ranking=>{
				localStorage.setItem('ranking', JSON.stringify(ranking))
				var ranking = JSON.parse(localStorage.getItem('ranking')).data.ranking.books
				this.list = ranking
				this.isLoading = false
				
			})

			
		},
		mounted() {
			const me = this 
		}
	}
</script>

<style lang="less">
	.ranking {
		overflow: hidden;
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