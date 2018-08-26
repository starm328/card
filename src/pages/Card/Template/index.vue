<template>
	<div class="template-warp">
		<ul>
			<li>
				<div class="img" style="font-size:13px;">自建</div>
				<p>可激活</p>
			</li>
			<li>
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li>
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li>
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>申请中</p>
			</li>
			<li>
				<div class="img"><open-data type="userAvatarUrl" class="img"></open-data></div>
				<p>可激活</p>
			</li>
			<li @click="dialogTempla">
				<div class="img">+</div>
				<p>增加模板</p>
			</li>
		</ul>
		<dialog-template @clock="dialogTempla" v-if="show"></dialog-template>
	</div>
</template>

<script>
import DialogTempla from '@/components/dialogTemplate/index'
export default {

	name: 'template-warp',
	components: {
		'dialog-template':DialogTempla
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '模板中心'
		})
	},
	data () {
		return {
			show:false
		}
	},
	methods: {
		dialogTempla() {
			this.show = !this.show
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
.template-warp{
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
