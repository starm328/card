<template>
	<div class="cart-user" style="background:#eee;min-height:100vh">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-user></stm-user>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Homeuser from '@/components/team/user';
import Nav from '@/components/Navt';

export default {
	name: 'cart-user',
	components: {
		'cart-loged': Loged,
		'stm-user': Homeuser,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '个人中心'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
