<template>
	<div class="card-code stm-warp">
		<div class="code-img">
			<h5><span>专属名片小程序码</span></h5>
			<img :src="config.card.apiBaseUrl+'api/promotion/index/2?scene='+scene+'&page=pages%2FHome%2Findex%2Fmain'" style="width:60%" mode="widthFix" lazy-load>
		</div>
		<div class="code-text">
			<p>此名片码可印刷在</p>
			<span>纸质名片、宣传单、海报、易拉宝等宣传册上</span>
			<!-- <p>微信扫一扫名片即可存入通讯录，无需打字</p> -->
		</div>
		<!-- <button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation" style="margin:20px"> 保存图片 </button> -->
	</div>
</template>
<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
var util = require('@/utils/md5.js')

export default {
	name: 'card-code',
	onLoad(option) {
		wx.hideShareMenu();

		var _this = this;
		_this.scene = wx.getStorageSync('token').user_id

	},
	data () {
		return {
			scene:'',
			img:'',
			config:configs,
		}
	},
	onReady(){

	},

	methods: {
		Preservation() {
			wx.downloadFile({
			  url:  `${configs.card.apiBaseUrl}api/promotion/index/2?scene=${this.scene}&page=pages%2FHome%2Findex%2Fmain'`, //仅为示例，并非真实的资源
			  success: function(res) {
			    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			    if (res.statusCode === 200) {
			      console.log(res.tempFilePath)
			    }
			  }
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/main.less';
@import '../../configs/style.less';
.card-code{
	padding:50px 0;
	.code-img{
		background:#fff;
		margin:0 20px 0 20px;
		border-bottom:1px dashed #eee;
		position:relative;
		text-align:center;
		padding-bottom:20px;
		h5{
			line-height:80px;
			font-size:@fontthree;
			span{
				color:@maincolor;
			}
		}
		canvas{
			margin:0 auto;
			display:block;

		}
		&:after{
			content:'';
			display:block;
			position:absolute;
			left:-5px;
			bottom:-5px;
			width:10px;
			height:10px;
			border-radius:50%;
			background:#eee;
		}
		&:before{
			content:'';
			display:block;
			position:absolute;
			right:-5px;
			bottom:-5px;
			width:10px;
			height:10px;
			border-radius:50%;
			background:#eee;
		}

	}
	.code-text{
		margin:0 20px;
		background:#fff;
		padding:20px 10px;
		text-align:center;
		p{
			font-size:@fontone;
		}
		span{
			font-size:@fonttwo;
			line-height:40px;
			color:@maincolor;
		}
	}
}
</style>
