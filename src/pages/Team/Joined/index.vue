<template>
	<div class="dialog-team-warp">
		<ul>
			<li @click="gojoin">
				<div class="img" style="font-size:13px;">自建</div>
				<p>可激活<span>删除</span></p>
			</li>
			<li @click="gojoin">
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li @click="gojoin">
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li @click="gojoin">
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>申请中</p>
			</li>
			<li @click="gojoin">
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li @click="dialogTeam">
				<div class="img">+</div>
				<p>增加团队</p>
			</li>
		</ul>
		<dialog-team @clock="dialogTeam" v-if="show"></dialog-team>
	</div>
</template>

<script>
import DialogTeam from '@/components/dialogTeam/index'
export default {

	name: 'dialog-team-warp',
	components: {
		'dialog-team':DialogTeam
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '加入的团队'
		})
	},
	data () {
		return {
			show:false
		}
	},
	methods: {
		dialogTeam() {
			this.show = !this.show
		},
		gojoin() {
			wx.navigateTo({
			  url: '/pages/Team/Home/main'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
.dialog-team-warp{
	ul{
		padding:20px;
		li{
			width:33.3%;
			float:left;
			text-align:center;
			font-size:@fonttwo;
			margin-bottom:20px;
			.img{
				width:60px;
				height:60px;
				margin:0 auto;
				background:@auxiliary;
				line-height:60px;
				font-size:@fontthree;
				color:#fff;
				border-radius:5px;
				overflow:hidden;
			}
			p{
				line-height:25px;
			}
		}
	}
}
</style>
