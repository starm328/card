<template>
	<div class="home-card-show" v-if="cardData">
		<div class="top-img" >
			<img :src="cardData.card.img_url" class="img">
		</div>
		<div class="card-show-main">
			<div class="card-show-information">
				<div class="me-information">
					<h5>{{cardData.card.name}}</h5>
					<p>{{cardData.card.company}}</p>
					<span>{{cardData.card.position}}</span>
				</div>
				<div class="me-phone">
					<p>{{cardData.card.phone}}<span @click="tel(cardData.card.phone)">拨打电话</span></p>
				</div>
				<div class="me-address">
					<p>{{cardData.card.area}}</p>
					<i class="iconfont icon-location" @click="map"></i>
				</div>
				<div class="me-authentication" @click="authentication">
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
				</div>
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
				我的超级名片
			</div>
			<div class="card-other">
				<div class="title">
					<h5>公司介绍</h5>
					<p @click="video(1)"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video src="" controls v-if="playvideo == 1"></video>

				<div class="summer">
					上海猫口袋信息科技有限公司专注于互联网服务，从
					始至终秉承为客户打造真正有价值的互联网平台的服
					务理念，通过专业、专注、专研的职业素养为企业提
					供高品质的个性服务，帮助各类企业策划并完成互联
					网战略规划
				</div>

				<swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0">
					<block>
						<swiper-item  class="banner">
								<open-data type="userAvatarUrl" class="img"></open-data>
						</swiper-item>
					</block>
					<block>
						<swiper-item  class="banner">
								<open-data type="userAvatarUrl" class="img"></open-data>
						</swiper-item>
					</block>
				</swiper>
			</div>
			<div class="card-other">
				<div class="title">
					<h5>产品介绍</h5>
					<p @click="video(2)"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video src=""   controls v-if="playvideo == 2"></video>
				<div class="summer">
					上海猫口袋信息科技有限公司专注于互联网服务，从
					始至终秉承为客户打造真正有价值的互联网平台的服
					务理念，通过专业、专注、专研的职业素养为企业提
					供高品质的个性服务，帮助各类企业策划并完成互联
					网战略规划
				</div>

				<swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0">
					<block>
						<swiper-item  class="banner">
								<open-data type="userAvatarUrl" class="img"></open-data>
						</swiper-item>
					</block>
					<block>
						<swiper-item  class="banner">
								<open-data type="userAvatarUrl" class="img"></open-data>
						</swiper-item>
					</block>
				</swiper>
			</div>

			<div class="card-other">
				<div class="title">
					<h5>最新活动</h5>
				</div>
				<div class="activity">
					<h6>某某活动</h6>
					<p>互动状态：激活/关闭</p>
					<p>活动时间：2018-12-12 下午1：30</p>
					<p>活动地点：上海上马路2323号</p>
					<p>活动人数：343人</p>
					<p>已报人数：23人</p>
					<p>活动简介：</p>
					<span>上海猫口袋信息科技有限公司专注于互联网服务，从
					始至终秉承为客户打造真正有价值的互联网平台的服
					务理念，通过专业、专注、专研的职业素养为企业提
					供高品质的个性服务，帮助各类企业策划并完成互联
					网战略规划。
					</span>
					<div class="card-nav-wBtn" style="margin-top:10px;">
						活动详情
					</div>
				</div>
				<div style="height:45px"></div>
			</div>
		</div>

		<div class="bottom-nav" v-if="bottomNav">
			<p @click="showSkin"><i class="iconfont icon-caidan"></i></p>
			<ul>
				<li @click="activity">我的活动(0)</li>
				<li @click="product">我的产品(0)</li>
			</ul>
			<span v-if="cardData.auth.shareconceal == 2"><button open-type="share" :data-id="cardData.card.id" :data-name="cardData.card.name" :data-img="cardData.card.img_url"><i class="iconfont icon-fenxiang"></i></button></span>
			<span v-else><button @click="share"><i class="iconfont icon-fenxiang"></i></button></span>
		</div>

		<div class="skin-warp" :class="[isShow? 'show':'hidden']">
			<ul>
				<li @click="Enterprise">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑名片</p>
				</li>
				<li>
					<i class="iconfont icon-shanchu"></i>
					<p>删除</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/configs';
import Auth from '@/utils/Auth';
export default {
	name: 'home-card-show',
	data () {
		return {
			bottomNav:false,
			isShow:false,
			indicatorDots: true,
			autoplay: false,
			interval: 5000,
			duration: 1000,
			playvideo:0,
			id:'',
			cardData:''
		}
	},
	onLoad(option) {
		console.log(option)
		this.id = option.id
		this.getdata()
	},
	onShow () {
		this.getdata()
	},
	onHide() {
		this.isShow = false
	},
	methods:{
		share() {
			wx.showToast({
				title: '此名片没有转发权限',
				icon: 'none',
				duration: 2000
			})
		},
		getdata() {
				var _this = this;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/showcard/`+this.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();
						console.log(d.data)
						_this.cardData = d.data
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.hideLoading ();
						if(Auth.proxy.token.access_token){
							Auth.refresh(Auth.proxy.token.access_token);
							this.getdata();
						}
					}
					// 网络错误、或服务器返回 4XX、5XX
				})

		},
		cardrequest() {
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
						console.log(d.data)
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
			  url: '/pages/Home/Edit/basic/main?id='+this.id
			})
		},
		Preservation(){
			wx.addPhoneContact({
				firstName: '王呵呵',   //名字
				mobilePhoneNumber: '123',    //手机号
				success(){
					wx.showToast({
					  title: '储存成功',
					  icon: 'success',
					  duration: 2000
					})
				},
				fail(){
					wx.showToast({
					  title: '储存失败',
					  icon: 'none',
					  duration: 2000
					})
				}
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
		}
	},
	onPageScroll(Object){
		if(Object.scrollTop >200){
			this.bottomNav = true
		}else{
			this.bottomNav = false
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';

.home-card-show{
	background:#242b35;
	.skin-warp{
		background:#eee;
		position:fixed;
		bottom:45px;
		width:100%;
		height:0;
		transition:height 0.2s;
		box-shadow: 0px -2px 9px 0px rgba(0, 0, 0, 0.1);
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
		img{
			width:100%;
			height:350px;
		}
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
			button{
				margin:0;
				padding:0;
				background:none;
				&:after{
					display:none;
				}
			}
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
		position:absolute;
		top:350px;
		background:#242b35;
		width:100%;
		min-height:100%;
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
