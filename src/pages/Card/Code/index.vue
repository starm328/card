<template>
	<div class="cart-home-qrcode  stm-warp">
		<stm-nav></stm-nav>

		<cart-loged>
			<stm-qrcode @getshare="getshare"></stm-qrcode>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeqrcode from '@/components/home/qrcode';
import Nav from '@/components/Nav';

var util = require('@/utils/md5.js')
export default {
	name: 'cart-home-qrcode',
	components: {
		'cart-loged': Loged,
		'stm-qrcode': Homeqrcode,
		'stm-nav':Nav,

	},
	data () {

	},

	onLoad() {
		wx.setNavigationBarTitle({
		  title: '名片码'
		})
	},

}
</script>

<style lang="less" scoped>
</style>
