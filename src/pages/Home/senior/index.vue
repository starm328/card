<template>
	<div class="home-senior-index stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-senior></stm-home-senior>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homesenior from '@/components/home/senior';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-senior': Homesenior,
		'stm-nav':Nav,

	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'高级选项'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
