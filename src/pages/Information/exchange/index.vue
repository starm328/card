<template>
	<div class="information-exchange" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-exchange></stm-information-exchange>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import InformationExchange from '@/components/information/exchange';
import Nav from '@/components/Nav';

export default {
	name: 'information-exchange',
	components: {
		'cart-loged': Loged,
		'stm-information-exchange': InformationExchange,
		'stm-nav':Nav
	},
	data () {
		return {

		}
	},
}
</script>

<style lang="less" scoped>
</style>
