<template>
	<div class="information-index">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-index></stm-information-index>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeinformation from '@/components/information/index';
import Nav from '@/components/Nav';

export default {
	name: 'information-index',
	components: {
		'cart-loged': Loged,
		'stm-information-index': Homeinformation,
		'stm-nav':Nav
	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'消息'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
