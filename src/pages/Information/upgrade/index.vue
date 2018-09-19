<template>
	<div class="information-upgrade" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-upgrade></stm-information-upgrade>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationupgrade from '@/components/information/upgrade';
import Nav from '@/components/Nav';

export default {
	name: 'information-upgrade',
	components: {
		'cart-loged': Loged,
		'stm-information-upgrade': Informationupgrade,
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
