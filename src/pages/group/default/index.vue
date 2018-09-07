<template>
	<div class="information-exchange" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-group-default></stm-group-default>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Groupdefault from '@/components/group/default';
import Nav from '@/components/Nav';

export default {
	name: 'group-default',
	components: {
		'cart-loged': Loged,
		'stm-group-default': Groupdefault,
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
