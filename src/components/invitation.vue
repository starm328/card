<template>
	<div class="invitation">
		<div :style="'padding-top:'+navgationHeight+'px;background:#34394f;'">
			<img src="https://i1.vpinpai.cn/card/Y3F2UqZzgLV6GUxM1dMES6Ab0oVp6l94ZcUzmjqw.jpeg" mode="widthFix" class="top-img">
		</div>
		<div class="one-main">
			<button  type="primary" class="stm-main-button stm-m20-rl" open-type="share"> 立即邀请 </button>
			<button  type="default" class="stm-m20-rl stm-m10-t" @click="ewm = true"> 面对面邀请 </button>
			<div class="ewm" v-show="ewm" catchtouchmove="preventTouchMove">
				<div class="bg" @click="ewm = false"></div>
				<canvas canvas-id="myCanvas" style="width:180px;height:180px;" />
			</div>
			<ul>
				<li>
					<p v-if="statistics.coming">{{statistics.coming.showing}}<em>元</em></p>
					<span>红包在路上</span>
				</li>
				<li>
					<p v-if="statistics.accumu">{{statistics.accumu.showing}}<em>元</em></p>
					<span>累计获得</span>
				</li>
				<li>
					<p>{{referress}}<em>人</em></p>
					<span>成功邀请</span>
				</li>
			</ul>
		</div>
		<div class="guize">
			<h5>一生名片活动奖励规则</h5>
			<p>1、会员：扫码注册，终身免费使用，每人可免费制作2张不同身份的个人AI智能名片，并有自己的个人名片二维码，名片可展示到人脉圈，所有人都可以看到你，并共享千万人脉圈，会员邀请VIP会员和联盟大使均没有奖励！</p>

			<p>2、VIP会员：享会员所有权益，可以制作5张不同身份的个人名片，成功邀请1个VIP会员奖励140元/个！成功邀请1个联盟大使奖励140元/个!</p>

			<p>3、联盟大使：直接成功邀请1个联盟大使奖劢300元/个，直接成功邀请1个VIP会员奖励160元/个，享伞下所有VIP会员成功邀请VIP会员的红包奖励20元/个!</p>
			<span>特別提示：<br/>如有其他疑问，请联系官方客服，奖励提现请关注官方公众号查询和提现</span>
		</div>

	</div>
</template>

<script>
import configs from '@/utils/configs';
import Auth from '@/utils/Auth';

export default {
	name: 'invitation',
	data () {
		return {
			navgationHeight:'',
			scene:'',
			ewm:false,
			referress:'',
			account:'',
			statistics:''
		}
	},

	onLoad() {
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
			wx.hideShareMenu()
			this.scene = wx.getStorageSync('token').user_id
			this.getdata()
	},
	onReady(){
		wx.downloadFile({
			url: configs.card.apiBaseUrl+'api/promotion/index/2?scene='+this.scene+'&page=pages%2FHome%2Findex%2Fmain', //仅为示例，并非真实的资源
			success: function(res) {
			// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			if(res.statusCode == 200){
				console.log(res.tempFilePath)
				const ctx = wx.createCanvasContext('myCanvas')
				ctx.drawImage(res.tempFilePath, 0, 0, 180, 180)
				ctx.draw()
			}

			}
		})
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
					this.accounts(d.data.token)
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

		// 资金
		accounts(token) {
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}accounts`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.account =  d.data
					console.log(d.data[0].id)
					this.statistic(token,d.data[0].id)
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
		statistic(token,id){
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}accounts/${id}/count/accumu-coming`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.statistics =  d.data
					console.log(d.data)
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
		}

	}

}
</script>

<style lang="less" scoped>
@import '../configs/main.less';
.invitation{
	.top-img{
		width:100%;
		vertical-align:top;
	}
	.one-main{
		background:#fff;
		padding-bottom:10px;
		padding-top:10px;
		.ewm{
			.bg{
				position:fixed;
				top:0;
				width:100%;
				height:100%;
				background:rgba(000,000,000,0.5);
				z-index:2;

			}
			canvas{
				position:fixed;
				display:block;
				top:50%;
				margin-top:-90px;
				left:50%;
				margin-left:-90px;
				z-index:3;
			}
		}
		ul{
			margin-top:20px;
			display:flex;
			li{

				position:relative;
				color:rgba(000,000,000,0.6);
				flex:1;
				text-align:center;
				p{
					font-size:28px;
					font-weight:bold;
					em{
						display:inline-block;
						font-size:20px;
						font-weight:normal
					}
				}
				span{
					font-size:14px;
				}
				&:nth-child(1)::after{
					content:'';
					display:block;
					position:absolute;
					right:;
					top:10px;
					height:40px;
					width:1px;
					background:#eee;
				}
				&:nth-child(2)::after{
					content:'';
					display:block;
					position:absolute;
					right:0;
					top:10px;
					height:40px;
					width:1px;
					background:#eee;
				}
			}
		}
	}
	.guize{
		background:#fff;
		margin-top:10px;
		padding:20px;
		h5{
			text-align:center;
			height:35px;
			line-height:35px;
			margin-bottom:20px;
			font-size:20px;
		}
		p{
			font-size:15px;
			margin-bottom:20px;
			line-height:20px;
			color:rgba(000,000,000,0.6)
		}
		span{
			font-size:15px;
			color:red;
		}
	}
}
</style>
