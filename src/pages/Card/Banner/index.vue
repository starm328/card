<template>
	<div class="home-poster-index stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-poster></stm-home-poster>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeposter from '@/components/poster/list';
import Nav from '@/components/Nav';

export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-poster': Homeposter,
		'stm-nav':Nav,

	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'名片海报'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
