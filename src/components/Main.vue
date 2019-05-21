<template>
	<div class="main">
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<van-row class='nav-top'>
			<van-col span='6' class='wel'>{{userMsg.nickname}}</van-col>
			<van-col span="12" class='logo'><img class="img-logo" src="../assets/追书logo.png" /></van-col>
			<van-col span="6"><img class="img-search" src="../assets/search.png" @click="goState({name:'Search'})" /></van-col>
		</van-row>
		<van-tabs v-model="active" class='nav-content'>
			<van-tab title="精选">
				<!--轮播图-->
				<van-swipe :autoplay="3000" indicator-color="white" class="swipe">
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-1.jpg" />
					</van-swipe-item>
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-2.jpg" />
					</van-swipe-item>
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-3.jpg" />
					</van-swipe-item>
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-4.jpg" />
					</van-swipe-item>
				</van-swipe>
				<!--小导航-->
				<li class='libs-li' v-for="(item,index) in libs" :key="index">
					<div><img class="auto-img" :src="item.url" @click="goState(item.path)" /></div>
					<i>{{item.title}}</i>
				</li>
				<!--畅销短篇-->
				<div class="content">
					<h5>畅销短篇</h5>
					<li class="content-li" v-for="(item,index) in shortshow" :key="index" @click="goState({name:'Intro',params:{pid:item.title,item:shortshow,sid:item._id}})">
						<van-row>
							<van-col span='5' class='content-img fl'><img :src="item.cover | formaImg" /></van-col>
							<van-col span='19' class='content-text fr'>
								<h4>{{item.title}}<i>完结</i></h4>
								<p>{{item.shortIntro}}</p>
								<h6>{{item.minorCate}}</h6>
								<h5><i>{{item.latelyFollower}}</i>人气</h5>
								<b>{{item.majorCate}}</b>
							</van-col>
						</van-row>
					</li>
					<van-button size="large"><i>查看更多></i></van-button>
				</div>
				<div class="content">
					<h5>女生佳作</h5>
					<li class="content-li" v-for="(item,index) in work" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:work,sid:item._id}})">
						<van-row>
							<van-col span='5' class='content-img fl'><img :src="item.cover | formaImg" /></van-col>
							<van-col span='19' class='content-text fr'>
								<h4>{{item.title}}<i>完结</i></h4>
								<p>{{item.shortIntro}}</p>
								<h6>{{item.minorCate}}</h6>
								<h5><i>{{item.latelyFollower}}</i>人气</h5>
								<b>{{item.majorCate}}</b>
							</van-col>
						</van-row>

					</li>
					<van-button size="large"><i>查看更多></i></van-button>

				</div>
				<div class="content">
					<h5>女生红文区</h5>
					<li class="content-li" v-for="(item,index) in ceate" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:ceate,sid:item._id}})">
						<van-row>
							<van-col span='5' class='content-img fl'><img :src="item.cover | formaImg" /></van-col>
							<van-col span='19' class='content-text fr'>
								<h4>{{item.title}}<i>完结</i></h4>
								<p>{{item.shortIntro}}</p>
								<h6>{{item.minorCate}}</h6>
								<h5><i>{{item.latelyFollower}}</i>人气</h5>
								<b>{{item.majorCate}}</b>
							</van-col>
						</van-row>

					</li>
					<van-button size="large"><i>查看更多></i></van-button>

				</div>
				<!--近期飙升榜-->
				<div class="content">
					<h5>近期飙升榜</h5>
					<van-row class='paihang'>
						<van-col span='3'><img src="../assets/icon-10.png" /></van-col>
						<van-col span='16'>修真聊天集</van-col>
						<van-col span='5' class="renqi"><b>14.1万</b>人气</van-col>
					</van-row>
					<van-row class='paihang'>
						<van-col span='3'><img src="../assets/icon-11.png" /></van-col>
						<van-col span='16'>元真</van-col>
						<van-col span='5' class="renqi"><b>13.3万</b>人气</van-col>
					</van-row>
					<van-row class='paihang'>
						<van-col span='3'><img src="../assets/icon-12.png" /></van-col>
						<van-col span='16'>全球高武</van-col>
						<van-col span='5' class="renqi"><b>12.0万</b>人气</van-col>
					</van-row>
					<van-row class='paihang'>
						<van-col span='3'><span>4</span></van-col>
						<van-col span='16'>圣墟</van-col>
						<van-col span='5' class="renqi"><b>10.0万</b>人气</van-col>
					</van-row>
					<van-row class='paihang'>
						<van-col span='3'><span>5</span></van-col>
						<van-col span='16'>剑来</van-col>
						<van-col span='5' class="renqi"><b>9.5万</b>人气</van-col>
					</van-row>
					<van-row class='paihang'>
						<van-col span='3'><span>6</span></van-col>
						<van-col span='16'>帝霸</van-col>
						<van-col span='5' class="renqi"><b>8.5万</b>人气</van-col>
					</van-row>

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
				<!--<div class="sticy" id="yy" ref="yy" @click="goState({name:'Mine'})"><img src="../assets/login.png" /></div>-->
			</van-tab>
			<van-tab title="VIP">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-5.jpg" />
					</van-swipe-item>
					<van-swipe-item>
						<img class="auto-img" src="../assets/lunbo-6.jpg" />
					</van-swipe-item>
				</van-swipe>
				<div class="login">
					<van-row class="login-in">
						<van-col span='18'><img class="login-img" :src="creat.url" /><b>{{creat.title}}</b></van-col>
						<van-col span='6'>
							<van-button type="danger" class='btn'>{{creat.btntext}}</van-button>
						</van-col>
					</van-row>
					<van-row class='login-vip'>
						<van-col span='12'><img src="../assets/icon-vip.png" /><i>VIP书库</i></van-col>
						<van-col span='12'><img src="../assets/icon-collect.png" /><i>VIP特权</i></van-col>
					</van-row>
					<div class="content">
						<h5>女频热门</h5>
						<li class="content-li" v-for="(item,index) in vide" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:vide,sid:item._id}})">
							<van-row>
								<van-col span='5' class='content-img fl'><img :src="item.cover | formaImg" /></van-col>
								<van-col span='19' class='content-text fr'>
									<h4>{{item.title}}<i>完结</i></h4>
									<p>{{item.shortIntro}}</p>
									<h6>{{item.minorCate}}</h6>
									<h5><i>{{item.latelyFollower}}</i>人气</h5>
									<b>{{item.majorCate}}</b>
								</van-col>
							</van-row>

						</li>
						<van-button size="large"><i>查看更多></i></van-button>

					</div>
					<div class="content">
						<h5>佳丽创作</h5>
						<li class="content-li" v-for="(item,index) in ceate" :key='index' @click="goState({name:'Intro',params:{pid:item.title,item:ceate,sid:item._id}})">
							<van-row>
								<van-col span='5' class='content-img fl'><img :src="item.cover | formaImg" /></van-col>
								<van-col span='19' class='content-text fr'>
									<h4>{{item.title}}<i>完结</i></h4>
									<p>{{item.shortIntro}}</p>
									<h6>{{item.minorCate}}</h6>
									<h5><i>{{item.latelyFollower}}</i>人气</h5>
									<b>{{item.majorCate}}</b>
								</van-col>
							</van-row>

						</li>
						<van-button size="large"><i>查看更多></i></van-button>

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
			</van-tab>
			<van-tab title="分类">
				<div class="spirnner" v-show="isLoading">
					<van-loading type="spinner" color="red" class="loading" size='45px' />
				</div>
				<div class="content-lis">
					<h1 class="sex">男生</h1>
					<van-row class='lis'>
						<li class="sort" v-for="(item,index) in male" :key='index' @click="goState({name:'Detail',params:{pid:item.name,item:male}})">
							<p>{{item.name}}</p>
							<i>{{item.bookCount}}</i>
						</li>
					</van-row>
				</div>
				<div class="content-lis">
					<h1 class="sex">女生</h1>
					<van-row class='lis'>
						<li class="sort" v-for="(item,index) in female" :key='index' @click="goState({name:'Detail',params:{pid:item.name,item:female}})">
							<p>{{item.name}}</p>
							<i>{{item.bookCount}}</i>
						</li>
					</van-row>
				</div>
				<div class="content-lis">
					<h1 class="sex">漫画</h1>
					<van-row class='lis'>
						<li class="sort" v-for="(item,index) in picture" :key='index' @click="goState({name:'Detail',params:{pid:item.name,item:picture}})">
							<p>{{item.name}}</p>
							<i>{{item.bookCount}}</i>
						</li>
					</van-row>
				</div>
				<div class="content-lis">
					<h1 class="sex">出版</h1>
					<van-row class='lis'>
						<li class="sort" v-for="(item,index) in press" :key='index' @click="goState({name:'Detail',params:{pid:item.name,item:press}})">
							<p>{{item.name}}</p>
							<i>{{item.bookCount}}</i>
						</li>
					</van-row>
				</div>
				<van-col span="24" class='seek'>
					<van-search shape='round' background="#f0f0f0" placeholder="请输入搜索书籍" @focus="goState({name:'Search'})" />
				</van-col>
				<van-row class='classify'>
					<van-col span='4'>玄幻</van-col>
					<van-col span='5' @click="goState({name:'Ranking'})"><b></b></van-col>
					<van-col span='5'@click="goState({name:'Bookstrap'})">书单</van-col>
					<van-col span='5' @click="goState({name:'Mine'})">我的</van-col>
					<van-col span='5'>联系我们</van-col>
				</van-row>

				<div class="footer">
					<div><img src="../assets/recordIcon.png" />沪公网安备 31011202006103号</div>
					<div>上海元聚网络科技有限公司上海元聚网络科技有限公司上海元聚网络科技有限公司</div>
					<h1>客服电话：021-54393188-8044</h1>
				</div>
			</van-tab>
			<van-tab title="排行">
				<div class="spirnner" v-show="isLoading">
					<van-loading type="spinner" color="red" class="loading" size='45px' />
				</div>
				<div class="hot-top">
					<h1>男生</h1>
					<li class="hot" v-for="(item,index) in maleRank" :key='index' @click="goState({name:'Ranking',params:{pid:item._id,item:item.title}})">
						<div class="fl-img"><img class="auto-img" :src="'http://statics.zhuishushenqi.com'+ item.cover" /></div>
						<p class="p">{{item.title}}</p>
					</li>
				</div>
				<li>
					<van-collapse v-model="activeName" accordion>
						<van-collapse-item title="别人家的排行榜" name="1">
							<li class="other" v-for="(item,index) in othermale" :key='index'>
								<p class="p">{{item.title}}</p>
							</li>
						</van-collapse-item>

					</van-collapse>
				</li>
				<div class="hot-top">
					<h1>女生</h1>
					<li class="hot" v-for="(item,index) in femaleRank" :key='index'>
						<div class="fl-img"><img class="auto-img" :src="'http://statics.zhuishushenqi.com'+ item.cover" /></div>
						<p class="p">{{item.title}}</p>
					</li>
				</div>
				<li>
					<van-collapse v-model="activeName" accordion>
						<van-collapse-item title="别人家的排行榜" name="1">
							<li class="other" v-for="(item,index) in otherfemale" :key='index'>
								<p class="p">{{item.title}}</p>
							</li>
						</van-collapse-item>

					</van-collapse>
				</li>
				<!--<van-search class='search'@focus="goState({name:'Search'})" v-model="value" placeholder="请输入搜索关键词" show-action shape="round">
					<div slot="action" >搜索</div>
				</van-search>-->
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
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	export default {
		name: 'Main',
		data() {
			return {
				checked: true,
				userMsg: [],
				active: 0,
				value: '',
				female: [],
				male: [],
				picture: [],
				press: [],
				qihuan: [],
				shortshow: [],
				work: [],
				hot: [],
				vide: [],
				ceate: [],
				femaleRank: [],
				maleRank: [],
				pictures: [],
				otherfemale: [],
				isLoading: true,
				othermale: [],
				activeName: '1',
				creat: {
					url: '',
					title: '',
					btntext: ''
				},
				libs: [{
						title: '书架',
						url: require('../assets/icon-1.png'),
						path: {
							name: 'Booklist'
						}
					},
					{
						title: '书单',
						url: require('../assets/icon-2.png'),
						path: {
							name: 'Bookstrap'
						}
					},
					{
						title: '漫画',
						url: require('../assets/icon-3.png'),
						path: {
							name: 'Carttoon'
						}
					},
					{
						title: '我的',
						url: require('../assets/icon-4.png'),
						path: {
							name: 'Mine',
							params:{
								user:''
							}
						}
					}
				]

			};
		},
		methods: {
			goState(path) {
				this.$router.push(path)
			}

		},
		created() {
			this.axios.get("https://novel.juhe.im/categories").then(book => {
				localStorage.setItem("book", JSON.stringify(book))
				var female = JSON.parse(localStorage.getItem('book')).data.female
				this.female = female
				this.male = JSON.parse(localStorage.getItem('book')).data.male
				this.picture = JSON.parse(localStorage.getItem('book')).data.picture
				this.press = JSON.parse(localStorage.getItem('book')).data.press
				this.isLoading = false
				
			})
			this.axios.get("http://novel.juhe.im/rank-category").then(rank => {
				localStorage.setItem("rank", JSON.stringify(rank))
				var femaleRank = JSON.parse(localStorage.getItem('rank')).data.female
				this.femaleRank = femaleRank.splice(0, 7)
				this.otherfemale = femaleRank
				var maleRank = JSON.parse(localStorage.getItem('rank')).data.female
				this.maleRank = maleRank.splice(0, 7)
				this.othermale = maleRank
				this.isLoading = false
				

			})
			var shortNovel = JSON.parse(localStorage.getItem('female')).data.books

			var shorShow = shortNovel.splice(11, 4)
			var hot = shortNovel.splice(1, 4)
			var work = shortNovel.splice(6, 4)
			var vide = shortNovel.splice(15, 4)
			var ceate = shortNovel.splice(5, 4)
			this.hot = hot
			this.work = work
			this.shortshow = shorShow
			this.vide = vide
			this.ceate = ceate
			var isLogin = JSON.parse(localStorage.getItem("isLogin"))

			if(this.$route.params.user && (!(JSON.stringify(isLogin) == "{}"))) {
				var userMsgs = this.$route.params.user
				console.log("sss ==>", userMsgs)
				this.libs[3].path.params.user = userMsgs
				console.log('this.libs[3].path.user =>',this.libs[3].path.user)

				localStorage.setItem("userMsgs", JSON.stringify(userMsgs))
				var len = JSON.parse(localStorage.getItem("userMsgs"))
				//			console.log("this len==>",len)

				for(var i = 0; i < userMsgs.length; i++) {
					for(var j = 0; j < len.length; j++) {
						if(len[j].uid == userMsgs[i].uid) {
							this.userMsg = userMsgs[i]
						}
					}

				}
				this.creat.title = this.userMsg.nickname
				this.creat.btntext = '会员充值'
				this.creat.url = require('../assets/2.jpeg')
			}else {
				
				this.userMsg.nickname = '亲爱的游客'
				var st = document.getElementById('yy')
				this.creat.title = '大侠登录一个呗'
				this.creat.btntext = '立即登录'
				this.creat.url = require('../assets/touxiang.png')

			}

		},
		mounted() {
			const me = this 
		}
	}
</script>

<style lang="less">
	.main {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F0F0F0;
		.sticy {
			width: 1.6rem;
			height: 1.6rem;
			position: -webkit-sticky;
			position: sticky;
			bottom: 1rem;
			right: 2rem;
			z-index: 1;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.nav-top {
			width: 100%;
			height: 1.1rem;
			background: #FFFFFF;
			padding-top: .5rem;
			text-align: center;
			line-height: 1.1rem;
			.wel {
				color: rgba(185, 51, 33, 0.8);
				line-height: 0.6rem;
				text-shadow: 1px 1px 10px red;
			}
			.logo {
				.img-logo {
					width: 3rem;
					height: .7rem;
				}
			}
			.img-search {
				width: .7rem;
				height: .7rem;
			}
		}
		.nav-content {
			.van-tabs__nav {
				background: #B93321;
				.van-tab {
					font-weight: normal;
					color: #CCCCCC;
				}
				.van-tab--active {
					font-weight: 500;
					color: #fff;
				}
				.van-tabs__line {
					color: white;
				}
			}
			.swipe {
				height: 120px;
			}
			.nav-list {}
			.libs-li {
				width: 25%;
				display: inline-block;
				text-align: center;
				background: #FFFFFF;
				padding-bottom: .2rem;
				div {
					padding: 0.2rem .5rem 0.2rem .5rem;
				}
				i {
					font-style: normal;
					color: rgba(0, 0, 0, .8);
				}
			}
			.content {
				border-top: .3rem solid #F0F0F0;
				padding-top: 5px;
				background: #FFFFFF;
				h5 {
					margin: 0;
					font-size: 14px;
					padding: .2rem 0 .2rem 0.2rem;
					border-left: 2px solid #B93321;
				}
				.content-li {
					padding: .2rem 0 .2rem 0;
					border-bottom: 1px solid #F0F0F0;
					.content-img {
						width: 2rem;
						height: 2.66rem;
						padding: 0rem 0.2rem 0.3rem 0.2rem;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.content-text {
						h4,
						h6,
						h5,
						p {
							margin: 0;
						}
						h4 {
							font-size: 14px;
							i {
								margin-left: 10px;
								font-size: 8px;
								padding: 1px;
								font-style: normal;
								background: green;
								color: #fff;
								border-radius: 3px;
							}
						}
						p {
							padding: 0.2rem 0.3rem 0.1rem 0;
							height: .8rem;
							overflow: hidden;
							color: rgba(0, 0, 0, 0.6);
						}
						h6 {
							float: left;
							padding: 0 5px 0 0;
							color: rgba(0, 0, 0, .6);
							font-size: 12px;
							margin: 0.2rem .4rem 0.2rem 0;
						}
						h5 {
							float: left;
							border-left: 1px solid gray;
							padding: 0 5px 0 5px;
							color: rgba(0, 0, 0, .6);
							font-size: 12px;
							margin: 0.2rem .4rem 0.2rem 0rem;
							padding-left: .4rem;
						}
						b {
							float: right;
							color: orange;
							border: 1px solid orange;
							margin-right: .6rem;
						}
					}
				}
				i {
					font-style: normal;
					font-size: 14px;
					color: #B93321;
				}
				.paihang {
					line-height: .7rem;
					color: rgba(0, 0, 0, .8);
					padding-bottom: .2rem;
					img {
						margin-left: .4rem;
						width: .666rem;
						height: .666rem;
					}
					span {
						margin-top: .2rem;
						display: inline-block;
						margin-left: .5rem;
						width: .4rem;
						height: .4rem;
						text-align: center;
						line-height: .4rem;
						color: grey;
						border-radius: 50%;
						border: 1px solid grey;
					}
					.renqi {
						text-align: right;
						padding-right: .4rem;
						b {
							color: #B93321;
						}
					}
				}
			}
			.search {
				border-top: .5rem solid #F0F0F0;
				border-bottom: .5rem solid #F0F0F0;
			}
		}
		.classify {
			background: #F0F0F0;
			padding: .2rem 0 .5rem 0;
			color: rgba(0, 0, 0, 0.8);
			font-weight: 1000;
			/*background: pink;*/
			text-align: center;
		}
		.footer {
			background: #F0F0F0;
			padding: 0 .4rem .4rem .4rem;
			text-align: center;
			font-size: 12px;
			color: rgba(0, 0, 0, .6);
			line-height: .7rem;
			h1 {
				font-size: 14px;
			}
		}
		.login {
			background: #FFFFFF;
			position: relative;
			.login-in {
				height: 1.4rem;
				img {
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: .8rem;
					height: .8rem;
					margin: .4rem;
					float: left;
				}
				b {
					position: relative;
					line-height: 1.5rem;
					left: 1.5rem
				}
				.btn {
					width: 2.1rem;
					height: 1rem;
					background: #B93321;
					border: #B93321;
					margin-top: .26rem;
					font-size: 12px;
				}
			}
			.login-vip {
				text-align: center;
				line-height: 1rem;
				padding: .4rem 0 .1rem 0;
				img {
					width: .8rem;
					height: .8rem;
				}
				i {
					position: relative;
					top: -.25rem;
					font-style: normal;
					padding: .2rem;
				}
			}
		}
		.content-lis {
			background: #FFFFFF;
			border-bottom: 1px solid #F0F0F0;
			.sex {
				height: 1.1rem;
				color: rgba(0, 0, 0, .6);
				margin-top: 0;
				font-size: 14px;
				padding: .5rem 0 0 .5rem;
				border-bottom: 1px solid #F0F0F0;
			}
			.lis {
				text-align: center;
				background: #FFFFFF;
				li {
					float: left;
					border-bottom: 1px solid #f0f0f0;
					border-right: 1px solid #F0F0F0;
					display: inline-block;
					width: 33%;
					padding: .2rem 0 0.5rem;
					font-size: 16px;
					font-weight: 1000;
					color: rgba(0, 0, 0, .8);
					p {
						margin: 0;
					}
					i {
						font-size: 12px;
						font-weight: normal;
						font-style: normal;
						color: rgba(0, 0, 0, .6);
					}
				}
			}
		}
		.hot-top {
			h1 {
				background: #E6E6E6;
				font-size: 12px;
				color: rgba(0, 0, 0, 0.6);
				margin: 0;
				padding: .5rem 0 0.4rem .4rem;
			}
			.hot {
				display: block;
				height: 1.6rem;
				background: #FFFFFF;
				line-height: .7rem;
				color: rgba(0, 0, 0, .8);
				font-size: 14px;
				position: relative;
				.fl-img {
					position: absolute;
					left: 0;
					width: 1rem;
					height: 1rem;
					margin: .2rem;
				}
				p {
					position: absolute;
					left: 1.5rem;
				}
			}
		}
		.seek {
			background: #F0F0F0;
			margin: .2rem 0 .2rem 0;
			.van-search__content {
				background: #fff;
			}
		}
		.van-search {}
	}
</style>