<template>
	<div class="home-basic-index stm-warp">
		<cart-loged>
			<stm-home-basic></stm-home-basic>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeBasic from '@/components/home/basic'
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-home-basic': HomeBasic,
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
