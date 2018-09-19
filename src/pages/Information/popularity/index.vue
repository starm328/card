<template>
	<div class="information-popularity" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-popularity></stm-information-popularity>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationpopularity from '@/components/information/popularity';
import Nav from '@/components/Nav';

export default {
	name: 'information-popularity',
	components: {
		'cart-loged': Loged,
		'stm-information-popularity': Informationpopularity,
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
