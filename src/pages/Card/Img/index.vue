<template>
	<div class="card-img">
		<canvas canvas-id="firstCanvas" :style="{width:windowWidth+'px',height:windowHeight+ 'px'}"></canvas>
		<button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation" style="margin:20px"> 保存图片 </button>
	</div>
</template>

<script>
export default {

	name: 'card-img',
	data () {
		return {
			windowWidth:'',
			windowHeight:'',
			code:'https://inedia.web.mallkd.com/code.jpg'
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '名片图片'
		})
	},
	onReady() {
		var _this = this
		wx.downloadFile({
			url: _this.code,
			success: function(res) {
				wx.getSystemInfo({
					success: function(res) {
						_this.windowWidth = res.windowWidth-40
						_this.windowHeight = res.windowHeight-90

					}
				})
				const ctx = wx.createCanvasContext('firstCanvas')
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, _this.windowWidth, _this.windowHeight)
				ctx.stroke()


				ctx.setFillStyle('#eee')
				ctx.fillRect(10, 10, _this.windowWidth-20, _this.windowHeight-20)
				ctx.stroke()

				ctx.setFontSize(20)
				ctx.setFillStyle('#000')
				ctx.fillText('叶志勇', 30, 60)
				ctx.stroke()

				ctx.setFontSize(14)
				ctx.setFillStyle('#000')
				ctx.fillText('总经理上海猫口袋信息科技有限公司', 30, 80)
				ctx.stroke()


				ctx.setFillStyle('#fff')
				ctx.fillRect(20, 100, _this.windowWidth-40, 120)
				ctx.stroke()

				ctx.setFontSize(20)
				ctx.setFillStyle('#000')
				ctx.fillText('叶志勇', 100, 140)
				ctx.stroke()

				ctx.setFontSize(11)
				ctx.setFillStyle('#000')
				ctx.fillText('总经理', 100, 160)
				ctx.stroke()

				ctx.setFontSize(11)
				ctx.setFillStyle('#000')
				ctx.fillText('上海猫口袋信息科技有限公司', 100, 180)
				ctx.stroke()

				ctx.setFontSize(11)
				ctx.setFillStyle('#000')
				ctx.fillText('18964941319', 100, 200)
				ctx.stroke()



				ctx.setFillStyle('#fff')
				ctx.fillRect(20, 250, _this.windowWidth-40, 130)
				ctx.stroke()

				ctx.drawImage(res.tempFilePath, 30, 270, 90, 90)
				ctx.stroke()

				ctx.setFontSize(11)
				ctx.setFillStyle('#000')
				ctx.fillText('长按识别小程序码', 120, 300)
				ctx.stroke()

				ctx.setFontSize(11)
				ctx.setFillStyle('#000')
				ctx.fillText('名片存入通讯录，无需打字', 120, 320)
				ctx.stroke()


				ctx.draw()


			}
		})


	},

	methods: {
		Preservation() {
			wx.canvasToTempFilePath({
				destWidth:300,
				destHeight:400,
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
.card-img{
	canvas{
		margin:20px auto;
	}
}
</style>
