<template>
		<i class="iconfont icon-location" @click="map"></i>
</template>

<script>
var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
export default {
	name: 'navigation-component',
	data () {
		return {
			location:''
		}
	},
	props: {
		cardData:Object
	},
	onLoad() {
		this.getude()
	},
	onShow () {
		this.getude()
	},
	methods: {
		getude() {
			qqmapsdk = new QQMapWX({
				key: '5VHBZ-XUP6S-MK4OD-6Y63R-5SIAZ-T3FH7'
			})
			var _this = this;
			// 调用接口
			qqmapsdk.geocoder({
				address: _this.cardData.card.area + _this.cardData.detail.address,
				success: function(res) {
				   _this.location = res.result.location
				},
				fail: function(res) {
				    console.log(res);
				},
			});
		},
		map() {
			var _this = this
			console.log(_this.location.lat)
			wx.openLocation({
				latitude: _this.location.lat,
				longitude: _this.location.lng,
				scale: 18,
				name: '导航',
				address:_this.cardData.card.area
			})
		}
	}
}
</script>

<style lang="less" scoped>
i{
	color:rgb(171, 175, 186);
	font-size:30px;
}
</style>

