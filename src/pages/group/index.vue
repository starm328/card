<template>
	<div class="cart-home-group stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-group></stm-home-group>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homegroup from '@/components/home/group';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-group',
	components: {
		'cart-loged': Loged,
		'stm-home-group': Homegroup,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '名片组'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
