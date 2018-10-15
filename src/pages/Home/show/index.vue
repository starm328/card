<template>
	<div class="cart-home-show">
		<scroll-view scroll-y style="height: 100vh;background:#242b35" @scroll="scroll">
			<stm-nav :scrollTop="scrollTop" :isback="true"></stm-nav>
		<cart-loged>
			<stm-show @getshare="getshare" :scroll="scrollTop"></stm-show>
		</cart-loged>
		</scroll-view>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeCard from '@/components/home/show';
import Nav from '@/components/Navigation';
var util = require('@/utils/md5.js')
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-show': HomeCard,
		'stm-nav':Nav
	},
	data () {
		return {
			sharedata:'',
			scrollTop:null,
		}
	},


	onShareAppMessage(res) {
		if (res.from === 'button') {
			var getshare = res.target.dataset
			var date = new Date().getTime()
			console.log('/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id)
			return {
				title:'嗨，我是 '+ getshare.name + '这是我名片！把你名片发我哦！ ',
				path: '/pages/Home/share/main?id='+ getshare.id +'&time=' + date+'&token='+util.hexMD5(getshare.id + '_' + date) + '&pid=' +wx.getStorageSync('token').user_id,
				imageUrl:getshare.img,
			}
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'名片详情'
		});
		this.getshare()
		wx.hideShareMenu()
	},
	methods: {
		getshare(data){
			this.sharedata =  data
		},
		scroll (e) {
			this.scrollTop= e.mp.detail.scrollTop
			if(e.mp.detail.scrollTop > 169) {
				wx.setNavigationBarColor({
					  frontColor:'#000000',
					  backgroundColor:'#ff0000'

				})
			}else{
				wx.setNavigationBarColor({
					  frontColor:'#ffffff',
					  backgroundColor:'#ff0000'

				})
			}
		},

	}
}
</script>

<style lang="less" scoped>

</style>

