<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<h6>关于一生名片</h6>
		<div class="main">
			一生名片，发现更大的世界，让生意变得更容易、更简单！<br/>
			一张神奇的互联网名片，一个以名片为入口、以移动互联网为载体的超级生意平台，超级个人和企业的流量自媒体分发平台，让你通过手机与全世界的人做生意。只需一部手机，就可以轻松把自已的品牌、产品、服务乃至整个企业都放进名片里。一生名片发送和交换简单方便，线上线下畅通无阻，你的名片不断发出去，生意就会不断带进来。<br/>
			一生名片专门为传统中小微企业及创业者量身打造，适用于所有创新品牌及传统实体，能帮你实现三大价值：提升形象、推广品牌、拓展生意，特别适合连锁品牌、电商、传统零售、贸易、服务、制造、新农业、教育、咨询、创意、新媒体等企业或个人。
		</div>
	</div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
	name: 'about',
	components: {
		'stm-nav':Nav
	},
	data () {
		return {
			navgationHeight:''
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'关于一生名片'
		})
		let startBarHeight = 20
		let navgationHeight = 44
		let that = this
		wx.getSystemInfo({
		  success: function (res) {
			if (res.model == 'iPhone X'){
			  startBarHeight = 44
			}
			that.navgationHeight= navgationHeight+startBarHeight
		  }
		})
	}
}
</script>

<style lang="less" scoped>
.about{
	h6{
		text-align:center;
		line-height:35px;
		font-size:18px;
		margin-top:10px;
	}
	.main{
		padding:20px;
		line-height:30px;
		font-size:15px;
		color:#999
	}
}
</style>
