<template>
	<div class="setion">
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<div class="setion-content" @click="show = true" ref='bg'>
			<h1 ref='hh'>{{currentSetion.title}}</h1>
			<ul>
				{{setions.cpContent}}
			</ul>
		</div>
		<van-popup v-model="show" position="top" :overlay="false" :lock-scroll='false'>
			<van-nav-bar :title="title" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft({name:'Chapter'})" @click-right="onClickRight" />

		</van-popup>
		<van-popup v-model="show" position="bottom" :overlay="false" :lock-scroll='false'>
			<van-row class='text'>
				<van-col span='4'>Aa-</van-col>
				<van-col span='16'>
					<van-slider v-model="value" />
				</van-col>
				<van-col span='4'>Aa+</van-col>
			</van-row>
			<van-row class='togglebtn'>
				<van-col span='8'>
					<van-button type="default" @click='infos'>默认</van-button>
				</van-col>
				<van-col span='8'>
					<van-button type="info" @click="night">夜间</van-button>
				</van-col>
				<van-col span='8'>
					<van-button type="primary" @click='reserve'>护眼</van-button>
				</van-col>
			</van-row>
			<van-row class='next'>
				<van-col span="6"><b @click="prevSetion">上一章</b></van-col>
				<van-col span="12">
					<div @click="onClickLeft">目录</div>
				</van-col>
				<van-col span="6"><b @click="nextSetion">下一章</b></van-col>
			</van-row>
		</van-popup>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Popup, NavBar, Button, Slider, Toast } from 'vant';

	Vue.use(Popup).use(NavBar).use(Button).use(Slider).use(Toast);
	export default {
		name: 'Setion',
		data() {
			return {
				allItem: [],
				currentSetion: [],
				setions: [],
				show: false,
				title: [],
				isLoading: true,
				value: 50
			}
		},
		methods: {
			onClickLeft(path) {
				this.$router.push(path)
			},
			onClickRight() {
				Toast('按钮');
			},
			nextSetion() {
				//				var iitems = JSON.parse(localStorage.getItem('iitem'))
				for(var i = 0; i < this.allItem.length; i++) {

					if(this.currentSetion.id == this.allItem[i].id) {
						var index = ++i;
						var lastIndex = parseInt(this.allItem.length - 1)
						if(index >= lastIndex) {
							Toast('这是最后一章了！')
						} else {
							this.currentSetion = this.allItem[index]
							var i = this.currentSetion.id
							this.axios.get('http://novel.juhe.im/chapters/' + encodeURIComponent('http://vip.zhuishushenqi.com/chapter/' + i + '?cv=1529047156598')).then(setions => {
								localStorage.setItem('setions', JSON.stringify(setions))
								var links = JSON.parse(localStorage.getItem('setions')).data.chapter
								this.setions = links
							})
						}

					}
				}
			},
			prevSetion() {
				for(var i = 0; i < this.allItem.length; i++) {

					if(this.currentSetion.id == this.allItem[i].id) {
						var index = --i;
						if(index <= 0) {
							Toast('这是第一章！')
						} else {
							this.currentSetion = this.allItem[index]
							var i = this.currentSetion.id
							this.axios.get('http://novel.juhe.im/chapters/' + encodeURIComponent('http://vip.zhuishushenqi.com/chapter/' + i + '?cv=1529047156598')).then(setions => {
								localStorage.setItem('setions', JSON.stringify(setions))
								var links = JSON.parse(localStorage.getItem('setions')).data.chapter
								this.setions = links
							})
						}

					}
				}
			},
			reserve(){
				var a = this.$refs.bg
				var b = this.$refs.hh
				a.style.background = 'rgba(14,108,30,.5)'
				a.style.color = 'rgba(56,97,102,.8)'
				b.style.color = 'rgba(56,97,102,.8)'
			},
			night(){
				var a = this.$refs.bg
				var b = this.$refs.hh
				a.style.background = 'rgba(0,0,0,.8)'
				a.style.color = 'rgba(200,200,200,.6)'
				b.style.color = 'rgba(200,200,200,.6)'
			},
			infos(){
				var a = this.$refs.bg
				var b = this.$refs.hh
				a.style.background = '#EEE6DD'
				a.style.color = 'rgba(0,0,0,.6)'
				b.style.color = 'rgba(0,0,0,.6)'
			},
			add(){
				var a = this.$refs.bg
				
			}
		},
		watch: {
			show(val) {
				if(val) {
					setTimeout(() => {
						this.show = false;
					}, 2000);
				}
			}
		},
		created() {
			this.title = this.$route.params.nss
			this.allItem = this.$route.params.ds
		
		
			for(var i = 0; i < this.allItem.length; i++) {

				if(this.$route.params.pid == this.allItem[i].id) {
					this.currentSetion = this.allItem[i]
					console.log("ss", this.currentSetion)

				}
			}
			var i = this.currentSetion.id
			this.axios.get('http://novel.juhe.im/chapters/' + encodeURIComponent('http://vip.zhuishushenqi.com/chapter/' + i + '?cv=1529047156598')).then(setions => {
				localStorage.setItem('setions', JSON.stringify(setions))
				var links = JSON.parse(localStorage.getItem('setions')).data.chapter
				this.setions = links
				this.isLoading = false
				
			})

			
		},
		mounted() {
			const me = this 
		}
	}
</script>

<style lang="less">
	.setion {
		color: rgba(0, 0, 0, .6);
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background:#EEE6DD;
		.van-popup--top {
			background: transparent;
		}
		.setion-content {
			background: #EEE6DD;
			padding: .5rem 0 2rem 0;
			h1 {
				margin-top: 0;
				padding: .3rem 0 .2rem .4rem;
				color: rgba(0, 0, 0, .6);
			}
			ul {
				padding: 0 .4rem 0 .4rem;
				font-size: 14px;
			}
		}
		.van-nav-bar {
			background:linear-gradient(to right,grey,gray,black);
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
		.van-popup--bottom {
			height: 4rem;
			background:linear-gradient(to top left,grey,gray,black);
			.text {
				height: 1rem;
				font-size: .5rem;
				text-align: center;
				color: rgba(255, 255, 255.5);
				line-height: 1rem;
				.van-slider {
					position: relative;
					top: .5rem;
				}
			}
			.togglebtn {
				text-align: center;
				.van-button--normal {
					width: 2.5rem;
				}
			}
			.next {
				width: 100%;
				text-align: center;
				font-size: 16px;
				line-height: 2rem;
				position: absolute;
				bottom: 0;
				height: 2rem;
				color: rgba(255, 255, 255, .5);
				b {
					color: #F0F0F0;
				}
			}
		}
		.van-slider__button-wrapper{
			display: none;
		}
	}
</style>