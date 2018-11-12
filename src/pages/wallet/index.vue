<template>
	<div class="cart-wallet" style="background:#eee;min-height:100vh">
		<stm-nav :isback="true"></stm-nav>
		<cart-loged>
			<stm-wallet></stm-wallet>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homewallet from '@/components/wallet/index';
import Nav from '@/components/Nav';

export default {
	name: 'cart-wallet',
	components: {
		'cart-loged': Loged,
		'stm-wallet': Homewallet,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '我的钱包'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
