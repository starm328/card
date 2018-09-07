<template>
	<div class="cart-team" style="background:#eee;min-height:100vh">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-team></stm-team>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Hometeam from '@/components/team/index';
import Nav from '@/components/Navt';

export default {
	name: 'cart-team',
	components: {
		'cart-loged': Loged,
		'stm-team': Hometeam,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '团队管理'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
