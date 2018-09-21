<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<div class="main">
			<div class="guize">
				<h5>一生名片操作视频</h5>
				· 如何创建名片、编辑名片操作视频！<br/>
				· 如何查看自己名片视频！<br/>
				· 如何查看人脉圈视频！<br/>
				· 如何查看自己的粉丝视频！<br/>
				· 如何提现视频！<br/>
				· 如何分享、转发自己的名片视频！<br/>
				· 如何交换名片、收藏名片、留言视频！<br/>
				· 如何把自己展视在人脉圈视频！<br/>
				· 如何升级视频！<br/>
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
