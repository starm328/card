<template>
	<div class="home-card-show" v-if="cardData">

		<div class="top-img" >
			<img :src="cardData.card.img_url" class="img" mode="aspectFill">
			<div class="edit-card" @click="showSkin"><i class="iconfont icon-msnui-edit"></i>编辑名片</div>
		</div>
		<div class="card-show-none"></div>
		<div class="card-show-main">
			<div class="card-show-information">
				<div class="me-information">
					<h5>{{cardData.card.name}}</h5>
					<p>{{cardData.card.company}}</p>
					<span>{{cardData.card.position}}</span>
					<div class="play" @click="playaudio" v-if="cardData.detail.voice && stop"><i class="iconfont icon-bofang"></i>{{aduration}}</div>
					<div class="play" @click="stopaudio" v-if="cardData.detail.voice && !stop"><i class="iconfont icon-xiaochengxu"></i>{{aduration}}</div>
					<audio :src="cardData.detail.voice" id="myAudio" @ended="ended"></audio>

				</div>

				<div class="me-honour" style="margin:0" v-if="cardData.card.phoneconfig  == 2">
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
				<div class="me-honour" style="margin:0" v-if="cardData.detail.email">
					<h5>邮箱</h5>
					<div>
						<dl>
							<dt>{{cardData.detail.email}}</dt>
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

				<div class="me-honour">
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
				<p><i class="iconfont  icon-renqi"></i>人气({{cardData.card.praise}})</p>
				<p><i class="iconfont icon-shou"></i>靠谱({{cardData.card.reliable}})</p>
			</div>


			<div class="card-nav-btn">
				<p style="padding:0">
				<button open-type="share" :data-id="cardData.card.id" :data-name="cardData.card.name" :data-img="cardData.card.img_url"  class="card-nav-wBtn"  style="padding:0;background:none;">分享</button></p>
				<p @click="chats">我的留言</p>
			</div>

			<div class="card-tile">
				我的超级名片
			</div>
			<div class="card-other" >
				<div class="title">
					<h5>公司介绍 </h5>
					<p @click="playvideo1 = !playvideo1"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video :src="cardfirm[0].video"   controls v-if="playvideo1 && cardfirm && cardfirm.length > 0"></video>

				<div class="summer" v-if="cardfirm && cardfirm.length > 0">
					{{cardfirm[0].desc}}
				</div>
				<div class="showimg" :style="[billmore? 'height:300px;overflow:hidden':'height:auto']">
					<img :src="item" v-for="(item,i) in bill" :key="i"  mode="widthFix" @click="previewImage(bill,i)" v-if="item">
				</div>
				<p class="more" v-if="bill.length > 1 && billmore" @click="lookmore('bill')">展示全部<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(90deg);"></i></p>
				<p class="more" v-else-if="bill.length > 1 && !billmore" @click="lookmore('bill')">展示部分<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(270deg);"></i></p>
				<!-- <swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0" style="height:240px;background:#141a23;" v-if="bill[0] !==''">
					<block v-for="(item,i) in bill" :key="i">
						<swiper-item  class="banner">
								 <img :src="item" style="width:100%" mode="aspectFit" @click="previewImage(bill,i)">
						</swiper-item>
					</block>

				</swiper> -->
			</div>
			<div class="card-other" >
				<div class="title">
					<h5>产品介绍 </h5>
					<p @click="playvideo2 = !playvideo2"><i class="iconfont icon-bofang"></i><span>看视频</span></p>
				</div>
				<video :src="product[0].video"   controls v-if="playvideo2 && product && product.length > 0"></video>
				<div class="summer" v-if="product && product.length > 0">
					<h5>{{product[0].title}}</h5>
					{{product[0].desc}}
				</div>
				<div class="showimg" :style="[proimgmore? 'height:300px;overflow:hidden':'height:auto']">
					<img :src="item" v-for="(item,i) in proimg" :key="i"   mode="widthFix" @click="previewImage(proimg,i)" v-if="item">
				</div>
				<p class="more" v-if="proimg.length > 1 && proimgmore" @click="lookmore('proimg')">展示全部<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(90deg);"></i></p>
				<p class="more" v-else-if="proimg.length > 1 && !proimgmore" @click="lookmore('proimg')">展示部分<i class="iconfont icon-arrow-right-copy-copy-copy" style="transform:rotate(270deg);"></i></p>

				<!-- <swiper :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fff"current="0" style="height:240px;background:#141a23;" v-if="proimg[0] !== ''">
					<block v-for="(item,i) in proimg" :key="i">
						<swiper-item  class="banner">
								 <img :src="item" style="width:100%" mode="aspectFit" @click="previewImage(proimg,i)">
						</swiper-item>
					</block>
				</swiper> -->
			</div>

			<div style="height:45px"></div>
		</div>

		<div class="bottom-nav" v-if="scroll > 50">
			<p @click="showSkin"><i class="iconfont icon-caidan"></i></p>
			<ul>
				<!-- <li @click="activity">我的活动(0)</li> -->
				<!-- <li @click="meproduct">我的产品(0)</li> -->
			</ul>
			<span><button open-type="share" :data-id="cardData.card.id" :data-name="cardData.card.name" :data-img="cardData.card.img_url"><i class="iconfont icon-fenxiang"></i></button></span>
		</div>

		<div class="skin-warp" :class="[isShow? 'show':'hidden']">
			<ul>
				<li @click="basic">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑名片</p>
				</li>
				<li @click="senior">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑高级</p>
				</li>
				<li @click="enterprise">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑公司</p>
				</li>
				<li @click="meproduct">
					<i class="iconfont icon-msnui-edit"></i>
					<p>编辑产品</p>
				</li>
				<li @click="delcard">
					<i class="iconfont icon-shanchu"></i>
					<p>删除</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/configs';
import Navigation from '@/components/home/navigation';
import Auth from '@/utils/Auth';
export default {
	name: 'home-card-show',
	components: {
		"stm-navigation" : Navigation
	},
	props:{
		scroll:Number
	},
	watch:{
		scroll() {
			this.playvideo1 = false,
			this.playvideo2 = false
		}
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
			id:'',
			cardData:'',
			stop:true,
			product:'',
			playvideo2:false,
			playvideo1:false,
			cardfirm:'',
			bill:'',
			proimg:'',
			billmore:true,
			proimgmore:true,
			aduration:0
		}
	},
	onReady: function (e) {
	    // 使用 wx.createAudioContext 获取 audio 上下文 context
	    this.audioCtx = wx.createAudioContext('myAudio')
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
		this.isShow = false,
		this.stop =  false
	},
	onUnload() {
		this.bottomNav=false,
		this.isShow=false,
		this.indicatorDots= true,
		this.autoplay= true,
		this.interval= 3000,
		this.duration= 1000,
		this.playvideo=0,
		this.id='',
		this.cardData='',
		this.stop=true,
		this.product='',
		this.playvideo2=false,
		this.playvideo1=false,
		this.cardfirm='',
		this.bill='',
		this.proimg='',
		this.billmore=true,
		this.proimgmore=true,
		this.aduration=0
	},
	methods:{
		lookmore(e){
			if(e == 'bill'){
				console.log('bill')
				this.billmore = !this.billmore
			}else if(e == 'proimg'){
				console.log('proimg')
				this.proimgmore = !this.proimgmore

			}
		},
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
						console.log(d.data)
						_this.cardData = d.data
						_this.$emit('getshare',d.data.card)
						var bgM = wx.createInnerAudioContext();
						bgM.src = d.data.detail.voice;
						console.log(bgM.duration);//0
						bgM.onCanplay(()=>{
						   console.log(bgM.duration)//0
						})
						setTimeout(()=>{
							_this.aduration = bgM.duration
						  console.log(bgM.duration)//2.795102
						},1000)
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.removeStorageSync('token')
						// if(Auth.proxy.token.access_token){
						// 	Auth.refresh(Auth.proxy.token.access_token);
						// 	this.getdata();
						// }
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})

				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/cardproduct/`+this.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();
						console.log(d.data)
						_this.product = d.data
						_this.proimg = d.data[0].img.split(',')
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.hideLoading ();
						wx.removeStorageSync('token')
						// if(Auth.proxy.token.access_token){
						// 	Auth.refresh(Auth.proxy.token.access_token);
						// 	this.getdata();
						// }
					}else if(err.statusCode == 500){
						wx.hideLoading ();
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})


				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/cardfirm/`+this.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						console.log(d.data)
						_this.cardfirm = d.data
						_this.bill = d.data[0].img.split(',')
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.removeStorageSync('token')
						// if(Auth.proxy.token.access_token){
						// 	Auth.refresh(Auth.proxy.token.access_token);
						// 	this.getdata();
						// }
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})

		},

		delcard() {
			wx.showModal({
				title:'提示',
				content:'是否删除',
				success:(res) => {
					if(res.confirm){
						var _this = this;
						wx.pro.request({
							url:`${configs.card.apiBaseUrl}api/user/delcard/`+this.id,
							method: 'GET',
							header: {
								token:Auth.proxy.token.access_token
							}
						})
						.then(d => {
							if(d.statusCode == 200){
								wx.hideLoading ();
								wx.showToast({
									title: '已删除',
									icon: 'none',
									duration: 2000,
									success:() => {
										wx.redirectTo({
										  url: '/pages/Home/index/main'
										})
									}
								})
							}else{
								wx.showToast({
									title: '删除失败',
									icon: 'none',
									duration: 2000,
								})
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
							}else if(err.statusCode == 500){
								wx.showModal({
									title: '错误提示',
									content: '系统错误',
									showCancel: false,

								})
							}
							// 网络错误、或服务器返回 4XX、5XX
						})
					}
				}
			})

		},
		video(n){
			this.playvideo = n
		},
		showSkin() {
			this.isShow = !this.isShow
			this.scroll = 55
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
		meproduct() {
			wx.navigateTo({
			  url: '/pages/Home/product/main?id='+this.id
			})
		},
		enterprise() {
			wx.navigateTo({
			  url: '/pages/Home/enterprise/main?id='+this.id
			})
		},
		basic(){
			wx.navigateTo({
			  url: '/pages/Home/Edit/basic/main?id='+this.id
			})
		},
		senior() {
			wx.navigateTo({
			  url: '/pages/Home/senior/main?id='+this.id
			})
		},
		chats() {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ this.id,
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
			  url: '/pages/Card/Banner/main?id='+this.id
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
		ended() {
			var _this = this;
			_this.stop = true
		},
		previewImage(img,i) {
			wx.previewImage({
				current: img[i], // 当前显示图片的http链接
				urls: img // 需要预览的图片http链接列表
			})
		}



	},

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
		z-index:5;
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
				text-align:center;
				flex:1;
				p{
					font-size:@fontone;
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
		.edit-card{
			position:absolute;
			display:flex;
			z-index:3;
			top:300px;
			background:#4f5b6d;
			border-radius:30px;
			color:#fff;
			right:5px;
			padding:8px 10px;
			font-size:@fonttwo;
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
		z-index:4;
		p,span{
			flex:0 55px;
			text-align:center;

			button{
				margin:0;
				padding:0;
				background:none;
				line-height:45px;
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
	.card-show-none{
		height:350px;
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
					color:#706d71;
					font-size:@fontthree;
					padding-left:10px;
					position:relative;
					display:flex;
					line-height:25px;
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
					.edit-company{
						display:flex;
						background:#4f5b6d;
						border-radius:30px;
						color:#fff;
						padding:3px 10px;
						margin-left:10px;
						font-size:@fonttwo;
					}
				}
				p{
					font-size:@fonttwo;
					display:flex;
					text-align:right;
					margin-top:4px;
					color:#706d71;
					i{
						flex:1;
						text-align:right;
						margin-right:5px;
					}
				}
			}
			.summer{
				font-size:@fonttwo;
				color:#706d71;
				margin:20px 0;
				h5{
					font-size:@fontthree;
					line-height:35px;
					text-align:center;
				}
			}
			.more{
				width:100%;
				font-size:@fonttwo;
				line-height:30px;
				text-align:center;
				color:#fff;
			}
			.showimg{
				img{
					width:100%;
					margin:10px auto 0 auto;;


				}
			}
			.activity{
				margin-top:20px;
				color:#706d71;
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
