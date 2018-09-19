<template>
	<div class="information-bonus" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-bonus></stm-information-bonus>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationbonus from '@/components/information/bonus';
import Nav from '@/components/Nav';

export default {
	name: 'information-bonus',
	components: {
		'cart-loged': Loged,
		'stm-information-bonus': Informationbonus,
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
