<template>
	<div class="home-basic-index stm-warp">
		<cart-loged>
			<stm-home-detailed></stm-home-detailed>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeDetailed from '@/components/home/detailed'
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-detailed': HomeDetailed,
	},
	data () {
		return {

		}
	},
	onLoad() {

		wx.setNavigationBarTitle({
			title: '详细资料'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
