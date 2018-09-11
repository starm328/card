<template>
	<div class="cart-home-translate" :style="'padding-top:'+navgationHeight+'px'">
		<stm-nav></stm-nav>
		<img src="https://vpinpai.oss-cn-hangzhou.aliyuncs.com/yscard/%E5%9B%BE%E5%B1%82%202.png" style="width:100%" mode="widthFix" @click="pay(1)">
		<img src="https://vpinpai.oss-cn-hangzhou.aliyuncs.com/yscard/%E5%9B%BE%E5%B1%82%203.png" style="width:100%" mode="widthFix" @click="pay(2)">
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-translate',
	components: {
		'stm-nav':Nav,

	},
	data () {
		return {
			navgationHeight:'',
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'选择升级'
		});
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
	methods: {
		pay(type) {
			var _this = this;
			wx.showLoading({
				title: '支付中',
			})
			wx.pro.request({
				url:  `${configs.card.apiBaseUrl}api/pay/index`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				},
				data: {
					type
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.requestPayment({
						'timeStamp': d.data.timeStamp,
						'nonceStr': d.data.nonceStr,
						'package': d.data.package,
						'signType': d.data.signType,
						'paySign': d.data.paySign,
						success:()=>{
							console.log('支付陈宫')
						},
						fail:()=>{
							console.log('支付失败')
						}
					})
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					console.log(err)
					wx.hideLoading ();
					wx.showToast({
					  title: '系统错误',
					  icon: 'none',
					  duration: 2000
					})
				}else if(err.statusCode == 404){
					console.log(err)
					wx.hideLoading ();
					wx.showToast({
					  title: '系统错误',
					  icon: 'none',
					  duration: 2000
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}
}
</script>

<style lang="less" scoped>
.cart-home-translate{
	background:#4a4f62;
	img{
		vertical-align:bottom;
	}
}
</style>
