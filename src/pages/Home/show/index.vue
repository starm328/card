<template>
	<div class="cart-home-show  stm-warp">
		<cart-loged>
			<stm-show @getshare="getshare"></stm-show>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeCard from '@/components/home/show';
var util = require('@/utils/md5.js')
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-show': HomeCard,
	},
	data () {
		return {
			sharedata:''
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			var getshare = res.target.dataset
			var date = new Date().getTime()
			console.log('/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id)
			return {
				title: getshare.name,
				path: '/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id,
				imageUrl:getshare.img,
			}
		}else{
			console.log('/pages/Home/share/main?id='+ this.sharedata.id +'&time=' + date+'&token='+util.hexMD5(this.sharedata.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id)
			var date = new Date().getTime()
			return {
				title: this.sharedata.name,
				path: '/pages/Home/share/main?id='+ this.sharedata.id +'&time=' + date+'&token='+util.hexMD5(this.sharedata.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id,
				imageUrl:this.sharedata.img,
			}
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'名片详情'
		});
		this.getshare()
	},
	methods: {
		getshare(data){
			this.sharedata =  data
			console.log(data)
		}
	}
}
</script>

<style lang="less" scoped>
</style>
