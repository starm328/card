<template>
	<div class="share-show-item">
		<div class="item-content">
			<h6>活动名称</h6>
			<p>活动介绍</p>
			<div class="video-title">
				视频标题
			</div>
			<video></video>
		</div>

	</div>
</template>

<script>
export default {

  name: 'share-show-item',
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '活动名称'
  	})
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.share-show-item{
	.item-content{
		min-height:100vh;
		background:#fff;
		padding:10px;
		font-size:14px;
		video{
			width:100%;
		}
		.video-title{
			text-align:center;
			line-height:30px;
		}
		h6{
			text-align:center;
		}
	}
}
</style>
