<template>
	<div class="cart-home-show">
		<cart-loged>
			<stm-show></stm-show>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import HomeCard from '@/components/home/show'
export default {
	name: 'cart-home-show',
	components: {
		'cart-loged': Loged,
		'stm-show': HomeCard,
	},
	data () {
		return {
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			return {
				title: res.target.dataset.nafe,
				path: '/pages/Home/show/main?id='+res.target.dataset.id,
				imageUrl:res.target.dataset.img,
			}
		}

	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'名片详情'
		})
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
</style>
