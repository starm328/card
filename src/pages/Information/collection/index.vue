<template>
	<div class="information-collection" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-collection></stm-information-collection>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationcollection from '@/components/information/collection';
import Nav from '@/components/Nav';

export default {
	name: 'information-collection',
	components: {
		'cart-loged': Loged,
		'stm-information-collection': Informationcollection,
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
