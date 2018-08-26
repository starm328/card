<template>
	<div class="home-index">
			<swiper previous-margin="40px" next-margin="40px" current="0" v-if="!auth.proxy.token">
				<block>
					<swiper-item item-id="dd" class="active">
						<div class="swiper-content">
								<div class="imgno">
									<open-data type="userAvatarUrl" class="img"></open-data>
								</div>
								<button type="default" class="stm-mt10" open-type="getUserInfo" @getuserinfo="onGotUserInfo">授权登录</button>
						</div>
					</swiper-item>
				</block>
			</swiper>
			<swiper previous-margin="40px" next-margin="40px" current="0" v-if="auth.proxy.token && !auth.proxy.token.is_new">
				<block>
					<swiper-item item-id="dd" class="active">
						<div class="swiper-content">
								<div class="imgno">
									<open-data type="userAvatarUrl" class="img"></open-data>
								</div>
								<button type="default" class="stm-mt10" @click="gosign">注册</button>
						</div>
					</swiper-item>
				</block>
			</swiper>
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
			share:''
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			console.log(res.target.dataset)
			return {
				title: res.target.dataset.name,
				path: '/pages/Home/show/main?id='+res.target.dataset.id,
				imageUrl:res.target.dataset.img,
			}
		}
	},
	methods: {
		onGotUserInfo(e) {
			if(e.target.errMsg == 'getUserInfo:ok'){
				Auth.login(e.target)
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
			margin:20px 0 20px 0;
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
		padding-top:50px;
		height:70vh;
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
							padding:5px 20px;
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
						}
						dl{
							display:flex;
							margin-top:3px;
							margin-bottom:10px;
							padding:0 20px;
							max-height:105px;
							overflow:hidden;
							dt{
								flex:1;

							}
							dd{
								flex:1;
								margin-left:1px;
								font-size:0;
								.img{
									width:calc(50% - 2px);
									float:left;
									margin-left:2px;
									display:block;
									vertical-align: bottom;
									margin-bottom:2px;
								}
							}
						}
					}
				}
			}
			&.active{
				opacity:1;
				height:60vh;
				.swiper-content,.box-main{
					width:100%;
					height:100%;
					transform:scale(1);
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
			padding-bottom:20px;
			height:auto;
			margin-top:-50px;
		}
		.nave{
			margin-top:20px;
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
		p{
			i{
				display:block;
				font-size:35px;
			}
			color:#999;
			font-size:13px;
		}
	}
	.dots{
		position: absolute;
		width: 100%;
		z-index: 2;
		left: 0;
		top: 20px;
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
