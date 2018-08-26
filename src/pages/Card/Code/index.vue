<template>
	<div class="card-code">
		<div class="code-img">
			<h5><open-data type="userNickName"></open-data> <span>专属名片小程序码</span></h5>
			<canvas canvas-id="firstCanvas" style="width:200px;height:210px;"></canvas>
		</div>
		<div class="code-text">
			<p>此名片码可印刷在</p>
			<span>纸质名片、宣传单、海报、易拉宝等宣传册上</span>
			<p>微信扫一扫名片即可存入通讯录，无需打字</p>
		</div>
		<button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation" style="margin:20px"> 保存图片 </button>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'card-code',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '名片码'
		})
		this.getcode()
	},
	data () {
		return {
			code:'https://inedia.web.mallkd.com/code.jpg'
		}
	},

	onReady(){
		const that=this;
		const ctx = wx.createCanvasContext('firstCanvas')
		wx.downloadFile({
			url: that.code,
			success: function(res) {
				wx.downloadFile({
					url:that.code,
					success: function(resd) {
						ctx.save()
						ctx.setFillStyle('red')
						ctx.drawImage(resd.tempFilePath,0, 10, 200, 200)
						ctx.draw()
						ctx.beginPath()
						ctx.arc(100, 110, 45, 0, 2*Math.PI)
						ctx.clip()
						ctx.drawImage(res.tempFilePath, 50, 60, 95, 95)
						ctx.draw(true)
					}
				})

			}
		})

	},

	methods: {
		getcode() {
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/promotion/index`,
				method: 'POST',
				header: {
					token: Auth.proxy.token.access_token
				},
				data:{
					scene:1,
					page:'pages/Home/share/main'
				}

			})
			.then(d => {
				if(d.statusCode == 200){

				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					Auth.refresh(this.auth.proxy.token.access_token);
					this.getcode()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		Preservation() {
			wx.canvasToTempFilePath({
				y:10,
				destWidth:200,
				destHeight:200,
				quality:1,
				canvasId: 'firstCanvas',
				success: function(res) {
					console.log(res.tempFilePath)
					wx.saveImageToPhotosAlbum({
						filePath:res.tempFilePath,
						success(res) {
							wx.showToast({
							  title: '保存成功',
							  icon: 'success',
							  duration: 2000
							})
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/main.less';
@import '../../../configs/style.less';
.card-code{
	.code-img{
		background:#fff;
		margin:20px 20px 0 20px;
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
