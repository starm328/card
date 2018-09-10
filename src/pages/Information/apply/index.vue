<template>
	<div class="information-apply" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-apply></stm-information-apply>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationapply from '@/components/information/apply';
import Nav from '@/components/Nav';

export default {
	name: 'information-apply',
	components: {
		'cart-loged': Loged,
		'stm-information-apply': Informationapply,
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
