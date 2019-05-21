<template>
	<div class="detail">
		<div class="nav">
			<van-nav-bar :title="title" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<li class="detail-li" v-for="(item,index) in list" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:list,sid:item._id}})">
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
		name: 'Detail',
		data() {
			return {
				fantasy: [],
				list: [],
				isLoading: true,
				title: ''
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
			var userLogin = localStorage.getItem('userLogin');

			var majorCate = JSON.parse(localStorage.getItem("book")).data
			var items = this.$route.params.item
			if(items != undefined){
				localStorage.setItem("items",JSON.stringify(items))
			}else{
				items = JSON.parse(localStorage.getItem("items")) 
			}
			var ll = items.length
			var male = majorCate.male
			var female = majorCate.female
			var picture = majorCate.picture
			var press = majorCate.press

			if(ll == male.length) {
				for(var i = 0; i < male.length; i++) {
					if(this.$route.params.pid == male[i].name) {
						this.fantasy = male[i]
						console.log("this==>", male)
						this.title = male[i].name
						break
					}

				}
				var i = this.title
			this.axios.get("https://novel.juhe.im/category-info", {
				params: {
					gender: 'male',
					type: 'hot',
					major: i,
					minor: '',
					start: 0,
					limit: 20

				}
				
			}).then(male => {
				console.log("male==>", male)
				localStorage.setItem('male', JSON.stringify(male))
				var fantesy = JSON.parse(localStorage.getItem('male')).data.books
				this.list = fantesy
				this.isLoading = false
				
			})
			}
			
			if(ll == female.length) {
				for(var i = 0; i < female.length; i++) {
					if(this.$route.params.pid == female[i].name) {
						this.fantasy = female[i]

						this.title = female[i].name
						break
					}

				}
					var i = this.title
			this.axios.get("https://novel.juhe.im/category-info", {params: {gender: 'female',type: 'hot',major: i,minor: '',start: 0,limit: 20}
			}).then(female => {
				localStorage.setItem('female', JSON.stringify(female))
				var erotica = JSON.parse(localStorage.getItem('female')).data.books	
				this.list = erotica
				this.isLoading = false
				
			})
			}

			if(ll == picture.length) {
				for(var i = 0; i < picture.length; i++) {
					if(this.$route.params.pid == picture[i].name) {
						this.fantasy = picture[i]
						this.title = picture[i].name
						break
					}

				}
						var i = this.title
			this.axios.get("https://novel.juhe.im/category-info", {params: {gender: 'picture',type: 'hot',major: i,minor: '',start: 0,limit: 20}
			}).then(picture => {
				localStorage.setItem('picture', JSON.stringify(picture))
				var cartoon = JSON.parse(localStorage.getItem('picture')).data.books	
				this.list = cartoon
				this.isLoading = false
				
			})
			}
			if(ll == press.length) {
				for(var i = 0; i < press.length; i++) {
					if(this.$route.params.pid == press[i].name) {
						this.fantasy = press[i]
						this.title = press[i].name
						break
					}

				}
				var i = this.title
			this.axios.get("https://novel.juhe.im/category-info", {params: {gender: 'press',type: 'hot',major: i,minor: '',start: 0,limit: 20}
			}).then(press => {
				localStorage.setItem('press', JSON.stringify(press))
				var photo = JSON.parse(localStorage.getItem('press')).data.books	
				this.list = photo
			})
				this.isLoading = false
			
			}

			
		},
		mounted() {
			const me = this 
		}
	}
</script>

<style lang="less" scoped="scoped">
	.detail {
		overflow: hidden;
		
	}
</style>