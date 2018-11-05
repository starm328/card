<template>
	<div class="nav" :style="'height:'+navgationHeight + 'px'">
		<form @submit="gotoformid" :report-submit="true">
			<button formType="submit" class="form_button"  style="color:#fff;">
					<i class="iconfont  icon-shangyiyehoutuifanhui-yuankuang" :style="'margin-top:'+fontmar +'px'" :class="fonticon" @click="back"></i>
			</button>
		</form>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
export default {
	name: 'navigation',
	data () {
		return {
			navgationHeight:''

		}
	},
	onLoad() {
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
	},
	computed: {
		fontmar() {
			return this.navgationHeight - 60
		}
	},
	methods: {
		back(){
			wx.navigateBack({
			  delta: 1
			})
		},
		gotoformid(e) {
			Auth.formid(e.target.formId)
		}
	}
}
</script>

<style lang="less" scoped>
.nav{
	width:100%;
	position:fixed;
	top:0;
	left:0;
	z-index:99;
	background:#fa6b5b;
	i{
		margin-left:20px;
		color:#fff;
		font-size:30px;
		&.active{
			color:#ccc;
		}
	}
}
</style>
