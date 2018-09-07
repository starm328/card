<template>
	<div class="card-poster-item">
		<canvas :canvas-id="'convas'+i" :style="{width:windowWidth+'px',height:'860px'}" @tap="ToTempFilePath" v-if="bill !== ''"></canvas>
		<button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation" style="margin:20px" v-if="bill !== ''"> 保存图片 </button>
	</div>
</template>

<script>
import configs from '@/utils/configs';
export default {
	name: 'card-poster-item',
	props: {
		bill:String,
		i:String,
		cardData:Object,
	},
	data () {
		return {
			windowWidth:'',
			windowHeight:'',
			bg:'https://i1.vpinpai.cn/card/cXyIBAm7xxpiVABnXWLKPAs0TFHL5svgbaKLfke2.png',
			imgWidth:'',
			imgHeight:'',
			id:'',
		}
	},
	onReady() {
		var _this = this
		wx.downloadFile({
			url: configs.card.apiBaseUrl+'api/promotion/index/2?scene='+wx.getStorageSync('token').user_id+'&page=pages%2FHome%2Findex%2Fmain', //仅为示例，并非真实的资源
			success: function(resd) {
				wx.downloadFile({
					url: _this.bill,
					success: function(res) {
						wx.downloadFile({
							url: _this.bg,
							success: function(resq) {
								wx.getSystemInfo({
									success: function(res) {
										_this.windowWidth = res.windowWidth
										_this.windowHeight = res.windowHeight
									}
								})
								console.log(_this.bill)
								const ctx = wx.createCanvasContext('convas'+_this.i,this)
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
								ctx.fillText(_this.cardData.card.name, 50, top1+40)

								ctx.setFontSize(15)
								ctx.setFillStyle('#000')
								ctx.fillText(_this.cardData.card.position, 50, top1+60)

								ctx.setFontSize(15)
								ctx.setFillStyle('#33b631')
								ctx.fillText(_this.cardData.card.phone, 75, top1+90)
								ctx.setFontSize(15)
								ctx.setFillStyle('#000')
								ctx.fillText(_this.cardData.card.company, 75, top1+120)

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
					},
					fail:(res)=>{
						console.log(res)
					}
				})
			}
		})
	},
	methods: {
		ToTempFilePath() {
			wx.canvasToTempFilePath({
			  x: 100,
			  y: 200,
			  width: 50,
			  height: 50,
			  destWidth: 100,
			  destHeight: 100,
			  canvasId: 'myCanvas',
			  success: function(res) {
			    console.log(res.tempFilePath)
			  }
			})
		},
		Preservation() {
			var _this = this
			wx.canvasToTempFilePath({
				destWidth:_this.windowWidth * 2,
				destHeight:860*2,
				canvasId: 'convas'+_this.i,
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
.card-poster-item{
	display: inline-block;
	border-radius:5px;
}
</style>
