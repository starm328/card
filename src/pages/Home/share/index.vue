<template>
	<div class="home-card-show" v-if="cardData">
		<div class="top-img">
			<img :src="cardData.card.img_url" class="img" mode="aspectFill">
		</div>
		<div class="card-show-none"></div>
		<div class="card-show-main">
			<div class="card-show-information">
				<div class="me-information">
					<h5>{{cardData.card.name}}</h5>
					<p>{{cardData.card.company}}</p>
					<span>{{cardData.card.position}}</span>
				</div>
				<div class="me-phone" v-if="cardData.card.phoneconfig">
					<p>{{cardData.card.phone}}<i @click="tel(cardData.card.phone)"  class="iconfont icon-dianhua"></i></p>
					<p>{{cardData.card.trade}}</p>
					<p>{{cardData.detail.email}}</p>
				</div>
				<div class="me-address">
					<p>{{cardData.card.area}}{{cardData.detail.address}}</p>
					<stm-navigation :cardData="cardData" v-if="cardData"></stm-navigation>
				</div>
				<!-- <div class="me-authentication" @click="authentication">
					<p>认证</p>
					<div class="icon">
						<i class="iconfont icon-huiyuan21">
							<em class="iconfont icon-renzheng"></em>
						</i>
						<i class="iconfont icon-yinhangqia">
							<em class="iconfont icon-renzheng"></em>
						</i>
						<i class="iconfont icon-qiyejianjie">
							<em class="iconfont icon-renzheng"></em>
						</i>
						<i class="iconfont icon-renzheng">
							<em class="iconfont icon-renzheng"></em>
						</i>
					</div>
				</div> -->
			</div>
			<div class="card-nav-li">
				<p @click="gocode"><i class="iconfont icon-xiaochengxu"></i>名片码</p>
				<p  @click="gobanner"><i class="iconfont icon-guanggaowei"></i>名片海报</p>
				<p><i class="iconfont  icon-renqi"></i>人气(1)</p>
				<p><i class="iconfont icon-shou"></i>靠谱(1)</p>
			</div>
			<div class="card-nav-btn">
				<p @click="Preservation">保存到通讯录</p>
				<p>收藏</p>
				<p @click="cardrequest">交换</p>
				<p>聊天</p>
			</div>

			<div class="card-tile">
				他的超级名片
			</div>
			<div class="card-other" v-if="cardfirm && cardfirm.length > 0">
				<div class="title">
					<h5>公司介绍</h5>
					<p @click="playvideo1 = !playvideo1"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video :src="cardfirm[0].video"   controls v-if="playvideo1"></video>

				<div class="summer">
					{{cardfirm[0].desc}}
				</div>

				<swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0" style="height:240px;">
					<block v-for="(item,i) in bill" :key="i">
						<swiper-item  class="banner">
								 <img :src="item" style="width:100%" @click="previewImage(bill,i)">
						</swiper-item>
					</block>

				</swiper>
			</div>
			<div class="card-other" v-if="product && product.length > 0">
				<div class="title">
					<h5>产品介绍</h5>
					<p @click="playvideo2 = !playvideo2"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video :src="product[0].video"   controls v-if="playvideo2"></video>
				<div class="summer">
					{{product[0].desc}}
				</div>
				<swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0" style="height:240px;">
					<block v-for="(item,i) in proimg" :key="i">
						<swiper-item  class="banner">
								 <img :src="item" style="width:100%" @click="previewImage(proimg,i)">
						</swiper-item>
					</block>
				</swiper>

			</div>
			<div class="card-nav-wBtn" style="margin-top:10px;" @click="zhizuo" v-if="!Auth.proxy.token">
					制作我的名片
				</div>
			<div style="height:45px"></div>

		</div>

		<!-- <div class="bottom-nav" v-if="bottomNav">
			<p @click="showSkin"><i class="iconfont icon-caidan"></i></p>
			<ul>
				<li @click="activity">我的活动(0)</li>
				<li @click="product">我的产品(0)</li>
			</ul>
			<span><button open-type="share"><i class="iconfont icon-fenxiang"></i></button></span>
		</div>

		<div class="skin-warp" :class="[isShow && bottomNav? 'show':'hidden']">
			<ul>
				<li @click="Enterprise">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑超级名片</p>
				</li>
				<li>
					<i class="iconfont icon-shanchu"></i>
					<p>删除</p>
				</li>
			</ul>
		</div> -->

	</div>
</template>

<script>
import configs from '@/utils/configs';
import Navigation from '@/components/home/navigation';
import Auth from '@/utils/Auth';

export default {
	name: 'home-card-show',
	components: {
		"stm-navigation" : Navigation,

	},
	data () {
		return {
			bottomNav:false,
			isShow:false,
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 1000,
			playvideo:0,
			cardData:'',
			sign:false,
			Auth:Auth,
			id:'',
			product:'',
			proimg:'',
			playvideo2:false,
			playvideo1:false,
			cardfirm:'',
			bill:'',


		}
	},
	onLoad(option) {
		console.log(option)
		console.log( decodeURIComponent(option.scene))
		if(option.pid){
			wx.setStorageSync('pid',option.pid)
		}
		wx.setNavigationBarTitle({
			title:'名片详情'
		})
		var _this = this;
		_this.id = option.id;
		wx.pro.request({
			url:`${configs.card.apiBaseUrl}api/index/showcard/`+option.id + '/'+ option.time +'/'+option.token,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == 200){
				wx.hideLoading ();
				console.log(d.data)
				_this.cardData = d.data
				_this.product = d.data.products
				_this.proimg = d.data.products[0].img.split(',')
				if(d.data.firm.length > 0){
					_this.cardfirm = d.data.firm
					_this.bill = d.data.firm[0].img.split(',')
				}
			}
			// 2XX, 3XX
		})
		.catch(err => {
			if(err.statusCode == 404){
				wx.showModal({
					title: '你不能查看他的名片',
					icon: 'none',
					duration: 2000,
					success: function(res) {
						if (res.confirm) {
							wx.redirectTo({
								url: '/pages/Home/index/main',
							})
						} else if (res.cancel) {
							wx.redirectTo({
								url: '/pages/Home/index/main',
							})
						}
					}

				})

			}else if(err.statusCode == 500){
				wx.showModal({
					title: '系统错误',
					icon: 'none',
					duration: 2000,
					success:()=>{
						wx.redirectTo({
							url: '/pages/Home/index/main',
						})
					}
				})
			}
			// 网络错误、或服务器返回 4XX、5XX
		})
	},
	methods:{
		cardrequest() {
			if(Auth.proxy.token){
				var _this = this;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/cardrequest/`+this.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();

						if(d.data.msg){
							wx.showToast({
								title: d.data.msg,
								icon: 'none',
								duration: 4000,
							})
						}else{
							wx.showToast({
								title:"发送交换申请",
								icon: 'success',
								duration: 4000,
							})
						}
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.hideLoading ();
						if(Auth.proxy.token.access_token){
							Auth.refresh(Auth.proxy.token.access_token);
							this.cardrequest();
						}
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}else{
				wx.showToast({
					title: '你为登陆或未注册',
					icon: 'none',
					duration: 4000,
					success:()=>{
						 wx.navigateTo({
							url: '/pages/Home/index/main',
						})
					}
				})

			}

		},
		video(n){
			this.playvideo = n
		},
		showSkin() {
			this.isShow = !this.isShow
		},
		tel(num){
			wx.makePhoneCall({
				phoneNumber: num //仅为示例，并非真实的电话号码
			})
		},
		authentication(){
			wx.navigateTo({
			  url: '/pages/Home/show/authentication/main'
			})
		},
		card() {
			wx.navigateTo({
			  url: '/pages/index/main'
			})

		},
		activity() {
			wx.navigateTo({
			  url: '/pages/Activity/main'
			})
		},
		product() {
			wx.navigateTo({
			  url: '/pages/Enterprise/AdmProduct/main'
			})
		},
		Enterprise(){
			wx.navigateTo({
			  url: '/pages/Enterprise/Template/Introduce/main'
			})
		},
		Preservation(){
			wx.addPhoneContact({
				firstName: this.cardData.card.name,   //名字
				mobilePhoneNumber: this.cardData.card.phone,    //手机号
				success(){
					wx.showToast({
					  title: '储存成功',
					  icon: 'success',
					  duration: 2000
					})
				},
			})
		},
		gocode(){
			wx.navigateTo({
			  url: '/pages/Card/Code/main'
			})
		},
		gobanner(){
			wx.navigateTo({
			  url: '/pages/Card/Banner/main'
			})
		},
		map() {
			wx.openLocation({
				latitude: 31.302466,
				longitude: 121.449396,
				scale: 18,
				name: '中环时代广场',
				address:'江场西路299弄'
			})
		},
		zhizuo() {
			wx.navigateTo({
				url: '/pages/Home/index/main',
			})
		},
		previewImage(img,i) {
			wx.previewImage({
				current: img[i], // 当前显示图片的http链接
				urls: img // 需要预览的图片http链接列表
			})
		}
	},
	onPageScroll(Object){
		if(Object.scrollTop >200){
			this.bottomNav = true
		}else{
			this.bottomNav = false
		}
	},

	oversign(){
		this.sign = false;
		Auth.refresh(this.auth.proxy.token.access_token)
	},
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';

.home-card-show{
	background:#242b35;
	.skin-warp{
		background:#eee;
		position:fixed;
		bottom:45px;
		width:100%;
		height:0;
		transition:height 0.2s;
		box-shadow: 0px -2px 9px 0px rgba(0, 0, 0, 0.1607843137254902);
		&.show{
			height:100px;
			overflow:hidden
		}
		&.hidden{
			height:0;
			overflow:hidden
		}
		ul{
			padding-top:10px;
			display:flex;
			li{
				margin:0 20px;
				p{
					font-size:@fonttwo;
					text-align:center;
					color:#999;
					margin-top:4px;
				}
				i{
					background:#fff;
					width:60px;
					height:60px;
					text-align:center;
					line-height:60px;
					color:#999;
					margin:0 auto;
					border-radius:5px;
				}
			}
		}
	}
	.top-img{
		position:fixed;
		top:0;
		width:100%;
		z-index:2;
		img{
			width:100%;
			height:350px;
		}
	}
	.card-show-none{
		height:350px;
	}
	.bottom-nav{
		position:fixed;
		bottom:0;
		width:100%;
		height:45px;
		background:#eee;
		line-height:45px;
		display:flex;
		p,span{
			flex:0 55px;
			text-align:center;
		}
		ul{
			flex:1;
			display:flex;
			li{
				flex:1;
				text-align:center;
				font-size:@fontone;
			}
		}
	}
	.card-show-main{
		background:#242b35;
		width:100%;
		min-height:100%;
		padding-bottom:20px;
		position:relative;
			z-index:3;
		.card-show-information{
			padding-bottom:30px;
			box-shadow: inset 0px -4px 9px 0px rgba(000,000,000,0.6);
			.me-information{
				padding:10px 20px;
				h5{
					color:#fff;
					font-size:@fontfive;
					font-weight:bold;
					margin-bottom:10px;
				}
				p,span{
					font-size:@fontthree;
					color:rgb(171, 175, 186);
				}
			}
			.me-phone{
				padding:20px;
				color:rgb(171, 175, 186);
				p{
					display:flex;
					i{
						margin-left:10px;
					}
				}
				span{
					background:rgb(171, 175, 186);
					color:#242b35;
					border-radius:40px;
					padding:5px 10px;
					font-size:@fontthree;
					margin-left:20px;
				}
			}
			.me-address{
				padding:20px;
				display:flex;
				p{
					color:rgb(171, 175, 186);
					flex:0 70%;
					font-size:@fonttwo;
				}
				i{
					flex:1;
					text-align:center;
					color:rgb(171, 175, 186);
					font-size:40px;
				}
			}
			.me-authentication{
				p{
					color:#fff;
					font-size:@fonttwo;
				}
				display:flex;
				padding:0 20px;
				.icon{
					display:flex;
					i{
						font-size:@fontthree;
						position:relative;
						margin:0 20px;
						&:nth-child(1) {
								color:@maincolor;
						}
						&:nth-child(2) {
								color:#c28e40
						}
						&:nth-child(3) {
								color:#7f81bc
						}
						&:nth-child(4) {
								color:#2fd2b1
						}
						em{
							position:absolute;
							right:-4px;
							bottom:0px;
							font-size:12px;
							z-index:2;
							background:#242b35;
							border-radius:50%;
						}
					}

				}

			}
		}
		.banner{
			.img{
				width:100%;
			}
		}
		.card-nav-li{
				margin:20px;
				display:flex;
				p{
					flex:1;
					text-align:center;
					color:#fff;
					font-size:@fonttwo;
					i{
						margin-bottom:5px;
						font-size:@fontthree
					}
				}
		}
		.card-nav-btn{
			display:flex;
			padding:20px;
			p{
				text-align:center;
				background:@maincolor;
				color:#fff;
				font-size:@fonttwo;
				border-radius:40px;
				padding:10px 0;
				&:nth-child(1){
					flex:0 45%;
				}
				&:nth-child(2){
					flex:0 30%;
					margin:0 10px;
					background:#c28e40
				}
				&:nth-child(3){
					flex:0 30%;
					background:#7f81bc
				}
				&:nth-child(4){
					margin-left: 10px;
					flex:0 30%;
					background:#2fd2b1
				}
			}
		}
		.card-other{
			margin-top:20px;
			padding:0 20px;
			video{
				width:100%;
				margin:10px auto 0 auto;
			}
			.title{
				display:flex;
				h5{
					flex:1;
					text-align:left;
					color:rgb(171, 175, 186);
					font-size:@fontfive;
					border-left:2px solid rgb(171, 175, 186);
					padding-left:10px;
				}
				p{
					font-size:@fonttwo;
					flex:1;
					display:flex;
					text-align:right;
					margin-top:4px;
					color:rgb(171, 175, 186);
					i{
						flex:1;
						text-align:right;
						margin-right:5px;
					}
				}
			}
			.summer{
				font-size:@fonttwo;
				color:rgb(171, 175, 186);
				margin:20px 0;
			}
			.activity{
				margin-top:20px;
				color:rgb(171, 175, 186);
				p{
					font-size:@fonttwo;
				}
				span{
					font-size:@fontone;
				}
				h5{
					font-size:@fontthree;
				}
			}
		}
		.card-tile{
			text-align:center;
			color:#fff;
			font-size:@fonttwo;
			border-radius:40px;
			padding:10px 0;
			box-shadow: 0px -5px 8px 0px rgb(0, 0, 0, 0.1);
		}
		.card-nav-wBtn{
			text-align:center;
			background:#5e9fff;
			color:#fff;
			font-size:@fonttwo;
			border-radius:40px;
			padding:10px 0;
			margin:0 20px;
		}
	}
}
</style>
