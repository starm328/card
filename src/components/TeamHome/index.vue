<template>
	<div class="dialog-main clock-dialog enterprise-dialog" :class="{countshow:isShow}">
		<div class="dialog-bg" @click="clockhidden"></div>
		<div class="dialog-content clock-content">
			<div class="title">备注 <i @click="clockhidden" class="iconfont icon-guanbi"></i></div>
			<div class="main">
				<p>地址：上海</p>
				<div><p>备注信息：</p>xinx</div>
				<p class="voice">播放语音</p>
				<ul>
					<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
					<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
					<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'count-main',
  props: {
  	isShow:Boolean,
  },
  data () {
    return {

    }
  },
  methods: {
  	clockhidden() {
  		this.$emit('close')
  	},
  	previewImage() {
  		wx.previewImage({
  		  current: '', // 当前显示图片的http链接
  		  urls: ['https://inedia.web.mallkd.com/code.jpg'] // 需要预览的图片http链接列表
  		})

  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
.dialog-main{
		&.countshow{
			display:block;
		}
}
.clock-content{
	.main{
		font-size:@fonttwo;
		padding:20px;
	}
	.voice{
		margin:10px 0;
		display:inline-block;
		padding:2px 10px;
		background:@maincolor;
		color:#fff;
		border-radius:30px;
	}
	ul{
		display:flex;
		li{
			flex:1;
			margin:5px;
			img{
				width:40px;

			}
		}
	}
}
</style>
