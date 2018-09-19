
<template>
	<div class="information-system" :style="'padding-top:'+navgationHeight+'px'">
		<dl >
			<dd>亲，您太优秀啦，某某某为你的人气加分啦，快去看看吧，真好！</dd>
		</dl>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-system',
	data () {
		return {
			navgationHeight:'',
		}
	},
	onLoad() {
			var startBarHeight = 20
			var navgationHeight = 44
			var _this = this;
			wx.getSystemInfo({
			  success: function (res) {
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				_this.navgationHeight= navgationHeight+startBarHeight
			  }
			})


	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';

.information-system{
	dl{
		background:#fff;
		border-bottom:1px solid #ddd;
		font-size:@fonttwo;
		padding:20px;
	}
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
}
</style>
