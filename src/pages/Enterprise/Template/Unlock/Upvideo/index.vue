<template>
	<div class="unlock-upvideo">
		<h5>参考视频</h5>
		<video :src="video" controls></video>
		<p class="opimg" @click="chooseVideo"  >添加视频</p>
		<div class="text">
			<p>视频拍摄上传要求：</p>
			<p>上传一段</p>
			<p>（1）你最想对父母说的话；</p>
			<p>（2）你想对天下子女说的话；</p>
			<p>（3）固定台词：</p>
			<p>"我是感恩父母行动联盟支持者，愿天下父母健康快乐"</p>
		</div>
	</div>
</template>

<script>
export default {

	name: 'unlock-upvideo',

	data () {
		return {
			video:''
		}
	},
	methods: {
		chooseVideo() {
			var _this = this
			wx.chooseVideo({
				sourceType:['album', 'camera'],
				maxDuration:60,
				success(res){
					_this.video =res.tempFilePath
				},
				fail(res){
					wx.showToast({
					  title: '失败',
					  icon: 'success',
					  duration: 2000
					})
				}
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../../../configs/style.less';
.unlock-upvideo{
	.text{
		background:#fff;
		padding:20px;
		font-size:@fonttwo;
		color:@fontcolor;
	}
	h5{
		padding:0 20px;
		font-size:@fontthree;
		line-height:40px;
	}
	video{
		width:90%;
		display:block;
		margin:0 auto 20px auto;
	}
	.opimg{
		width:50px;
		height:50px;
		display:flex;
		padding:10px;
		background:@auxiliary;
		text-align:center;
		align-items:center;
		font-size:@fonttwo;
		color:#fff;
		margin-left:10px;
		margin:20px auto;
	}
}
</style>
