<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'

	}
</script>

<style lang="less">
	body {
		margin: 0 auto;
		padding: 0;
		max-width:400px;
	}
	.spirnner {
			position: fixed;
			top: 45%;
			left: 45%;
			z-index: 1000;
		}
	.auto-img {
		display: block;
		width: 100%;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	ul,
	ol,
	li {
		list-style: none;
	}
	
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
	
	.seek {
		background: #F0F0F0;
		margin: .2rem 0 .2rem 0;
		.van-search__content {
			background: #fff;
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
</style>