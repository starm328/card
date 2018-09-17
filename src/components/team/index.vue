<template>
	<div class="team-component">
		<div class="dearest">
			<div class="referrer">
				<img :src="referrer.head_picture" v-if="referrer && referrer.head_picture">
				<span v-else><i class="iconfont icon-huiyuan21" ></i></span>
				<p>推荐人：{{referrer.label}}</p>
			</div>
			<ul>
				<li>
					<small>直属人脉</small>
					<b>{{referress}}</b>
				</li>
				<li>
					<small>所有人脉</small>
					<b>{{exploitees}}</b>
				</li>
			</ul>
		</div>
		<div class="stm-cell  enterprise-nav-list" @click="goreferress">
			<div class="cell-warp">
				<div class="cell-left enterprise-tit">查看直属人脉</div>
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
		<div class="stm-cell  enterprise-nav-list" @click="goexploitees">
			<div class="cell-warp">
				<div class="cell-left enterprise-tit">查看所有人脉</div>
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'team-component',
	data () {
		return {
			referress:'',
			exploitees:'',
			referrer:'',
			navgationHeight:''
		}
	},
	onLoad() {
			this.getdata()
			let startBarHeight = 20
			let navgationHeight = 44
			let that = this
			wx.getSystemInfo({
			  success: function (res) {
				console.log(res.model)
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				console.log('o')
				that.navgationHeight= navgationHeight+startBarHeight
			  }
			})
	},
	onShow() {
	},
	methods: {
		getdata() {
			var _this = this
			// 获取商城token
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/token`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.getreferress(d.data.token)
					_this.getexploitees(d.data.token)
					_this.getreferrer(d.data.token)
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.hideLoading ();
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})


		},
		// 直属下级数量
		getreferress(token) {
			console.log(token)
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/0/referrees/count`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.referress =  d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.hideLoading ();
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		// 下线数量
		getexploitees(token) {
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/0/exploitees/count`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.exploitees = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.hideLoading ();
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		// 推荐人
		getreferrer(token) {
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/0/referrer`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.referrer = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.hideLoading ();
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		goreferress() {
			wx.navigateTo({
			  url: '/pages/Team/referress/main'
			})
		},
		goexploitees() {
			wx.navigateTo({
			  url: '/pages/Team/exploitees/main'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
@import '../../configs/cell.less';
.team-component{
	.dearest{
		background: linear-gradient(#ff4c43, #fc8752);
		padding-top:80px;
		margin-bottom:10px;
		.referrer{
			color:#fff;
			text-align:center;
			margin-bottom:20px;
			span{
				width:50px;
				height:50px;
				display:inline-block;
				background:rgba(255,255,255,0.2);
				margin-right:10px;
				border-radius:5px;
				text-align:center;
				line-height:50px;
				font-size:@fontt16;
				color:#fff;
			}
			p{
				font-size:@fontthree;
			}
			img{
				width:50px;
				height:50px;
				border-radius:10px;
				overflow:hidden;
			}

		}
		ul{
			display:flex;
			width:100%;
			li{
				flex:1;
				text-align:center;
				color:#fff;
				padding:10px 0;
				small{
					font-size:@fonttwo;
				}
				b{
					font-size:@fontthree
				}
			}
		}
	}
	.enterprise-nav-list{
		background:#fff;
		position:relative;
		.enterprise-tit{
			font-size:@fonttwo;
			text-indent:20px;
		}
		i{
			display:block;
			flex:1;
			text-align:right;
			padding-right:20px;
			color:@fontcolor;
		}
	}
}
</style>
