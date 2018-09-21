<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<div class="main">
			<div class="guize">
				<h5>一生名片疑问解答</h5>
				· 如何获得积分？<br/>
				· 积分如何使用？<br/>
				· 如何获得生命逗？<br/>
				· 查看别人名片后如何返回自己的名片首页？<br/>
				· 如何转发别人的名片？<br/>
			</div>

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
			title:'升级规则'
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
	img{
		width:100px;
		display:block;
		margin:0 auto;
	}
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
		color:#999;
		.guize{
			background:#fff;
			margin-top:10px;
			padding:20px;
			h5{
				text-align:center;
				height:35px;
				line-height:35px;
				margin-bottom:20px;
				font-size:20px;
			}
			p{
				font-size:15px;
				margin-bottom:20px;
				line-height:20px;
				color:rgba(000,000,000,0.6)
			}
			span{
				font-size:15px;
				color:red;
			}
		}
	}
}
</style>
