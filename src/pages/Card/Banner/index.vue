<template>
	<div class="card-banner">
		<canvas canvas-id="firstCanvas" :style="{width:windowWidth+'px',height:'860px'}"></canvas>
		<button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation" style="margin:20px"> 保存图片 </button>
	</div>
</template>

<script>
export default {

	name: 'card-banner',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '名片海报'
		})
	},
	onReady() {
		var _this = this
		wx.downloadFile({
			url: _this.img,
			success: function(res) {
				wx.downloadFile({
					url: _this.code,
					success: function(resd) {
						wx.downloadFile({
							url: _this.bg,
							success: function(resq) {
								wx.getSystemInfo({
									success: function(res) {
										_this.windowWidth = res.windowWidth
										_this.windowHeight = res.windowHeight

									}
								})
								const ctx = wx.createCanvasContext('firstCanvas')
								ctx.setFillStyle('#fff')
								ctx.fillRect(0, 0, _this.windowWidth, 860)
								ctx.fill()
								ctx.stroke()
								console.log(res.tempFilePath)
								ctx.drawImage(res.tempFilePath  , 25, 30, _this.windowWidth - 50,400)
								ctx.stroke()

								var top1 = 450

								ctx.drawImage(resq.tempFilePath, 30, 450, _this.windowWidth - 50, 200)
								ctx.stroke()


								ctx.setFontSize(22)
								ctx.setFillStyle('#000')
								ctx.fillText('叶志勇', 50, top1+40)

								ctx.setFontSize(15)
								ctx.setFillStyle('#000')
								ctx.fillText('总经理', 50, top1+60)

								ctx.setFontSize(15)
								ctx.setFillStyle('#33b631')
								ctx.fillText('18664941319', 75, top1+90)
								ctx.setFontSize(15)
								ctx.setFillStyle('#000')
								ctx.fillText('上海猫口袋信息科技有限公司', 75, top1+120)

								ctx.stroke()

								ctx.drawImage(resd.tempFilePath, _this.windowWidth - 110, top1+10, 60, 60)
								ctx.stroke()

								ctx.drawImage(resd.tempFilePath, 30, top1+250, 90, 90)
								ctx.stroke()

								ctx.setFontSize(12)
								ctx.setFillStyle('#000')
								ctx.fillText('微信 长按识别 或 扫码', 120, top1+280)
								ctx.stroke()

								ctx.setFontSize(12)
								ctx.setFillStyle('#000')
								ctx.fillText('无需打字', 120, top1+300)
								ctx.stroke()

								ctx.setFontSize(12)
								ctx.setFillStyle('#000')
								ctx.fillText('保存我的名片信息到手机通讯录', 120, top1+320)
								ctx.stroke()

								ctx.draw()
							}
						})
					}
				})
			}
		})
	},
	data () {
		return {
			windowWidth:'',
			windowHeight:'',
			code:'https://inedia.web.mallkd.com/code.jpg',
			img:'https://inedia.web.mallkd.com/banner.png',
			bg:'https://inedia.web.mallkd.com/bg.png',

			imgWidth:'',
			imgHeight:''

		}
	},
	methods: {

		Preservation() {
			var _this = this
			wx.canvasToTempFilePath({
				destWidth:_this.windowWidth,
				destHeight:860,
				canvasId: 'firstCanvas',
				quality:1,
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
</style>
