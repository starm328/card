<template>
	<div class="home-card-show" v-if="cardData">
		<scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
			<stm-nav :scrollTop="scrollTop" :card="cardData.card.img_url" :isback="isback"></stm-nav>
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
						<div class="play" @click="playaudio" v-if="cardData.detail.voice && stop"><i class="iconfont icon-bofang"></i></div>
						<div class="play" @click="stopaudio" v-if="cardData.detail.voice && !stop"><i class="iconfont icon-xiaochengxu"></i></div>
						<audio :src="cardData.detail.voice" id="myAudio"></audio>
					</div>
					<div class="me-honour" style="margin:0" v-if="cardData.card.phoneconfig == 2">
						<h5>手机</h5>
						<div>
							<dl>
								<dt>{{cardData.card.phone}}<i @click="tel(cardData.card.phone)" class="iconfont icon-dianhua"></i></dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" style="margin:0">
						<h5>行业</h5>
						<div>
							<dl>
								<dt>{{cardData.card.trade}}</dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" style="margin:0" v-if="cardData.card.email">
						<h5>邮箱</h5>
						<div>
							<dl>
								<dt>{{cardData.card.email}}</dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" style="margin:0" v-if="cardData.detail.phone">
						<h5>座机</h5>
						<div>
							<dl>
								<dt>{{cardData.detail.phone}}</dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" >
						<h5>地址</h5>
						<div>
							<dl>
								<dt>{{cardData.card.area}}{{cardData.detail.address}}<stm-navigation :cardData="cardData" v-if="cardData"></stm-navigation></dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" v-if="cardData.detail.desc !== ''">
						<h5>个性签名</h5>
						<div>
							<dl>
								<dt>{{cardData.detail.desc}}</dt>
							</dl>
						</div>
					</div>
					<div class="me-honour" v-if="cardData.honour.length > 0">
						<h5>获得荣誉</h5>
						<div>
							<dl v-for="(item,i) in cardData.honour" :key="i">
								<dd>{{item.title}}</dd>
								<dt>{{item.organization}}</dt>
							</dl>
						</div>
					</div>

				</div>
				<div class="card-nav-li">
					<p><i class="iconfont  icon-renqi"></i>人气(1)</p>
					<p><i class="iconfont icon-shou"></i>靠谱(1)</p>
				</div>
				<div class="card-nav-btn">
					<p @click="Preservation">保存到通讯录</p>
					<p @click="collection">收藏</p>
					<p @click="grouping">交换</p>
					<p @click="chats">聊天</p>
				</div>

				<div class="card-tile">
					他的超级名片
				</div>
				<div class="card-other" v-if="cardfirm && cardfirm[0]">
					<div class="title">
						<h5>公司介绍</h5>
						<p @click="playvideo1 = !playvideo1"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
					</div>
					<video :src="cardfirm[0].video"   controls v-if="playvideo1"></video>

					<div class="summer">
						{{cardfirm[0].desc}}
					</div>
					<div class="showimg" :style="[billmore? 'height:300px;overflow:hidden':'height:auto']">
						<img :src="item" v-for="(item,i) in bill" :key="i"   mode="widthFix" @click="previewImage(bill,i)">
					</div>
					<p class="more" v-if="bill.length > 1 && billmore" @click="lookmore('bill')">展示全部<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(90deg);"></i></p>
					<p class="more" v-else-if="bill.length > 1 && !billmore" @click="lookmore('bill')">展示部分<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(270deg);"></i></p>

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
					<div class="showimg" :style="[proimgmore? 'height:300px;overflow:hidden':'height:auto']">
						<img :src="item" v-for="(item,i) in proimg" :key="i"   mode="widthFix" @click="previewImage(proimg,i)">
					</div>
					<p class="more" v-if="proimg.length > 1 && proimgmore" @click="lookmore('proimg')">展示全部<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(90deg);"></i></p>
					<p class="more" v-else-if="proimg.length > 1 && !proimgmore" @click="lookmore('proimg')">展示部分<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(270deg);"></i></p>

				</div>
				<div class="card-nav-wBtn" style="margin-top:10px;" @click="zhizuo" v-if="!Auth.proxy.token">
						制作我的名片
					</div>
				<div style="height:45px"></div>

			</div>

		</scroll-view>
		<div class="grouping"  v-if="groupingShow">
			<div class="bg" @click="groupingShow = false"></div>
			<div class="main">
				<div class="title">选择名片交换</div>
				<scroll-view scroll-x style=" white-space: nowrap;">
						<dl v-for="(item,i) in  mecard" :key="i" @click="cardrequest(item.id)">
							<dt>
								<img :src="item.img_url" class="img" mode="widthFix">
							</dt>
							<dd>
								<h5>{{item.name}}</h5>
								<p>{{item.company}}</p>
								<span>{{item.position}}</span>

							</dd>
						</dl>
				</scroll-view>
			</div>
		</div>
		<div  v-if="!Auth.proxy.token && isAuth" style="position:fixed;top:0;left:0;width:100%;height:100vh;z-index:99;">
			<div style="position:absolute;width:100%;height:100vh;background:rgba(000,000,000,0.5)" @click="isAuth = false"></div>
			<cart-loged ></cart-loged>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/configs';
import Navigation from '@/components/home/navigation';
import Nav from '@/components/ShareNav';
import Loged from '@/components/loged';
import Auth from '@/utils/Auth';
var util = require('@/utils/md5.js')

const innerAudioContext = wx.createInnerAudioContext()
export default {
	name: 'home-card-show',
	components: {
		"stm-navigation" : Navigation,
		'stm-nav':Nav,
		'cart-loged': Loged,
	},
	data () {
		return {
			groupingShow:false,
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
			stop:true,
			id:'',
			product:[],
			proimg:[],
			playvideo2:false,
			playvideo1:false,
			cardfirm:[],
			bill:[],
			scrollTop:null,
			mecard:'',
			isAuth:false,
			isback:false,
			billmore:true,
			proimgmore:true,
			option:'',
		}
	},
	watch:{
		scrollTop() {
			this.playvideo1 = false,
			this.playvideo2 = false
		}
	},

	onShareAppMessage() {
			var id = this.cardData.card.id
			var date = new Date().getTime()
			console.log('/pages/Home/share/main?id='+ id +'&time=' + date+'&token='+util.hexMD5(id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id)
			return {
				title:  this.cardData.card.name + '邀请你一起创建名片',
				path: '/pages/Home/share/main?id='+ id +'&time=' + date+'&token='+util.hexMD5(id + '_' + date) + '&pid=' + wx.getStorageSync('token').user_id,
				imageUrl:this.cardData.card.img_url,
			}
	},

	onReady: function (e) {
	    // 使用 wx.createAudioContext 获取 audio 上下文 context
	    this.audioCtx = wx.createAudioContext('myAudio')
	  },
	onLoad(option) {
		this.option = option
		if(option.pid){
			wx.setStorageSync('pid',option.pid)
		}
		if(option.isback){
			this.isback = true
		}
		wx.setNavigationBarTitle({
			title:'名片详情'
		})
		var _this = this;
		_this.id = option.id;
		_this.getdata();


	},
	onShow() {
		this.getdata();
	},
	onUnload() {
		this.cardData = '',
		this.product = '',
		this.proimg = '',
		this.cardfirm = '',
		this.bill = '',
		this.isback = false
	},
	methods:{
		chats() {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ this.id,
			})
		},
		getdata () {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/index/showcard/`+_this.option.id + '/'+ _this.option.time +'/'+_this.option.token,
				method: 'GET',
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					_this.cardData = d.data
					_this.product = d.data.products
					_this.cardfirm = d.data.firm
					if(d.data.firm[0]){
						_this.bill = d.data.firm[0].img.split(',')
					}
					if(d.data.products[0]){
						_this.proimg = d.data.products[0].img.split(',')

					}
					if(d.data.auth.shareconceal == 1) {
						wx.hideShareMenu()
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
					wx.showToast({
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
		lookmore(e){
			if(e == 'bill'){
				console.log('bill')
				this.billmore = !this.billmore
			}else if(e == 'proimg'){
				console.log('proimg')
				this.proimgmore = !this.proimgmore

			}
		},
		grouping() {
			if(Auth.proxy.token){
				var _this = this;
				_this.groupingShow = true;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/showcards`,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						_this.mecard = d.data.data

					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						Auth.proxy.token = ''
						wx.removeStorageSync('token')
						// Auth.RefreshToken();
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}else{
				 this.isAuth = true;
			}

		},

		scroll (e) {
			this.scrollTop= e.mp.detail.scrollTop
			if(e.mp.detail.scrollTop > 169) {
				wx.setNavigationBarColor({
					  frontColor:'#000000',
					  backgroundColor:'#ff0000'

				})
			}else{
				wx.setNavigationBarColor({
					  frontColor:'#ffffff',
					  backgroundColor:'#ff0000'

				})
			}
		},
		cardrequest(id) {
			if(Auth.proxy.token){
				var _this = this;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/cardrequest/`+this.id +'/'+id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						if(d.data.msg){
							wx.showToast({
								title: d.data.msg,
								icon: 'none',
								duration: 3000,
							})
						}else{
							wx.showToast({
								title:"发送交换申请",
								icon: 'success',
								duration: 3000,
							})
							_this.groupingShow = false
							innerAudioContext.autoplay = true
							innerAudioContext.src = 'https://i1.vpinpai.cn/card/hpg7cij9hN8VYTnG35A75iBrNTP7KPfNG5eTNPbi.mpga'
							console.log(this.tempFilePath)
							innerAudioContext.onPlay(() => {
								console.log('开始播放')
							})
						}
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						if(Auth.proxy.token.access_token){
							Auth.refresh(Auth.proxy.token.access_token);
							this.cardrequest();
						}
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 3000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}else{
				this.isAuth = true

			}

		},

		collection() {
			if(Auth.proxy.token){
				var _this = this;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/collection/`+this.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						if(d.data.msg){
							wx.showToast({
								title: d.data.msg,
								icon: 'none',
								duration: 3000,
							})
						}else{
							wx.showToast({
								title:"收藏成功",
								icon: 'success',
								duration: 3000,
							})
							innerAudioContext.autoplay = true
							innerAudioContext.src = 'https://i1.vpinpai.cn/card/xFbqxLMkfSWnz1oi2djmKZLL0USr3FskajAjzBaj.mpga'
							console.log(this.tempFilePath)
							innerAudioContext.onPlay(() => {
								console.log('开始播放')
							})
							setTimeout(function() {
								InnerAudioContext.stop()
							}, 2000);
						}
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						if(Auth.proxy.token.access_token){
							Auth.refresh(Auth.proxy.token.access_token);
							this.collection();
						}
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 3000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}else{
				this.isAuth = true

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
				mobilePhoneNumber: this.cardData.card.phoneconfig == 2 ? this.cardData.card.phone : '',    //手机号
				addressState:this.cardData.card.area,
				addressStreet:this.cardData.detail.address,
				hostNumber:this.cardData.detail.phone ? this.cardData.detail.phone :'',
				email:this.cardData.card.email ? this.cardData.card.email : '',
				organization:this.cardData.card.company,
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
		},
		playaudio(){
			var _this = this;
			_this.audioCtx.play()
			_this.stop = false

		},
		stopaudio(){
			var _this = this;
			_this.audioCtx.pause()
			_this.stop = true

		},
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
@import '../../../configs/main.less';

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
			background:#242b35;

			padding-bottom:30px;
			box-shadow: inset 0px -4px 9px 0px rgba(000,000,000,0.6);
			.me-information{
				padding:10px 20px;
				position:relative;
				.play{
					position:absolute;
					right:0;
					bottom:20px;
					background:@maincolor;
					border-radius:40px;
					padding:4px 20px 4px 4px;
					color:#fff;
					font-size:@fonttwo;
					line-height:30px;
					border-top-right-radius:0;
					border-bottom-right-radius:0;
					i{
						float:left;
						font-size:25px;
						color:#fff;
						margin-right:10px
					}
				}
				h5{
					color:#ffd497;
					font-size:@fontfive;
					font-weight:bold;
					margin-bottom:10px;
				}
				p,span{
					font-size:@fontthree;
					color:#706d71;
				}
			}
			.me-phone{
				padding:20px;
				color:#706d71;
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
					color:#706d71;
					flex:0 70%;
					font-size:@fonttwo;
				}
				i{
					flex:1;
					text-align:center;

				}
			}
			.me-honour{
				display:flex;
				margin-bottom:20px;
				h5{
					margin:0 10px 0 20px ;
					color:#ffd497;
					font-size:@fontthree;
				}
				div{
					flex:1;
					margin:0 20px 0 10px;;
					dl{
						color:#fcd9a0;
						font-size:@fontthree;
						dt{
							width:100%;
							color:#706d71;
							display:flex;
							i{
								margin-left:10px;
							}
						}
						dd{
							color:#706d71;
							font-size:@fonttwo;
						}
					}
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
					font-size:@fontthree;
					padding-left:10px;
					position:relative;
					&:after{
						position:absolute;
						content:'';
						display:block;
						left:0;
						top:10%;
						height:80%;
						background:rgb(171, 175, 186);
						width:2px;
					}
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
			.showimg{
				img{
					width:100%;
					margin:10px auto 0 auto;;


				}
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
	.grouping{
		.bg{
			position:fixed;
			bottom:0;
			width:100%;
			height:100%;
			z-index:88;
			background:rgba(000,000,000,0.5)
		}
		.main{
			position:fixed;
			bottom:0;
			background:#f1f1f1;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			overflow:hidden;
			width:100%;
			z-index:99;
			.title{
				width:100%;
				height:40px;
				line-height:40px;
				text-indent:10px;
				color:#000;
				background:#f1f1f1;
			}
			dl{
				display: inline-block;
				width:150px;
				margin:10px 10px;
				background:#fff;
				border-radius:5px;
				overflow:hidden;
				padding-bottom:10px;
				box-shadow:0px 2px 9px 3px rgba(000, 000, 000, 0.1);
				dt{
					.img{
						width:100%;
					}
				}
				dd{
					text-align:center;
					h5{
						white-space:normal;
						font-size:@fontthree;
						font-weight:none;
						margin:10px 0 10px 0;
						font-weight:bold;
						padding:0 10px;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					}
					p{
						padding:0 10px;
						white-space:normal;
						color:@fontcolor;
						font-size:@fonttwo;
						margin-bottom:10px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;

					}
					span{
						white-space:normal;
						padding:0 10px;
						font-size:@fonttwo;
						color:@fontcolor;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					}
				}
			}
			&:after{
				clear:both;
				display:block;
				content:''
			}

		}
	}
	.more{
		width:100%;
		font-size:@fonttwo;
		line-height:30px;
		text-align:center;
		color:#fff;
	}
}
</style>
