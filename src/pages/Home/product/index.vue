<template>
	<div class="home-product-index stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-product></stm-home-product>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeproduct from '@/components/home/product';
import Nav from '@/components/Nav';

export default {
	name: 'home-product-index',
	components: {
		'cart-loged': Loged,
		'stm-home-product': Homeproduct,
		'stm-nav':Nav,

	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'产品编辑'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
