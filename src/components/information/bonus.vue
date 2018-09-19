
<template>
	<div class="information-bonus" :style="'padding-top:'+navgationHeight+'px'">
		<dl>
			<dd>某某某您推荐的某某某已经成功升级为（VIP会员或联盟大使），非常感谢你的支持，公司奖励你的xxx佣金已经入账，你可以随时提现哦！加油，真好！</dd>
		</dl>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-bonus',
	data () {
		return {
			navgationHeight:'',
			onReachBottom:true,
			message:'',
			page:1,
			pageSize:10
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

.information-bonus{
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
