<template>
	<div class="information-list">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-list></stm-information-list>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeinformation from '@/components/information/list';
import Nav from '@/components/Nav';

export default {
	name: 'information-list',
	components: {
		'cart-loged': Loged,
		'stm-information-list': Homeinformation,
		'stm-nav':Nav
	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'系统消息'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
