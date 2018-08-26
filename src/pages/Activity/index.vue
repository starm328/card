<template>
	<div class="activity-warp">
		<div class="nav">
			<ul>
				<li :class="[nav == 1 ? 'active' : '']" @click="navbtn(1)">我创建的</li>
				<li :class="[nav == 2 ? 'active' : '']" @click="navbtn(2)">我报名的</li>
			</ul>
		</div>
		<div class="addActivity" @click="showModal">
			<i class="iconfont icon-msnui-edit"></i>
		</div>
	</div>
</template>

<script>
export default {

	name: 'activity-warp',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '我的活动 '
		})
	},
	data () {
		return {
			nav:1
		}
	},
	methods: {
		navbtn(i){
			this.nav = i
		},
		addActivity() {

		},
		showModal() {
			wx.showModal({
				title: '提示',
				content: '创建活动需要解锁，是否去解锁',
				success: function(res) {
					if (res.confirm) {
						wx.navigateTo({
						url:'/pages/Enterprise/Template/Unlock/Upvideo/main'

						})
					} else if (res.cancel) {
					  console.log('用户点击取消')
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.activity-warp{
	.nav{
		ul{
			display:flex;
			li{
				flex:1;
				line-height:45px;
				line-height:45px;
				background:#fff;
				text-align:center;
				font-size:@fonttwo;
				&.active{
					border-bottom:2px solid @maincolor;
				}
			}
		}
	}
	.addActivity{
		position:fixed;
		right:20px;
		bottom:30px;
		background:@maincolor;
		border-radius:50%;
		color:#fff;
		width:40px;
		height:40px;
		line-height:40px;
		text-align:center;
		i{
			font-size:16px;
		}
	}
}
</style>
