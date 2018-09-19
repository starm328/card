<template>
	<div class="referress-component"  style="background:#eee;min-height:100vh">
		<cart-loged>
			<stm-referress></stm-referress>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Hometeamreferress from '@/components/team/referress';
export default {
	name: 'referress-component',
	data () {
		return {

		}
	},
	components: {
		'cart-loged': Loged,
		'stm-referress': Hometeamreferress,
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '直属人脉'
		})

	}
}
</script>

<style lang="less" scoped>
</style>
