<template>
	<div class="information-chat" style="min-height:100vh;background:#eee;">
		<stm-nav></stm-nav>
		<cart-loged>
				<stm-information-chat></stm-information-chat>
		</cart-loged>

	</div>
</template>

<script>
import Loged from '@/components/loged';
import Informationchat from '@/components/information/chatlist';
import Nav from '@/components/Nav';

export default {
	name: 'information-chat',
	components: {
		'cart-loged': Loged,
		'stm-information-chat': Informationchat,
		'stm-nav':Nav
	},
	data () {
		return {
		}
	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
</style>
