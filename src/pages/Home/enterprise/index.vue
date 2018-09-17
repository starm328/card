<template>
	<div class="home-enterprise-index stm-warp">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-home-enterprise></stm-home-enterprise>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeenterprise from '@/components/home/enterprise';
import Nav from '@/components/Nav';

export default {
	name: 'home-enterprise-index',
	components: {
		'cart-loged': Loged,
		'stm-home-enterprise': Homeenterprise,
		'stm-nav':Nav,

	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'公司编辑'
		})
	}
}
</script>

<style lang="less" scoped>
</style>
