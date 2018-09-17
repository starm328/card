<template>
	<div class="user-index">

		<div>
			<div class="user-top">
				<div class="user-img img1" v-for="(item,i) in user" :key="i" :style="'background:url('+item.icon['128x128']+') no-repeat center bottom;background-size:100%'">
					<div class="img">
						<open-data type="userAvatarUrl"></open-data>
					</div>
				</div>
				<p v-for="(item,i) in user" :key="i">{{item.label}}</p>
				<div class="tequan" v-if="user[0]" @click="privilege">{{user[0].label}}特权</div>
			</div>
			<div class="enterprise-nav" >
				<div class="stm-cell  enterprise-nav-list" v-if="user[0] && user[0].id !==97">
					<div class="cell-warp" @click="translate">
						<div class="cell-left enterprise-tit">选择升级</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list">
					<div class="cell-warp" @click="JoinedTeam">
						<div class="cell-left enterprise-tit">团队管理</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list">
					<div class="cell-warp" @click="invitation">
						<div class="cell-left enterprise-tit">邀请有奖</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list">
					<div class="cell-warp" @click="information">
						<div class="cell-left enterprise-tit">消息<span v-if="message > 0">{{message}}</span></div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list">
					<div class="cell-warp" @click="about">
						<div class="cell-left enterprise-tit">关于一生名片</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list">
					<div class="cell-warp" @click="agreement">
						<div class="cell-left enterprise-tit">一生名片服务及用户协议</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
				<div class="stm-cell  enterprise-nav-list" v-if="!unionid">
					<div class="cell-warp" @click="ewm = true">
						<div class="cell-left enterprise-tit">关注公众号</div>
						<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="ewm" v-show="ewm" catchtouchmove="preventTouchMove">
			<div class="bg" @click="ewm = false"></div>
			<img src="https://i1.vpinpai.cn/card/oQ8trPBJfdLdIS0kZoRacTUwucH3rUEn4Oqtx0ar.jpeg" mode="widthFix" @click="previewImage" >
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'user-warp',
	components: {
	},
	data () {
		return {
			user:'',
			message:0,
			unionid:wx.getStorageSync('unionid')?wx.getStorageSync('unionid'):'',
			ewm:false
		}
	},
	onLoad() {
			this.getdata()
			if(wx.getStorageSync('showrequest') > 0 ) {
				this.message = wx.getStorageSync('showrequest')
			}else {
				this.message = 0
			}
	},
	onShow() {
		if(wx.getStorageSync('showrequest') > 0 ) {
			this.message = wx.getStorageSync('showrequest')
		}else {
			this.message = 0

		}
	},
	methods:{

		previewImage() {
			wx.previewImage({
				current: 'https://i1.vpinpai.cn/card/oQ8trPBJfdLdIS0kZoRacTUwucH3rUEn4Oqtx0ar.jpeg', // 当前显示图片的http链接
				urls: ['https://i1.vpinpai.cn/card/oQ8trPBJfdLdIS0kZoRacTUwucH3rUEn4Oqtx0ar.jpeg'] // 需要预览的图片http链接列表
			})
		},
		getdata() {
			var _this = this
			if(wx.getStorageSync('Authtoken')){
				_this.getuser(wx.getStorageSync('Authtoken'))
			}else {
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
						wx.setStorageSync('Authtoken',d.data.token)
						_this.getuser(d.data.token)
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}
		},
		getuser(token){
			var _this = this
			// 获取商城token
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/nodes`,
				method: 'GET',
				header: {
					token:wx.getStorageSync('Authtoken')
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.getroles(d.data)
						wx.setStorageSync('nodes',d.data)
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					wx.removeStorageSync('Authtoken')
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		getroles(role) {
			wx.showLoading({
				title: '玩命加载中',
			})
			var _this = this
			// 获取商城token
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}commission-roles`,
				method: 'GET',
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.setStorageSync('commission',d.data)
					console.log(d.data)
					d.data.forEach(exploitee=>{
						role.find(x=>{
							var data= d.data.filter(function(item){
								return item.id == x.role;
							})
							_this.user = data
						})

					})
				}
				// 2XX, 3XX
			})
			.catch(err => {
					wx.hideLoading ();

				if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		JoinedTeam(){
			wx.navigateTo({
			  url: '/pages/Team/main'
			})
		},
		invitation(){
			wx.navigateTo({
			  url: '/pages/invitation/main'
			})
		},
		translate(){
			wx.navigateTo({
				url: '/pages/Home/translate/main',
			})
		},
		information(){
			wx.navigateTo({
				url: '/pages/Information/index/main',
			})
		},
		about(){
			wx.navigateTo({
				url: '/pages/about/main',
			})
		},
		agreement(){
			wx.navigateTo({
				url: '/pages/agreement/main',
			})
		},
		privilege(){
			wx.navigateTo({
				url: '/pages/Team/privilege/main',
			})
		},

	}
}
</script>

<style lang="less">
@import '../../configs/style.less';
@import '../../configs/cell.less';
.user-index{
	.ewm{
		.bg{
			position:fixed;
			top:0;
			width:100%;
			height:100%;
			background:rgba(000,000,000,0.5);
			z-index:2;

		}
		img{
			position:fixed;
			display:block;
			top:50%;
			margin-top:-90px;
			left:50%;
			width:180px;
			margin-left:-90px;
			z-index:3;
		}
	}
	.enterprise-nav{
		.enterprise-nav-list{
			background:#fff;
			position:relative;
			.enterprise-tit{
				font-size:@fonttwo;
				text-indent:20px;
				span{
					font-size: 12px;
					border-radius: 1000px;
					line-height: 1;
					padding: 1px 6px;
					white-space: nowrap;
					color:#fff;
					background:@maincolor
				}
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
	.user-top {
		background: linear-gradient(#ff4c43, #fc8752);
		padding-top:80px;
		padding-bottom:20px;
		margin-bottom:10px;
		position:relative;
		.tequan{
			position:absolute;
			right:-40px;
			top:50%;
			background:#ffc500;
			color:#fff;
			font-size:@fontone;
			padding:6px 50px 6px 10px;
			border-radius:10px;

		}
		.user-img{
			width:120px;
			height:120px;
			margin:0 auto;
			position:relative;
			.img{
				position:absolute;
				bottom:7px;
				left:22px;
				border-radius:50%;
				width:77px;
				height:77px;
				margin:0 auto;
				overflow:hidden;
			}
			&.img1{
				background-size:100%;
			}
		}
		p{
			text-align:center;
			color:#fff;
			font-size:@fontthree;
			margin-top:10px;
		}
	}

}

</style>
