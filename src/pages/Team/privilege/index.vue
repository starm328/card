<template>
	<div class="privilege-index" style="background:#eee;min-height:100vh">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-privilege></stm-privilege>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Privilege from '@/components/team/privilege';
import Nav from '@/components/Navt';

export default {
	name: 'privilege-index',
	components: {
		'cart-loged': Loged,
		'stm-privilege': Privilege,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '特权'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
