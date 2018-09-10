<template>
	<div class="information-system" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-system></stm-information-system>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationsystem from '@/components/information/system';
import Nav from '@/components/Nav';

export default {
	name: 'information-system',
	components: {
		'cart-loged': Loged,
		'stm-information-system': Informationsystem,
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
