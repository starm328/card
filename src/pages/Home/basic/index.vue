<template>
	<div class="home-basic-index stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-basic></stm-home-basic>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeBasic from '@/components/home/basic';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-basic': HomeBasic,
		'stm-nav':Nav
	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'添加名片'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
