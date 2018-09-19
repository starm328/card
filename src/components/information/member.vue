
<template>
	<div class="information-member" :style="'padding-top:'+navgationHeight+'px'">
		<dl>
			<dd>亲，您邀请的某某某己成功注册成为会员、VIP会员、联盟大使，加油，真好！</dd>
		</dl>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-member',
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

.information-member{
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
