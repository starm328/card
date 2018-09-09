<template>
	<div class="home-index-component">
		<swiper :indicator-dots="indicatorDots"
		:duration="duration" previous-margin="40px" next-margin="40px" @change="bindchange"  v-show="showcards">

			<block>
				<swiper-item item-id="dd" :class="[swiperCurrent == showcards.length -(showcards.length + 2)? 'active' : '']">
					<div class="swiper-box swiper-content">
						<div class="box-main">
							<div class="clip box ">
								<div class="title">
									<p>发现</p>
									<span>更大的世界<br/>从此无界限</span>
								</div>
								<div class="content">
									<p>共14310000位</p>
									<dl @click="group()">
										<!-- {{collections.length}} -->
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
								</div>
								<div class="col">
									<dl>
										<dt>
											<img src="https://i1.vpinpai.cn/card/peDbJEcHXBHPiaeBPY9Y7FtLbGyfns0CXJpOdaoZ.png" mode="widthFix" @click="group()">
											<em style="width:10px;height:10px;background:red;border-radius:50%;" v-show="message > 0"></em>
											<img src="https://i1.vpinpai.cn/card/hTNT7FNOx8TZFM2FygLRvZOI3jkuBNDLHtkdp7K4.png"  mode="widthFix" @click="user">
										</dt>
										<dd>
											<img src="https://i1.vpinpai.cn/card/lWCo8MjxvWQfr5qtbK0F67unxf1e1xipVXJai6Wb.png"  mode="widthFix" @click="group('collection')">
											<img src="https://i1.vpinpai.cn/card/d3EMU8rCMINydBZAYr54P8evtJBlqdHpqbunCtUN.png"  mode="widthFix">
										</dd>
									</dl>
								</div>
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
								<div class="people-more" @click="gopeople">
									查看更多
								</div>
							</div>

						</div>
					</div>
				</swiper-item>
			</block>
			<block v-for="(item,i) in showcards" :key="i">
				<swiper-item item-id="dd" :class="[swiperCurrent == i ? 'active' : '']">
					<div class="swiper-content" @click="card(item.id)" v-show="item">
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
			<p  v-show="swiperCurrent == i">
				<i class="iconfont icon-navicon-dxfs" @click="shareS(i)"></i>
				<span>发名片</span>
			</p>
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
			current:0
		}
	},
	onLoad() {
		this.getcards()
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
					Auth.proxy.token = ''
					wx.removeStorageSync('token')
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
					Auth.proxy.token = ''
					wx.removeStorageSync('token')
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

}
</style>
