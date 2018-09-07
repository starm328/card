<template>
	<div class="information-exchange" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-group-collection></stm-group-collection>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Groupcollection from '@/components/group/collection';
import Nav from '@/components/Nav';

export default {
	name: 'group-collection',
	components: {
		'cart-loged': Loged,
		'stm-group-collection': Groupcollection,
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
