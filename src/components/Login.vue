<template>
	<div class="login">
	<div class="nav">
		<van-nav-bar title="登录" left-text="返回" right-text="★" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
	</div>
		<div class="adam">
			<img class="auto-img" src="../assets/2.jpeg"/>
		</div>
		<van-row>

			<van-col offset="2" span="20">
				<van-cell-group>
					<van-field label='※ 手机号' v-model="userInfo.phone" placeholder="请输入手机号"/>
					<van-field label='※ 密码' v-model="userInfo.pwd" placeholder="请输入密码(8-16位)" type='password' />
					</van-field>
				</van-cell-group>
				<van-button class="login-btn" size="large" type="info" @click='login'>登录</van-button>

			</van-col>
		</van-row>
		<p @click="goPath({name:'Register'})">还未有账号，前往注册吧~</p>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar,Dialog,CellGroup,Field } from 'vant';
	import qs from 'qs'
	Vue.use(NavBar).use(Dialog);
	import validForm from '../util/validForm.js'
	
	export default {
		name: 'Login',
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,

			//			[Dialog.name]:Dialog
		},
		
		
		data() {
			return {
				validCode: '',
				
				//用户列表
				users: [],

				userInfo: {phone: '',pwd: ''}
				
				

			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				Toast('按钮');
			},
						login() {
				if(!validForm.validPhone(this.userInfo.phone)) {
					Dialog.alert({
						title: '手机号码不正确'
					}).then(() => {
						this.userInfo.phone = ''
					})
				} else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					Dialog.alert({
						title: '密码仅支持以 !_@.字母,数字开头'
					}).then(() => {
						this.userInfo.pwd = ''
					})
				} else {
					var userData = localStorage.getItem('users')
					if(userData) {
						//如果存在任何用户
						this.users = JSON.parse(userData)
//						console.log(this.users)
						for(var i = 0; i < this.users.length; i++) {
							if(this.users[i].phone == this.userInfo.phone) {
								
								if(this.users[i].pwd == this.userInfo.pwd) {
									localStorage.setItem('isLogin', JSON.stringify({userId: this.userInfo.phone, loginStatus: true}));
									      
									 return this.$router.push({name: 'Main',params:{user:this.users}})
									
								} else {
									Dialog.alert({
										title: '手机号码或者密码不正确'
										
									})
									return
								}
							}

						}
					}
					//该用户不存在
					Dialog.alert({title: '该用户不存在！'})
				}
				 
			},
			goState(){
				this.$router.push({name:'Main'})
			

		},
		goPath(path){
			this.$router.push(path)
		}
			
		},
		created() {
					
			}
			
	}
</script>

<style lang="less">
	.login{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(185,51,33,.2);
		.adam{
			width: 3.5rem;
			height: 3.5rem;
			margin: 1rem auto;
			border-radius:50% ;
			overflow:hidden;
			border:.2rem solid rgba(185,51,33,.5);
			
			img{
				width: 100%;
				height: 100%;
				/*background: transparent;*/
			}
			
		}
		.van-cell-group{
				background:transparent;
				.van-cell{
				background:transparent;
				color: #fff;
				text-shadow: 0 0 10px #B93321;
				border-bottom: 1px solid #fff;
			}
			
			}
			.van-button--info{
				margin-top: 2rem;
				background: rgba(185,51,33,.5);
				border: 1px solid rgba(185,51,33,.5);
			}
		p{
			margin-top: 1rem;
			text-align: center;
				text-shadow: 0 0 10px #B93321;
				color: #fff;
				text-decoration: 1px solid #f0f0f0;
			
		}
	}
	
			
</style>