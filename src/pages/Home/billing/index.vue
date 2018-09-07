<template>
	<div class="home-billing-index stm-warp">
		<stm-nav></stm-nav>

		<cart-loged>
			<stm-home-billing></stm-home-billing>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homebilling from '@/components/home/billing';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-billing': Homebilling,
		'stm-nav':Nav,

	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'开票信息'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
