<template>
	<div class="cart-team" style="background:#eee;min-height:100vh">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-invitation></stm-invitation>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Invitation from '@/components/invitation';
import Nav from '@/components/Nav';

export default {
	name: 'cart-team',
	components: {
		'cart-loged': Loged,
		'stm-invitation': Invitation,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	},
	onShareAppMessage(res) {
			return {
				title:'邀请你一起创建名片',
				path: '/pages/Home/index/main?&pid=' +wx.getStorageSync('token').user_id,
			}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '邀请有奖'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
