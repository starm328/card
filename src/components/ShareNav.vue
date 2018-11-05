<template>
	<form @submit="gotoformid" :report-submit="true">
		<button formType="submit" class="form_button"  style="color:#fff;">
	<div class="nav" :style="'background-color: rgba(255, 255, 255,' + scrolldata + ');height:'+navgationHeight + 'px'">
		<img :src="card" :style="'margin-top:'+fontmar +'px'" @click="user" v-if="!isback">
		<i class="iconfont  icon-shangyiyehoutuifanhui-yuankuang" :style="'margin-top:'+fontmar +'px'" :class="fonticon" @click="back" v-else></i>

	</div>
		</button>
	</form>
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
	props: {
		scrollTop:Number,
		card:Object,
		isback:Boolean
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
	onUnload() {
		this.isback = false

	},
	computed: {
		scrolldata() {
			return this.scrollTop / 400 > 0.9  ? 1 : this.scrollTop / 400
		},
		fonticon() {
			return this.scrollTop / 400 > 0.9  ? 'active' :  ''
		},
		fontmar() {
			return this.navgationHeight - 60
		}
	},
	methods: {
		gotoformid(e) {
			Auth.formid(e.target.formId)
		},
		back(){
			wx.navigateBack({
			  delta: 1
			})
		},
		user() {
			wx.navigateTo({
			  url: '/pages/Home/index/main'
			})
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
	i{
		margin-left:20px;
		color:#fff;
		font-size:30px;
		&.active{
			color:#ccc;
		}
	}
	img{
		width:30px;
		height:30px;
		border-radius:50%;
		overflow:hidden;
		margin-left:20px;
	}
}
</style>
