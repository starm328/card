<template>
	<div class="home-index">
		<div style="height:75vh;padding-top:40px;" v-if="!auth.proxy.token">
			<div class="swiper-content"   >
					<div class="imgno">
						<open-data type="userAvatarUrl" class="img"></open-data>
					</div>
					<button type="default" class="stm-mt10" open-type="getUserInfo" @getuserinfo="onGotUserInfo">授权登录</button>
			</div>
		</div>
		<div style="height:75vh;padding-top:40px;" v-if="auth.proxy.token && !auth.proxy.token.is_new">
			<div class="swiper-content" >
					<div class="imgno">
						<open-data type="userAvatarUrl" class="img"></open-data>
					</div>
					<button type="default" class="stm-mt10" @click="gosign">注册</button>
			</div>
		</div>

			<div v-else-if="auth.proxy.token">
				<stm-swiper></stm-swiper>
			</div>
			<stm-phone v-if="sign" @log="oversign"></stm-phone>

	</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/utils/Auth';
import StmSwiper from '@/components/home/index';
import Phone from '@/components/phone/phone';
var util = require('@/utils/md5.js')

export default {

	name: 'home-index',
	components:{
		'stm-swiper':StmSwiper,
		'stm-phone':Phone,
	},
	onShow() {
	},
	data () {
		return {
			auth:Auth,
			sign:false,
			share:'',
			navgationHeight:''
		}
	},
	onLoad(option) {
		if(option.pid){
			wx.setStorageSync('pid',option.pid)
		}else if(option.scene){
			wx.setStorageSync('pid',option.scene)

		}
		const updateManager = wx.getUpdateManager()
		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function (res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})

		updateManager.onUpdateFailed(function () {
			// 新的版本下载失败
			wx.showModal({
				title: '更新提示',
				content: '新版本下载失败',
				showCancel:false
			})
		})
		wx.hideShareMenu()
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			var getshare = res.target.dataset
			console.log(getshare)
			var date = new Date().getTime()
			console.log('/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id)
			return {
				title: '嗨，我是 '+ getshare.name + '，这是我名片！把你名片发我哦！',
				path: '/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id,
				imageUrl:getshare.img,
			}
		}
	},
	methods: {
		onGotUserInfo(e) {
			if(e.target.errMsg == 'getUserInfo:ok'){
				Auth.login(e.target)
				wx.setStorageSync('WxUser',e.target.userInfo.nickName)
			}else {

			}
		},
		gosign() {
			this.sign = true;
		},
		oversign(){
			this.sign = false;
			Auth.refresh(this.auth.proxy.token.access_token)
		},

	}

}
</script>

<style lang="less">
@import '../../../configs/style.less';
@import '../../../configs/dialog.less';
@import '../../../configs/cell.less';
.home-index{
	height:100%;
	background:#212121;
	position:relative;
	.swiper-content{
		background:#fff;
		width:100%;
		margin:0 auto;
		height:100%;
		border-radius:10px;
		transform:scale(0.8);
		transition: transform 0.5s;
		text-align:center;
		overflow:hidden;
		position:relative;
		form{
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
			button{
				display:block;
				width:100%;
				height:100%;
			}
		}
		button{
			width:auto;
			display:inline-block;
			margin:0 auto;
			border:0;
			background:none;
			font-size:@fontthree;
			color:@maincolor;
			&:after{
				border:1px solid @maincolor;
			}
		}
		i{
			font-size:@fontsix;
			margin-top:10px;

		}
		h5{
			font-size:@fontfive;
			margin:10px 0 10px 0;
			font-weight:bold;
			padding:0 10px;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
		}
		h6{
			font-size:@fontthree;
		}
		p{
			color:@fontcolor;
			padding:0 10px;

			font-size:@fonttwo;
			margin-bottom:10px;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;

		}
		span{
			padding:0 10px;

			font-size:@fonttwo;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
		}
		.img{
			width:100%;
			display:block;
			margin:0 auto;
		}
		.imgno{
				padding:10%;
			img{
				width:100%;
				display:block;
				margin:0 auto;
			}
		}
	}
	swiper{
		height:450px;
		.wx-swiper-dot{
			margin-top:10px;
		}
		swiper-item{
			opacity: 0.5;
			.swiper-box{
				.box-main{
					transform:scale(0.8);
					transition: transform 0.5s;
					.clip{
						.title{
							padding:5px 20px 0 20px;
							p{
								float:left;
								font-size:30px;
								padding-top:2px;
								font-weight:bold;
								color:#4d4d4d
							}
							span{
								float:right;
								color:@fontcolor;
								text-align:right;
								font-size:@fonttwo;
							}
							&:after{
								clear:both;
								display:block;
								content:'';
							}
						}
					}
					.m-nav{
						background:#fff;
						width:100%;
						margin:0 auto 5px auto;
						height:100%;
						border-radius:10px;
						text-align:center;
						overflow:hidden;
						padding:10px 0;
						ul{
							display:flex;
							li{
								flex:1;
								p{
									font-size:@fontone
								}
								&:nth-child(1) i {
										color:@maincolor;
								}
								&:nth-child(2) i{
										color:#c28e40
								}
								&:nth-child(3) i{
										color:#7f81bc
								}
								&:nth-child(4) i{
										color:#2fd2b1
								}
							}
						}
					}
					.box{
						background:#fff;
						width:100%;
						margin:0 auto 5px auto;
						height:100%;
						border-radius:10px;
						text-align:center;
						overflow:hidden;
						padding:4px 0;
						h5{
							text-align:left;
							text-indent:20px;
							font-size:@fontthree;
							font-weight:bold;
							color:#4d4d4d;
							line-height:30px;
						}
						.li{
							display:flex;
							margin-top:5px;
							p{
								i{
									font-size:30px;
									color:@maincolor;
								}
								font-size:@fonttwo;
								flex:1;
								text-align:center;
							}
						}

					}
					.content{
						p{
							text-align:left;
							line-height:35px;
							text-indent:20px;
							margin-bottom:0
						}
						dl{
							display:flex;
							margin-top:3px;
							margin-bottom:10px;
							padding:0 20px;
							width:85%;
							min-height:105px;
							max-height:120px;
							overflow:hidden;
							dt{
								flex:1;
								height:100%;
							}
							dd{
								flex:1;
								margin-left:1px;
								font-size:0;
								height:100%;
								.img{
									width:calc(50% - 2px);
									float:left;
									margin-left:2px;
									display:block;
									vertical-align: bottom;
									margin-bottom:2px;
									height:50%;
									background:#eee;
								}
							}
						}
					}
				}
			}
			&.active{
				opacity:1;
				.swiper-content,.box-main{
					width:100%;
					transform:scale(0.9);
					transition: transform 0.5s;
				}
			}

		}
	}
	.share-card-main{
		position:fixed;
		width:100%;
		background:rgba(000,000,000,0.7);
		height:100%;
		top:0;
		z-index:999;
		.swiper-content{
			transform:scale(1);
			width:75%;
			height:70vh;
			padding-bottom:20px;
			margin-top: -30px;

		}
		.nave{
			width:100%;
			position:absolute;
			bottom:20px;
			left:0;
			h5{
				width:100%;;
				text-align:center;
				i{
					background:#fff;
					color:#999;
					width:50px;
					height:50px;
					border-radius:50%;
					display:block;
					line-height:50px;
					margin:0 auto;
					font-size:20px;
					transform: rotate(45deg);
				}
				p{
					color:#fff;
					font-size:@fonttwo;
				}
			}
			ul{
				margin-top:20px;
				display:flex;
				li{
					flex:1;
					text-align:center;
					button{
						margin:0;padding:0;
						background:none;
						&:after{
							display:none;
						}
					}
					i{
						background:#fff;
						color:#999;
						width:50px;
						height:50px;
						border-radius:50%;
						display:block;
						line-height:50px;
						margin:0 auto;
						font-size:20px;
					}
					p{
						color:#fff;
						font-size:@fonttwo;
						margin-top:5px;
					}
				}
			}
		}
	}
	.share-card{
		position:absolute;
		bottom:20px;
		text-align:center;
		width:100%;
		display:flex;
		p{
			margin:0 auto;
			color:#fff;
		}
		div{
			color:#999;
			font-size:13px;
			flex:1;
			text-align:center;
			i{
				display:block;
				font-size:35px;
			}

			button{
				line-height:35px;
			}
		}
	}
	.dots{
		position: absolute;
		width: 100%;
		z-index: 2;
		left: 0;
		top:40px;
		pointer-events: none;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: end;
		-ms-flex-align: end;
		align-items: flex-end;
		-webkit-animation: slider-pagination-opacity .3s linear .4s forwards;
		animation: slider-pagination-opacity .3s linear .4s forwards;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		p{
			width:8px;
			height:8px;
			border-radius:50%;
			background:#171a23;
			float:left;
			margin:0 4px;
			&.active{
				background:#3a4254;
			}
		}
	}
	.clockshow{
		display:block;
		.stm-cell {
			font-size:@fonttwo;
			padding-left:10px;
		}
	}
}
</style>
