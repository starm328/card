<template>
	<div class="information-member" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
			<stm-information-member></stm-information-member>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationmember from '@/components/information/member';
import Nav from '@/components/Nav';

export default {
	name: 'information-member',
	components: {
		'cart-loged': Loged,
		'stm-information-member': Informationmember,
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
