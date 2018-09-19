<template>
	<div class="information-reliable" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-reliable></stm-information-reliable>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationreliable from '@/components/information/reliable';
import Nav from '@/components/Nav';

export default {
	name: 'information-reliable',
	components: {
		'cart-loged': Loged,
		'stm-information-reliable': Informationreliable,
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
