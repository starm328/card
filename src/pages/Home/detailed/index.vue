<template>
	<div class="home-basic-index stm-warp">
		<stm-nav></stm-nav>

		<cart-loged>
			<stm-home-detailed></stm-home-detailed>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeDetailed from '@/components/home/detailed';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-nav':Nav,
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
