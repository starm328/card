<template>
	<div class="home-basic-index stm-warp">
		<cart-loged>
			<stm-home-jurisdiction></stm-home-jurisdiction>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeJurisdiction from '@/components/home/jurisdiction'
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-jurisdiction': HomeJurisdiction,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
		  title: '权限设置'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
