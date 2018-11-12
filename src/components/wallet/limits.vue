<template>
	<div>111</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'limits',
	data () {
		return {
			limits:[]
		}
	},
	props: {
		id:Number
	},
	onLoad() {
			this.getdata()
	},
	methods: {
		getdata() {
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}withdraw-rules/${this.id}/limits`,
				method: 'GET',
				header: {
					token:wx.getStorageSync('Authtoken'),
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					console.log(d)
					_this.limits = d.data
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
		}
	}
}
</script>

<style lang="less" scoped>
</style>
