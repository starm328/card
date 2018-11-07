<template>
	<div class="home-index-component">
		{{current}}
		<swiper :indicator-dots="indicatorDots"
		:duration="duration" previous-margin="40px" next-margin="40px" @change="bindchange"  v-show="showcards" :style="'padding-top:'+(navgationHeight)+'px'" :current="current">

			<block>
				<swiper-item item-id="dd" :class="[swiperCurrent == showcards.length -(showcards.length + 2)? 'active' : '']">
					<div class="swiper-box swiper-content" style="background:#1c1d1e;">
						<div class="box-main" style="transform:scale(1);height:100%;">
							<div class="clip box " style="margin:0;padding:0;background:#1c1d1e;">
								<div class="translate">
									<dl>
										<dt>我们</dt>
										<dd>用心，才有一百万个可能<br/>向前走，不要继续等...</dd>
									</dl>
									<p  @click="translate">升级会员</p>
								</div>
								<div class="new-nav">
									<ul>
										<li @click="ysmp">
											<img src="https://i1.vpinpai.cn/card/FFo3QQixFs3Fv2zgfnBC6y84HsZEnC415T2xqOYF.png"  mode="widthFix" >
											<p>关于一生名片</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>

										<li @click="video">
											<img src="https://i1.vpinpai.cn/card/mS7GTlmC1fZdITHgBkXNhgmTnkBhQcVoCF5n3EkA.png"  mode="widthFix" >
											<p>名片操作视频</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li @click="guize">
											<img src="https://i1.vpinpai.cn/card/XR4HVEETBEKIySTpULIBAbk2mVe2OKlxGCZj6T85.png"  mode="widthFix" >
											<p>会员权益</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li @click="jieda">
											<img src="https://i1.vpinpai.cn/card/e7tc92wwPavlBvkB9Qt4jXo2pY3FD3JMl7ZAoBox.png"  mode="widthFix" >
											<p>疑问解答</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li @click="meng">
											<img src="https://i1.vpinpai.cn/card/rEzDKwaFE4bdM8rfslujVPd6cAK1KREECZuOgeSY.png"  mode="widthFix" >
											<p>一生联盟</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li>
											<img src="https://i1.vpinpai.cn/card/3gDWr8PwR7w5S5X6VpmSYrjUETEfSbqoO78lPOoF.png"  mode="widthFix" >
											<p>每日签到</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li>
											<img src="https://i1.vpinpai.cn/card/aqVZDfMromPx07Vb3NaVYkOYqjvLEGweC1CN1mh3.png"  mode="widthFix" >
											<p>我的故事</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
										<li @click="newcard">
											<img src="https://i1.vpinpai.cn/card/dA4NPI3IgUFWhYKhAsuovYTV6pbrVbNZV6dC1aQt.png"  mode="widthFix" >
											<p>免费创建名片</p>
											<form @submit="gotoformid" :report-submit="true">
												<button formType="submit" class="form_button"></button>
											</form>
										</li>
									</ul>
								</div>
							<!-- 	<div class="title">
									<p>发现</p>
									<span>更大的世界<br/>从此无界限</span>
								</div>
								<div class="fx-img">
									<p class="a" @click="ysmp"></p>
									<p class="a" @click="video"></p>
									<p class="a" @click="guize"></p>
									<p class="a" @click="jieda"></p>
									<p class="a" @click="meng"></p>
									<p class="a" @click="newcard"></p>
									<p class="a" @click="translate"></p>
									<img src="https://i1.vpinpai.cn/card/s3cDbCdKyIwkMGhFW5s4MtAvSKW9XHsH1ICXLzh7.jpeg" mode="widthFix">
								</div> -->
								<!-- <div class="content">
									<p>共14315419位</p>
									<dl @click="group()">
										<dt>
											<img :src="collections[0].card.img_url" class="img" mode="widthFix" v-if="collections[0] && collections[0].card">
										</dt>
										<dd >
											<img :src="collections[1].card.img_url" class="img" mode="widthFix" v-if="collections[1] && collections[1].card">
											<view class="img" mode="widthFix" v-else-if="!collections[1]"></view>
											<img :src="collections[2].card.img_url" class="img" mode="widthFix" v-if="collections[2] && collections[2].card">
											<view class="img" mode="widthFix" v-else-if="!collections[2]"></view>
											<img :src="collections[3].card.img_url" class="img" mode="widthFix" v-if="collections[3] && collections[3].card">
											<view class="img" mode="widthFix" v-else-if="!collections[3]"></view>
											<img :src="collections[4].card.img_url" class="img" mode="widthFix" v-if="collections[4] && collections[4].card">
											<view class="img" mode="widthFix" v-else-if="!collections[4]"></view>
										</dd>
									</dl>
								</div> -->
							<!-- 	<div class="col">
									<dl>
										<dt>
											<img src="https://i1.vpinpai.cn/card/YVVRqr7AAPqwSe6FOodSKRih8uaT4NRxHa8K4UvM.png" mode="widthFix" @click="group()">

											<img src="https://i1.vpinpai.cn/card/TgSECYrPyla4q2572a5E6yHBHXP8hBkXhH4ytGS8.png"  mode="widthFix" @click="user">
										</dt>
										<dd>
											<img src="https://i1.vpinpai.cn/card/eXs1Yx4gE0BnMtEegazATELVzIgdzo9mpdS2gw6j.png"  mode="widthFix" @click="group('collection')">
											<img src="https://i1.vpinpai.cn/card/5H9x1bVutz3vR5jOohbtJf1Hfl47lnMrhuHy1lws.png"  mode="widthFix" @click="newcard">
										</dd>
									</dl>
								</div> -->
							</div>

						</div>
					</div>
				</swiper-item>
			</block>
			<block>
				<swiper-item item-id="dd" :class="[swiperCurrent == showcards.length -(showcards.length + 1)? 'active' : '']">
					<div class="swiper-box swiper-content">
						<div class="box-main">
							<div class="clip box ">
								<div class="title" style="padding:10rpx 20rpx;">
									<p>人脉圈</p>
									<span>用心做自己<br/>每一次交换都是商机</span>
								</div>
								<div class="content">
								<p>共14315419位</p>
								</div>
								<div class="people">
									<dl v-if="morecard[0]">
										<dt>
											<img :src="morecard[0].img_url" class="img" mode="widthFix">
										</dt>
										<dd>
											<h6>{{morecard[0].name}}</h6>
											<p>{{morecard[0].company}}</p>
										</dd>
									</dl>
									<dl v-if="morecard[1]">
										<dt>
											<img :src="morecard[1].img_url"  class="img" mode="widthFix">
										</dt>
										<dd>
											<h6>{{morecard[1].name}}</h6>
											<p>{{morecard[1].company}}</p>
										</dd>
									</dl>

								</div>
								<div class="people-more" @click="gopeople" style="position:relative">
									<form @submit="gotoformid" :report-submit="true">
										<button formType="submit" class="form_button" style="color:#fff">
												查看更多
										</button>
									</form>
								</div>
							</div>

						</div>
					</div>
				</swiper-item>
			</block>
			<block v-for="(item,i) in showcards" :key="i">
				<swiper-item item-id="dd" :class="[swiperCurrent == i ? 'active' : '']">
					<div class="swiper-content" @click="card(item.id)" v-show="item">
						<form @submit="gotoformid" :report-submit="true">
							<button formType="submit" class="form_button"></button>
						</form>
						<img :src="item.img_url" class="img" mode="aspectFill">
						<h5>{{item.name}}</h5>
						<p>{{item.company}}</p>
						<span>{{item.position}}</span>
					</div>
				</swiper-item>
			</block>
			<block>
				<swiper-item item-id="dd" :class="[showcards.length == swiperCurrent? 'active' : '']">
					<div class="swiper-content" @click="newcard">
							<div class="imgno">
								<open-data type="userAvatarUrl" class="img"></open-data>
							</div>

							<i class="iconfont icon-tianjia"></i>
							<h6>创建新名片</h6>
					</div>
				</swiper-item>
			</block>
			<block>
				<swiper-item item-id="dd" :class="[(showcards.length+1) == swiperCurrent? 'active' : '']">
					<div class="swiper-content" @click="translate" style="background:#014f04">
							<img src="https://i1.vpinpai.cn/card/H80k6UZKPHIgjR1rTYMl7Z6s0LIMrLvaxDmVpiOX.jpeg" style="width:100%"  mode="widthFix">
					</div>
				</swiper-item>
			</block>
		</swiper>
		<div class="dots">
			<p v-for="(item,i) in dots" :class="[showcards.length -(showcards.length +2) == swiperCurrent? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in dots" :class="[showcards.length -(showcards.length +1) == swiperCurrent? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in showcards" :class="[ swiperCurrent == i? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in dots" :class="[swiperCurrent == showcards.length? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in dots" :class="[(showcards.length+1) == swiperCurrent ? 'active' : '']" :key="i">
			</p>
		</div>
		<div class="share-card" v-for="(item,i) in showcards" :key="i">
			<p  v-show="swiperCurrent == i" @click="shareS(i)">
				<i class="iconfont icon-navicon-dxfs" ></i>
				<span>发名片</span>
			</p>
		</div>
		<div class="share-card" v-if="swiperCurrent == -2" >
			<div  @click="information">
				<form @submit="gotoformid" :report-submit="true">
					<button formType="submit" class="form_button">
						<i class="iconfont icon-icon-test" style="color:#ffdb60"></i>
					</button>
				</form>
				<span style="position:relative;color:#ffdb60" >消息<em style="width:10px;height:10px;background:red;color:#ffdb60;border-radius:50%;position:absolute;right:-10px;top:-35px;" v-if="message > 0"></em></span>
			</div>
			<div  @click="group()">
				<form @submit="gotoformid" :report-submit="true">
					<button formType="submit" class="form_button">
						<i class="iconfont icon-ziliaoguanli" style="color:#ffdb60"></i>
					</button>
				</form>
				<span style="position:relative;color:#ffdb60" >好友</span>
			</div>
			<div  @click="gopeople">
				<form @submit="gotoformid" :report-submit="true">
					<button formType="submit" class="form_button">
						<i class="iconfont icon-hangyexiehui" style="color:#ffdb60"></i>
					</button>
				</form>
				<span style="position:relative;color:#ffdb60" >人脉</span>
			</div>
			<div  @click="user">
				<form @submit="gotoformid" :report-submit="true">
					<button formType="submit" class="form_button">
						<i class="iconfont icon-huiyuan21" style="color:#ffdb60"></i>
					</button>
				</form>
				<span style="position:relative;color:#ffdb60" s>个人中心</span>
			</div>
		</div>
		<div class="share-card-main" v-if="share !== ''">
			<div class="swiper-content">
				<img :src="showcards[share].img_url" class="img" mode="aspectFill">
				<h5>{{showcards[share].name}}</h5>
				<p>{{showcards[share].company}}</p>
				<span>{{showcards[share].position}}</span>
			</div>
			<div class="nave" v-if="showcards">
				<h5>
					<i class="iconfont icon-tianjia"  @click="shareH"></i>
					<p>关闭</p>
				</h5>
				<ul>
					<li >
						<button open-type="share" :data-id="showcards[share].id" :data-name="showcards[share].name" :data-img="showcards[share].img_url"><i class="iconfont icon-huiyuan21"></i></button>
						<p>发名片</p>
					</li>
					<li @click="gocode">
						<i class="iconfont icon-xiaochengxu"></i>
						<p>名片码</p>
					</li>
					<li @click="gobanner(showcards[share].id)">
						<i class="iconfont icon-guanggaowei"></i>
						<p>海报</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'home-index-component',
	data () {
		return {
			showcards:[],
			dots:[
				''
			],
			indicatorDots: false,
			duration: 500,
			swiperCurrent: -2,
			share:'',
			auth:Auth,
			isShow:false,
			RecordisShow:false,
			piaoShow:false,
			auther:false,
			loding:false,
			collections:[],
			message:0,
			morecard:'',
			current:0,
			navgationHeight:''

		}
	},
	onLoad() {
		this.getcards()
		let startBarHeight = 20
		let navgationHeight = 44
		let that = this
		wx.getSystemInfo({
		  success: function (res) {
			if (res.model == 'iPhone X'){
			  startBarHeight = 44
			}
			that.navgationHeight= navgationHeight+startBarHeight
		  }
		})
	},
	onShow() {
		this.getcards()
	},
	onUnload() {
		this.swiperCurrent = -2
	},

	methods: {
		shareS(i) {
			this.share = i;
		},
		shareH() {
			this.share = ''
		},
		getcards() {
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcards`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					this.showcards = d.data.data
					console.log(d)


				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
				if(err.statusCode == 404){
					Auth.refresh()
					// Auth.RefreshToken();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})

			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcollection/0`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					this.loding = true
					this.collections = d.data
					wx.setStorageSync('collection',d.data)

				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
				if(err.statusCode == 404){
					Auth.refresh()
					// Auth.RefreshToken();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})


			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showrequest`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.setStorageSync('showrequest',d.data.length)
					this.message = d.data.length
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.removeStorageSync('token')
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
				url:`${configs.card.apiBaseUrl}api/card/index/0`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					this.morecard = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					Auth.refresh()
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
		group(page) {
			if(page){
				wx.navigateTo({
				  url: '/pages/group/'+page+'/main'
				})
			}else{
				wx.navigateTo({
				  url: '/pages/group/main'
				})
			}

		},
		user() {
			wx.navigateTo({
			  url: '/pages/Enterprise/main'
			})

		},
		gopeople() {
			wx.navigateTo({
			  url: '/pages/people/main'
			})

		},
		gocode(){
			wx.navigateTo({
			  url: '/pages/Card/Code/main'
			})


		},
		gobanner(id){
			wx.navigateTo({
			  url: '/pages/Card/Banner/main?id='+id
			})



		},
		bindchange(e){
			if(e.target.source == 'touch'){
				console.log(e.target.current)
				this.current = e.target.current
				this.swiperCurrent = e.target.current - 2;
			}
		},
		card(e){
			wx.navigateTo({
				url: '/pages/Home/show/main?id='+e,
			})


		},
		newcard(){
			if(this.auth.proxy.token.is_new){
				 wx.navigateTo({
					url: '/pages/Home/basic/main',
				})
			}

		},
		ysmp() {
			wx.navigateTo({
				url: '/pages/about/enter/main',
			})

		},
		video() {
			wx.navigateTo({
				url: '/pages/about/video/main',
			})
		},
		guize() {
			wx.navigateTo({
				url: '/pages/about/guize/main',
			})
		},
		jieda() {
			wx.navigateTo({
				url: '/pages/about/jieda/main',
			})
		},
		meng() {
			wx.navigateTo({
				url: '/pages/about/meng/main',
			})
		},
		join() {

		},
		translate(){
			wx.navigateTo({
				url: '/pages/Home/translate/main',
			})
		},

		getLogin() {
			Auth.login();
		},
		more() {
			wx.navigateTo({
				url: '/pages/Enterprise/main',
			})



		},
		information(){
			wx.navigateTo({
				url: '/pages/Information/index/main',
			})
		},
		gotoformid(e) {
			Auth.formid(e.target.formId)
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';

.home-index-component{
	.col{
		padding:0 20px;
		dl{
			img{
				width:100%;
			}
			display:flex;
			dt{
				flex:1;
				margin-right:5px;
			}
			dd{
				flex:1;
			}
		}
	}

	.people{
		margin-top:20px;
		&:after{
			clear:both;
			display:block;
			content:''
		}
		dl{
			width:calc(50% - 16px);
			border-radius:5px;
			background:#fff;
			margin:20px 8px 10px 8px;
			float:left;
			text-align:center;
			padding:0 0 10px 0;
			box-shadow:0px 2px 9px 3px rgba(000, 000, 000, 0.1);
			dt{
				width:100%;
				border-radius:5px;
				overflow:hidden;
				margin-right:10px;
				.img{
					width:100%;
				}
			}
			dd{
				h6{
					font-size:@fontt16;
					display:block;
					padding:5px 0;
				}
				.company{
					margin:2px 0;
					font-size:@fonttwo;
					display:flex;
					p{
						flex:1;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
						font-size:@fontone;
						color:@fontcolor;
					}
					.img{
						width:20px;
						height:20px;
						border-radius:5px;
						overflow:hidden;
						img{
							width:100%
						}
					}
				}

			}
		}
	}
	.people-more{
		margin-top:20px;
		width:80%;
		height:45px;
		border-radius:5px;
		margin:0 auto;
		background:  -webkit-linear-gradient(left,#ff4c43, #fc8752);
		color:#fff;
		font-size:15px;
		line-height:45px;
	}
	.fx-img{
		height:0;
		overflow:hidden;
		padding-bottom:120%;
		position:relative;
		img{
			width:100%;
		}
		p{
			position:absolute;
			width:30%;
			height:30%;
			display:block;
			&:nth-child(1){
				top:0;
				left:0;
			}
			&:nth-child(2){
				top:0;
				right:0;
			}
			&:nth-child(3){
				top:34%;
				left:0

			}
			&:nth-child(4){
				top:34%;
				right:0

			}
			&:nth-child(5){
				top:68%;
				left:0

			}
			&:nth-child(6){
				top:68%;
				right:0

			}
			&:nth-child(7){
				top:0%;
				height:100%;
				width:40px;
				left:40%;

			}
		}
	}
	.box-main {
		.box{
			img{
				vertical-align:top;

			}
		}
	}
	.new-nav{

			width:90%;
			margin:0 auto 0 auto;

			ul{
				li{
					position:relative;
					width:calc(50% - 5px);
					float:left;
					background:#1f2228;
					margin-bottom:8px;
					text-align:center;
					form{
						position:absolute;
						width:100%;
						height:100%;
						top:0;
						left:0;
						button{
							width:100%;
							height:100%;
							display:block
						}
					}
					img{
						width:15%;
						display:block;
						margin:10px auto;
					}
					&:nth-child(odd){
						margin-right:8px;
					}
				}
			}
	}
	.translate{
		width:100%;
		position:relative;
		background:#ffdb60;
		padding:20px 0 30px 0;
		margin-bottom:30px;
		&:after{
			clear:both;
			display:block;
			content:'';
		}
		dl{
			dt{
				font-size:30px;
				font-weight:bold;
				color:#1c1d1e;
				float:left;
				margin-left:20px;
			}
			dd{
				float:right;
				font-size:15px;
				color:#1c1d1e;
				margin-right:20px;
			}
		}
		p{
			position:absolute;
			width:50%;
			bottom:-25px;
			left:50%;
			margin-left:-25%;
			background:#1f2228;
			border:1px solid #ffdb60;
			color:#ffdb60;
			font-size:20px;
			font-weight:bold;
			border-radius:40px;
			padding:5px 0;
		}
	}

}
</style>
