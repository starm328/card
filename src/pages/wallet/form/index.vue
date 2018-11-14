<template>
	<div class="wallet-form-warp" style="background:#eee;min-height:100vh">
		<stm-nav :isback="true"></stm-nav>
		<cart-loged>
			<stm-form></stm-form>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Form from '@/components/wallet/form';
import Nav from '@/components/Nav';
export default {
	name: 'wallet-form',
	components: {
		'cart-loged': Loged,
		'stm-form': Form,
		'stm-nav':Nav,
	},
	data () {
		return {

		}
	}
}
</script>

<style lang="less" scoped>
</style>
