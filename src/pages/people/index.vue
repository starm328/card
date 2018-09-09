<template>
	<div class="people-index" style="min-height:100vh;background:#eee;">
		<stm-nav :isback="true"></stm-nav>
		<cart-loged>
			<stm-people-index></stm-people-index>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import People from '@/components/people/index';
import Nav from '@/components/Nav';

export default {
	name: 'people-index',
	components: {
		'cart-loged': Loged,
		'stm-people-index': People,
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
